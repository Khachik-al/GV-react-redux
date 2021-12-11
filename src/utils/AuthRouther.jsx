import React, { Suspense } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

function AuthRoute({ path, component: Component, type, isAuthenticated }) {
    return (
        <Route
            path={path}
            render={(props) => {
                if (isAuthenticated && type === 'public') {
                    return <Redirect to='/' />;
                }

                if (!isAuthenticated && type === 'private') {
                    return <Redirect to='/login' />;
                }

                return <Suspense fallback={<div>Loading...</div>}><Component {...props} /></Suspense>
            }}
        />
    );


}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.AppReducer.isAuthenticated,
    };
};

export default connect(mapStateToProps)(AuthRoute)