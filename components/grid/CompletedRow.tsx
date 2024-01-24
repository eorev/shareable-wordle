import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type CompletedRowProps = {
  solution: string;
  guess: string;
  isRevealing: boolean;
};

const CompletedRow = ({ solution, guess, isRevealing }: CompletedRowProps) => {
  const getStatus = (letter: string, position: number) => {
    if (isRevealing) {
      if (letter === solution[position]) {
        return "correct";
      } else if (solution.includes(letter)) {
        return "present";
      } else {
        return "absent";
      }
    }
    return "";
  };

  const flipVariants = {
    hidden: { rotateX: 90, opacity: 0 },
    visible: { rotateX: 0, opacity: 1 },
  };

  const getColor = (status: string) => {
    switch (status) {
      case 'correct':
        return 'green'; // Correct letters
      case 'present':
        return 'yellow'; // Letters present in the word but in the wrong spot
      case 'absent':
        return 'lightgray'; // Letters not present in the word
      default:
        return 'transparent';
    }
  };

  return (
    <div className="row">
      <AnimatePresence>
        {guess.split("").map((letter, i) => (
          <motion.div
            key={i}
            className={`letter`}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={flipVariants}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            style={{ backgroundColor: getColor(getStatus(letter, i)) }}
          >
            {letter}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default CompletedRow;
