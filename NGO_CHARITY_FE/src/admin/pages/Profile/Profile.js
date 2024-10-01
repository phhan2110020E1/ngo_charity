/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ToastError, getUser } from '~/admin/utils';
import { PathAdmin } from '~/routers/PathAdmin';
import AuthenticateAdmin from '~/admin/utils/AuthenticateAdmin';
import ProfileBtn from './ProfileBtn';
import getAvatar from '~/admin/utils/GetAvatar';
import './Profile.css';

function Profile(props) {
    const { inforUser } = AuthenticateAdmin;
    const [getInfoUser, setGetInfoUser] = useState({});

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
                        console.log(error);
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
        <div className="admin__pages__content-page--card" style={{ minHeight: '500px' }}>
            <div className="admin__pages__profile--wrapper">
                <div>
                    {inforUser && getInfoUser && (
                        <div className="admin__pages__profile--wrapper-content">
                            <img alt="" className="admin__pages__profile--wrapper-content-img" src={getAvatar(getInfoUser.image)} />
                            <span className="font-weight-bold">{getInfoUser.role}</span>
                            <span className="font-weight-bold mt-2" style={{ fontSize: '20px' }}>
                                {getInfoUser.name}
                            </span>
                            <span className="text-black-50" style={{ fontSize: '20px' }}>
                                {getInfoUser.email}
                            </span>

                            <ProfileBtn getInfoUser={getInfoUser} fetchApiGetUser={fetchApiGetUser} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Profile;
