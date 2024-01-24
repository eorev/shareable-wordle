// Keyboard.tsx
import React, { useEffect, useState } from 'react';
import Key from '@/components/keyboard/Key';
import { getStatuses } from '@/lib/statuses';

type KeyboardProps = {
    onChar: (value: string) => void;
    onDelete: () => void;
    onEnter: () => void;
    solution: string;
    guesses: string[];
    className?: string;
};

export const Keyboard = ({
    onChar,
    onDelete,
    onEnter,
    solution,
    guesses,
}: KeyboardProps) => {
    const charStatuses = getStatuses(solution, guesses);
    const [isRevealing, setIsRevealing] = useState(false);

    const onClick = (value: string) => {
        if (value === 'ENTER') {
            onEnter();
        } else if (value === 'DELETE') {
            onDelete();
        } else {
            onChar(value);
        }
    };

    useEffect(() => {
        const listener = (e: KeyboardEvent) => {
            if (e.code === 'Enter') {
                onEnter();
            } else if (e.code === 'Backspace') {
                onDelete();
            } else {
                const key = e.key.toUpperCase();
                if (key.length === 1 && key >= 'A' && key <= 'Z') {
                    onChar(key);
                }
            }
        };
        window.addEventListener('keyup', listener);
        return () => {
            window.removeEventListener('keyup', listener);
        };
    }, [onEnter, onDelete, onChar]);

    // Keyboard layout
    return (
        <div>
            <div className="mb-1 flex justify-center">
                {['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'].map((key) => (
                    <Key
                        value={key}
                        key={key}
                        onClick={onClick}
                        status={charStatuses[key]}
                        isRevealing={isRevealing}
                        className="text-lg p-2 m-1" // Adjust the size and spacing as needed
                    />
                ))}
            </div>
            <div className="mb-1 flex justify-center">
                {['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'].map((key) => (
                    <Key
                        value={key}
                        key={key}
                        onClick={onClick}
                        status={charStatuses[key]}
                        isRevealing={isRevealing}
                        className="text-lg p-2 m-1" // Adjust the size and spacing as needed
                    />
                ))}
            </div>
            <div className="flex justify-center">
                <Key
                    width={65.4}
                    value="ENTER"
                    onClick={onClick}
                    isRevealing={isRevealing}
                    status={charStatuses['ENTER'] || 'default'} // Replace 'default' with appropriate status or make it optional in KeyProps
                />                {['Z', 'X', 'C', 'V', 'B', 'N', 'M'].map((key) => (
                    <Key
                        value={key}
                        key={key}
                        onClick={onClick}
                        status={charStatuses[key]}
                        isRevealing={isRevealing}
                        className="text-lg p-2 m-1" // Adjust the size and spacing as needed
                    />
                ))}
                <Key
                    width={65.4}
                    value="DELETE"
                    onClick={onClick}
                    isRevealing={isRevealing}
                    status={charStatuses['DELETE'] || 'default'} // Replace 'default' with appropriate status or make it optional in KeyProps
                />            </div>
        </div>
    )
}

export default Keyboard
