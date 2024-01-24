// CurrentRow.tsx
type CurrentRowProps = {
    guess: string;
    className: string;
};

const CurrentRow = ({ guess, className }: CurrentRowProps) => {
    const emptyBoxes = Array.from({ length: 5 - guess.length });

    return (
        <div className={`row ${className}`}>
            {guess.split('').map((letter, i) => (
                <div key={i} className="letter filled">
                    {letter}
                </div>
            ))}
            {emptyBoxes.map((_, i) => (
                <div key={i + guess.length} className="letter"></div>
            ))}
        </div>
    );
};


export default CurrentRow;