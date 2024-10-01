function InputAdminLogin({ validError, icon, labelName, inputName, touched, error, inputType = 'text', ...props }) {
    return (
        <div className="admin__page__login--form-inputbox">
            <i className={`${icon} admin__page__login--icon-input`}></i>
            <input className="admin__page__login--input" type={inputType} name={inputName} required autoComplete="off" {...props} />
            <label className="admin__page__login--label">{labelName}</label>
            {touched && error && <div className="admin__page__login--invalid">{error}</div>}
            {validError && <div className="admin__page__login--invalid">Email or password is incorrect, try again</div>}
        </div>
    );
}

export default InputAdminLogin;
