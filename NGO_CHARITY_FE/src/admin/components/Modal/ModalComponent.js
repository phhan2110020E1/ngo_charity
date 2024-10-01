import Modal from 'react-modal';

import './ModalStyles.css';

function ModalComponent({ children, showModal, closeModal, contentLabel }) {
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
            marginLeft: '9%',
            transform: 'translate(-50%, -50%)',
        },
    };

    return (
        <Modal isOpen={showModal} onRequestClose={closeModal} contentLabel={contentLabel} style={customStyles}>
            <div className="card text-center" style={{ minWidth: 500 }}>
                <div className="card-body">
                    <div className="admin__modal_style_icon" onClick={closeModal}>
                        <i className="fa-solid fa-circle-xmark"></i>
                    </div>
                    {children}
                </div>
            </div>
        </Modal>
    );
}

export default ModalComponent;
