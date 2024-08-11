import { combineReducers } from 'redux';
import authenticationReducer from '../reducers/authenticationReducer.ts';
import passwordReducer from '../reducers/passwordReducer.ts';
import registrationReducer from '../reducers/registrationReducer.ts';
import postReducer from '../reducers/postReducer.ts';
import userReducer from '../reducers/userReducer.ts';
import avatarReducer from '../reducers/avatarReducer.ts';
import alertReducer from '../reducers/alertReducer.ts';

const rootReducer = () => combineReducers({
  authenticationReducer,
  registrationReducer,
  passwordReducer,
  avatarReducer,
  alertReducer,
  postReducer,
  userReducer,
});

export default rootReducer;
