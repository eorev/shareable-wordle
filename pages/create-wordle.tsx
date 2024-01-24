import React, { useState } from "react";
import StackedNotifications from '@/components/StackNotifications';
import { Notification } from "@/types/types";

export default function CreateWordle() {
  const [word, setWord] = useState("");
  const [loading, setLoading] = useState(false);
  const [puzzleLink, setPuzzleLink] = useState("");
  const [notification, setNotification] = useState<Notification | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputWord = event.target.value.toUpperCase();
    if (inputWord.length <= 5) {
      setWord(inputWord);
    }
  };

  const showNotification = (text: string) => {
    const newNotification = { id: Date.now(), text };
    setNotification(newNotification);
    setTimeout(() => setNotification(null), 5000); // Auto-remove after 5 seconds
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(puzzleLink).then(() => {
      showNotification("Link copied to clipboard!");
    }).catch(err => {
      console.error('Could not copy text: ', err);
    });
  };

  const createPuzzle = async () => {
    if (word.length !== 5) {
      alert("Please enter a 5-letter word.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/create-wordle", {
        method: "POST",
        body: JSON.stringify({ word }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (!response.ok || data.error) {
        throw new Error(`Error creating puzzle: ${data.error || response.status}`);
      }

      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      setPuzzleLink(`${baseUrl}/solve-wordle/${data.uniqueId}`);
      showNotification("Puzzle created successfully!");
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      alert("Failed to create puzzle. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1>Create Wordle</h1>
      <StackedNotifications notification={notification} removeNotif={() => setNotification(null)} />
      {puzzleLink ? (
        <div>
          <p>Puzzle created! Share this link:</p>
          <p>{puzzleLink}</p>
          <button onClick={copyToClipboard}>Copy Link</button>
        </div>
      ) : (
        <div>
          <input
            type="text"
            placeholder="Enter 5-letter word"
            value={word}
            onChange={handleInputChange}
            maxLength={5}
          />
          <button onClick={createPuzzle}>Create Puzzle</button>
        </div>
      )}
    </>
  );
}
