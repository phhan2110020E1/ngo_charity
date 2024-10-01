import React, { Fragment } from 'react';
import { CircularProgress } from 'react-cssfx-loading';
import InfiniteScroll from 'react-infinite-scroll-component';

function Loading({ children, fetchApi, listFetchApi = [], isLoading, setIsLoading }) {
    return (
        <Fragment>
            {isLoading ? (
                <div style={{ textAlign: 'center', marginTop: '200px', fontSize: 50 }}>
                    <CircularProgress />
                    <h4>Loading ...</h4>
                </div>
            ) : (
                <InfiniteScroll dataLength={listFetchApi.length} next={fetchApi} hasMore={false} endMessage={<p>No more data to load.</p>}>
                    {children}
                </InfiniteScroll>
            )}
        </Fragment>
    );
}

export default Loading;
