import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from './actions';

const loginReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        token: action.response.token,
        profile_completed: action.response && action.response.profile_completed
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isFetching: false
      };
    default:
      return state;
  }
};

export default loginReducer;
