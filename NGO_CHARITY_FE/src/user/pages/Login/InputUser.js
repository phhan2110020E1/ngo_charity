function InputUser({
    icon,
    inputName,
    touched,
    error,
    validError = false,
    showResetPassErrorEmail = false,
    showRegisterError = false,
    marginTop = 'mt-2',
    inputType = 'text',
    ...props
}) {
    return (
        <div className={`user__pages__form--form-group ${marginTop}`}>
            <input
                type={inputType}
                className="user__pages__form--form-style"
                name={inputName}
                autoComplete="off"
                {...props}
            />
            <i className={`user__pages__form--input-icon ${icon}`}></i>
            {touched && error && <div className="user__pages__form--input-valid">{error}</div>}
            {validError && (
                <div className="user__pages__form--input-valid">Email or password is incorrect, try again</div>
            )}
            {showResetPassErrorEmail && (
                <div className="user__pages__form--input-valid" style={{ color: 'red' }}>
                    Email does not exist, please check your email again
                </div>
            )}
            {showRegisterError && (
                <div className="user__pages__form--input-valid">Email already exists, please enter another email</div>
            )}
        </div>
    );
}

export default InputUser;
