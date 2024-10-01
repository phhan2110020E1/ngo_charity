import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import Modal from 'react-modal';

function EditAboutAdmin({ item, fetchApiAbout }) {
    const initEditAbout = {
        name: '',
        account_Name: '',
        account_Bank: '',
        account_Number: '',
    };

    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState(initEditAbout);
    const [image, setImage] = useState(null);
    const [showErrorName, setShowErrorName] = useState(false);
    const [showErrorFile, setShowErrorFile] = useState(false);

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

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

    useEffect(() => {
        setFormData(item);

        return () => {
            image && URL.revokeObjectURL(image.pre);
        };
    }, [image]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        const allowedFormats = ['image/jpeg', 'image/png', 'image/gif'];
        const fileExtension = file.type;

        if (allowedFormats.includes(fileExtension)) {
            setShowErrorFile(false);
        } else {
            setShowErrorFile(true);
        }
        file.pre = URL.createObjectURL(file);
        setImage(file);
    };

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setShowErrorName(false);
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleUpdateAbout = async (e) => {
        // if (!name || !accountName || !accountNumber || !accountBank || !image) {
        //     alert('Please fill in all fields.');
        //     return;
        // }
        e.preventDefault();
        if (formData.name === '') {
            setShowErrorName(true);
        }

        if (showErrorFile || showErrorName) {
            return;
        }

        const formDataValid = new FormData();

        formDataValid.append('Id', item.id);
        formDataValid.append('Name', formData.name);
        formDataValid.append('Account_Name', formData.account_Name);
        formDataValid.append('Account_Number', formData.account_Number);
        formDataValid.append('Account_Bank', formData.account_Bank);
        formDataValid.append('photo', image);

        axios
            .put(`http://localhost:5065/api/About/${item.id}`, formDataValid)
            .then((response) => {
                closeModal();
                fetchApiAbout();
            })
            .catch((error) => {
                console.log('Error updating about:', error);
                alert('An error occurred while updating the about.');
            });
    };

    return (
        <Fragment>
            <button
                type="button"
                className="btn mb-1 ml-2 btn-outline-warning"
                data-toggle="tooltip"
                data-placement="bottom"
                title="edit"
                onClick={openModal}
            >
                <i className="fas fa-edit"></i>
            </button>
            <Modal isOpen={showModal} onRequestClose={closeModal} style={customStyles}>
                <form id="aboutForm" encType="multipart/form-data" method="post">
                    <div className="container">
                        <div className="edit-about-modal">
                            <h2 style={{ textAlign: 'center' }}>Edit About</h2>

                            <div className="form-group">
                                <label>Name</label>
                                <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChangeInput} />
                            </div>
                            <div className="form-group">
                                <label>Account Name</label>
                                <input
                                    type="text"
                                    name="account_Name"
                                    className="form-control"
                                    value={formData.account_Name}
                                    onChange={handleChangeInput}
                                />
                            </div>
                            <div className="form-group">
                                <label>Account Number</label>
                                <input
                                    type="text"
                                    name="account_Number"
                                    className="form-control"
                                    value={formData.account_Number}
                                    onChange={handleChangeInput}
                                />
                            </div>
                            <div className="form-group">
                                <label>Account Bank</label>
                                <input
                                    type="text"
                                    name="account_Bank"
                                    className="form-control"
                                    value={formData.account_Bank}
                                    onChange={handleChangeInput}
                                />
                            </div>
                            <div className="form-group">
                                <label>Image</label>
                                <input type="file" name="about_Images" className="form-control-file" onChange={handleImageChange} accept="image/*" />
                            </div>
                            {image && (
                                <div className="form-group">
                                    <img width={100} src={image.pre} alt="avatar" />
                                </div>
                            )}
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary " onClick={handleUpdateAbout}>
                                    Update
                                </button>
                                <button type="button" className="btn btn-secondary ml-2" onClick={closeModal}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </Modal>
        </Fragment>
    );
}

export default EditAboutAdmin;
