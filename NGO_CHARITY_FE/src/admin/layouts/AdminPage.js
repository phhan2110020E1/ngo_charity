/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { PathAdmin } from '~/routers/PathAdmin';
import { ToastError, getUser } from '../utils';
import { ContentPage } from '../pages';
import AuthenticateAdmin from '../utils/AuthenticateAdmin';
import NavHeader from './NavHeader';
import SideBar from './SideBar';
import Footer from './Footer';
import Header from './Header';

function AdminPage(props) {
    const [getInfoUser, setGetInfoUser] = useState({});

    const { inforUser } = AuthenticateAdmin;

    const navigate = useNavigate();

    const fetchApiGetUser = () => {
        if (inforUser) {
            try {
                getUser(inforUser.email)
                    .then((result) => {
                        if (result.status === 200) {
                            setGetInfoUser(result.data);
                        }
                    })
                    .catch((error) => {
                        if (error.message === 'Network Error') {
                            navigate(`../${PathAdmin.adminNotFound}`);
                        } else {
                            const errorValid = error.response.data;
                            if (errorValid.status === 404) {
                                ToastError(errorValid.message);
                            }
                        }
                    });
            } catch (error) {
                console.log(error);
            }
        }
    };

    useEffect(() => {
        fetchApiGetUser();
    }, []);

    return (
        <Fragment>
            <ToastContainer />

            <div>
                {/* Nav Header */}
                <NavHeader />

                {/* header */}
                <Header getInfoUser={getInfoUser} />

                {/* Side bar */}
                <SideBar />

                {/* Content */}
                <ContentPage />

                {/* Footer */}
                <Footer />
                {/* </div> */}
            </div>
        </Fragment>
    );
}

export default AdminPage;
