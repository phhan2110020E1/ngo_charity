import axios from 'axios';
import { Fragment, useState } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import '../pages/HelpCentre.css';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
function HelpCentre(props) {
    const [contactForms, setContactForm] = useState([]);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [renderPage, setRenderPage] = useState(true);
    const initialValues = {
        valname: '',
        valaddress: '',
        valmobilephone: '',
        valemail: '',
        valmessage: '',
    };
    const validationSchema = yup.object().shape({
        valname: yup.string().required('Name is required').min(3, 'At least 3 characters').max(30, 'Maximum 30 characters'),
        valaddress: yup.string().required('Address is required').min(3, 'At least 3 characters').max(30, 'Maximum 30 characters'),
        valmobilephone: yup
            .string()
            .required('Mobile phone is required')
            .matches(/^[0-9]{10}$/, 'Invalid mobile phone number'),
        valemail: yup
            .string()
            .required('Email is required')
            .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 'Invalid email'),
        valmessage: yup.string().required('Message is required').min(10, 'At least 10 characters').max(100, 'Maximum 100 characters'),
    });

    const handleCreateInputChange = (e) => {
        const { name, value } = e.target;
        fmk.setFieldValue(name, value);
    };

    const onSubmit = (data) => {
        const formData = new FormData();
        formData.append('name', data.valname);
        formData.append('address', data.valaddress);
        formData.append('mobilephone', data.valmobilephone);
        formData.append('email', data.valemail);
        formData.append('message', data.valmessage);

        axios
            .post('http://localhost:5065/api/ContactForm/AddContact_Form', formData)
            .then((result) => {
                const newContactForm = result.data;
                setContactForm([...contactForms, newContactForm]);
                setSubmitSuccess(true);
                fmk.resetForm();
                Swal.fire('Thank you!', 'We will check you message soon!', 'success');
            })
            .catch((error) => console.log(error));
    };
    const fmk = useFormik({
        initialValues,
        onSubmit,
        validationSchema,
    });
    return (
        <Fragment>
            {submitSuccess && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Message Sent</h2>
                        <p>Your message has been sent successfully.</p>
                        <button onClick={() => setSubmitSuccess(false)}>Close</button>
                    </div>
                </div>
            )}
            <div className="page-nav no-margin row">
                <div className="container">
                    <div className="row">
                        <h2>Contact Us</h2>
                        <ul>
                            <li>
                                {' '}
                                <a href="/">
                                    <i className="fas fa-home"></i> Home
                                </a>
                            </li>
                            <li>
                                <i className="fas fa-angle-double-right"></i> Contact US
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div style={{ marginTop: '0px' }} className="row no-margin">
                <iframe
                    style={{ width: '100%' }}
                    src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d249759.19784092825!2d79.10145254589841!3d12.009924873581818!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1448883859107"
                    height="450"
                    title="map"
                    allowFullScreen
                />
            </div>

            <div className="row contact-rooo no-margin">
                <div className="container">
                    <div className="row">
                        <form onSubmit={fmk.handleSubmit} action="#" method="post" style={{ padding: '20px' }} className="col-sm-7">
                            <h2>Contact Form</h2> <br />
                            <div className="row cont-row">
                                <div className="col-sm-3">
                                    <label>Enter Name </label>
                                    <span>:</span>
                                </div>
                                <div className="col-sm-8">
                                    <input
                                        type="text"
                                        placeholder="Enter Name"
                                        name="valname"
                                        id="valname"
                                        className="form-control input-sm"
                                        onChange={fmk.handleChange}
                                        value={fmk.values.valname}
                                        {...fmk.getFieldProps('valname')}
                                    />
                                    {fmk.errors.valname && fmk.touched.valname && (
                                        <div style={{ color: 'red' }} className="error">
                                            {fmk.errors.valname}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="row cont-row">
                                <div className="col-sm-3">
                                    <label>Email </label>
                                    <span>:</span>
                                </div>
                                <div className="col-sm-8">
                                    <input
                                        type="email"
                                        name="valemail"
                                        id="valemail"
                                        placeholder="Enter Email"
                                        className="form-control input-sm"
                                        onChange={fmk.handleChange}
                                        value={fmk.values.valemail}
                                        {...fmk.getFieldProps('valemail')}
                                    />
                                    {fmk.errors.valemail && fmk.touched.valemail && <div className="error">{fmk.errors.valemail}</div>}
                                </div>
                            </div>
                            <div className="row cont-row">
                                <div className="col-sm-3">
                                    <label>Address </label>
                                    <span>:</span>
                                </div>
                                <div className="col-sm-8">
                                    <input
                                        type="text"
                                        name="valaddress"
                                        id="valaddress"
                                        placeholder="Enter Address"
                                        className="form-control input-sm"
                                        onChange={fmk.handleChange}
                                        value={fmk.values.valaddress}
                                        {...fmk.getFieldProps('valaddress')}
                                    />
                                    {fmk.errors.valaddress && fmk.touched.valaddress && <div className="error">{fmk.errors.valaddress}</div>}
                                </div>
                            </div>
                            <div className="row cont-row">
                                <div className="col-sm-3">
                                    <label>Mobile Number</label>
                                    <span>:</span>
                                </div>
                                <div className="col-sm-8">
                                    <input
                                        type="text"
                                        id="valmobilephone"
                                        name="valmobilephone"
                                        placeholder="Enter Mobile Number"
                                        onChange={fmk.handleChange}
                                        className="form-control input-sm"
                                        value={fmk.values.valmobilephone}
                                        {...fmk.getFieldProps('valmobilephone')}
                                    />
                                    {fmk.errors.valmobilephone && fmk.touched.valmobilephone && (
                                        <div className="error">{fmk.errors.valmobilephone}</div>
                                    )}
                                </div>
                            </div>
                            <div className="row cont-row">
                                <div className="col-sm-3">
                                    <label>Enter Message</label>
                                    <span>:</span>
                                </div>
                                <div className="col-sm-8">
                                    <textarea
                                        id="valmessage"
                                        name="valmessage"
                                        rows="5"
                                        placeholder="Enter Your Message"
                                        className="form-control input-sm"
                                        onChange={fmk.handleChange}
                                        //onChange={handleCreateInputChange}
                                        value={fmk.values.valmessage}
                                        {...fmk.getFieldProps('valmessage')}
                                    ></textarea>
                                    {fmk.errors.valmessage && fmk.touched.valmessage && <div className="error">{fmk.errors.valmessage}</div>}
                                </div>
                            </div>
                            <div style={{ marginTop: '10px' }} className="row">
                                <div style={{ paddingTop: '10px' }} className="col-sm-3">
                                    <label></label>
                                </div>
                                <div className="col-sm-8">
                                    <button type="submit" className="btn btn-primary btn-sm">
                                        Send Message
                                    </button>
                                </div>
                            </div>
                        </form>
                        <div className="col-sm-5">
                            <div style={{ margin: '50px' }} className="serv">
                                <h2 style={{ marginTop: '10px' }}>Address</h2>
                                Antonya Street, <br />
                                23/H-2, Building
                                <br />
                                TA, AUS District
                                <br />
                                Phone:+91 9159669599
                                <br />
                                Email:support@smarteyeapps.com
                                <br />
                                Website:www.smarteyeapps.com.com
                                <br />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default HelpCentre;
