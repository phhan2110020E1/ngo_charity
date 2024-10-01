import { useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import { ToastError, ToastSuccess, createProgram } from '~/admin/utils';
import { PathAdmin } from '~/routers/PathAdmin';
import BodyCreateProgram from './BodyCreateProgram';

function CreateProgram({ fetchApiProgram, closeModal, listCategory }) {
    const [showErrorFile, setShowErrorFile] = useState(false);
    const [avatar, setAvatar] = useState();
    const navigate = useNavigate();

    const initDataFomik = {
        title: '',
        budget: '',
        description: '',
        categoryId: '',
        status: 'UP_COMING',
    };

    const onSubmit = (data) => {
        const formDataValid = new FormData();
        formDataValid.append('title', data.title);
        formDataValid.append('budget', data.budget);
        formDataValid.append('description', data.description);
        formDataValid.append('categoryId', data.categoryId);
        formDataValid.append('status', data.status);
        formDataValid.append('file', avatar);
        try {
            createProgram(formDataValid)
                .then((result) => {
                    if (result.status === 201) {
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
        categoryId: Yup.string().required('categorory is required'),
    });

    const fomik = useFormik({
        initialValues: initDataFomik,
        onSubmit,
        validationSchema,
    });

    return (
        <form onSubmit={fomik.handleSubmit} method="post" encType="multipart/form-data">
            <div className="container rounded bg-white  profile__pages_detail--wrapper">
                <BodyCreateProgram
                    listCategory={listCategory}
                    fomik={fomik}
                    avatar={avatar}
                    setAvatar={setAvatar}
                    showErrorFile={showErrorFile}
                    setShowErrorFile={setShowErrorFile}
                />
                <div className="mt-5 text-center">
                    <button className="btn profile__pages_detail--profile-button" type="submit">
                        Saved Profile
                    </button>
                </div>
            </div>
        </form>
    );
}

export default CreateProgram;
