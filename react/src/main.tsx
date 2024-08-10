// import { Provider } from 'react-redux';
// import axios from 'axios';
// import store, { history } from './store';
// import * as config from './config';
// import auth from './modules/auth/utilities/authUtility';
// import App from './modules/app/components/App';
//
// axios.defaults.baseURL = config.apiUrl;
// axios.defaults.headers.common['Content-Type'] = config.contentType;
//
// const token = auth.getAccessToken();
//
// if (token) {
//   axios.defaults.headers.common.Authorization = `Bearer ${token}`;
// }
//
// const configuredStore = store;
//
// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <Provider store={configuredStore}>
//       <App history={history}/>
//     </Provider>
//   </StrictMode>,
// );
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import './index.css';

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  );
}
