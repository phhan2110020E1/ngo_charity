/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { LoginModel } from '~/admin/utils';
import { PathAdmin } from '~/routers/PathAdmin';
import { useLoginStore } from '~/admin/stores';
import InputAdminLogin from './InputAdminLogin';
import AuthenticateAdmin from '~/admin/utils/AuthenticateAdmin';
import './AdminLogin.css';

function AdminLogin(props) {
    const [validError, setValidError] = useState(false);
    const [validErrorRole, setValidErrorRole] = useState(false);
    const { setCheckLoginToken, setCheckRole } = useLoginStore();

    const location = useLocation();
    const navigate = useNavigate();

    // not back login page when khi login success
    const { token } = AuthenticateAdmin;
    useEffect(() => {
        if (!!token && location.pathname === PathAdmin.adminLogin) {
            navigate(`../${PathAdmin.admin}`);
        }
    }, [!!token, location.pathname]);

    const initLoginFomik = {
        email: '',
        password: '',
        role: 'Admin',
    };

    const onSubmit = (data) => {
        console.log(data);
        try {
            LoginModel(data)
                .then((result) => {
                    console.log(result);

                    if (result.status === 200) {
                        localStorage.setItem('token', result.data.token);
                        localStorage.setItem('inforUser', JSON.stringify(result.data.inforUser));
                        fomik.resetForm();
                        setCheckRole(result.data.inforUser.role);
                        setCheckLoginToken(result.data.token);
                        navigate(`../${PathAdmin.admin}`);
                        window.location.reload();
                    }
                })
                .catch((error) => {
                    console.log(error);

                    if (error.message === 'Network Error') {
                        navigate(`../${PathAdmin.adminNotFound}`);
                    } else {
                        const errorValid = error.response.data; // {status, message}
                        if (errorValid.status === 400 && errorValid.message === 'Login fail') {
                            setValidError(true);
                        } else if (
                            errorValid.status === 400 &&
                            errorValid.message ===
                                'This account has not been registered, please contact the manager to get an account'
                        ) {
                            setValidErrorRole(true);
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

    const fomik = useFormik({
        initialValues: initLoginFomik,
        onSubmit,
        validationSchema,
    });

    useEffect(() => {
        setValidError(false);
        setValidErrorRole(false);
    }, [fomik.values]);

    return (
        <section className="admin__page__login">
            <div className="admin__page__login--form-box">
                {validErrorRole && (
                    <div className="admin__page__login--invalid-role">This account has not been registered</div>
                )}
                <div>
                    <form noValidate onSubmit={fomik.handleSubmit} method="post">
                        <h2 className="admin__page__login--form-title">Login</h2>

                        <InputAdminLogin
                            validError={validError}
                            icon="fa-regular fa-envelope"
                            labelName="Email"
                            inputName="email"
                            onChange={fomik.handleChange}
                            value={fomik.values.email}
                            touched={fomik.touched.email}
                            error={fomik.errors.email}
                            {...fomik.getFieldProps('email')}
                        />
                        <InputAdminLogin
                            validError={validError}
                            icon="fa-solid fa-lock"
                            labelName="Password"
                            inputName="password"
                            inputType="password"
                            onChange={fomik.handleChange}
                            value={fomik.values.password}
                            touched={fomik.touched.password}
                            error={fomik.errors.password}
                            {...fomik.getFieldProps('password')}
                        />
                        <button type="submit" className="admin__page__login--button mt-3">
                            Log in
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default AdminLogin;
