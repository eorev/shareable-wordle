// pages/api/puzzle.js
import dbConnect from '../../lib/mongodb';
import Puzzle from '../../models/Puzzle';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect();

  // Example: Creating a new puzzle
  if (req.method === 'POST') {
    try {
      const puzzle = await Puzzle.create(req.body);
      res.status(201).json(puzzle);
    } catch (error) {
        const message = (error as Error).message;
        res.status(500).json({ error: message });
      }
  }

  // Add other methods (GET, DELETE, etc.) as needed
}
