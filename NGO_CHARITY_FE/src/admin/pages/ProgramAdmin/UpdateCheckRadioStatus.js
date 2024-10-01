import { useEffect, useState } from 'react';

function UpdateCheckRadioStatus({ value, handleChange }) {
    const [showNoComing, setShowNoComing] = useState(true);
    const [showComing, setShowComing] = useState(true);

    useEffect(() => {
        if (value === 'COMING') {
            setShowNoComing(false);
            setShowComing(true);
        }
        if (value === 'CLOSE') {
            setShowComing(false);
            setShowNoComing(false);
        }
    }, [value]);

    return (
        <div style={{ textAlign: 'left' }}>
            {showNoComing && (
                <div className="mb-3">
                    <input
                        type="radio"
                        id="noComing"
                        name="status"
                        value="UP_COMING"
                        defaultChecked={value === 'UP_COMING'}
                        onChange={handleChange}
                    />
                    <label htmlFor="noComing">
                        <span className="ml-2 mt-1 label label-success">UP_COMING</span>
                    </label>
                </div>
            )}
            {showComing && (
                <div className="mb-3">
                    <input type="radio" id="coming" name="status" value="COMING" defaultChecked={value === 'COMING'} onChange={handleChange} />
                    <label htmlFor="coming">
                        <span className="ml-2 mt-1 label label-warning">COMING</span>
                    </label>
                </div>
            )}
            <div>
                <input type="radio" id="closed" name="status" value="CLOSE" defaultChecked={value === 'CLOSE'} onChange={handleChange} />
                <label htmlFor="closed">
                    <span className="ml-2 mt-1 label label-danger">Closed</span>
                </label>
            </div>
        </div>
    );
}

export default UpdateCheckRadioStatus;
