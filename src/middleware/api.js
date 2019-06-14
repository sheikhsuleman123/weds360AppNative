import { AsyncStorage } from 'react-native';
import 'es6-symbol/implement';
import { BASE_URL } from '../constants';
import { createQueryString } from '../utils';

const callApi = async (endpoint, authenticated, customConfig = {}, params) => {
  let token = null;

  // append query string to the endpoint if existed
  const { query, paginated, ...modifiedCustomConfig } = customConfig;

  /* Following part will only get executed if the request is a 'GET' method and
       contains @query in order to handle final endpoint creation.
     */
  let querySubstring = '';
  let modifiedEndpoint = '';
  try {
    if (query !== undefined) {
      querySubstring = `${createQueryString(query, paginated, params)}`;
    }
    /* appends actual query after the endpoint ie: /products also handles pagination */
    modifiedEndpoint += `${endpoint}${querySubstring}`;
  } catch (e) {
    console.log(e);
  }

  const config = {
    headers: {
      'Content-Type': 'application/json'
    },
    ...modifiedCustomConfig
  };

  if (authenticated) {
    token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `${token}`;
    } else {
      throw new Error('No token saved!');
    }
  }
  return fetch(BASE_URL + modifiedEndpoint, config)
    .then(response => response.text().then(text => ({ text, response })))
    .then(({ text, response }) => {
      if (!response.ok) {
        return Promise.reject(text);
      }
      return text || response;
    });
};

export const CALL_API = Symbol('Call API');

export default store => next => action => {
  const callAPI = action[CALL_API];
  // So the middleware doesn't get applied to every single action
  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  const { endpoint, types, authenticated, customConfig, params } = callAPI;

  const [requestType, successType, errorType] = types;
  next({ type: requestType, endPoint: endpoint, customConfig, params });
  return callApi(endpoint, authenticated, customConfig, params).then(
    text => {
      const response = text !== ' ' && typeof text !== 'object' ? JSON.parse(text) : text;
      return next({
        response,
        authenticated,
        type: successType,
        params
      });
    },
    error => {
      let responseError = error;
      try {
        responseError = JSON.parse(error);
      } catch (e) {}
      return next({
        error: responseError,
        type: errorType
      });
    }
  );
};
