import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import QRCode from 'qrcode.react';
import EditAboutAdmin from './EditAboutAdmin';
import DetailsAboutAdmin from './DetailsAboutAdmin';

function ListAboutAdmin({ abouts, setAbouts, fetchApiAbout }) {
    const [qrCodeValue, setQRCodeValue] = useState('');

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const [showEditForm, setShowEditForm] = useState(false);

    useEffect(() => {
        // Gọi API của bạn để lấy dữ liệu QR code
        fetch('your_api_endpoint')
            .then((response) => response.json())
            .then((data) => {
                // Thiết lập giá trị QR code từ dữ liệu API
                setQRCodeValue(data.qrCodeValue);
            })
            .catch((error) => {
                console.log('Error fetching QR code data:', error);
            });
    }, []);

  

    const handleEditForm = (item) => {
        showEditForm && <EditAboutAdmin about={item.id} />;
    };

    const handleDeleteAbout = (aboutId) => {
        // console.log(aboutId);
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger',
            },
            buttonsStyling: false,
        });
        swalWithBootstrapButtons
            .fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, cancel!',
                reverseButtons: true,
            })
            .then((result) => {
                if (result.isConfirmed) {
                    swalWithBootstrapButtons.fire('Deleted!', 'Your file has been deleted.', 'success');
                    axios
                        .delete(`http://localhost:5065/api/About/${aboutId}`)
                        .then((result) => {
                            setAbouts(abouts.filter((about) => about.id !== aboutId));
                        })
                        .catch((error) => console.log(error));
                    swalWithBootstrapButtons.fire('Deleted!');
                } else if (
                    /* Read more about handling dismissals below */
                    result.dismiss === Swal.DismissReason.cancel
                ) {
                    swalWithBootstrapButtons.fire('Cancelled', 'Your imaginary file is safe :)', 'error');
                }
            });
    };

    return (
        <div className="table-responsive">
            {' '}
            {abouts.length > 0 ? (
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Account_Name</th>
                            <th>Account_Number</th>
                            <th>Account_Bank</th>
                            <th>QR_Code</th>
                            <th>Image</th>
                        </tr>
                    </thead>
                    <tbody>
                        {abouts.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.account_Name}</td>
                                    <td>{item.account_Number}</td>
                                    <td>{item.account_Bank}</td>
                                    <td>
                                        <QRCode value={item.qR_Code} />
                                    </td>
                                    <td>
                                        <img alt="" src={item.image} width="100" />
                                    </td>
                                    <td>
                                        
                                        <DetailsAboutAdmin item={item} fetchApiAbout={fetchApiAbout} />

                                        <EditAboutAdmin item={item} fetchApiAbout={fetchApiAbout} />
                                        <button
                                            type="button"
                                            className="btn mb-1 ml-2 btn-outline-danger"
                                            data-toggle="tooltip"
                                            data-placement="bottom"
                                            title="delete about"
                                            onClick={() => {
                                                handleDeleteAbout(item.id);
                                            }}
                                        >
                                            <i className="fa-solid fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            ) : (
                <div>No About To Show</div>
            )}
        </div>
    );
}

export default ListAboutAdmin;
