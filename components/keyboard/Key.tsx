import React from 'react';
import classnames from 'classnames';
import { CharStatus } from '../../lib/statuses';

interface KeyProps {
    value: string;
    onClick: (value: string) => void;
    status: CharStatus;
    isRevealing: boolean;
    className?: string;
    width?: number;
}

const Key: React.FC<KeyProps> = ({ value, onClick, status, isRevealing, className, width }) => {
    const style = width ? { width: `${width}px` } : {};

    const classes = classnames(
        'your-key-base-classes', // Replace with your base CSS classes
        {
            'revealing': isRevealing, // Example conditional class
            [`${status}`]: status, // Apply status as a class, adjust as needed
        },
        className // Apply additional custom classes passed as props
    );

    const handleClick = () => {
        onClick(value);
    };

    return (
        <button
            aria-label={value}
            className={classes}
            onClick={handleClick}
            style={style}
        >
            {value}
        </button>
    );
};

export default Key;
