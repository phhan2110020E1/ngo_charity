function InputChangePass({
    labelName,
    inputName,
    touched,
    error,
    showOldPassError = false,
    requiredLabel = false,
    ...props
}) {
    return (
        <div className="row mt-2">
            <div className="col-md-4">
                <label className="profile__pages_detail--labels mt-2">
                    {labelName}: {requiredLabel && <span style={{ color: 'Red' }}>*</span>}
                </label>
            </div>
            <div className="col-md-8">
                <input
                    type="password"
                    name={inputName}
                    className="form-control profile__pages_detail--form-control"
                    autoComplete="off"
                    {...props}
                />
                {touched && error && <p style={{ marginTop: '-20px', textAlign: 'left', color: 'red' }}>{error}</p>}
                {showOldPassError && (
                    <p style={{ marginTop: '-20px', textAlign: 'left', color: 'red' }}>
                        The password is incorrect, please check again
                    </p>
                )}
            </div>
        </div>
    );
}

export default InputChangePass;
