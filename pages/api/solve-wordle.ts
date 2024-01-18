// Importing necessary modules
import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongodb'; // Adjust the path as necessary
import Puzzle from '@/models/Puzzle';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        // Connect to the database
        await dbConnect();

        // Extract the uniqueId from the request query
        const { uniqueId } = req.query;

        // Query the database for the Wordle puzzle using Mongoose model
        const puzzle = await Puzzle.findOne({ uniqueId });

        // If no puzzle is found, return a 404
        if (!puzzle) {
            return res.status(404).json({ message: 'Puzzle not found' });
        }

        // Return the puzzle data
        res.status(200).json(puzzle);
    } catch (error) {
        // Handle any errors
        res.status(500).json({ message: 'Internal Server Error', error });
    }
}
