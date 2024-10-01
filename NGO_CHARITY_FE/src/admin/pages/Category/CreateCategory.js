import React, { useState } from 'react';
import Modal from 'react-modal';
import * as yup from 'yup';
import { useFormik } from 'formik';
import InputCreateAdmin from '../ManagerAdmin/InputCreateAdmin';
import axios from 'axios';
function CreateCategory({ fetchapi, showModalxx, closeModalxx }) {
    const customStyles = {
        overlay: {
            backgroundColor: '#2f2e2ebf',
        },
        content: {
            animation: 'fadeIn 1s ease-in-out',
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    const initialValues = {
        title: '',
        image: null,
    };

    const validationSchema = yup.object().shape({
        title: yup
            .string()
            .required('Title is required')
            .min(3, 'At least 3 characters')
            .max(30, 'Maximum 30 characters'),
    });
    const [categories, setCategory] = useState([]);

    const onSubmit = (data) => {
        console.log(data);
        const formData = new FormData();
        formData.append('title', data.title);
        // formData.append('programs', dataInput['val-programs']);
        formData.append('photo', photo);

        axios
            .post('http://localhost:5065/api/Category/AddCategory', formData)
            .then((result) => {
                console.log(result);
                const newCategory = result.data;
                setCategory([...categories, newCategory]);
                fetchapi();
                closeModalxx();
            })
            .catch((error) => console.log(error));
    };
    //category create ne
    const initalValue = {
        'val-title': '',
        'val-programs': '',
    };
    const [dataInput, setDataInput] = useState(initalValue);
    // const [dataInputFomik, setDataInputFomik] = useState({});
    const [photo, setPhoto] = useState(null);

    const handleFileChange = (e) => {
        setPhoto(e.target.files[0]);
        // fmk.values.image = e.target.files[0];
    };

    const handleCreateInputChange = (e) => {
        const { name, value } = e.target;
        setDataInput({
            ...dataInput,
            [name]: value,
        });
    };
    const fmk = useFormik({
        initialValues,
        onSubmit,
        validationSchema,
    });
    return (
        <Modal isOpen={showModalxx} onRequestClose={closeModalxx} contentLabel="Create Categories" style={customStyles}>
            <div className="card text-center" style={{ minWidth: 500 }}>
                <div className="card-body">
                    <div className="admin__modal_style_icon" onClick={closeModalxx}>
                        <i className="fa-solid fa-circle-xmark"></i>
                    </div>
                    <div className="form-validation">
                        <form
                            onSubmit={fmk.handleSubmit}
                            encType="multipart/form-data"
                            className="form-valide"
                            action="#"
                            method="post"
                        >
                            <div className="mb-3">
                                <h3>Create new category</h3>
                            </div>
                            <InputCreateAdmin
                                labelInput="title"
                                nameInput="title"
                                placeholder="Enter title"
                                onChange={handleCreateInputChange}
                                // onChange={fmk.handleChange}
                                value={fmk.values.title}
                                touched={fmk.touched.title}
                                error={fmk.errors.title}
                                {...fmk.getFieldProps('title')}
                            />
                            {/* <div className="form-group row">
                                <label className="col-lg-4 col-form-label" htmlFor="val-programs">
                                    Programs <span className="text-danger">*</span>
                                </label>
                                <div className="col-lg-6">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="val-programs"
                                        name="val-programs"
                                        placeholder="Enter programs"
                                        onChange={handleCreateInputChange}
                                    />
                                </div>
                            </div> */}
                            <div className="form-group row">
                                <label className="col-lg-4 col-form-label" htmlFor="val-image">
                                    Image <span className="text-danger">*</span>
                                </label>
                                <div className="col-lg-6">
                                    <input
                                        type="file"
                                        className="form-control"
                                        id="val-image"
                                        name="val-image"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                    />
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary">
                                Create
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default CreateCategory;
