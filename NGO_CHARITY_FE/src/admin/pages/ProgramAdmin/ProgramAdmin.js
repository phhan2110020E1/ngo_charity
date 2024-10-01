/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ToastError, getListCategory, getListProgram } from '~/admin/utils';
import { ModalComponent } from '~/admin/components';
import { PathAdmin } from '~/routers/PathAdmin';
import ListProgram from './ListProgram';
import CreateProgram from './CreateProgram';
import Loading from '~/admin/components/Loading/Loading';

function ProgramAdmin(props) {
    const [showModal, setShowModal] = useState(false);
    const [listProgram, setListProgram] = useState([]);
    const [listCategory, setListCategory] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    const navigate = useNavigate();

    const fetchApiProgram = () => {
        setIsLoading(true);
        try {
            getListProgram()
                .then((result) => {
                    if (result.status === 200) {
                        setTimeout(() => {
                            setListProgram(result.data);
                            setIsLoading(false);
                        }, 1500);
                    }
                })
                .catch((error) => {
                    if (error.message === 'Network Error') {
                        navigate(`../${PathAdmin.adminNotFound}`);
                    } else {
                        const errorValid = error.response.data; // {status, message}
                        if (errorValid.status === 404) {
                            ToastError(errorValid.message);
                        }
                    }
                });
        } catch (error) {
            console.log(error);
        }
    };

    const fetchApiCategory = () => {
        setIsLoading(true);
        try {
            getListCategory()
                .then((result) => {
                    if (result.status === 200) {
                        setTimeout(() => {
                            setListCategory(result.data);
                            setIsLoading(false);
                        }, 1500);
                    }
                })
                .catch((error) => {
                    if (error.message === 'Network Error') {
                        navigate(`../${PathAdmin.adminNotFound}`);
                    } else {
                        const errorValid = error.response.data; // {status, message}
                        if (errorValid.status === 404) {
                            ToastError(errorValid.message);
                        }
                    }
                });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchApiCategory();
            fetchApiProgram();
            setIsLoading(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="admin__pages__content-page--card" style={{ minHeight: '500px' }}>
            <div className="card-body">
                <div className="card-title">
                    <h4>Program admin</h4>
                </div>

                <button
                    type="button"
                    className="btn mb-1 btn-info"
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title="add account"
                    onClick={openModal}
                >
                    <i className="fa-solid fa-plus"></i>
                </button>

                <ModalComponent showModal={showModal} closeModal={closeModal} contentLabel="Create Admin">
                    <CreateProgram listCategory={listCategory} closeModal={closeModal} fetchApiProgram={fetchApiProgram} />
                </ModalComponent>

                <Loading fetchApi={fetchApiProgram} listFetchApi={listProgram} isLoading={isLoading} setIsLoading={setIsLoading}>
                    <ListProgram
                        listCategory={listCategory}
                        fetchApiProgram={fetchApiProgram}
                        listProgram={listProgram}
                        setListProgram={setListProgram}
                    />
                </Loading>
            </div>
        </div>
    );
}

export default ProgramAdmin;
