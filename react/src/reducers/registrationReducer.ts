import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
} from '../actions/types/userType.ts';

// eslint-disable-next-line default-param-last
export default function registration(state = {}, action: any) {
  switch (action.type) {
    case REGISTER_REQUEST:
      return {
        registering: true,
      };

    case REGISTER_SUCCESS:
      return {};

    case REGISTER_FAILURE:
      return {};

    default:
      return state;
  }
}
