import { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ToastError, ToastSuccess, updateUser } from '~/admin/utils';
import { ModalComponent } from '~/admin/components';
import { PathAdmin } from '~/routers/PathAdmin';
import getAvatar from '~/admin/utils/GetAvatar';

function UpdateUser({ item, fetchApiListUser }) {
    const [avatar, setAvatar] = useState();
    const [formData, setFormData] = useState({});

    const [showModal, setShowModal] = useState(false);
    const [showErrorName, setShowErrorName] = useState(false);
    const [showErrorFile, setShowErrorFile] = useState(false);

    const navigate = useNavigate();

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    const handleEdit = (item) => {
        openModal();
        setFormData(item);
    };

    useEffect(() => {
        return () => {
            avatar && URL.revokeObjectURL(avatar.pre);
        };
    }, [avatar]);

    const handleAvatar = (e) => {
        const file = e.target.files[0];

        const allowedFormats = ['image/jpeg', 'image/png', 'image/gif'];
        const fileExtension = file.type;

        if (allowedFormats.includes(fileExtension)) {
            setShowErrorFile(false);
        } else {
            setShowErrorFile(true);
        }

        file.pre = URL.createObjectURL(file);
        setAvatar(file);
        e.target.value = null;
    };

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setShowErrorName(false);
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.name === '') {
            setShowErrorName(true);
        }
        if (showErrorFile || showErrorName) {
            return;
        }
        const formDataValid = new FormData();
        formDataValid.append('Id', formData.id);
        formDataValid.append('Email', formData.email);
        formDataValid.append('Name', formData.name);
        formDataValid.append('Address', formData.address);
        formDataValid.append('Phone', formData.phone);
        formDataValid.append('Region', formData.region);
        formDataValid.append('photo', avatar);

        try {
            updateUser(formData.email, formDataValid)
                .then((result) => {
                    if (result.status === 200) {
                        closeModal();
                        ToastSuccess(result.message);
                        setTimeout(function () {
                            fetchApiListUser();
                        }, 2000);
                    }
                })
                .catch((error) => {
                    console.log(error);
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
    };

    return (
        <Fragment>
            <button
                type="button"
                className="btn mb-1 ml-2 btn-outline-warning"
                data-toggle="tooltip"
                data-placement="bottom"
                title="infor user"
                onClick={() => handleEdit(item)}
            >
                <i className="fa-solid fa-pen-to-square"></i>
            </button>
            <ModalComponent showModal={showModal} closeModal={closeModal} contentLabel="Infor Admin">
                <form onSubmit={handleSubmit} method="post">
                    <div className="container rounded bg-white  profile__pages_detail--wrapper">
                        <div className="row">
                            <div className="col-md-4 border-right">
                                <div className="d-flex flex-column align-items-center text-center p-3">
                                    <img
                                        className="rounded-circle mt-5 profile__pages_detail--wrapper-img"
                                        alt=""
                                        src={getAvatar(formData.image)}
                                    />
                                    <input className="mt-2 mb-2" type="file" name="photo" onChange={handleAvatar} />
                                    {avatar && !showErrorFile && <img width={100} src={avatar.pre} alt="avatar" />}
                                    {showErrorFile && <div className="text-danger">Allow file jpeg, png, gif</div>}
                                </div>
                            </div>

                            <div className="col-md-8 border-right">
                                <div>
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <h4 className="text-right">Update Profile</h4>
                                    </div>

                                    <div className="row mt-2">
                                        <div className="col-md-4">
                                            <label className="profile__pages_detail--labels mt-2">FullName:</label>
                                        </div>
                                        <div className="col-md-8">
                                            <input
                                                type="text"
                                                name="name"
                                                placeholder="Enter fullName"
                                                className="form-control profile__pages_detail--form-control"
                                                onChange={handleChangeInput}
                                                value={formData.name}
                                            />
                                            {showErrorName && (
                                                <p style={{ marginTop: '-20px', textAlign: 'left', color: 'red' }}>
                                                    Name is not required
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="row mt-2">
                                        <div className="col-md-4">
                                            <label className="profile__pages_detail--labels mt-2">Address:</label>
                                        </div>
                                        <div className="col-md-8">
                                            <input
                                                type="text"
                                                name="address"
                                                placeholder="Enter Address"
                                                className="form-control profile__pages_detail--form-control"
                                                onChange={handleChangeInput}
                                                value={formData.address || ''}
                                            />
                                        </div>
                                    </div>

                                    <div className="row mt-2">
                                        <div className="col-md-4">
                                            <label className="profile__pages_detail--labels mt-2">Phone:</label>
                                        </div>
                                        <div className="col-md-8">
                                            <input
                                                type="text"
                                                name="phone"
                                                placeholder="Enter Phone"
                                                className="form-control profile__pages_detail--form-control"
                                                onChange={handleChangeInput}
                                                value={formData.phone || ''}
                                            />
                                        </div>
                                    </div>

                                    <div className="row mt-2">
                                        <div className="col-md-4">
                                            <label className="profile__pages_detail--labels mt-2">Region:</label>
                                        </div>
                                        <div className="col-md-8">
                                            <input
                                                type="text"
                                                name="region"
                                                placeholder="Enter Region"
                                                className="form-control profile__pages_detail--form-control"
                                                onChange={handleChangeInput}
                                                value={formData.region || ''}
                                            />
                                        </div>
                                    </div>

                                    <div className="mt-5 text-center">
                                        <button className="btn profile__pages_detail--profile-button" type="submit">
                                            Saved Profile
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </ModalComponent>
        </Fragment>
    );
}

export default UpdateUser;
