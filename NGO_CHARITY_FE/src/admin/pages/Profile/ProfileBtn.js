import ProfileBtnDetail from './ProfileBtnDetail';
import ProfileBtnChangePass from './ProfileBtnChangePass';
import ProfileBtnEdit from './ProfileBtnEdit';

function ProfileBtn({ getInfoUser, fetchApiGetUser }) {
    return (
        <div className="mt-3 admin__pages__profile--wrapper-content-btn">
            <ProfileBtnDetail getInfoUser={getInfoUser} />
            <ProfileBtnEdit getInfoUser={getInfoUser} fetchApiGetUser={fetchApiGetUser} />
            <ProfileBtnChangePass  getInfoUser={getInfoUser} />
        </div>
    );
}

export default ProfileBtn;
