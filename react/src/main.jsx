import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import axios from 'axios';
import store, { history } from './store';
import * as config from './config';
import auth from './modules/auth/utilities/authUtility';
import App from './modules/app/components/App';

axios.defaults.baseURL = config.apiUrl;
axios.defaults.headers.common['Content-Type'] = config.contentType;

const token = auth.getAccessToken();

if (token) {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
}

const configuredStore = store();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={configuredStore}>
      <App history={history}/>
    </Provider>
  </StrictMode>,
);
