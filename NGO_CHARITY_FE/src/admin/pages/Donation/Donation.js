/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { GetListUserReceipt, ToastError, getListProgram } from '~/admin/utils';
import { PathAdmin } from '~/routers/PathAdmin';
import ListReceipts from './ListReceipts';
import Loading from '~/admin/components/Loading/Loading';

function Donation(props) {
    const [listProgram, setListProgram] = useState([]);
    const [listUserReceipt, setListUserReceipt] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();

    const fetchApiProgram = () => {
        try {
            getListProgram()
                .then((result) => {
                    if (result.status === 200) {
                        setListProgram(result.data);
                    }
                })
                .catch((error) => {
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
    };

    const fetchApiUserReceipt = () => {
        try {
            GetListUserReceipt()
                .then((result) => {
                    if (result.status === 200) {
                        setListUserReceipt(result.data);
                    }
                })
                .catch((error) => {
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
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchApiUserReceipt();
            fetchApiProgram();
            setIsLoading(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="admin__pages__content-page--card" style={{ minHeight: '500px' }}>
            <div className="card-body">
                <div className="card-title border-bottom mb-3">
                    <h4>Donation Admin</h4>
                </div>
                <Loading isLoading={isLoading} setIsLoading={setIsLoading} fetchApi={fetchApiUserReceipt} listFetchApi={listUserReceipt}>
                    <ListReceipts listProgram={listProgram} listUserReceipt={listUserReceipt} />
                </Loading>
            </div>
        </div>
    );
}

export default Donation;
