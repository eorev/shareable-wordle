// models/Puzzle.js
import mongoose from 'mongoose';

const puzzleSchema = new mongoose.Schema({
  word: { type: String, required: true },
  creator: String, // Optional field for creator's identifier
  createdAt: { type: Date, default: Date.now },
  uniqueId: { type: String, required: true, unique: true },
  // Add other relevant fields here
});

export default mongoose.models.Puzzle || mongoose.model('Puzzle', puzzleSchema);
