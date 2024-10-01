import { Fragment } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Header, Footer, ContentPage } from './user';
import { DataProvider } from './user/stores';

function App() {
    return (
        <DataProvider>
            <Fragment>
                <ToastContainer />

                {/* Loader sẽ làm sau cùng */}
                {/* <div className="spinner-border text-muted"></div> */}

                {/* Header begin */}
                <Header />
                {/* Header end */}

                {/* Content begin */}
                <ContentPage />
                {/* Content end */}

                {/* Footer begin */}
                <Footer />
                {/* Footer begin */}
            </Fragment>
        </DataProvider>
    );
}

export default App;
