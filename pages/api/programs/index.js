import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'programs.json');

// Helper function to read programs
function readPrograms() {
  const fileContents = fs.readFileSync(dataFilePath, 'utf8');
  return JSON.parse(fileContents);
}

// Helper function to write programs
function writePrograms(programs) {
  fs.writeFileSync(dataFilePath, JSON.stringify(programs, null, 2), 'utf8');
}

export default function handler(req, res) {
  if (req.method === 'GET') {
    // Get all programs
    try {
      const programs = readPrograms();
      res.status(200).json(programs);
    } catch (error) {
      res.status(500).json({ error: 'Failed to read programs' });
    }
  } else if (req.method === 'POST') {
    // Create a new program
    try {
      const programs = readPrograms();
      const newProgram = req.body;

      // Generate a unique ID if not provided
      if (!newProgram.id) {
        const baseId = newProgram.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        let id = baseId;
        let counter = 1;
        while (programs.some(p => p.id === id)) {
          id = `${baseId}-${counter}`;
          counter++;
        }
        newProgram.id = id;
      }

      programs.push(newProgram);
      writePrograms(programs);
      res.status(201).json(newProgram);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create program' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
