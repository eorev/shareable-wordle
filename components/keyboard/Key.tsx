// Key.tsx
import React from 'react';
import classnames from 'classnames';
import { CharStatus } from '../../lib/statuses'; // Adjust import paths as needed

type KeyProps = {
    value: string;
    status?: CharStatus;
    onClick: (value: string) => void;
    isRevealing?: boolean;
    width?: number;
};

export const Key = ({
    status,
    value,
    onClick,
}: KeyProps) => {
    // Classnames setup
    const classes = classnames('your-key-classes', {
        // Add your class conditions based on the status
    });

    const handleClick = () => {
        onClick(value);
    };

    return (
        <button
            aria-label={value}
            className={classes}
            onClick={handleClick}
        >
            {value}
        </button>
    );
};

export default Key;
