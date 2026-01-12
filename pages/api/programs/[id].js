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
  const { id } = req.query;

  if (req.method === 'GET') {
    // Get a single program
    try {
      const programs = readPrograms();
      const program = programs.find(p => p.id === id);
      if (program) {
        res.status(200).json(program);
      } else {
        res.status(404).json({ error: 'Program not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to read program' });
    }
  } else if (req.method === 'PUT') {
    // Update a program
    try {
      const programs = readPrograms();
      const index = programs.findIndex(p => p.id === id);

      if (index === -1) {
        return res.status(404).json({ error: 'Program not found' });
      }

      const updatedProgram = { ...programs[index], ...req.body, id }; // Preserve the ID
      programs[index] = updatedProgram;
      writePrograms(programs);
      res.status(200).json(updatedProgram);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update program' });
    }
  } else if (req.method === 'DELETE') {
    // Delete a program
    try {
      const programs = readPrograms();
      const index = programs.findIndex(p => p.id === id);

      if (index === -1) {
        return res.status(404).json({ error: 'Program not found' });
      }

      programs.splice(index, 1);
      writePrograms(programs);
      res.status(200).json({ message: 'Program deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete program' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
