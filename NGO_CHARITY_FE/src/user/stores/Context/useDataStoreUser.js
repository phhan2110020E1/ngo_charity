import { useContext } from 'react';

import { DataContext } from './DataProvider';

function useDataStoreUser(props) {
    const value = useContext(DataContext);
    return { ...value };
}

export default useDataStoreUser;
