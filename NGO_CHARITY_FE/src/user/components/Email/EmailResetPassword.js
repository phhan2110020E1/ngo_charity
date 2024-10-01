function EmailResetPassword(props) {
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
                    Please confirm reset password
                </h1>
                <div style={{ padding: 20 }}>
                    <h3 style={{ fontSize: 20, fontStyle: 'normal', fontWeight: 'bold', margin: '20px 0' }}>
                        New Password: <span style={{ fontSize: 30 }}>fptAptech</span>
                    </h3>
                    <p style={{ fontSize: 18, lineHeight: '150%', padding: '0 20px', margin: '18px 0' }}>
                        Please do not reveal your password to others, when you receive the password, please go to your
                        profile to update your password
                    </p>
                </div>
                <div style={{ margin: '16px 0' }}>
                    <p>
                        Thanks,
                        <br />
                        Group 4
                    </p>
                </div>
            </div>
        </div>
    );
}

export default EmailResetPassword;
