import { Fragment, useState } from 'react';

import { ModalComponent } from '~/admin/components';
import getAvatar from '~/admin/utils/GetAvatar';

function InforUser({ item, getInfoUser }) {
    const [showModal, setShowModal] = useState(false);
    const [showDataInfor, setShowDataInfor] = useState({});

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    const handleInfor = (item) => {
        openModal();
        setShowDataInfor(item);
    };

    let isRanker;

    switch (true) {
        case showDataInfor.rank > 100000:
            isRanker = 'Vàng';
            break;
        case showDataInfor.rank > 10000:
            isRanker = 'Bạc';
            break;
        case showDataInfor.rank > 1000:
            isRanker = 'Đồng';
            break;
        default:
            isRanker = 'Chưa có';
            break;
    }

    return (
        <Fragment>
            <button
                type="button"
                className="btn mb-1 btn-outline-info"
                data-toggle="tooltip"
                data-placement="bottom"
                title="infor user"
                onClick={() => handleInfor(item)}
            >
                <i className="fa-solid fa-circle-info"></i>
            </button>
            <ModalComponent showModal={showModal} closeModal={closeModal} contentLabel="Infor Admin">
                {showDataInfor && (
                    <div className="container rounded bg-white  profile__pages_detail--wrapper">
                        <div className="row">
                            <div className="col-md-4 border-right">
                                <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                                    <img
                                        className="rounded-circle mt-5 profile__pages_detail--wrapper-img"
                                        alt=""
                                        src={getAvatar(showDataInfor.image)}
                                    />
                                    <span className="font-weight-bold">{showDataInfor.role}</span>
                                    <span className="font-weight-bold">
                                        Rank: {isRanker} - {showDataInfor.rank}$
                                    </span>
                                    <span className="font-weight-bold mt-2" style={{ fontSize: '20px' }}>
                                        {showDataInfor.name}
                                    </span>
                                    <span className="text-black-50" style={{ fontSize: '20px' }}>
                                        {showDataInfor.email}
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
                                                value={showDataInfor.address ? showDataInfor.address : 'Chưa có'}
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
                                                value={showDataInfor.phone ? showDataInfor.phone : 'Chưa có'}
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
                                                value={showDataInfor.region ? showDataInfor.region : 'Chưa có'}
                                                readOnly
                                            />
                                        </div>
                                    </div>

                                    <div className="mt-5 text-center">
                                        <button onClick={closeModal} className="btn profile__pages_detail--profile-button" type="button">
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

export default InforUser;
