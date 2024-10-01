import { useEffect, useState } from 'react';
import { renderToString } from 'react-dom/server';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import { RegisterModel, SendEmail } from '~/admin';
import { PathUser } from '~/routers/PathUser';
import InputUser from './InputUser';
import EmailPage from '~/user/components/Email/EmailPage';

function RegisterUserModel(props) {
    const [showRole, setShowRole] = useState('Personal');
    const [showRegisterEmail, setShowRegisterEmail] = useState(false);
    const [showRegisterError, setShowRegisterError] = useState(false);

    const emailRegex = '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$';

    const navigate = useNavigate();

    const initLoginFomik = {
        name: '',
        email: '',
        password: '',
        role: showRole,
    };

    const onSubmit = async (data) => {
        const dataValid = await validateData(data);
        const emailContent = renderToString(<EmailPage />);

        try {
            RegisterModel(dataValid)
                .then((result) => {
                    console.log(result);
                    if (result.status === 201) {
                        fomik.resetForm();
                        const emailDataToSend = {
                            toMail: dataValid.email,
                            subject: 'Confirm Register Account',
                            body: emailContent,
                        };
                        return SendEmail(emailDataToSend);
                    }
                })
                .then((result) => {
                    setShowRegisterEmail(true);
                })
                .catch((error) => {
                    if (error.message === 'Network Error') {
                        navigate(`../${PathUser.userNotFound}`);
                    } else {
                        const errorValid = error.response.data;
                        if (errorValid.status === 400) {
                            setShowRegisterError(true);
                        }
                    }
                });
        } catch (error) {
            console.log(error);
        }
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        password: Yup.string().required('Password is required'),
        email: Yup.string().required('Email is required').matches(emailRegex, 'abc@gmail.com....'),
    });

    const validateData = async (data) => {
        try {
            // Loại bỏ khoảng trắng đầu và cuối của input name trước khi xác nhận
            const cleanedData = {
                ...data,
                name: data.name.trim(),
                password: data.password.trim(),
                email: data.email.trim(),
                role: showRole,
            };

            // Xác nhận dữ liệu với schema
            await validationSchema.validate(cleanedData, { abortEarly: false });
            return cleanedData;
        } catch (errors) {
            console.log('Validation failed', errors);
        }
    };

    const fomik = useFormik({
        initialValues: initLoginFomik,
        onSubmit,
        validationSchema,
    });

    const handleShowRole = (e) => {
        fomik.resetForm();
        fomik.values.role = e.target.value;
        setShowRole(e.target.value);
    };

    useEffect(() => {
        setShowRegisterEmail(false);
        setShowRegisterError(false);
    }, [fomik.values]);

    return (
        <div className="user__pages__form__register--card-back">
            <div className="user__pages__form--center-wrap">
                <div className="user__pages__form--section text-center">
                    {showRegisterEmail && (
                        <div className="user__pages__form--section-email">
                            Create successful, please go to Email to confirm
                        </div>
                    )}
                    <form onSubmit={fomik.handleSubmit} method="post">
                        <h4 className="mb-2 pb-2 user__pages__form--h4">Sign Up</h4>

                        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    value="Personal"
                                    onChange={handleShowRole}
                                    checked={showRole === 'Personal'}
                                    id="Personal"
                                />
                                <label className="form-check-label" htmlFor="Personal">
                                    Personal
                                </label>
                            </div>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    value="Organization"
                                    onChange={handleShowRole}
                                    checked={showRole === 'Organization'}
                                    id="Organization"
                                />
                                <label className="form-check-label" htmlFor="Organization">
                                    Company
                                </label>
                            </div>
                        </div>

                        <InputUser
                            icon="uil uil-user"
                            placeholder={showRole === 'Personal' ? 'Full Name' : 'Your company'}
                            inputName="name"
                            onChange={fomik.handleChange}
                            value={fomik.values.name}
                            touched={fomik.touched.name}
                            error={fomik.errors.name}
                            {...fomik.getFieldProps('name')}
                        />
                        <InputUser
                            showRegisterError={showRegisterError}
                            icon="uil uil-at"
                            placeholder={showRole === 'Personal' ? 'Email' : 'Email company'}
                            inputName="email"
                            onChange={fomik.handleChange}
                            value={fomik.values.email}
                            touched={fomik.touched.email}
                            error={fomik.errors.email}
                            {...fomik.getFieldProps('email')}
                        />
                        <InputUser
                            icon="uil uil-lock-alt"
                            placeholder="Password"
                            inputType="password"
                            inputName="password"
                            onChange={fomik.handleChange}
                            value={fomik.values.password}
                            touched={fomik.touched.password}
                            error={fomik.errors.password}
                            {...fomik.getFieldProps('password')}
                        />

                        <button type="submit" className="user__pages__form--btn mt-4">
                            Register
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default RegisterUserModel;
