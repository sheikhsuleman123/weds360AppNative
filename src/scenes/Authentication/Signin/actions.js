import { CALL_API } from '@middleware/api';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const login = (email, pass) => ({
    [CALL_API]: {
      endpoint: '/authenticate',
      authenticated: false,
      customConfig: {
        method: 'POST',
        body: JSON.stringify({
          email,
          password: pass
        })
      },
      types: [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE]
    }
  });
