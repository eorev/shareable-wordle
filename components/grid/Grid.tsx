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
};

const Grid = ({
    solution,
    guesses,
    currentGuess,
    isRevealing = false,
    currentRowClassName,
}: Props) => {
    const empties = Array.from({ length: MAX_CHALLENGES - guesses.length });

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
            {guesses.length < MAX_CHALLENGES && (
                <CurrentRow guess={currentGuess} className={currentRowClassName} />
            )}
            {empties.map((_, i) => (
                <EmptyRow key={i} />
            ))}
        </div>
    );
};

export default Grid;