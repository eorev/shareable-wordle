import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Grid from "@/components/grid/Grid";
import { MAX_CHALLENGES } from "@/constants/settings";
import Keyboard from "@/components/keyboard/Keyboard";

type PuzzleType = {
  word: string;
  uniqueId: string;
};

const SolveWordle = () => {
  const router = useRouter();
  const { uniqueId } = router.query;
  const [puzzle, setPuzzle] = useState<PuzzleType | null>(null);
  const [userInput, setUserInput] = useState("");
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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value.toUpperCase());
  };

  const handleSubmit = () => {
    if (!puzzle) {
      return; // Or handle the error state
    }

    if (userInput.length !== puzzle.word.length) {
      alert(`Please enter a ${puzzle.word.length}-letter word.`);
      return;
    }

    setGuesses((prevGuesses) => [...prevGuesses, userInput]);

    if (userInput.toUpperCase() === puzzle.word.toUpperCase()) {
      setIsGameOver(true);
      setSuccessMessage("Congratulations! You guessed the word!");
    } else if (guesses.length >= MAX_CHALLENGES - 1) {
      setIsGameOver(true);
      setSuccessMessage(
        `Game Over! The word was ${puzzle.word.toUpperCase()}.`,
      );
    }

    setUserInput("");
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
          <input
            type="text"
            value={userInput}
            onChange={handleInputChange}
            maxLength={puzzle?.word.length}
          />
          <button onClick={handleSubmit}>Submit Guess</button>
          <Grid
            solution={puzzle.word}
            guesses={guesses}
            currentGuess={userInput}
            currentRowClassName="your-class-name"
            isGameOver={isGameOver}
            maxGuesses={MAX_CHALLENGES}
          />
          <Keyboard
            onChar={(value) => setUserInput(prev => prev + value)}
            onDelete={() => setUserInput(prev => prev.slice(0, -1))}
            onEnter={handleSubmit}
            solution={puzzle.word}
            guesses={guesses}
          />
        </>
      )}
    </div>
  );
};

export default SolveWordle;
