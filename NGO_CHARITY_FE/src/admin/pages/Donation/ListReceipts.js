import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { GetAllReceipt, ToastError } from '~/admin/utils';
import { PathAdmin } from '~/routers/PathAdmin';
import UserDonate from './UserDonate';

function ListReceipts({ listProgram, listUserReceipt }) {
    const [listReceiptData, setListReceiptData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        try {
            GetAllReceipt()
                .then((result) => {
                    if (result.status === 200) {
                        setListReceiptData(result.data);
                    }
                })
                .catch((error) => {
                    if (error.message === 'Network Error') {
                        navigate(`../${PathAdmin.adminNotFound}`);
                    } else {
                        const errorValid = error.response.data;
                        if (errorValid.status === 400) {
                            ToastError(errorValid.message);
                        }
                    }
                });
        } catch (error) {
            console.log(error);
        }
    });

    return (
        <div className="row">
            <UserDonate listReceiptData={listReceiptData} listProgram={listProgram} listUserReceipt={listUserReceipt} />
        </div>
    );
}

export default ListReceipts;
