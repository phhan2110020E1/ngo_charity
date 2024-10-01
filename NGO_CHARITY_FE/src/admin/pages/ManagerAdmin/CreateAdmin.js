import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import { RegisterModel, ToastError, ToastSuccess } from '~/admin/utils';
import { PathAdmin } from '~/routers/PathAdmin';
import ModalInput from '~/admin/components/Modal/ModalInput';

function CreateAdmin({ closeModal, listAdmin, fetchApiListAdmin }) {
    const navigate = useNavigate();

    const initDataFomik = {
        name: '',
        email: '',
        password: '',
        role: 'Admin',
    };

    const onSubmit = (data) => {
        try {
            RegisterModel(data)
                .then((result) => {
                    if (result.status === 201) {
                        fetchApiListAdmin();
                        closeModal();
                        ToastSuccess(result.message);
                        fomik.resetForm();
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
        name: Yup.string().required('Name is required'),
        password: Yup.string().required('Password is required'),
        email: Yup.string()
            .required('Email is required')
            .test('uniqueEmail', 'Email already exists', (value) => {
                const isEmailUnique = listAdmin.every((item) => item.email.toLowerCase() !== value.toLowerCase());
                return isEmailUnique;
            }),
    });

    const fomik = useFormik({
        initialValues: initDataFomik,
        onSubmit,
        validationSchema,
    });

    return (
        <div className="form-validation ">
            <form className="form-valide" onSubmit={fomik.handleSubmit} method="post">
                <div className="mb-3">
                    <h3>Create new admin</h3>
                </div>

                <ModalInput
                    labelName="Username"
                    inputName="name"
                    onChange={fomik.handleChange}
                    value={fomik.values.name}
                    touched={fomik.touched.name}
                    error={fomik.errors.name}
                    {...fomik.getFieldProps('name')}
                />

                <ModalInput
                    labelName="Email"
                    inputName="email"
                    onChange={fomik.handleChange}
                    value={fomik.values.email}
                    touched={fomik.touched.email}
                    error={fomik.errors.email}
                    {...fomik.getFieldProps('email')}
                />

                <ModalInput
                    labelName="Password"
                    inputName="password"
                    inputType="password"
                    onChange={fomik.handleChange}
                    value={fomik.values.password}
                    touched={fomik.touched.password}
                    error={fomik.errors.password}
                    {...fomik.getFieldProps('password')}
                />

                <button type="submit" className="btn btn-primary">
                    Create
                </button>
            </form>
        </div>
    );
}

export default CreateAdmin;
