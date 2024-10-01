function EmailPage(props) {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                width: '500px',
                textAlign: 'center',
                backgroundColor: '#fad939',
                margin: '10px auto',
                borderRadius: '30px',
                color: '#5d541d',
            }}
        >
            <div style={{ padding: '10px 20px' }}>
                <h1
                    style={{
                        fontSize: 38,
                        fontStyle: 'normal',
                        fontWeight: 'bold',
                        padding: '0 70px',
                        margin: '25px 0',
                    }}
                >
                    Please confirm your email address
                </h1>
                <div style={{ padding: 20 }}>
                    <h3 style={{ fontSize: 20, fontStyle: 'normal', fontWeight: 'bold', margin: '20px 0' }}>
                        Thanks for joining NGO Charity!
                    </h3>
                    <p style={{ fontSize: 18, lineHeight: '150%', padding: '0 20px', margin: '18px 0' }}>
                        To finish signing up, please confirm your email address. This ensures we have the right email in
                        case we need to contact you.
                    </p>
                </div>
                <div>
                    <a
                        href="http://localhost:3000/"
                        style={{
                            display: 'inline-block',
                            padding: '15px 35px 15px 35px',
                            backgroundColor: '#8928c6',
                            borderRadius: '30px',
                            fontSize: 16,
                            fontStyle: 'normal',
                            fontWeight: 'normal',
                            lineHeight: '120%',
                            textDecoration: 'none',
                            color: '#fff',
                            textAlign: 'center',
                            width: 'auto',
                            cursor: 'pointer',
                            borderStyle: 'none',
                        }}
                    >
                        Confirm Email Address
                    </a>
                </div>
                <div style={{ margin: '16px 0' }}>
                    <p>
                        Thanks,
                        <br />
                        Group 4 Team!
                    </p>
                </div>
            </div>
        </div>
    );
}

export default EmailPage;
