import React from 'react';
import PropTypes from 'prop-types';
import { Route, Navigate } from 'react-router-dom';
import auth from '../../auth/utilities/authUtility';

const PublicRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = auth.isAuthenticated();

  return (
    <Route {...rest} render={(props) => (
      isAuthenticated === false
        ? <Component auth={isAuthenticated} {...props} {...rest} />
        : <Navigate to='/' />
    )} />
  );
};

PublicRoute.propTypes = {
  component: PropTypes.any.isRequired,
  auth: PropTypes.bool,
};

export default PublicRoute;
