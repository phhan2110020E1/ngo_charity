import { renderToString } from 'react-dom/server';
import { useNavigate } from 'react-router-dom';

import { SendEmail, ToastError, ToastSuccess, resetPassword } from '~/admin/utils';
import { PathUser } from '~/routers/PathUser';
import EmailResetPassword from '~/user/components/Email/EmailResetPassword';

function ResetPassword({ email }) {
    const navigate = useNavigate();

    const handleResetPassword = () => {
        const emailContent = renderToString(<EmailResetPassword />);
        try {
            resetPassword(email)
                .then((result) => {
                    if (result.status === 200) {
                        const emailDataToSend = {
                            toMail: email,
                            subject: 'Confirm reset password',
                            body: emailContent,
                        };
                        return SendEmail(emailDataToSend);
                    }
                })
                .then((result) => {
                    ToastSuccess(`${result.message}, Please go to your email to get the password`);
                })
                .catch((error) => {
                    if (error.message === 'Network Error') {
                        navigate(`../${PathUser.userNotFound}`);
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
    };

    return (
        <button
            type="button"
            className="btn mb-1 btn-outline-warning"
            data-toggle="tooltip"
            data-placement="bottom"
            title="reset password"
            onClick={handleResetPassword}
        >
            <i className="fa-solid fa-arrows-rotate"></i>
        </button>
    );
}

export default ResetPassword;
