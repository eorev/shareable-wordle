import React, { useState } from 'react';

export default function CreateWordle() {
    const [word, setWord] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setWord(event.target.value);
    };

    const createPuzzle = async () => {
        try {
            const response = await fetch('/api/create-wordle', {
                method: 'POST',
                body: JSON.stringify({ word }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            if (data.error) {
                console.error('Error creating puzzle:', data.error);
                alert('Error creating puzzle: ' + data.error); // Display error to the user
            } else {
                const puzzleLink = `www.example.com/solve-wordle/${data.uniqueId}`;
                console.log('Share this link:', puzzleLink);
                alert('Puzzle created! Share this link: ' + puzzleLink); // Display success message
            }
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            alert('Failed to create puzzle. Please try again later.'); // Display fetch error
        }
    };

    return (
        <div>
            <h1>Create Wordle</h1>
            <input type="text" placeholder="Enter word" value={word} onChange={handleInputChange} />
            <button onClick={createPuzzle}>Create Puzzle</button>
        </div>
    );
}
