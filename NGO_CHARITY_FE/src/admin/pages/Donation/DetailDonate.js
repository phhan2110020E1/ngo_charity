import { Fragment, useState } from 'react';

import { ModalComponent } from '~/admin/components';
import InputToolTip from '~/admin/components/TippyTooltip/InputToolTip';

function DetailDonate({ receipt, userName, programTitle }) {
    const [showModal, setShowModal] = useState(false);

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    const formattedValue = `${receipt.money.toLocaleString('en-US')} $`;

    return (
        <Fragment>
            <InputToolTip content="detail" placement="right" classBtn="btn-info" icon="fa-solid fa-circle-info" openModal={openModal} />
            <ModalComponent showModal={showModal} closeModal={closeModal} contentLabel="Infor Admin">
                <div className="container rounded bg-white  profile__pages_detail--wrapper">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h4 className="text-right">Detail Donate</h4>
                    </div>
                    <div className="row">
                        <div className="col-md-6 border-right">
                            <div>
                                <div className="row mt-2">
                                    <div className="col-md-4">
                                        <label className="profile__pages_detail--labels mt-2">User:</label>
                                    </div>
                                    <div className="col-md-8">
                                        <input type="text" className="form-control profile__pages_detail--form-control" value={userName} readOnly />
                                    </div>
                                </div>

                                <div className="row mt-2">
                                    <div className="col-md-4">
                                        <label className="profile__pages_detail--labels mt-2">Program:</label>
                                    </div>
                                    <div className="col-md-8">
                                        <input
                                            type="text"
                                            className="form-control profile__pages_detail--form-control"
                                            value={programTitle}
                                            readOnly
                                        />
                                    </div>
                                </div>

                                <div className="row mt-2">
                                    <div className="col-md-4">
                                        <label className="profile__pages_detail--labels mt-2">Money:</label>
                                    </div>
                                    <div className="col-md-8">
                                        <input
                                            type="text"
                                            className="form-control profile__pages_detail--form-control"
                                            value={formattedValue}
                                            readOnly
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div>
                                <div className="row mt-2">
                                    <div className="col-md-12" style={{ textAlign: 'left' }}>
                                        <label className="profile__pages_detail--labels mt-2">Description:</label>
                                    </div>
                                    <div className="col-md-12">
                                        <textarea
                                            type="text"
                                            className="form-control profile__pages_detail--form-control"
                                            rows="8"
                                            defaultValue={receipt.description}
                                            readOnly
                                        ></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-5 text-center">
                        <button onClick={closeModal} className="btn profile__pages_detail--profile-button" type="button">
                            Close Profile
                        </button>
                    </div>
                </div>
            </ModalComponent>
        </Fragment>
    );
}

export default DetailDonate;
