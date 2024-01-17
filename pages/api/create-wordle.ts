// pages/api/create-wordle.ts.js
import dbConnect from '../../lib/mongodb';
import Puzzle from '../../models/Puzzle';
import { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';


    export default async function handler(req: NextApiRequest, res: NextApiResponse) {
        if (req.method === 'POST') {
          const uniqueId = uuidv4();
          const puzzleData = { ...req.body, uniqueId };
      
          // Store puzzleData in MongoDB
          // ...
      
          // Respond with the uniqueId
          res.status(201).json({ uniqueId });
        }
      }