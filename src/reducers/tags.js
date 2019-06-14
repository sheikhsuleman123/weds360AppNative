import { TAGS_FETCH_REQUEST, TAGS_FETCH_SUCCESS, TAGS_FETCH_FAILURE } from '../actions/tags';

const tagsReducer = (state = {}, action) => {
  switch (action.type) {
    case TAGS_FETCH_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case TAGS_FETCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        tags: action.response.data
      };
    case TAGS_FETCH_FAILURE:
      return {
        ...state,
        isFetching: false
      };
    default:
      return state;
  }
};

export default tagsReducer;
