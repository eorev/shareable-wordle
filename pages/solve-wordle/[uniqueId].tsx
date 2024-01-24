import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Grid from "@/components/grid/Grid";
import Keyboard from "@/components/keyboard/Keyboard";
import { MAX_CHALLENGES } from "@/constants/settings";

type PuzzleType = {
  word: string;
  uniqueId: string;
};

const SolveWordle = () => {
  const router = useRouter();
  const { uniqueId } = router.query;
  const [puzzle, setPuzzle] = useState<PuzzleType | null>(null);
  const [currentGuess, setCurrentGuess] = useState("");
  const [guesses, setGuesses] = useState<string[]>([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (uniqueId) {
      fetch(`/api/solve-wordle?uniqueId=${uniqueId}`)
        .then((response) => response.json())
        .then((data: PuzzleType) => setPuzzle(data))
        .catch((error) => console.error("Error fetching puzzle:", error));
    }
  }, [uniqueId]);

  const addCharToGuess = (char: string) => {
    if (currentGuess.length < (puzzle?.word.length || 0)) {
      setCurrentGuess(currentGuess + char);
    }
  };

  const removeLastChar = () => {
    setCurrentGuess(currentGuess.slice(0, -1));
  };

  const submitGuess = () => {
    if (!puzzle) {
      return;
    }

    if (currentGuess.length === puzzle.word.length) {
      setGuesses([...guesses, currentGuess]);
      setCurrentGuess("");

      if (currentGuess.toUpperCase() === puzzle.word.toUpperCase()) {
        setIsGameOver(true);
        setSuccessMessage("Congratulations! You guessed the word!");
      } else if (guesses.length >= MAX_CHALLENGES - 1) {
        setIsGameOver(true);
        setSuccessMessage(`Game Over! The word was ${puzzle.word.toUpperCase()}.`);
      }
    }
  };

  if (!puzzle) {
    return <div>Loading puzzle...</div>;
  }

  return (
    <div>
      <h1>Solve the Wordle Puzzle</h1>
      {isGameOver ? (
        <div>
          <p>{successMessage}</p>
        </div>
      ) : (
        <>
          <Grid
            solution={puzzle.word}
            guesses={guesses}
            currentGuess={currentGuess}
            currentRowClassName="your-class-name"
            isGameOver={isGameOver}
            maxGuesses={MAX_CHALLENGES}
          />
          <Keyboard
            onChar={addCharToGuess}
            onDelete={removeLastChar}
            onEnter={submitGuess}
            solution={puzzle.word}
            guesses={guesses}
          />
        </>
      )}
    </div>
  );
};

export default SolveWordle;
