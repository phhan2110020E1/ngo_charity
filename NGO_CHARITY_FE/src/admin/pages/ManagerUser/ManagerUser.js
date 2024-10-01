/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ToastError, getListUser } from '~/admin/utils';
import { PathAdmin } from '~/routers/PathAdmin';
import ListUser from './ListUser';
import Loading from '~/admin/components/Loading/Loading';

function ManagerUser(props) {
    const [listUser, setListUser] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();

    const fetchApiListUser = () => {
        try {
            getListUser()
                .then((result) => {
                    if (result.status === 200) {
                        setListUser(result.data);
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
            fetchApiListUser();
            setIsLoading(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="admin__pages__content-page--card" style={{ minHeight: '500px' }}>
            <div className="card-body">
                <div className="card-title">
                    <h4>Manager User</h4>
                </div>

                <Loading fetchApi={fetchApiListUser} listFetchApi={listUser} isLoading={isLoading} setIsLoading={setIsLoading}>
                    <ListUser listUser={listUser} setListUser={setListUser} fetchApiListUser={fetchApiListUser} />
                </Loading>
            </div>
        </div>
    );
}

export default ManagerUser;
