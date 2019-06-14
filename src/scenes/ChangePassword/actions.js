import { CALL_API } from '@middleware/api';

export const PASSWORD_CHANGE_REQUEST = 'PASSWORD_CHANGE_REQUEST';
export const PASSWORD_CHANGE_SUCCESS = 'PASSWORD_CHANGE_SUCCESS';
export const PASSWORD_CHANGE_FAILURE = 'PASSWORD_CHANGE_FAILURE';

export const changePassword = (currentPassword, password, passwordConfirmation) => ({
  [CALL_API]: {
    endpoint: '/password_resets',
    authenticated: true,
    customConfig: {
      method: 'PUT',
      body: JSON.stringify({
        user: {
          current_password: currentPassword,
          password,
          password_confirmation: passwordConfirmation
        }
      })
    },
    types: [PASSWORD_CHANGE_REQUEST, PASSWORD_CHANGE_SUCCESS, PASSWORD_CHANGE_FAILURE]
  }
});
