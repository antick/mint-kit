import React from 'react';
import { Route, Navigate } from 'react-router-dom'; // Update here
import PropTypes from 'prop-types';
import useSilentToken from '../../auth/hooks/useSilentToken';
import auth from '../../auth/utilities/authUtility';

const PrivateRoute = ({ component: Component, ...rest }) => {
  // const isAuthenticated = true;
  const isAuthenticated = auth.isAuthenticated();

  useSilentToken();

  return (
    <Route {...rest} render={(props) => (
      isAuthenticated === true
        ? <Component auth={isAuthenticated} {...props} {...rest} />
        : <Navigate to='/login' replace />
    )} />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.any.isRequired,
  history: PropTypes.object,
  auth: PropTypes.bool,
};

export default PrivateRoute;
