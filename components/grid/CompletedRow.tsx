import React from 'react';
import { motion } from 'framer-motion';
import '@/styles/globals.css';
import '@/styles/grid.css';

type CompletedRowProps = {
  solution: string;
  guess: string;
  isRevealing: boolean;
};

const CompletedRow = ({ solution, guess, isRevealing }: CompletedRowProps) => {
  const solutionChars = Array.from(solution);
  const usedLetters = Array(solution.length).fill(false);

  const flipVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const getStatus = (letter: string, position: number) => {
    if (letter === solutionChars[position]) {
      usedLetters[position] = true;
      return "correct";
    } else if (solutionChars.includes(letter)) {
      const index = solutionChars.findIndex((char, idx) => char === letter && !usedLetters[idx]);
      if (index !== -1) {
        usedLetters[index] = true;
        return "present";
      }
    }
    return "absent";
  };

  const getColor = (status: string) => {
    switch (status) {
      case 'correct':
        return 'green';
      case 'present':
        return 'yellow';
      case 'absent':
        return 'lightgray';
      default:
        return 'transparent';
    }
  };

  return (
    <div className="row">
      {guess.split("").map((letter, i) => {
        const status = getStatus(letter, i);
        const color = getColor(status);

        return (
          <motion.div
            key={i}
            className={`letter ${status}`}
            initial="hidden"
            animate="visible"
            variants={flipVariants}
            style={{ backgroundColor: color }}
          >
            {letter}
          </motion.div>
        );
      })}
    </div>
  );
};

export default CompletedRow;
