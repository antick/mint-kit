import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import UserList from '../components/UserList';
import store, { history } from '../../../store';

describe('the UserList component', () => {
  const configuredStore = store();

  it('should render without crashing', () => {
    render(
      <Provider store={configuredStore}>
        <Router>
          <UserList history={history} />
        </Router>
      </Provider>
    );
  });
});
