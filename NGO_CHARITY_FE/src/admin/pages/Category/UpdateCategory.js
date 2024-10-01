import React, { Fragment, useState } from 'react';
import Modal from 'react-modal';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';

function UpdateCategory({ item, fetchapi }) {
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
    const [avatar, setAvatar] = useState(null);

    const closeModal = () => {
        setShowModal(false);
    };

    const [showModal, setShowModal] = useState(false);
    // const onSubmit = (values) => {
    //     const formData = new FormData();
    //     formData.append('title', values.title);
    //     formData.append('id', inforUpdatexx.id);
    //     formData.append('programs', inforUpdatexx.programs);
    //     formData.append('photo', avatar);
    //     formData.append('imagename', inforUpdatexx.image);

    //     axios
    //         .put(`http://localhost:5065/api/Category/${inforUpdatexx.id}`, formData)
    //         .then((result) => {
    //             console.log(result);
    //             closeModal();
    //             const updatedCategory = result.data;
    //                 setCategory((prevCategories) =>
    //                     prevCategories.map((category) =>
    //                         category.id === updatedCategory.id ? updatedCategory : category,
    //                     ),
    //                 );
    //             // Xử lý dữ liệu sau khi cập nhật thành công
    //         })
    //         .catch((error) => console.log(error));
    // };
    const onSubmit = (values) => {
        console.log(values);
        console.log(avatar);
        try {
            const formData = new FormData();
            formData.append('title', values.title);
            formData.append('id', item.id);
            formData.append('programs', values.programs);
            formData.append('photo', avatar);
            // formData.append('imagename', inforUpdatexx.image);
            //  formData.append('photo', avatar);
            // formData.append('imagename', inforUpdatexx.image);

            axios
                .put(`http://localhost:5065/api/Category/UpdateCategory/${item.id}`, formData)
                .then((result) => {
                    // Xử lý dữ liệu sau khi cập nhật thành công
                    console.log(result);
                    fetchapi();
                    closeModal();
                })
                .catch((error) => {
                    console.log(error);
                });
        } catch (error) {
            console.log(error);
        }
    };

    const validationSchema = Yup.object().shape({
        title: Yup.string()
            .required('Title is required')
            .min(3, 'At least 3 characters')
            .max(30, 'Maximum 30 characters'),
    });
    const initialValues = {
        title: '',
        programs: '',
    };
    const fmkUpdate = useFormik({
        initialValues,
        // initialValues: {
        //     title: inforUpdatexx ? inforUpdatexx.title : '',
        // },
        onSubmit,
        validationSchema,
    });

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setAvatar(file);
    };

    const handleUpdate = () => {
        setShowModal(true);
        fmkUpdate.setFieldValue('title', item.title);
    };
    return (
        <Fragment>
            <button
                type="button"
                className="btn mb-1 btn-outline-warning"
                data-toggle="tooltip"
                data-placement="bottom"
                title="update categories"
                onClick={handleUpdate}
            >
                <i className="fa-solid fa-arrows-rotate"></i>
            </button>

            <Modal isOpen={showModal} onRequestClose={closeModal} contentLabel="Update Categories" style={customStyles}>
                <div className="card text-center" style={{ minWidth: 500 }}>
                    <div className="card-body">
                        <div className="admin__modal_style_icon" onClick={closeModal}>
                            <i className="fa-solid fa-circle-xmark"></i>
                        </div>
                        <div className="form-validation">
                            <form
                                onSubmit={fmkUpdate.handleSubmit}
                                encType="multipart/form-data"
                                className="form-valide"
                            >
                                <div className="mb-3">
                                    <h3>Update category</h3>
                                </div>
                                <div className="form-group row">
                                    <input type="hidden" name="id" />
                                    <label className="col-lg-4 col-form-label" htmlFor="val-title">
                                        Title <span className="text-danger">*</span>
                                    </label>
                                    <div className="col-lg-6">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="title"
                                            name="title"
                                            value={fmkUpdate.values.title}
                                            onChange={fmkUpdate.handleChange}
                                            //touched={fmkUpdate.touched.title}
                                    //        error={fmkUpdate.errors.title}
                                            {...fmkUpdate.getFieldProps('title')}
                                        />
                                        {fmkUpdate.touched.title && fmkUpdate.errors.title && (
                                            <div className="text-danger">{fmkUpdate.errors.title}</div>
                                        )}
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-lg-4 col-form-label" htmlFor="val-image">
                                        Image <span className="text-danger">*</span>
                                    </label>
                                    <div className="col-lg-6">
                                        <input
                                            type="file"
                                            className="form-control"
                                            id="val-image"
                                            name="image"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                        />
                                    </div>
                                   {/* // <img src={fmkUpdate.values.avatar} width="100" height="80" /> */}

                                </div>
                                <button type="submit" className="btn btn-primary">
                                    Update
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </Modal>
        </Fragment>
    );
}

