// CompletedRow.tsx
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

  return (
    <div className={`row ${isRevealing ? "revealing" : ""}`}>
      {guess.split("").map((letter, i) => (
        <div key={i} className={`letter ${getStatus(letter, i)}`}>
          {letter}
        </div>
      ))}
    </div>
  );
};

export default CompletedRow;
