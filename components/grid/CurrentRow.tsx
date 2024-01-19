// CurrentRow.tsx
type CurrentRowProps = {
    guess: string;
    className: string;
};

const CurrentRow = ({ guess, className }: CurrentRowProps) => {
    return (
        <div className={`row ${className}`}>
            {guess.split('').map((letter, i) => (
                <div key={i} className="letter">
                    {letter}
                </div>
            ))}
        </div>
    );
};

export default CurrentRow;