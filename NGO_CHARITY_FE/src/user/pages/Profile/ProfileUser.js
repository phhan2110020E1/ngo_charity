/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useDataStoreUser } from '~/user/stores';
import { PathUser } from '~/routers/PathUser';
import getAvatar from '~/admin/utils/GetAvatar';
import ProfileBtn from './ProfileBtn';
import ProfileBtnDetail from './ProfileBtnDetail';
import ProfileBtnEdit from './ProfileBtnEdit';
import ProfileBtnChangePass from './ProfileBtnChangePass';
import AuthenticateAdmin from '~/admin/utils/AuthenticateAdmin';
import './Profile.css';
import ProfileBtnDonate from './ProfileBtnDonate';

function ProfileUser(props) {
    const [activeBtnProfile, setActiveBtnProfile] = useState(1);
    const { getInfoUser } = useDataStoreUser();
    const { inforUser } = AuthenticateAdmin;

    const location = useLocation();
    const navigate = useNavigate();
    let isRanker;

    switch (true) {
        case getInfoUser.rank > 100000:
            isRanker = 'Vàng';
            break;
        case getInfoUser.rank > 10000:
            isRanker = 'Bạc';
            break;
        case getInfoUser.rank > 1000:
            isRanker = 'Đồng';
            break;
        default:
            isRanker = 'Chưa có';
            break;
    }

    useEffect(() => {
        if (!inforUser && location.pathname === '/profile') {
            navigate(`../${PathUser.user}`);
        }
    }, [!inforUser, location.pathname]);

    return (
        <div>
            <div className="page-nav no-margin row">
                <div className="container">
                    <div className="row">
                        <h2>Profile Settings</h2>
                    </div>
                </div>
            </div>

            <div className="about-us container-fluid">
                <div className="container">
                    <div className="row natur-row no-margin w-100">
                        <div className="text-part col-md-4">
                            <div className="user__pages__profile--wrapper">
                                <div>
                                    {getInfoUser && (
                                        <div className="user__pages__profile--wrapper-content">
                                            <img alt="" className="user__pages__profile--wrapper-content-img" src={getAvatar(getInfoUser.image)} />
                                            <span className="font-weight-bold mt-2" style={{ fontSize: '20px' }}>
                                                {getInfoUser.name}
                                            </span>
                                            <span className="text-black-50" style={{ fontSize: '20px' }}>
                                                {getInfoUser.email}
                                            </span>
                                            <span className="font-weight-bold">
                                                Rank: {isRanker} - {getInfoUser.rank}$
                                            </span>
                                            <ProfileBtn setActiveBtnProfile={setActiveBtnProfile} />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="image-part col-md-8">
                            <div className="about-quick-box row">
                                <div className="about-qcard" style={{ width: 800 }}>
                                    {activeBtnProfile === 1 && <ProfileBtnDetail getInfoUser={getInfoUser} />}

                                    {activeBtnProfile === 2 && <ProfileBtnEdit getInfoUser={getInfoUser} />}

                                    {activeBtnProfile === 3 && <ProfileBtnDonate getInfoUser={getInfoUser} />}

                                    {activeBtnProfile === 4 && <ProfileBtnChangePass getInfoUser={getInfoUser} />}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileUser;
