import { Link } from 'react-router-dom';

import { PathUser } from '../../routers/PathUser';
import './Pages.css';

function NotFoundUser(props) {
    return (
        <div className="user__pages__notFound--error-page">
            <div className="user__pages__notFound--content">
                <h2 className="user__pages__notFound--header" data-text="404">
                    404
                </h2>
                <h4 data-text="Opps! Page not found">Opps! Page not found</h4>
                <p>
                    Sorry, the page you're looking for doesn't exist. If you think something is broken, report a
                    problem.
                </p>
                <div className="user__pages__notFound--btns">
                    <Link to={PathUser.user}>return home</Link>
                </div>
            </div>
        </div>
    );
}

export default NotFoundUser;
