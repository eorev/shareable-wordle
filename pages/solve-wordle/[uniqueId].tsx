import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

// Define the type for your puzzle data
type PuzzleType = {
    word: string;
    uniqueId: string;
};

const SolveWordle = () => {
    const router = useRouter();
    const { uniqueId } = router.query;
    const [puzzle, setPuzzle] = useState<PuzzleType | null>(null);
    const [userInput, setUserInput] = useState('');
    const [guesses, setGuesses] = useState<string[]>([]);
    const [isGameOver, setIsGameOver] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        if (uniqueId) {
            fetch(`/api/solve-wordle?uniqueId=${uniqueId}`)
                .then(response => response.json())
                .then((data: PuzzleType) => setPuzzle(data))
                .catch(error => console.error('Error fetching puzzle:', error));
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

        setGuesses(prevGuesses => [...prevGuesses, userInput]);

        if (userInput.toUpperCase() === puzzle.word.toUpperCase()) {
            setIsGameOver(true);
            setSuccessMessage('Congratulations! You guessed the word!');
        } else if (guesses.length >= 5) {
            setIsGameOver(true);
            setSuccessMessage(`Game Over! The word was ${puzzle.word.toUpperCase()}.`);
        }

        setUserInput('');
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
                <div>
                    <input type="text" value={userInput} onChange={handleInputChange} maxLength={puzzle?.word.length} />
                    <button onClick={handleSubmit}>Submit Guess</button>
                    <div>
                        <h2>Your Guesses:</h2>
                        <ul>
                            {guesses.map((guess, index) => (
                                <li key={index}>{guess}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SolveWordle;
