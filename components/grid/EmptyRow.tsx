// EmptyRow.tsx
const EmptyRow = () => {
    return (
        <div className="row">
            {/* Assuming 5 letters in a word; adjust as needed */}
            {[...Array(5)].map((_, i) => (
                <div key={i} className="letter"></div>
            ))}
        </div>
    );
};

export default EmptyRow;