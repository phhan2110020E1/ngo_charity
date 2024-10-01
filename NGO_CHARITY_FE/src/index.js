import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from '~/App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider } from 'react-router-dom';
import router from '~/routers';
import Modal from 'react-modal';
// react toast
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoginProvider } from './admin/stores';

Modal.setAppElement('#root');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <React.StrictMode>
    <LoginProvider>
        <RouterProvider router={router}>
            <ToastContainer />
            <App />
        </RouterProvider>
    </LoginProvider>,
    // </React.StrictMode>,
);

reportWebVitals();
