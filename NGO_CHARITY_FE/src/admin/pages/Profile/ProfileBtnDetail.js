import { Fragment, useState } from 'react';

import { ModalComponent } from '~/admin/components';
import InputToolTip from '~/admin/components/TippyTooltip/InputToolTip';
import getAvatar from '~/admin/utils/GetAvatar';

function ProfileBtnDetail({ getInfoUser }) {
    const [showModal, setShowModal] = useState(false);

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    return (
        <Fragment>
            <InputToolTip
                content="Infor User"
                placement="left"
                classBtn="btn-info"
                icon="fa-solid fa-circle-info"
                openModal={openModal}
            />
            <ModalComponent showModal={showModal} closeModal={closeModal} contentLabel="Infor Admin">
                {getInfoUser && (
                    <div className="container rounded bg-white  profile__pages_detail--wrapper">
                        <div className="row">
                            <div className="col-md-4 border-right">
                                <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                                    <img
                                        className="rounded-circle mt-5 profile__pages_detail--wrapper-img"
                                        alt=""
                                        src={getAvatar(getInfoUser.image)}
                                    />
                                    <span className="font-weight-bold">{getInfoUser.role}</span>
                                    <span className="font-weight-bold mt-2" style={{ fontSize: '20px' }}>
                                        {getInfoUser.name}
                                    </span>
                                    <span className="text-black-50" style={{ fontSize: '20px' }}>
                                        {getInfoUser.email}
                                    </span>
                                </div>
                            </div>
                            <div className="col-md-8 border-right">
                                <div>
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <h4 className="text-right">Profile User</h4>
                                    </div>

                                    <div className="row mt-2">
                                        <div className="col-md-4">
                                            <label className="profile__pages_detail--labels mt-2">Address:</label>
                                        </div>
                                        <div className="col-md-8">
                                            <input
                                                type="text"
                                                className="form-control profile__pages_detail--form-control"
                                                value={getInfoUser.address ? getInfoUser.address : 'Chưa có'}
                                                readOnly
                                            />
                                        </div>
                                    </div>

                                    <div className="row mt-2">
                                        <div className="col-md-4">
                                            <label className="profile__pages_detail--labels mt-2">Phone:</label>
                                        </div>
                                        <div className="col-md-8">
                                            <input
                                                type="text"
                                                className="form-control profile__pages_detail--form-control"
                                                value={getInfoUser.phone ? getInfoUser.phone : 'Chưa có'}
                                                readOnly
                                            />
                                        </div>
                                    </div>

                                    <div className="row mt-2">
                                        <div className="col-md-4">
                                            <label className="profile__pages_detail--labels mt-2">Region:</label>
                                        </div>
                                        <div className="col-md-8">
                                            <input
                                                type="text"
                                                className="form-control profile__pages_detail--form-control"
                                                value={getInfoUser.region ? getInfoUser.region : 'Chưa có'}
                                                readOnly
                                            />
                                        </div>
                                    </div>

                                    <div className="mt-5 text-center">
                                        <button
                                            onClick={closeModal}
                                            className="btn profile__pages_detail--profile-button"
                                            type="button"
                                        >
                                            Close Profile
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </ModalComponent>
        </Fragment>
    );
}

export default ProfileBtnDetail;
