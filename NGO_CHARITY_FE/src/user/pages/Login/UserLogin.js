/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import AuthenticateAdmin from '~/admin/utils/AuthenticateAdmin';
import LoginUserModel from './LoginUserModel';
import RegisterUserModel from './RegisterUserModel';
import { PathUser } from '~/routers/PathUser';
import './UserLogin.css';

function UserLogin(props) {
    const location = useLocation();
    const navigate = useNavigate();

    const { inforUser } = AuthenticateAdmin;
    useEffect(() => {
        if (!!inforUser && location.pathname === `/${PathUser.userLogin}`) {
            navigate(`../${PathUser.user}`);
        }
    }, [!!inforUser, location.pathname]);

    return (
        <div className="user__pages__form">
            <div className="user__pages__form--section">
                <div className="container">
                    <div className="row user__pages__form--full-height justify-content-center">
                        <div className="col-12 text-center align-self-center py-5">
                            <div className="user__pages__form--section pb-5 pt-5 pt-sm-2 text-center">
                                <h6 className="mb-0 pb-3 user__pages__form--h6">
                                    <span className="user__pages__form--span">Log In </span>
                                    <span className="user__pages__form--span">Sign Up</span>
                                </h6>
                                <input
                                    className="user__pages__form--checkbox"
                                    type="checkbox"
                                    id="reg-log"
                                    name="reg-log"
                                />
                                <label htmlFor="reg-log"></label>
                                <div className="user__pages__form--card-3d-wrap mx-auto">
                                    <div className="user__pages__form--card-3d-wrapper">
                                        <LoginUserModel />
                                        <RegisterUserModel />
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

export default UserLogin;
