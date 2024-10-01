import React from 'react';

function InputCreateAdmin({ labelInput, nameInput, touched, error, typeInput = 'text', ...props }) {
    return (
        <div className="form-group row">
            <label className="col-lg-4 col-form-label" htmlFor="val-username">
                {labelInput} <span className="text-danger">*</span>
            </label>
            <div className="col-lg-6">
                <input
                    type={typeInput}
                    className="form-control"
                    id="val-username"
                    name={nameInput}
                    autoComplete="off"
                    {...props}
                    //placeholder="Enter username"
                    // onChange={fmk.handleChange}
                    // value={fmk.values.name}
                    // touched={fmk.touched.name}
                    // error={fmk.errors.name}
                    // {...fmk.getFieldProps('name')}
                />
                {touched && error && <div>{error}</div>}
            </div>
        </div>
    );
}

export default InputCreateAdmin;
