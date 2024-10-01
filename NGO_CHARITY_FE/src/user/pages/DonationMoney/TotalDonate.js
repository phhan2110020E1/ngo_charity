import CountUp from 'react-countup';

function TotalDonate({ targetNumber, title = 'Donation Campaign are running' }) {
    return (
        <div className="total-donate d-flex align-items-center">
            <span className="fa flaticon-cleaning"></span>
            <h4>{title}</h4>
            <p className="d-flex align-items-center">
                <span style={{ color: '#fff' }}>$</span>
                <span>
                    <CountUp style={{ color: '#fff' }} end={targetNumber} duration={5} separator="," />
                </span>
            </p>
        </div>
    );
}

export default TotalDonate;
