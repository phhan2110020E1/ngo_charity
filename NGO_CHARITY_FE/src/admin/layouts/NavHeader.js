import { Link } from 'react-router-dom';
import { PathAdmin } from '~/routers/PathAdmin';

function NavHeader(props) {
    return (
        <div className="admin__layouts__nav-header--nav-header">
            <div className="admin__layouts__nav-header--brand-logo">
                <Link to={PathAdmin.admin} style={{ padding: 0 }}>
                    <img src="/assets/images/logo.jpg" alt="logo" style={{ height: '5rem' }} />
                </Link>
            </div>
        </div>
    );
}

export default NavHeader;
