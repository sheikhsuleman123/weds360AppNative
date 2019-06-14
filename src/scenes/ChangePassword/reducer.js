import {
  PASSWORD_CHANGE_REQUEST,
  PASSWORD_CHANGE_SUCCESS,
  PASSWORD_CHANGE_FAILURE
} from './actions';

const changepasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case PASSWORD_CHANGE_REQUEST:
      return { ...state, isFetchingPasswordRequest: true };
    case PASSWORD_CHANGE_SUCCESS:
      return { ...state, isFetchingPasswordRequest: false, failureChangePasswordUtils: false };
    case PASSWORD_CHANGE_FAILURE:
      return {
        ...state,
        isFetchingPasswordRequest: false,
        failureChangePasswordUtils: true,
        passwordError: action.error
      };
    default:
      return state;
  }
};

export default changepasswordReducer;
