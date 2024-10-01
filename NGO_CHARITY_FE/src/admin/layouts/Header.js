/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { useLoginStore } from '../stores';
import { PathAdmin } from '~/routers/PathAdmin';
import getAvatar from '../utils/GetAvatar';
import './Layout.css';

function Header({ getInfoUser }) {
    const [open, setOpen] = useState(false);
    const { setCheckLoginToken } = useLoginStore();

    let menuRef = useRef();

    useEffect(() => {
        let handler = (e) => {
            if (!menuRef.current.contains(e.target)) {
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
        setCheckLoginToken(null);
        window.location.reload();
    };

    return (
        <div className="admin__layouts__header--header">
            <div className="admin__layouts__header--header-content admin__layouts__header--clearfix">
                <div className="admin__layouts__header--nav-control">
                    <div className="admin__layouts__header--hamburger">
                        <span className="admin__layouts__header--toggle-icon">
                            <i className="icon-menu"></i>
                        </span>
                    </div>
                </div>

                <div className="header-right" ref={menuRef}>
                    <div onClick={() => setOpen(!open)}>
                        {getInfoUser && (
                            <img
                                className="admin__layouts__header--header--menu-trigger-img"
                                src={getAvatar(getInfoUser.image)}
                                alt=""
                            />
                        )}
                    </div>
                    <div className={`admin__layouts__header--header--dropdown-menu ${open ? 'active' : 'inactive'}`}>
                        <ul>
                            <li className="admin__layouts__header--header--dropdownItem">
                                <i className="fa-regular fa-circle-user"></i>
                                <Link to={PathAdmin.adminProfile}>Profile</Link>
                            </li>
                            <li className="admin__layouts__header--header--dropdownItem" onClick={handleLogout}>
                                <i className="fa-solid fa-arrow-right-to-bracket fa-rotate-180"></i>
                                <a>Logout</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
