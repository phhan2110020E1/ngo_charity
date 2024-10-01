/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getUser } from '~/admin';
import { PathUser } from '~/routers/PathUser';
import AuthenticateAdmin from '~/admin/utils/AuthenticateAdmin';

export const DataContext = createContext();

function DataProvider({ children }) {
    const { inforUser } = AuthenticateAdmin;
    const [getInfoUser, setGetInfoUser] = useState({});

    const navigate = useNavigate();

    const fetchApiGetUser = () => {
        if (inforUser) {
            try {
                getUser(inforUser.email)
                    .then((result) => {
                        if (result.status === 200) {
                            setGetInfoUser(result.data);
                        }
                    })
                    .catch((error) => {
                        if (error.message === 'Network Error') {
                            navigate(PathUser.user);
                        } else {
                            const errorValid = error.response.data;
                            if (errorValid.status === 404) {
                                navigate(`../${PathUser.userNotFound}`);
                            }
                        }
                    });
            } catch (error) {
                console.log(error);
            }
        }
    };

    useEffect(() => {
        fetchApiGetUser();
    }, []);

    const valueProvider = {
        getInfoUser,
    };

    return <DataContext.Provider value={valueProvider}>{children}</DataContext.Provider>;
}

export default DataProvider;
