import { AsyncStorage } from 'react-native';
export const AUTHENTICATION_REQUEST = 'AUTHENTICATION_REQUEST';
export const AUTHENTICATION_SUCCESS = 'AUTHENTICATION_SUCCESS';
export const AUTHENTICATION_FAILURE = 'AUTHENTICATION_FAILURE';

export const PROFILE_RESET = 'PROFILE_RESET';

export const TOKEN_STORE = 'TOKEN_STORE';

export const CONNECTION_STORE = 'CONNECTION_STORE';

export const profileSignOut = () => dispatch => {
  dispatch({
    type: PROFILE_RESET
  });
};

export const storeToken = token => dispatch => {
  dispatch({
    type: TOKEN_STORE,
    token
  });
};

export const setConnection = connected => dispatch => {
  dispatch({
    type: CONNECTION_STORE,
    connected
  });
};
