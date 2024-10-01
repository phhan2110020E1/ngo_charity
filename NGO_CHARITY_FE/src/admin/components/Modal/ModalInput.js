function ModalInput({ labelName, inputName, touched, error, inputType = 'text', ...props }) {
    return (
        <div className="form-group row">
            <label className="col-lg-4 col-form-label" htmlFor={inputName}>
                {labelName} <span className="text-danger">*</span>
            </label>
            <div className="col-lg-6">
                <input
                    type={inputType}
                    id={inputName}
                    name={inputName}
                    placeholder={`Enter ${inputName}`}
                    className={`form-control mb-1 ${touched && error ? 'is-invalid' : ''} ${
                        touched && !error ? 'is-valid' : ''
                    }`}
                    autoComplete="off"
                    {...props}
                />
                {touched && error ? (
                    <div className="invalid-feedback" style={{ textAlign: 'left' }}>
                        {error}
                    </div>
                ) : (
                    <div className="valid-feedback" style={{ textAlign: 'left' }}>
                        Success
                    </div>
                )}
            </div>
        </div>
    );
}

export default ModalInput;
