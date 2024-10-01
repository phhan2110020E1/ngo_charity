import CountUp from 'react-countup';

function TotalInforDonate({ icon, title, targetNumber, separator = false }) {
    return (
        <div className="col-md-6 d-flex counter-wrap">
            <div className="block-18 d-flex">
                <div className="icon d-flex align-items-center justify-content-center">
                    <i
                        style={{
                            fontSize: 50,
                            paddingRight: '10px',
                            color: '#fd645b',
                        }}
                        className={icon}
                    ></i>
                </div>
                <div className="desc">
                    <div className="text">
                        <strong>
                            <CountUp
                                style={{ fontSize: 30, color: '#fd645b', paddingLeft: '15px' }}
                                end={targetNumber}
                                duration={5}
                                separator={separator}
                            />
                        </strong>
                    </div>
                    <div className="text">
                        <span style={{ fontSize: 20, paddingLeft: '15px' }}>{title}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TotalInforDonate;
