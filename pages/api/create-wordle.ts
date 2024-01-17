// pages/api/create-wordle.ts.js
import dbConnect from '../../lib/mongodb';
import Puzzle from '../../models/Puzzle';
import { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        await dbConnect();

        const uniqueId = uuidv4();
        const puzzleData = { ...req.body, uniqueId };

        try {
            // Create a new puzzle in the database
            const puzzle = new Puzzle(puzzleData);
            await puzzle.save();

            // Respond with the uniqueId
            res.status(201).json({ uniqueId });
        } catch (error) {
            res.status(500).json({ error: "Error creating puzzle" });
        }
    } else {
        // Handle any non-POST requests
        res.status(405).json({ error: "Method not allowed" });
    }
}
