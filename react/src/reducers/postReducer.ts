import {
  GET_POSTS,
  GET_POSTS_SUCCESS,
  GET_POSTS_FAILURE,
} from '../actions/types/postType.ts';

export const initialState = {
  posts: [],
  loading: false,
  hasErrors: false,
};

// eslint-disable-next-line default-param-last
export default function postsReducer(state = initialState, action: { type: any; payload: any; }) {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        loading: true,
      };

    case GET_POSTS_SUCCESS:
      return {
        posts: action.payload,
        loading: false,
        hasErrors: false,
      };

    case GET_POSTS_FAILURE:
      return {
        ...state,
        loading: false,
        hasErrors: true,
      };

    default:
      return state;
  }
}
