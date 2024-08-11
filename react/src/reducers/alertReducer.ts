import {
  SUCCESS,
  ERROR,
  CLEAR,
} from '../actions/types/alertType.ts';

// eslint-disable-next-line default-param-last
export default function alert(state = {}, action: any) {
  switch (action.type) {
    case SUCCESS:
      return {
        type: 'alert-success',
        message: action.payload,
      };

    case ERROR:
      return {
        type: 'alert-danger',
        message: action.payload,
      };

    case CLEAR:
      return {};

    default:
      return state;
  }
}
