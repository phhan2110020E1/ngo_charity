import React, { useState } from 'react';
import Modal from 'react-modal';

import axios from 'axios';

function CreateAboutAdmin({ showModal, closeModal, customStyles }) {
    const initialValue = {
        name: '',
        account_Name: '',
        account_Number: '',
        account_Bank: '',
        description: '',
    };

    const [dataInput, setDataInput] = useState(initialValue);
    const [photo, setPhoto] = useState(null);

    const handleFileChange = (e) => {
        setPhoto(e.target.files[0]);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setDataInput({
            ...dataInput,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('Name', dataInput.name);
        formData.append('Account_Name', dataInput.account_Name);
        formData.append('Account_Number', dataInput.account_Number);
        formData.append('Account_Bank', dataInput.account_Bank);
        formData.append('Description', dataInput.description);
        formData.append('photo', photo);
        axios
            .post('http://localhost:5065/api/About', formData)
            .then((result) => {
                console.log(result);
                window.location.reload();
                closeModal();
            })
            .catch((error) => console.log(error));
    };
    return (
        <Modal isOpen={showModal} onRequestClose={closeModal} contentLabel="Create about" style={customStyles}>
            <div className="container">
                <h1>Add a new about</h1>
                <form id="aboutForm" onSubmit={handleSubmit} encType="multipart/form-data">
                    <div>
                        <label htmlFor="name">Project Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={dataInput.name}
                            placeholder="project name"
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="cardHolderName">Account name:</label>
                        <input
                            type="text"
                            id="accountName"
                            name="account_Name"
                            value={dataInput.account_Name}
                            placeholder="account name"
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="accountNumber">Account number:</label>
                        <input
                            type="text"
                            id="accountNumber"
                            name="account_Number"
                            placeholder="account number"
                            onChange={handleInputChange}
                            value={dataInput.account_Number}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="accountBank">Account bank name:</label>
                        <input
                            type="text"
                            id="accountBank"
                            name="account_Bank"
                            placeholder="account bank name"
                            onChange={handleInputChange}
                            value={dataInput.account_Bank}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="description">Description:</label>
                        <textarea
                            id="description"
                            name="description"
                            placeholder="describe about project"
                            onChange={handleInputChange}
                            value={dataInput.description}
                            required
                        ></textarea>
                    </div>

                    <div>
                        <label htmlFor="photo">Image:</label>
                        <div className="input-file-container">
                            <input type="file" id="photo" name="photo" className="input-file" onChange={handleFileChange} />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="files">Other images:</label>
                        <div className="input-file-container">
                            <input type="file" id="files" name="files" className="input-file" onChange={handleFileChange} multiple />
                        </div>
                    </div>
                    <div className="form-submit">
                        <button type="submit" onClick={handleSubmit}>
                            Thêm
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    );
}

export default CreateAboutAdmin;
