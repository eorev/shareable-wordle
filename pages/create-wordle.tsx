import React, { useState } from "react";
import StackedNotifications from '@/components/StackNotifications';
import { Notification } from "@/types/types";
import BarLoader from "@/components/BarLoader";
import "../styles/globals.css";

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
    return (
      <div className="flex justify-center items-center min-h-screen">
        <BarLoader />
      </div>
    );
  }

  return (
    <div className="bg-foreground min-h-screen flex justify-center items-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-primary text-3xl font-bold mb-8 text-center">Create Wordle</h1>
        <StackedNotifications notification={notification} removeNotif={() => setNotification(null)} />

        {puzzleLink ? (
          <div className="text-center">
            <p className="text-copy mb-4">Puzzle created! Share this link:</p>
            <p className="text-secondary-content mb-4">{puzzleLink}</p>
            <button
              onClick={copyToClipboard}
              className="bg-secondary text-secondary-content px-4 py-2 rounded hover:bg-secondary-light transition duration-300"
            >
              Copy Link
            </button>
          </div>
        ) : (
          <div>
            <input
              type="text"
              placeholder="Enter 5-letter word"
              value={word}
              onChange={handleInputChange}
              maxLength={5}
              className="border border-border rounded p-2 mb-4 w-full"
            />
            <button
              onClick={createPuzzle}
              className="bg-primary text-primary-content px-4 py-2 rounded hover:bg-primary-light transition duration-300 w-full"
            >
              Create Puzzle
            </button>
          </div>
        )}
      </div>
    </div>
  );
}