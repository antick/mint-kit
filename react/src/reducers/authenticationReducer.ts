import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
} from '../actions/types/userType.ts';
import auth from '../utils/AuthUtil.ts';

const user = auth.getAccessToken();
const initialState = user ? { loggedIn: true, user } : {};

// eslint-disable-next-line default-param-last
export default function authentication(state = initialState, action: any) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.payload,
      };

    case LOGIN_FAILURE:
      return {};

    case LOGOUT:
      return {
        loggedIn: false,
      };

    default:
      return state;
  }
}
