/**
 * parse-pdfs.js
 *
 * Run with:  npm run parse-pdfs
 *
 * Reads every PDF in data/pdfs/, extracts the text, and writes the results
 * to data/parsed-pdfs.json.  Re-run this script whenever you add or update
 * PDFs — the chat API reads from the cached JSON file, so no PDF parsing
 * happens at request time.
 *
 * Output shape:
 * [
 *   {
 *     filename: "bc-film-tax-credit-guidelines.pdf",
 *     title:    "bc-film-tax-credit-guidelines",   // filename without extension
 *     text:     "... full extracted text ...",
 *     pages:    12,
 *     keywords: ["bc", "film", "tax", "credit", "guidelines"]  // for relevance filtering
 *   },
 *   ...
 * ]
 */

const fs   = require('fs');
const path = require('path');
const pdf  = require('pdf-parse');

const PDF_DIR    = path.join(__dirname, '../data/pdfs');
const OUTPUT_FILE = path.join(__dirname, '../data/parsed-pdfs.json');

async function parsePdfs() {
  const files = fs.readdirSync(PDF_DIR).filter(f => f.toLowerCase().endsWith('.pdf'));

  if (files.length === 0) {
    console.log('No PDF files found in data/pdfs/. Add your PDFs there and re-run.');
    // Write an empty array so the chat API doesn't crash on a missing file.
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify([], null, 2));
    return;
  }

  console.log(`Found ${files.length} PDF(s). Parsing…\n`);

  const results = [];

  for (const filename of files) {
    const filePath = path.join(PDF_DIR, filename);
    console.log(`  Parsing: ${filename}`);

    try {
      const buffer = fs.readFileSync(filePath);
      const data   = await pdf(buffer);

      // Derive simple keywords from the filename (minus extension, split on
      // separators) so the relevance filter in the chat API has something to
      // match against without any extra configuration.
      const title    = path.basename(filename, path.extname(filename));
      const keywords = title
        .toLowerCase()
        .replace(/[-_]/g, ' ')
        .split(/\s+/)
        .filter(w => w.length > 2);

      results.push({
        filename,
        title,
        text: data.text.trim(),
        pages: data.numpages,
        keywords,
      });

      console.log(`    ✓ ${data.numpages} page(s), ${data.text.length.toLocaleString()} chars`);
    } catch (err) {
      console.error(`    ✗ Failed to parse ${filename}:`, err.message);
    }
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(results, null, 2));
  console.log(`\nDone. Wrote ${results.length} document(s) to data/parsed-pdfs.json`);
}

parsePdfs().catch(err => {
  console.error('Unexpected error:', err);
  process.exit(1);
});
