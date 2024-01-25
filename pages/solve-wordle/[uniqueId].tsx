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
  const [isRevealing, setIsRevealing] = useState(false);

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
    setCurrentGuess((prev) => prev.slice(0, -1));
  };

  const submitGuess = () => {
    if (!puzzle || currentGuess.length !== puzzle.word.length) {
      return;
    }

    const newGuesses = [...guesses, currentGuess.toUpperCase()];
    setGuesses(newGuesses);
    setCurrentGuess("");

    if (currentGuess.toUpperCase() === puzzle.word.toUpperCase()) {
      setIsGameOver(true);
      setSuccessMessage("Congratulations! You guessed the word!");
    } else if (newGuesses.length >= MAX_CHALLENGES) {
      setIsGameOver(true);
      setSuccessMessage(`Game Over! The word was ${puzzle.word.toUpperCase()}.`);
    }
  };

  if (!puzzle) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading puzzle...
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Solve the Wordle Puzzle</h1>
      {isGameOver ? (
        <div className="text-center">
          <p>{successMessage}</p>
        </div>
      ) : (
        <>
          <Grid
            solution={puzzle.word}
            guesses={guesses}
            currentGuess={currentGuess}
            isRevealing={isRevealing}
            currentRowClassName="your-class-name"
            isGameOver={isGameOver}
            maxGuesses={MAX_CHALLENGES}
          />
          <div className="flex justify-center mt-4">
            <Keyboard
              onChar={addCharToGuess}
              onDelete={removeLastChar}
              onEnter={submitGuess}
              solution={puzzle.word}
              guesses={guesses}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default SolveWordle;
