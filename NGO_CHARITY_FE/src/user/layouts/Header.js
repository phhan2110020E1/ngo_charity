/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { PathUser } from '../../routers/PathUser';
import { useLoginStore } from '~/admin/stores';
import { useDataStoreUser } from '../stores';
import AuthenticateAdmin from '~/admin/utils/AuthenticateAdmin';
import getAvatar from '~/admin/utils/GetAvatar';
import './Layouts.css';

function Header(props) {
    const [open, setOpen] = useState(false);
    const { checkInfoUser, setCheckInfoUser } = useLoginStore();
    const { inforUser } = AuthenticateAdmin;
    const isInforUser = !!inforUser || checkInfoUser;
    const navigate = useNavigate();

    const { getInfoUser } = useDataStoreUser();

    let menuRef = useRef();

    useEffect(() => {
        let handler = (e) => {
            if (isInforUser && !menuRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);

        return () => {
            document.removeEventListener('mousedown', handler);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('inforUser');
        setCheckInfoUser(null);
        window.location.reload();
    };

    const handleDonate = () => {
        navigate(`../${PathUser.userDonationMoney}`, { state: { program_id: { title: '', id: null } } });
    };

    return (
        <header className="continer-fluid ">
            <div className="header-top">
                <div className="container">
                    <div className="row col-det">
                        <div className="col-lg-6 d-none d-lg-block">
                            <ul className="ulleft">
                                <li>
                                    <i className="far fa-envelope"></i>
                                    sales@smarteyeapps.com
                                    <span>|</span>
                                </li>
                                <li>
                                    <i className="fas fa-phone-volume"></i>
                                    +876 987 666 5433
                                </li>
                            </ul>
                        </div>
                        <div className="col-lg-3 col-md-6 folouws">
                            <ul className="ulright">
                                <li>
                                    {' '}
                                    <small>Folow Us </small>:
                                </li>
                                <li>
                                    <i className="fab fa-facebook-square"></i>
                                </li>
                                <li>
                                    <i className="fab fa-twitter-square"></i>
                                </li>
                                <li>
                                    <i className="fab fa-instagram"></i>
                                </li>
                                <li>
                                    <i className="fab fa-linkedin"></i>
                                </li>
                            </ul>
                        </div>
                        <div className="col-lg-3 d-none d-md-block col-md-6 btn-bhed">
                            <button onClick={handleDonate} className="btn btn-sm btn-success">
                                Donate
                            </button>

                            {isInforUser ? (
                                <div className="user__header--header-right " ref={menuRef}>
                                    <div onClick={() => setOpen(!open)}>
                                        <img className="user__layouts__header--header--menu-trigger-img" src={getAvatar(getInfoUser.image)} alt="" />
                                    </div>
                                    <div className={`user__layouts__header--header--dropdown-menu ${open ? 'active' : 'inactive'}`}>
                                        <ul style={{ textAlign: 'center' }}>
                                            <li className="user__layouts__header--header--dropdownItem">
                                                <i className="fa-regular fa-circle-user"></i>
                                                <Link to={PathUser.userProfile}>Profile</Link>
                                            </li>
                                            <li className="user__layouts__header--header--dropdownItem" onClick={handleLogout}>
                                                <i className="fa-solid fa-arrow-right-to-bracket fa-rotate-180"></i>
                                                <a>Logout</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            ) : (
                                <Link to={PathUser.userLogin} className="btn btn-sm btn-default">
                                    Sign In
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div id="menu-jk" className="header-bottom">
                <div className="container">
                    <div className="row nav-row">
                        <div className="col-lg-3 col-md-12 logo">
                            <a href="index.html">
                                <img src="assets/images/logo.jpg" alt="" />
                            </a>
                            <a data-toggle="collapse" data-target="#menu" href="#menu">
                                <i className="fas d-block d-lg-none  small-menu fa-bars"></i>
                            </a>
                        </div>
                        <div id="menu" className="col-lg-9 col-md-12 d-none d-lg-block nav-col">
                            <ul className="navbad">
                                <li className="nav-item active">
                                    <Link className="nav-link" to={PathUser.user}>
                                        Home
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to={PathUser.userAboutUs}>
                                        About Us
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to={PathUser.userOutPartner}>
                                        Out Partners
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Link className="nav-link" to={PathUser.userDonate}>
                                        Donate
                                    </Link>
                                </li>
                                {/* <li className="nav-item">
                                    <Link className="nav-link" to={PathUser.userAboutUs}>Blog</Link>
                                </li> */}
                                <li className="nav-item">
                                    <Link className="nav-link" to={PathUser.userHelp}>
                                        Help Centre
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
