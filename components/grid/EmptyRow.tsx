// EmptyRow.tsx
const EmptyRow = () => {
    return (
        <div className="row">
            {[...Array(5)].map((_, i) => (
                <div key={i} className="letter"></div>
            ))}
        </div>
    );
};

export default EmptyRow;