import {
  AUTHENTICATION_REQUEST,
  AUTHENTICATION_SUCCESS,
  AUTHENTICATION_FAILURE,
  PROFILE_RESET
} from './actions';

const authenticationReducer = (state = {}, action) => {
  switch (action.type) {
    case AUTHENTICATION_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case AUTHENTICATION_SUCCESS:
      return {
        ...state,
        isFetching: false,
        token: action.value,
        authenticated: action.value !== undefined && action.value !== null
      };
    case AUTHENTICATION_FAILURE:
      return {
        ...state,
        isFetching: false
      };
    case PROFILE_RESET:
      return {
        ...state,
        authenticated: false,
        token: null
      };
    default:
      return state;
  }
};

export default authenticationReducer;
