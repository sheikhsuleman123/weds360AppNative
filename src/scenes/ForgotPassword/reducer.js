import { PASSWORD_RESET_REQUEST, PASSWORD_RESET_SUCCESS, PASSWORD_RESET_FAILURE } from './actions';

const forgotpasswordReducer = (state = { fetchingForgotPasswordUtils: false }, action) => {
  switch (action.type) {
    case PASSWORD_RESET_REQUEST:
      return {
        ...state,
        isFetchingPasswordRequest: true
      };
    case PASSWORD_RESET_SUCCESS:
      return {
        ...state,
        isFetchingPasswordRequest: false
      };
    case PASSWORD_RESET_FAILURE:
      return {
        ...state,
        isFetchingPasswordRequest: false
      };
    default:
      return state;
  }
};

export default forgotpasswordReducer;
