
// Inside your puzzle creation component

const createPuzzle = async (word: string) => {
    const response = await fetch('/api/createWordle', {
        method: 'POST',
        body: JSON.stringify({ word }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const data = await response.json();
    const puzzleLink = `www.example.com/solve-wordle/${data.uniqueId}`;
    console.log('Share this link:', puzzleLink);
    // Display this link to the user
};


export default function CreateWordle() {
    return (
        <div>
            <h1>Create Wordle</h1>
        </div>
    )
}