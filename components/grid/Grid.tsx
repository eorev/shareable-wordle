import { MAX_CHALLENGES } from '@/constants/settings'
import CompletedRow from '@/components/grid/CompletedRow';
import CurrentRow from '@/components/grid/CurrentRow';
import EmptyRow from '@/components/grid/EmptyRow';
import '@/styles/grid.css'

type Props = {
    solution: string;
    guesses: string[];
    currentGuess: string;
    isRevealing?: boolean;
    currentRowClassName: string;
    isGameOver: boolean;
    maxGuesses: number;
};

const Grid = ({
    solution,
    guesses,
    currentGuess,
    isRevealing = false,
    currentRowClassName,
    isGameOver,
    maxGuesses,
}: Props) => {
    const emptyRows = maxGuesses - guesses.length - (isGameOver ? 0 : 1);

    return (
        <div className="grid">
            {guesses.map((guess, i) => (
                <CompletedRow
                    key={i}
                    solution={solution}
                    guess={guess}
                    isRevealing={isRevealing && guesses.length - 1 === i}
                />
            ))}
            {!isGameOver && (
                <CurrentRow guess={currentGuess} className={currentRowClassName} />
            )}
            {Array.from({ length: emptyRows }).map((_, i) => (
                <EmptyRow key={i} />
            ))}
        </div>
    );
};

export default Grid;