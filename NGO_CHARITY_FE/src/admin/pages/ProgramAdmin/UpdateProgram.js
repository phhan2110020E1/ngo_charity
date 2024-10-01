import { Fragment, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import { ToastError, ToastSuccess, updateProgram } from '~/admin/utils';
import { ModalComponent } from '~/admin/components';
import { PathAdmin } from '~/routers/PathAdmin';
import InputProgram from './InputProgram';
import UpdateCheckRadioStatus from './UpdateCheckRadioStatus';

function UpdateProgram({ item, listCategory, fetchApiProgram }) {
    const [showModal, setShowModal] = useState(false);

    const closeModal = () => setShowModal(false);

    const [showErrorFile, setShowErrorFile] = useState(false);
    const [avatar, setAvatar] = useState(null);
    const navigate = useNavigate();

    const initDataFomik = {
        title: '',
        budget: '',
        description: '',
        categoryId: '',
        status: '',
    };

    const onSubmit = (data) => {
        console.log(data);

        const formDataValid = new FormData();
        formDataValid.append('id', item.id);
        formDataValid.append('title', data.title);
        formDataValid.append('budget', data.budget);
        formDataValid.append('description', data.description);
        formDataValid.append('categoryId', data.categoryId);
        formDataValid.append('status', data.status);
        formDataValid.append('file', avatar);

        try {
            updateProgram(item.id, formDataValid)
                .then((result) => {
                    if (result.status === 200) {
                        fomik.resetForm();
                        closeModal();
                        fetchApiProgram();
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
    };

    const validationSchema = Yup.object().shape({
        title: Yup.string().required('title is required'),
        budget: Yup.string().required('budget is required'),
        description: Yup.string().required('description is required'),
        categoryId: Yup.string().required('categoryId is required'),
    });

    const fomik = useFormik({
        initialValues: initDataFomik,
        onSubmit,
        validationSchema,
    });

    const handleUpdateProgram = () => {
        setShowModal(true);
        fomik.setFieldValue('title', item.title);
        fomik.setFieldValue('budget', item.budget);
        fomik.setFieldValue('description', item.description);
        fomik.setFieldValue('categoryId', item.categoryId);
        fomik.setFieldValue('status', item.status);
    };

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

    useEffect(() => {
        return () => {
            avatar && URL.revokeObjectURL(avatar.pre);
        };
    }, [avatar]);

    return (
        <Fragment>
            <button
                type="button"
                className="btn mb-1 ml-2 btn-outline-warning"
                data-toggle="tooltip"
                data-placement="bottom"
                title="delete account"
                onClick={handleUpdateProgram}
            >
                <i className="fa-solid fa-pen-to-square"></i>
            </button>

            <ModalComponent showModal={showModal} closeModal={closeModal} contentLabel="Infor Admin">
                <form onSubmit={fomik.handleSubmit} method="post" encType="multipart/form-data">
                    <div className="container rounded bg-white  profile__pages_detail--wrapper">
                        <div className="row">
                            <div className="col-md-4 border-right">
                                <div className="d-flex flex-column align-items-center text-center p-3">
                                    <img className="rounded-circle mt-5 profile__pages_detail--wrapper-img" alt="" src={item ? item.image : ''} />
                                    <input className="mt-2 mb-2" type="file" name="photo" onChange={handleAvatar} />
                                    {avatar && !showErrorFile && <img width={100} src={avatar.pre} alt="avatar" />}
                                    {showErrorFile && <div className="text-danger">Allow file jpeg, png, gif</div>}
                                </div>
                            </div>

                            <div className="col-md-4 border-right">
                                <div>
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <h4 className="text-right">Create Program</h4>
                                    </div>

                                    <InputProgram
                                        labelName="Title"
                                        inputName="title"
                                        onChange={fomik.handleChange}
                                        value={fomik.values.title}
                                        touched={fomik.touched.title}
                                        error={fomik.errors.title}
                                        {...fomik.getFieldProps('title')}
                                    />
                                    <InputProgram
                                        labelName="Budget"
                                        inputName="budget"
                                        inputType="number"
                                        min={0}
                                        onChange={fomik.handleChange}
                                        value={fomik.values.budget}
                                        touched={fomik.touched.budget}
                                        error={fomik.errors.budget}
                                        {...fomik.getFieldProps('budget')}
                                    />

                                    <div className="row mt-2">
                                        <div className="col-md-12 text-left">
                                            <label className="profile__pages_detail--labels mt-2">Category</label>
                                        </div>
                                        <div className="col-md-12">
                                            <input
                                                className="form-control profile__pages_detail--form-control"
                                                defaultValue={listCategory.find((cate) => cate.id === fomik.values.categoryId)?.title}
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-4 border-right">
                                <div>
                                    <div className="row mt-3">
                                        <div className="col-md-12" style={{ textAlign: 'left' }}>
                                            <label className="profile__pages_detail--labels mt-2">Description:</label>
                                        </div>
                                        <div className="col-md-12">
                                            <textarea
                                                type="text"
                                                rows={4}
                                                name="description"
                                                placeholder="Enter description"
                                                className="form-control profile__pages_detail--form-control"
                                                onChange={fomik.handleChange}
                                                value={fomik.values.description}
                                            ></textarea>
                                        </div>
                                    </div>

                                    <div className="row mt-3">
                                        <div className="col-md-12" style={{ textAlign: 'left' }}>
                                            <label className="profile__pages_detail--labels mt-2">Status:</label>
                                        </div>
                                        <div className="col-md-12">
                                            <UpdateCheckRadioStatus item={item} value={fomik.values.status} handleChange={fomik.handleChange} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-5 text-center">
                            <button className="btn profile__pages_detail--profile-button" type="submit">
                                Saved Profile
                            </button>
                        </div>
                    </div>
                </form>
            </ModalComponent>
        </Fragment>
    );
}

export default UpdateProgram;
