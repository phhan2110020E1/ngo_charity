import { useEffect, useState } from 'react';
import axios from 'axios';
import CreateCategory from './CreateCategory';
import UpdateCategory from './UpdateCategory';
import ReactPaginate from 'react-js-pagination';
import './Cate.css';
// import Modal from 'react-bootstrap/Modal';
// import Button from 'react-bootstrap/Button';
import { Button, Modal } from 'react-bootstrap';

function Category(props) {
    const [categories, setCategory] = useState([]);
    const [activePage, setActivePage] = useState(1);
    const itemsPerPage = 5;
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState(null);

    const handlePageChange = (pageNumber) => {
        setActivePage(pageNumber);
    };

    const indexOfLastCategory = activePage * itemsPerPage;
    const indexOfFirstCategory = indexOfLastCategory - itemsPerPage;
    const currentCategories = categories.slice(indexOfFirstCategory, indexOfLastCategory);

    const fetchapi = () => {
        axios
            .get('http://localhost:5065/api/Category/GetCategories')
            .then((pros) => setCategory(pros.data.data))
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        fetchapi();
    }, []);

    const handleDelete = (categoryId) => {
        setShowDeleteModal(true);
        setCategoryToDelete(categoryId);
    };

    const confirmDelete = () => {
        axios
            .delete(`http://localhost:5065/api/Category/DeleteCategory/${categoryToDelete}`)
            .then((result) => {
                console.log(result);
                setCategory(categories.filter((category) => category.id !== categoryToDelete));
                handleCloseDeleteModal();
            })
            .catch((error) => console.log(error));
    };

    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
        setCategoryToDelete(null);
    };

    const [showModal, setShowModal] = useState(false);

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    return (
        <div className="admin__pages__content-page--card" style={{ minHeight: '500px' }}>
            <div className="card-body">
                <div className="card-title">
                    <h4>Category</h4>
                </div>
                <button
                    type="button"
                    className="btn mb-1 btn-info"
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title="add categories"
                    onClick={openModal}
                >
                    <i className="fa-solid fa-plus"></i>
                </button>

                <CreateCategory fetchapi={fetchapi} showModalxx={showModal} closeModalxx={closeModal} />

                {categories.length > 0 ? (
                    <div>
                        <div className="table-responsive">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Title</th>
                                        <th>Programs</th>
                                        <th>Image</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentCategories.map((item, index) => {
                                        const photoPath = `${item.image}`;
                                        return (
                                            <tr key={index}>
                                                <th>{item.id}</th>
                                                <td>{item.title}</td>
                                                <td>{item.programs}</td>
                                                <td>
                                                    <img src={photoPath} width="100" height="80" alt={item.title} />
                                                </td>
                                                <td>
                                                    <UpdateCategory fetchapi={fetchapi} item={item} />

                                                    <button
                                                        type="button"
                                                        className="btn mb-1 ml-2 btn-outline-danger"
                                                        data-toggle="tooltip"
                                                        data-placement="bottom"
                                                        title="delete account"
                                                        onClick={() => handleDelete(item.id)}
                                                    >
                                                        <i className="fa-solid fa-trash"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <ReactPaginate
                            activePage={activePage}
                            itemsCountPerPage={itemsPerPage}
                            totalItemsCount={categories.length}
                            pageRangeDisplayed={5}
                            onChange={handlePageChange}
                            itemClass="page-item"
                            linkClass="page-link"
                            prevPageText="Previous"
                            nextPageText="Next"
                            firstPageText="First"
                            lastPageText="Last"
                        />
                    </div>
                ) : (
                    <div>No category to show</div>
                )}

                <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete Category</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure you want to delete this category?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseDeleteModal}>
                            Cancel
                        </Button>
                        <Button variant="danger" onClick={confirmDelete}>
                            Delete
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
}

export default Category;
