import { useEffect, useState } from 'react';
import axios from 'axios';
import PieChartContactWeek from './PieChartContactWeek';
import 'chart.js/auto';
import PieChartContactDay from './PieChartContactDay';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function ContactForm(props) {
    const [contactForms, setContactForm] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedContact, setSelectedContact] = useState(null);
    const fetchapi = () => {
        axios
            .get('http://localhost:5065/api/ContactForm/GetContact_Forms')
            .then((pros) => setContactForm(pros.data.data))
            .catch((error) => console.log(error));
    };
    useEffect(() => {
        fetchapi();
    }, []);

    const handleDelete = (contactId) => {
        axios
            .delete(`http://localhost:5065/api/ContactForm/DeleteCategory/${contactId}`)
            .then((result) => {
                console.log(result);
                setContactForm(contactForms.filter((contact) => contact.id !== contactId));
            })
            .catch((error) => console.log(error));
    };
    const handleDeleteConfirmation = (contact) => {
        setSelectedContact(contact);
        setShowDeleteModal(true);
    };

    const handleCloseDeleteModal = () => {
        setSelectedContact(null);
        setShowDeleteModal(false);
    };

    const handleConfirmDelete = () => {
        if (selectedContact) {
            handleDelete(selectedContact.id);
        }
        handleCloseDeleteModal();
    };

    const [showModal, setShowModal] = useState(false);

    const openModal = (contactForms) => {
        setShowModal(true);
        setSelectedContact(contactForms);
    };
    const closeModal = () => {
        setShowModal(false);
    };

    const [messageReadStatus, setMessageReadStatus] = useState({});

    useEffect(() => {
        const storedMessageReadStatus = localStorage.getItem('messageReadStatus');
        if (storedMessageReadStatus) {
            setMessageReadStatus(JSON.parse(storedMessageReadStatus));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('messageReadStatus', JSON.stringify(messageReadStatus));
    }, [messageReadStatus]);

    const markAsRead = (contactId) => {
        console.log(selectedContact);
        axios
            .put(`http://localhost:5065/api/ContactForm/UpdateContactFormReadStatus/${contactId}`, { isRead: true })
            .then((response) => {
                const updatedContactForm = response.data;
                updateReadStatus(updatedContactForm.id, updatedContactForm.isRead);
                fetchapi();
                console.log(response);
            })
            .catch((error) => console.log(error));
    };

    const markAsUnread = (contactId) => {
        updateReadStatus(contactId, false);
        // Gửi yêu cầu cập nhật trạng thái tin nhắn trên máy chủ
        console.log(contactId.isRead);
        axios
            .patch(`http://localhost:5065/api/ContactForm/${contactId}`, { isRead: true })
            .then((result) => {
                // Xử lý thành công
                console.log(result);
                closeModal();
            })
            .catch((error) => {
                // Xử lý lỗi
                console.log(error);
            });
    };
    const updateReadStatus = (contactId, isRead) => {
        setMessageReadStatus((prevStatus) => ({
            ...prevStatus,
            [contactId]: isRead,
        }));
    };

    return (
        <div className="admin__pages__content-page--card" style={{ minHeight: '500px' }}>
            <div className="card-body">
                <div className="card-title">
                    <h4>Contact Message</h4>
                </div>
                <div className="card text-center" style={{ minWidth: 500 }}>
                    <div className="form-validation">
                        <div className="modal fade" id="modalPush" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog modal-notify modal-info" role="document">
                                <div className="modal-content text-center">
                                    <div className="modal-header d-flex justify-content-center align-items-center">
                                        <div>
                                            <h5 className="modal-title">{selectedContact && selectedContact.name}</h5>
                                            <p className="text-muted">Message</p>
                                        </div>
                                    </div>
                                    <div className="modal-body">
                                        <i className="fas fa-bell fa-4x animated rotateIn mb-4"></i>
                                        <p>{selectedContact && selectedContact.message}</p>
                                    </div>
                                    {selectedContact && (
                                        <div className="modal-footer flex-center">
                                            {selectedContact.isRead ? (
                                                <button className="btn btn-success" disabled>
                                                    <i className="fas fa-check-circle mr-2"></i>Marked as Read
                                                </button>
                                            ) : (
                                                <button className="btn btn-primary" onClick={() => markAsRead(selectedContact.id)}>
                                                    Mark as Read
                                                </button>
                                            )}
                                            <button type="button" className="btn btn-outline-info waves-effect" data-dismiss="modal">
                                                Close
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {contactForms.length > 0 ? (
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Address</th>
                                    <th>Mobile Number</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {contactForms.map((item, index) => (
                                    <tr key={index}>
                                        <th>{item.id}</th>
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td>{item.address}</td>
                                        <td>{item.mobilephone}</td>
                                        <td>
                                            <button
                                                type="button"
                                                className="btn mb-1 btn-outline-warning"
                                                data-toggle="modal"
                                                data-placement="bottom"
                                                data-target="#modalPush"
                                                title="update categories"
                                                onClick={() => openModal(item)}
                                            >
                                                <i className="fa-solid fa-arrows-rotate"></i>
                                            </button>
                                            <button
                                                type="button"
                                                className="btn mb-1 ml-2 btn-outline-danger"
                                                data-toggle="tooltip"
                                                data-placement="bottom"
                                                title="delete message"
                                                onClick={() => handleDeleteConfirmation(item)}
                                            >
                                                <i className="fa-solid fa-trash"></i>
                                            </button>
                                            {item.isRead ? (
                                                <button className="btn mb-1 ml-2 btn-outline-success" onClick={() => markAsUnread(item.id)}>
                                                    <i className="fas fa-check-circle"></i>
                                                </button>
                                            ) : (
                                                <button className="btn mb-1 ml-2 btn-outline-secondary" onClick={() => markAsRead(item.id)}>
                                                    <i className="far fa-circle"></i>
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div>No contacts to show</div>
                )}
                {/* Delete confirmation modal */}
                <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete Confirmation</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Are you sure you want to delete this contact?
                        {selectedContact && (
                            <div>
                                <p>Contact ID: {selectedContact.id}</p>
                                <p>Name: {selectedContact.name}</p>
                            </div>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseDeleteModal}>
                            Cancel
                        </Button>
                        <Button variant="danger" onClick={handleConfirmDelete}>
                            Delete
                        </Button>
                    </Modal.Footer>
                </Modal>
                <div>
                    <h2 style={{ textAlign: 'center' }}>Contact Form Charts</h2>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <div style={{ marginRight: '20px' }}>
                            <PieChartContactWeek />
                        </div>
                        <div style={{ marginLeft: '20px' }}>
                            <PieChartContactDay />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactForm;
