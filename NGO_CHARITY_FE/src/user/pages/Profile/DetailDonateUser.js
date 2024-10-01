import { Fragment, useState } from 'react';

import { ModalComponent } from '~/admin/components';

function DetailDonateUser({ item }) {
    const [showModal, setShowModal] = useState(false);
    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    return (
        <Fragment>
            <button
                type="button"
                className="btn mb-1 ml-2 btn-outline-info"
                data-toggle="tooltip"
                data-placement="bottom"
                title="detail donate user"
                onClick={openModal}
            >
                <i className="fa-solid fa-circle-info"></i>
            </button>

            <ModalComponent showModal={showModal} closeModal={closeModal} contentLabel="Infor Admin">
                {item && (
                    <div className="container rounded bg-white  profile__pages_detail--wrapper">
                        <div className="d-flex justify-content-between align-items-center">
                            <h4 className="text-right">Detail User Donate</h4>
                        </div>
                        <div className="row">
                            <div className="col-md-7">
                                <div className="col-md-12">
                                    <div className="col-md-12 text-left">
                                        <label className="profile__pages_detail--labels ">Name</label>
                                    </div>
                                    <div className="col-md-12">
                                        <input
                                            type="text"
                                            name="categoryId"
                                            className="form-control profile__pages_detail--form-control"
                                            defaultValue={item.name}
                                            readOnly
                                        />
                                    </div>
                                </div>

                                <div className="col-md-12 ">
                                    <div className="col-md-12 text-left">
                                        <label className="profile__pages_detail--labels">Title</label>
                                    </div>
                                    <div className="col-md-12">
                                        <input
                                            type="text"
                                            name="categoryId"
                                            className="form-control profile__pages_detail--form-control"
                                            defaultValue={item.programName}
                                            readOnly
                                        />
                                    </div>
                                </div>

                                <div className="col-md-12 ">
                                    <div className="col-md-12 text-left">
                                        <label className="profile__pages_detail--labels">Create at</label>
                                    </div>
                                    <div className="col-md-12">
                                        <input
                                            type="text"
                                            className="form-control profile__pages_detail--form-control"
                                            defaultValue={item.createdAt}
                                            readOnly
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-5 border-right">
                                <div className="col-md-12 text-left">
                                    <div className="col-md-12 text-left">
                                        <label className="profile__pages_detail--labels ">Money: </label>
                                    </div>
                                    <div className="col-md-12">
                                        <input
                                            type="text"
                                            className="form-control profile__pages_detail--form-control"
                                            defaultValue={item.money}
                                            readOnly
                                        />
                                    </div>
                                </div>
                                <div className="col-md-12 text-left">
                                    <div className="col-md-12 text-left">
                                        <label className="profile__pages_detail--labels">Status: </label>
                                    </div>
                                    <div className="col-md-12">
                                        <input
                                            type="text"
                                            name="categoryId"
                                            className="form-control profile__pages_detail--form-control"
                                            defaultValue={item.status}
                                            readOnly
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="row">
                                        <div className="col-md-12" style={{ textAlign: 'left' }}>
                                            <label className="profile__pages_detail--labels">Description:</label>
                                        </div>
                                        <div className="col-md-12">
                                            <textarea
                                                type="text"
                                                rows="4"
                                                name="description"
                                                placeholder="Enter description"
                                                className="form-control profile__pages_detail--form-control"
                                                defaultValue={item.description ? item.description : 'Chưa có'}
                                                readOnly
                                            ></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-5 text-center">
                            <button className="btn profile__pages_detail--profile-button" type="submit" onClick={closeModal}>
                                Closed Profile
                            </button>
                        </div>
                    </div>
                )}
            </ModalComponent>
        </Fragment>
    );
}

export default DetailDonateUser;
