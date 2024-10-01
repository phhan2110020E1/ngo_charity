import { Fragment} from 'react';
import { Outlet } from "react-router-dom"


function ContentPage(props) {
    return (
        <Fragment>
            <Outlet />
        </Fragment>
    )
}
export default ContentPage;