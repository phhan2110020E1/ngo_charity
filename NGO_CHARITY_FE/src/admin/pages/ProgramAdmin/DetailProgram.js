/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ModalComponent } from '~/admin/components';
import { GetToTalPriceProgramId } from '~/admin/utils';
import { PathAdmin } from '~/routers/PathAdmin';
import AuthenticateAdmin from '~/admin/utils/AuthenticateAdmin';
import InputProgram from './InputProgram';
import CreateCashOut from './CreateCashOut';

function DetailProgram({ item, listCategory }) {
    const [showModal, setShowModal] = useState(false);
    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    const [showTotalProgram, setShowTotalProgram] = useState(null);

    const [showModalCashOut, setShowModalCashOut] = useState(false);
    const openModalCashOut = () => setShowModalCashOut(true);
    const closeModalCashOut = () => setShowModalCashOut(false);

    const { inforUser } = AuthenticateAdmin;

    const navigate = useNavigate();

    const getTotalPriceInProgram = async () => {
        try {
            GetToTalPriceProgramId(item.id)
                .then((result) => {
                    if (result.status === 200) {
                        setShowTotalProgram(result.data);
                    }
                })
                .catch((error) => {
                    if (error.message === 'Network Error') {
                        navigate(`../${PathAdmin.adminNotFound}`);
                    } else {
                        const errorValid = error.response.data; // {status, message}
                        if (errorValid.status === 404) {
                            console.clear();
                            // ToastError(errorValid.message);
                        }
                    }
                });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getTotalPriceInProgram();
    }, []);

    return (
        <Fragment>
            <button
                type="button"
                className="btn mb-1 ml-2 btn-outline-info"
                data-toggle="tooltip"
                data-placement="bottom"
                title="delete account"
                onClick={openModal}
            >
                <i className="fa-solid fa-circle-info"></i>
            </button>

            <ModalComponent showModal={showModal} closeModal={closeModal} contentLabel="Infor Admin">
                {item && (
                    <div className="container rounded bg-white  profile__pages_detail--wrapper">
                        <div className="row">
                            <div className="col-md-3 border-right">
                                <div className="d-flex flex-column align-items-center text-center p-3">
                                    <img className="rounded-circle mt-5 profile__pages_detail--wrapper-img" alt="" src={item.image} />
                                </div>
                                <div>
                                    <span className="font-weight-bold mt-2" style={{ fontSize: '20px' }}>
                                        Total:
                                    </span>
                                    <span className="font-weight-bold mt-2 ml-2" style={{ fontSize: '20px' }}>
                                        {showTotalProgram ? showTotalProgram.money.toLocaleString() : 0} $
                                    </span>
                                    <div className="mt-3 ">
                                        <span
                                            className={`label ${
                                                item.status === 'UP_COMING'
                                                    ? 'label-success'
                                                    : item.status === 'COMING'
                                                    ? 'label-warning'
                                                    : item.status === 'CLOSE'
                                                    ? 'label-danger'
                                                    : ''
                                            }`}
                                        >
                                            {item.status}
                                        </span>
                                    </div>
                                    <div className="col-md-12 mt-3">
                                        {item && item.status === 'CLOSE' && inforUser.role === 'Manager' && (
                                            <button
                                                type="button"
                                                style={{ backgroundColor: '#632778' }}
                                                className="btn mt-3 btn-info border-bottom"
                                                data-toggle="tooltip"
                                                data-placement="bottom"
                                                title="cash out"
                                                onClick={openModalCashOut}
                                            >
                                                <i className="fa-solid fa-money-bill-1-wave mr-2"></i>Cash Out
                                            </button>
                                        )}

                                        <ModalComponent showModal={showModalCashOut} closeModal={closeModalCashOut} contentLabel="Create Cash Out">
                                            <CreateCashOut closeModal={closeModalCashOut} item={item} inforUser={inforUser} />
                                        </ModalComponent>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-5 border-right">
                                <div>
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <h4 className="text-right">Create Program</h4>
                                    </div>

                                    <InputProgram labelName="Title" inputName="title" defaultValue={item.title} readOnly />
                                    <InputProgram labelName="Budget" inputName="budget" inputType="number" value={item.budget} readOnly />

                                    <div className="row mt-2">
                                        <div className="col-md-12 text-left">
                                            <label className="profile__pages_detail--labels mt-2">Category</label>
                                        </div>
                                        <div className="col-md-12">
                                            <input
                                                type="text"
                                                name="categoryId"
                                                className="form-control profile__pages_detail--form-control"
                                                defaultValue={listCategory.find((cate) => cate.id === item.categoryId)?.title}
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-4 border-right">
                                <div>
                                    <div className="row mt-5">
                                        <div className="col-md-12" style={{ textAlign: 'left' }}>
                                            <label className="profile__pages_detail--labels mt-2">Description:</label>
                                        </div>
                                        <div className="col-md-12">
                                            <textarea
                                                type="text"
                                                rows="8"
                                                name="description"
                                                placeholder="Enter description"
                                                className="form-control profile__pages_detail--form-control"
                                                defaultValue={item.description ? item.description : ''}
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

export default DetailProgram;
