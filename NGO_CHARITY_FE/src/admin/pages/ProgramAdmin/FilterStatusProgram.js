function FilterStatusProgram({ selectedStatus, handleStatusChange }) {
    return (
        <div>
            <select value={selectedStatus} onChange={handleStatusChange}>
                <option value="all">All Status</option>
                <option value="UP_COMING">UP_COMING</option>
                <option value="COMING">COMING</option>
                <option value="CLOSE">CLOSE</option>
            </select>
        </div>
    );
}

export default FilterStatusProgram;
