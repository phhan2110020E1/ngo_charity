import axios from 'axios';
import { useState, useEffect } from 'react';
import CreateAboutAdmin from './CreateAboutAdmin';
import ListAboutAdmin from './ListAboutAdmin';

function AboutAdmin(props) {
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

    const [abouts, setAbouts] = useState([]);

    const [showModal, setShowModal] = useState(false);

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    const fetchApiAbout = () => {
        axios
            .get('http://localhost:5065/api/About')
            .then((res) => {
                setAbouts(res.data.data);
            })
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        fetchApiAbout();
    }, []);

    return (
        <div className="admin__pages__content-page--card" style={{ minHeight: '500px' }}>
            <div className="card-body">
                <div className="card-title">
                    <h4>About Admin</h4>
                </div>
                <button
                    type="button"
                    className="btn mb-1 btn-info"
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title="add account"
                    onClick={openModal}
                >
                    <i className="fa-solid fa-plus"></i>
                </button>

                <CreateAboutAdmin showModal={showModal} closeModal={closeModal} customStyles={customStyles} />
                <ListAboutAdmin abouts={abouts} setAbouts={setAbouts} fetchApiAbout={fetchApiAbout} />
            </div>
        </div>
    );
}

export default AboutAdmin;
