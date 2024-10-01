import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import InputUser from './InputUser';
import { PathUser } from '~/routers/PathUser';
import { LoginModel } from '~/admin';
import { useLoginStore } from '~/admin/stores';

function LoginUserModel(props) {
    const [validError, setValidError] = useState(false);
    const { setCheckInfoUser } = useLoginStore();

    const navigate = useNavigate();

    const initLoginFomik = {
        email: '',
        password: '',
    };

    const onSubmit = async (data) => {
        const dataValid = await validateData(data);
        // console.log('sau valid: ', dataValid);

        try {
            LoginModel(dataValid)
                .then((result) => {
                    if (result.status === 200) {
                        localStorage.setItem('token', result.data.token);
                        localStorage.setItem('inforUser', JSON.stringify(result.data.inforUser));
                        fomik.resetForm();
                        setCheckInfoUser(result.data.inforUser);
                        navigate(`../${PathUser.user}`);
                        window.location.reload();
                    }
                })
                .catch((error) => {
                    if (error.message === 'Network Error') {
                        navigate(`../${PathUser.userNotFound}`);
                    } else {
                        const errorValid = error.response.data;
                        if (errorValid.status === 400) {
                            setValidError(true);
                        }
                    }
                });
        } catch (error) {
            console.log(error);
        }
    };

    const validationSchema = Yup.object().shape({
        password: Yup.string().required('Password is required'),
        email: Yup.string().required('Email is required'),
    });

    const validateData = async (data) => {
        try {
            // Loại bỏ khoảng trắng đầu và cuối của input name trước khi xác nhận
            const cleanedData = {
                ...data,
                password: data.password.trim(),
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
        setValidError(false);
    }, [fomik.values]);

    return (
        <div className="user__pages__form__login--card-front">
            <div className="user__pages__form--center-wrap">
                <div className="user__pages__form--section text-center">
                    <form onSubmit={fomik.handleSubmit} method="post">
                        <h4 className="mb-4 pb-3 user__pages__form--h4">Log In</h4>

                        <InputUser
                            validError={validError}
                            icon="uil uil-at"
                            placeholder="Email"
                            marginTop=""
                            inputName="email"
                            onChange={fomik.handleChange}
                            value={fomik.values.email}
                            touched={fomik.touched.email}
                            error={fomik.errors.email}
                            {...fomik.getFieldProps('email')}
                        />
                        <InputUser
                            validError={validError}
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
                            Login
                        </button>
                        <p className="mb-0 mt-4 text-center user__pages__form__login--p">
                            <Link to={`../${PathUser.userForgetPassword}`} className="user__pages__form__login--link">
                                Forgot your password?
                            </Link>
                        </p>
                    </form>
                    <div className="user__pages__form--back-home">
                        <Link to={PathUser.user} className="user__pages__form--btn mt-4" style={{ borderRadius: 40 }}>
                            <i className="fa-solid fa-right-to-bracket fa-rotate-180 user__pages__form--back-home-icon"></i>
                            Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginUserModel;
