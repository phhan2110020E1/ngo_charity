import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { renderToString } from 'react-dom/server';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { SendEmail, resetPassword } from '~/admin';
import { PathUser } from '~/routers/PathUser';
import InputUser from './InputUser';
import EmailResetPassword from '~/user/components/Email/EmailResetPassword';

function ForgetPassword(props) {
    const emailRegex = '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$';
    const [showResetPassEmail, setShowResetPassEmail] = useState(false);
    const [showResetPassErrorEmail, setShowResetPassErrorEmail] = useState(false);

    const navigate = useNavigate();

    const initLoginFomik = {
        email: '',
    };

    const onSubmit = async (data) => {
        const dataValid = await validateData(data);
        const emailContent = renderToString(<EmailResetPassword />);

        try {
            resetPassword(dataValid.email)
                .then((result) => {
                    if (result.status === 200) {
                        const emailDataToSend = {
                            toMail: dataValid.email,
                            subject: 'Confirm reset password',
                            body: emailContent,
                        };
                        return SendEmail(emailDataToSend);
                    }
                })
                .then((result) => {
                    setShowResetPassEmail(true);
                })
                .catch((error) => {
                    if (error.message === 'Network Error') {
                        navigate(`../${PathUser.userNotFound}`);
                    } else {
                        const errorValid = error.response.data;
                        if (errorValid.status === 400) {
                            setShowResetPassErrorEmail(true);
                        }
                    }
                });
        } catch (error) {
            console.log(error);
        }
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string().required('Email is required').matches(emailRegex, 'abc@gmail.com....'),
    });

    const validateData = async (data) => {
        try {
            // Loại bỏ khoảng trắng đầu và cuối của input name trước khi xác nhận
            const cleanedData = {
                ...data,
                email: data.email.trim(),
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

    useEffect(() => {
        setShowResetPassEmail(false);
        setShowResetPassErrorEmail(false);
    }, [fomik.values]);

    return (
        <div className="user__pages__form">
            <div className="user__pages__form--section">
                <div className="container">
                    <div className="row user__pages__form--full-height justify-content-center">
                        <div className="col-12 text-center align-self-center py-5">
                            <div className="user__pages__form--section pb-5 pt-5 pt-sm-2 text-center">
                                <div className="user__pages__form--card-3d-wrap mx-auto">
                                    <div className="user__pages__form--card-3d-wrapper">
                                        <div
                                            className="user__pages__form__login--card-front"
                                            style={{ backgroundColor: '#6fc4e8b3', height: 370 }}
                                        >
                                            <div className="user__pages__form--center-wrap">
                                                <div className="user__pages__form--section text-center">
                                                    {showResetPassEmail && (
                                                        <div
                                                            className="user__pages__form--section-email"
                                                            style={{ color: 'red' }}
                                                        >
                                                            Please go to your email to get the password
                                                        </div>
                                                    )}
                                                    <form onSubmit={fomik.handleSubmit} method="post">
                                                        <h4 className="mb-4 pb-3 user__pages__form--h4">
                                                            Forget Password
                                                        </h4>

                                                        <InputUser
                                                            showResetPassErrorEmail={showResetPassErrorEmail}
                                                            icon="uil uil-at"
                                                            placeholder="Email"
                                                            inputName="email"
                                                            onChange={fomik.handleChange}
                                                            value={fomik.values.email}
                                                            touched={fomik.touched.email}
                                                            error={fomik.errors.email}
                                                            {...fomik.getFieldProps('email')}
                                                        />

                                                        <button type="submit" className="user__pages__form--btn mt-4">
                                                            Change Password
                                                        </button>
                                                    </form>
                                                    <div className="user__pages__form--back-home">
                                                        <Link
                                                            to={`../${PathUser.userLogin}`}
                                                            className="user__pages__form--btn mt-4"
                                                            style={{ borderRadius: 40 }}
                                                        >
                                                            <i className="fa-solid fa-right-to-bracket fa-rotate-180 user__pages__form--back-home-icon"></i>
                                                            Back to Login
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForgetPassword;
