import {
  REVIEW_CREATE_REQUEST,
  REVIEW_CREATE_SUCCESS,
  REVIEW_CREATE_FAILURE,
  TOGGLE_REVIEW_REFRESH
} from './actions';

const reviewsReducer = (state = {}, action) => {
  switch (action.type) {
    case REVIEW_CREATE_REQUEST:
      return {
        ...state,
        refresh: false,
        error: false
      };
    case REVIEW_CREATE_SUCCESS:
      return {
        ...state,
        refresh: true
      };
    case REVIEW_CREATE_FAILURE:
      return {
        ...state,
        error: true
      };
    case TOGGLE_REVIEW_REFRESH:
      return {
        ...state,
        refresh: false
      };
    default:
      return state;
  }
};

export default reviewsReducer;
