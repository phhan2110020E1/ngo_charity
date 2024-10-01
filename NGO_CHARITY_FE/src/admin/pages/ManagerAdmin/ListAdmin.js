import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

import { ToastError, ToastSuccess, deleteUser } from '~/admin/utils';
import { PathAdmin } from '~/routers/PathAdmin';
import ResetPassword from './ResetPassword';

function ListAdmin({ listAdmin, setListAdmin }) {
    const navigate = useNavigate();

    const handleDeleteAdmin = (email) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                try {
                    deleteUser(email)
                        .then((result) => {
                            if (result.status === 200) {
                                Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
                                setListAdmin(listAdmin.filter((admin) => admin.email !== email));
                                ToastSuccess(result.message);
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
            }
        });
    };

    return (
        <Fragment>
            {listAdmin.length > 0 ? (
                <div className="table-responsive">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listAdmin.map((item, index) => (
                                <tr key={index}>
                                    <th>{item.id}</th>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>
                                        <ResetPassword email={item.email} />
                                        <button
                                            type="button"
                                            className="btn mb-1 ml-2 btn-outline-danger"
                                            data-toggle="tooltip"
                                            data-placement="bottom"
                                            title="delete account"
                                            onClick={() => handleDeleteAdmin(item.email)}
                                        >
                                            <i className="fa-solid fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div>Hiện tại chưa có admin nào</div>
            )}
        </Fragment>
    );
}

export default ListAdmin;
