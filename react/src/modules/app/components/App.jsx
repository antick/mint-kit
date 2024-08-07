import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ConnectedRouter } from 'connected-react-router';
import { get } from 'lodash';
import NotFound from '../../auth/components/NotFound';
import Container from './Layout/Container';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import routes from '../../../config/routes';

const App = ({ history }) => (
  <ConnectedRouter history={history}>
    <Routes>
      {routes.filter((route) => get(route, 'public', false)).map((prop, key) => (
        <PublicRoute exact={!!prop.exact} path={prop.path} component={prop.component} key={key} />
      ))}
      <PrivateRoute path='/' component={Container} history={history} />
      <Route component={NotFound} />
    </Routes>
  </ConnectedRouter>
);

App.propTypes = {
  history: PropTypes.object,
};

export default App;
