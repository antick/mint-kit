import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import * as config from './config';
import rootReducer from './config/rootReducer';

export const history = createBrowserHistory();

const loggerMiddleware = createLogger();

const middlewares = [routerMiddleware(history)];

if (config.reduxDevTools) {
  middlewares.push(loggerMiddleware);
}

const store = configureStore({
  reducer: rootReducer(history),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middlewares),
  devTools: config.reduxDevTools,
});

export default store;
