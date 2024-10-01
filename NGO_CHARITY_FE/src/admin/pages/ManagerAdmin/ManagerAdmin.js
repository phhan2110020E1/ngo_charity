/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from 'react-cssfx-loading';
import InfiniteScroll from 'react-infinite-scroll-component';

import { ModalComponent } from '~/admin/components';
import { ToastError, getListAdmin } from '~/admin/utils';
import { PathAdmin } from '~/routers/PathAdmin';
import CreateAdmin from './CreateAdmin';
import ListAdmin from './ListAdmin';

function ManagerAdmin(props) {
    const [showModal, setShowModal] = useState(false);
    const [listAdmin, setListAdmin] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    const navigate = useNavigate();

    const fetchApiListAdmin = () => {
        setIsLoading(true);
        try {
            getListAdmin()
                .then((result) => {
                    if (result.status === 200) {
                        setTimeout(() => {
                            setListAdmin(result.data);
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
        fetchApiListAdmin();
    }, []);

    return (
        <div className="admin__pages__content-page--card" style={{ minHeight: '500px' }}>
            <div className="card-body">
                <div className="card-title">
                    <h4>Manager Admin</h4>
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
                    <CreateAdmin closeModal={closeModal} listAdmin={listAdmin} fetchApiListAdmin={fetchApiListAdmin} />
                </ModalComponent>

                {isLoading ? (
                    <div style={{ textAlign: 'center', marginTop: '200px', fontSize: 50 }}>
                        <CircularProgress />
                        <h4>Loading ...</h4>
                    </div>
                ) : (
                    <InfiniteScroll
                        dataLength={listAdmin.length}
                        next={fetchApiListAdmin}
                        hasMore={false}
                        endMessage={<p>No more data to load.</p>}
                    >
                        <ListAdmin listAdmin={listAdmin} setListAdmin={setListAdmin} />
                    </InfiniteScroll>
                )}
            </div>
        </div>
    );
}

export default ManagerAdmin;
