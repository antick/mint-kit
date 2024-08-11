import {
  SUBMITTING,
  FORGOT_PASSWORD_REQUEST,
  RESET_PASSWORD_FAILURE,
} from '../actions/types/userType.ts';

const initialState = {
  submitting: false,
};

// eslint-disable-next-line default-param-last
export default function password(state = initialState, action: any) {
  switch (action.type) {
    case SUBMITTING:
      return {
        ...state,
        submitting: true,
      };

    case FORGOT_PASSWORD_REQUEST:
      return {
        ...state,
        submitting: false,
      };

    case RESET_PASSWORD_FAILURE:
      return {
        ...state,
        submitting: false,
      };

    default:
      return state;
  }
}
