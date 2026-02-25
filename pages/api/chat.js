import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages, fundingContext } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Invalid request body' });
  }

  try {
    const response = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1024,
      system: `You are a helpful assistant specializing in Canadian film and television funding programs. You have access to the following funding sources:\n\n${fundingContext || ''}\n\nHelp users find the right funding programs for their projects. Be specific, helpful, and provide clear recommendations. If asked about requirements, deadlines, or funding amounts, refer to the specific programs above.`,
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
