import Anthropic from '@anthropic-ai/sdk';
import fs from 'fs';
import path from 'path';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Load parsed PDFs once at module load time (cached between requests).
// Returns an empty array if the file doesn't exist yet (i.e. parse-pdfs
// hasn't been run yet).
function loadParsedPdfs() {
  const filePath = path.join(process.cwd(), 'data', 'parsed-pdfs.json');
  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

const ALL_PDFS = loadParsedPdfs();

/**
 * Pick the most relevant PDFs for the user's query using simple keyword
 * matching.  Scores each document by how many of its keywords appear in the
 * query string, then returns the top `maxDocs` documents.
 *
 * Falls back to the first `maxDocs` documents when nothing matches (so the
 * AI always has some context).
 */
function getRelevantPdfs(query, maxDocs = 4) {
  if (ALL_PDFS.length === 0) return [];

  const queryWords = query.toLowerCase().split(/\s+/);

  const scored = ALL_PDFS.map(doc => {
    const score = doc.keywords.filter(kw => queryWords.includes(kw)).length;
    return { doc, score };
  });

  scored.sort((a, b) => b.score - a.score);

  // If nothing scored, fall back to first maxDocs docs
  const topScored = scored.filter(s => s.score > 0);
  const selected  = topScored.length > 0 ? topScored.slice(0, maxDocs) : scored.slice(0, maxDocs);

  return selected.map(s => s.doc);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages, fundingContext } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Invalid request body' });
  }

  // Use the last user message for relevance scoring
  const lastUserMessage = [...messages].reverse().find(m => m.role === 'user');
  const query           = lastUserMessage?.content || '';

  const relevantPdfs = getRelevantPdfs(query);

  const pdfContext = relevantPdfs.length > 0
    ? relevantPdfs
        .map(doc => `### ${doc.title} (${doc.pages} pages)\n\n${doc.text}`)
        .join('\n\n---\n\n')
    : '';

  const systemPrompt = [
    'You are a helpful assistant specializing in Canadian film and television funding programs.',
    '',
    fundingContext
      ? `## Funding Programs\n\n${fundingContext}`
      : '',
    pdfContext
      ? `## Tax Credit & Program Guidelines\n\nThe following official guideline documents are relevant to this query:\n\n${pdfContext}`
      : '',
    '',
    'Help users find the right funding programs for their projects. Be specific and accurate.',
    'When referencing guidelines or requirements, cite the document title.',
    'If asked about deadlines, eligibility, or funding amounts, refer to the specific programs and documents above.',
  ].filter(Boolean).join('\n');

  try {
    const response = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1024,
      system: systemPrompt,
      messages: messages.map(msg => ({
        role: msg.role,
        content: msg.content,
      })),
    });

    return res.status(200).json({ content: response.content[0].text });
  } catch (error) {
    console.error('Anthropic API error:', error);
    return res.status(500).json({ error: 'Failed to get response from AI' });
  }
}
