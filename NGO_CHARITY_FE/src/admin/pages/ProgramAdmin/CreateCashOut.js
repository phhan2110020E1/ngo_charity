import { useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';


import { ToastError, ToastSuccess, withDraw } from '~/admin/utils';
import { PathAdmin } from '~/routers/PathAdmin';

function CreateCashOut({ closeModal, item, inforUser }) {
    // const [showErrorInput, setShowErrorInput] = useState(false);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            money: '',
        },
        validate: (values) => {
            const errors = {};
            if (!values.money) {
                errors.money = 'Money is required';
            }
            return errors;
        },
        onSubmit: (values) => {
            setIsSubmitting(true);

            if (formik.errors.money) {
                setIsSubmitting(false);
                // setShowErrorInput(true);
                return;
            }

            const dataValue = {
                ...values,
                userId: inforUser.id,
                programId: item.id,
            };
            console.log(dataValue);
            try {
                withDraw(dataValue)
                    .then((result) => {
                        console.log(result);
                        if (result.status === 200) {
                            formik.resetForm();
                            closeModal();
                            ToastSuccess(result.message);
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                        if (error.message === 'Network Error') {
                            navigate(`../${PathAdmin.adminNotFound}`);
                        } else {
                            const errorValid = error.response.data;
                            if (errorValid.status === 400) {
                                ToastError(errorValid.message);
                            }
                        }
                    });
            } catch (error) {
                console.log(error);
            }
            setIsSubmitting(false);
            closeModal();
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} method="post">
            <div className="container rounded bg-white">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="text-right">Cash Out</h4>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div>
                            <div className="row mt-2">
                                <div className="col-md-12 text-left">
                                    <label className="profile__pages_detail--labels mt-2">Money:</label>
                                </div>
                                <div className="col-md-12">
                                    <input
                                        type="number"
                                        min="1"
                                        name="money"
                                        placeholder="Enter Money"
                                        className="form-control profile__pages_detail--form-control"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.money}
                                    />
                                </div>
                                {formik.errors.money && formik.touched.money && (
                                    <div className="text-left" style={{ color: 'red', marginLeft: '5px', marginTop: '-20px' }}>
                                        {formik.errors.money}
                                    </div>
                                )}
                                {/* {showErrorInput && (
                                    <p className="text-left" style={{ color: 'red', marginLeft: '5px', marginTop: '-20px' }}>
                                        Money is not empty
                                    </p>
                                )} */}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-5 text-center">
                    <button className="btn profile__pages_detail--profile-button" type="submit" disabled={isSubmitting}>
                        Cash Out
                    </button>
                </div>
            </div>
        </form>
    );
}

export default CreateCashOut;
