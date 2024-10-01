/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import AuthenticateAdmin from '../utils/AuthenticateAdmin';
import { PathAdmin } from '~/routers/PathAdmin';

function ContentPage(props) {
    const location = useLocation();
    const navigate = useNavigate();

    // not back login page when khi login success
    const { inforUser } = AuthenticateAdmin;
    // const role = inforUser.role;
    useEffect(() => {
        if (!!inforUser && inforUser.role === 'Admin' && location.pathname === '/admin/manager_admin') {
            navigate(`../${PathAdmin.admin}`);
        }
    }, [location.pathname]);

    return (
        <div className="admin__pages__content-page--content-body" style={{ minHeight: 700 }}>
            <div className="container-fluid mt-3">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="row">
                            <div className="col-12">
                                <Outlet />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContentPage;
