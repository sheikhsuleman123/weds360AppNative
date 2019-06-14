import { CALL_API } from '@middleware/api';

export const PASSWORD_RESET_REQUEST = 'PASSWORD_RESET_REQUEST';
export const PASSWORD_RESET_SUCCESS = 'PASSWORD_RESET_SUCCESS';
export const PASSWORD_RESET_FAILURE = 'PASSWORD_RESET_FAILURE';

export const passwordResetRequest = email => ({
  [CALL_API]: {
    endpoint: '/password_resets',
    authenticated: false,
    customConfig: {
      method: 'POST',
      query: {
        email
      }
    },
    types: [PASSWORD_RESET_REQUEST, PASSWORD_RESET_SUCCESS, PASSWORD_RESET_FAILURE]
  }
});
