import { Link } from 'react-router-dom';

import { PathAdmin } from '../../routers/PathAdmin';
import './Pages.css';

function NotFoundAdmin(props) {
    return (
        <div className="user__pages__notFound--error-page">
            <div className="user__pages__notFound--content">
                <h2 className="user__pages__notFound--header" data-text="500">
                    500
                </h2>
                <h4 data-text="Opps! Error Server">Opps! Error Server</h4>
                <p>Sorry, the page you're looking for doesn't exist. If you think something is broken, report a problem.</p>
                <div className="user__pages__notFound--btns">
                    <Link to={PathAdmin.admin}>return dashboard</Link>
                </div>
            </div>
        </div>
    );
}

export default NotFoundAdmin;
