function InputProgram({ labelName, inputName, touched, error, inputType = 'text', ...props }) {
    return (
        <div className="row mt-2">
            <div className="col-md-4">
                <label className="profile__pages_detail--labels mt-2">{labelName}:</label>
            </div>
            <div className="col-md-8">
                <input type={inputType} name={inputName} className="form-control profile__pages_detail--form-control" autoComplete="off" {...props} />
                {touched && error && <p style={{ marginTop: '-20px', textAlign: 'left', color: 'red' }}>{error}</p>}
            </div>
        </div>
    );
}

export default InputProgram;
