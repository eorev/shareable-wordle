import React, { useState } from "react";

export default function CreateWordle() {
  const [word, setWord] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputWord = event.target.value.toUpperCase();
    // Ensure only 5-letter words can be entered
    if (inputWord.length <= 5) {
      setWord(inputWord);
    }
  };

  const createPuzzle = async () => {
    // First check if the word is 5 letters long
    if (word.length !== 5) {
      alert("Please enter a 5-letter word.");
      return;
    }

    try {
      const response = await fetch("/api/create-wordle", {
        method: "POST",
        body: JSON.stringify({ word }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.error) {
        console.error("Error creating puzzle:", data.error);
        alert("Error creating puzzle: " + data.error); // Display error to the user
      } else {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
        const puzzleLink = `${baseUrl}/solve-wordle/${data.uniqueId}`;
        console.log("Base URL:", process.env.REACT_APP_BASE_URL);
        console.log("Share this link:", puzzleLink);
        alert("Puzzle created! Share this link: " + puzzleLink); // Display success message
      }
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      alert("Failed to create puzzle. Please try again later."); // Display fetch error
    }
  };

  return (
    <div>
      <h1>Create Wordle</h1>
      <input
        type="text"
        placeholder="Enter 5-letter word"
        value={word}
        onChange={handleInputChange}
        maxLength={5} // Enforces a 5-letter limit directly on the input
      />
      <button onClick={createPuzzle}>Create Puzzle</button>
    </div>
  );
}