// function UpdateCategory({ item }) {
//     const customStyles = {
//         overlay: {
//             backgroundColor: '#2f2e2ebf',
//         },
//         content: {
//             animation: 'fadeIn 1s ease-in-out',
//             top: '50%',
//             left: '50%',
//             right: 'auto',
//             bottom: 'auto',
//             marginRight: '-50%',
//             transform: 'translate(-50%, -50%)',
//         },
//     };

//     const [showModal, setShowModal] = useState(false);

//     const closeModal = () => setShowModal(false);

//     const [avatar, setAvatar] = useState(null);

//     const onSubmit = (e) => {
//         console.log(e);
//         console.log(avatar);
//     };

//     const initialValues = {
//         title: '',
//     };
//     const validationSchema = Yup.object().shape({
//         title: Yup.string()
//             .required('Title is required')
//             .min(3, 'At least 3 characters')
//             .max(30, 'Maximum 30 characters'),
//     });
//     const fmkUpdate = useFormik({
//         initialValues,
//         onSubmit,
//         validationSchema,
//     });

//     const handleFileChange = (e) => {
//         const file = e.target.files[0];
//         setAvatar(file);
//     };

//     const handleUpdate = () => {
//         console.log(item);
//         setShowModal(true);
//         fmkUpdate.setFieldValue('title', item.title);
//     };

//     return (
//         <Fragment>
//             <button
//                 type="button"
//                 className="btn mb-1 btn-outline-warning"
//                 data-toggle="tooltip"
//                 data-placement="bottom"
//                 title="update categories"
//                 onClick={handleUpdate}
//             >
//                 <i className="fa-solid fa-arrows-rotate"></i>
//             </button>

//             <Modal isOpen={showModal} onRequestClose={closeModal} contentLabel="Update Categories" style={customStyles}>
//                 <div className="card text-center" style={{ minWidth: 500 }}>
//                     <div className="card-body">
//                         <div className="admin__modal_style_icon" onClick={closeModal}></div>
//                         <i className="fa-solid fa-circle-xmark"></i>
//                     </div>
//                     <div className="form-validation">
//                         <form onSubmit={fmkUpdate.handleSubmit} encType="multipart/form-data" className="form-valide">
//                             <div className="mb-3">
//                                 <h3>Update category</h3>
//                             </div>
//                             <div className="form-group row">
//                                 <input type="hidden" name="id" />
//                                 <label className="col-lg-4 col-form-label" htmlFor="val-title">
//                                     Title <span className="text-danger">*</span>
//                                 </label>
//                                 <div className="col-lg-6">
//                                     <input
//                                         type="text"
//                                         className="form-control"
//                                         id="val-title"
//                                         name="title"
//                                         value={fmkUpdate.values.title}
//                                         error={fmkUpdate.errors.title}
//                                         placeholder="Enter title"
//                                         onChange={fmkUpdate.handleChange}
//                                     />
//                                     {fmkUpdate.touched.title && fmkUpdate.errors.title && (
//                                         <div className="text-danger">{fmkUpdate.errors.title}</div>
//                                     )}
//                                 </div>
//                             </div>

//                             <div className="form-group row">
//                                 <label className="col-lg-4 col-form-label" htmlFor="val-image">
//                                     Image <span className="text-danger">*</span>
//                                 </label>
//                                 <div className="col-lg-6">
//                                     <input
//                                         type="file"
//                                         className="form-control"
//                                         id="val-image"
//                                         name="image"
//                                         accept="image/*"
//                                         onChange={handleFileChange}
//                                     />
//                                 </div>
//                             </div>
//                             <button type="submit" className="btn btn-primary">
//                                 Update
//                             </button>
//                         </form>
//                     </div>
//                 </div>
//             </Modal>
//         </Fragment>
//     );
// }
export default UpdateCategory;
