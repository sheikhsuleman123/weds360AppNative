import { AsyncStorage } from 'react-native';

export const AUTHENTICATION_REQUEST = 'AUTHENTICATION_REQUEST';
export const AUTHENTICATION_SUCCESS = 'AUTHENTICATION_SUCCESS';
export const AUTHENTICATION_FAILURE = 'AUTHENTICATION_FAILURE';
export const PROFILE_RESET = 'PROFILE_RESET';

export const handleProfileReset = () => dispatch => {
  dispatch({
    type: PROFILE_RESET
  });
};
