import {
  SERVICES_FETCH_REQUEST,
  SERVICES_FETCH_SUCCESS,
  SERVICES_FETCH_FAILURE,
  ALL_SERVICES_FETCH_REQUEST,
  ALL_SERVICES_FETCH_SUCCESS,
  ALL_SERVICES_FETCH_FAILURE,
  SINGLE_SERVICE_FETCH_REQUEST,
  SINGLE_SERVICE_FETCH_SUCCESS,
  SINGLE_SERVICE_FETCH_FAILURE,
  USER_SERVICES_FETCH_REQUEST,
  USER_SERVICES_FETCH_SUCCESS,
  USER_SERVICES_FETCH_FAILURE,
  VENUE_RANGE_FILTER,
  VENUE_CLEAR_FILTER,
  SERVICE_TAG_FILTER,
  SERVICES_SEARCH_SUCCESS,
  SERVICES_RESET
} from './actions';

import { LIKE_SUCCESS, DISLIKE_SUCCESS } from '../../../actions/likes';


const servicesReducer = (state = { isFetching: false }, action) => {
  switch (action.type) {
    case LIKE_SUCCESS:
      return {
        ...state,
        services:
          action.params.type === 'Service'
            ? state.services.map(item => {
                if (item.id === action.params.id) {
                  return { ...item, attributes: { ...item.attributes, liked: true } };
                }
                return item;
              })
            : state.services
      };
    case DISLIKE_SUCCESS:
    return {
      ...state,
      services:
        action.params.type === 'Service'
          ? state.services.map(item => {
              if (item.id === action.params.id) {
                return { ...item, attributes: { ...item.attributes, liked: false } };
              }
              return item;
            })
          : state.services
    };
    case SERVICES_FETCH_REQUEST:
      return {
        ...state,
        isFetching: true,
        services: undefined
      };
    case SERVICES_FETCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        services: action.response.data
      };
    case SERVICES_FETCH_FAILURE:
      return {
        ...state,
        isFetching: false
      };
    case ALL_SERVICES_FETCH_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case ALL_SERVICES_FETCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        allServices: action.response.data
      };
    case ALL_SERVICES_FETCH_FAILURE:
      return {
        ...state,
        isFetching: false
      };
    case SINGLE_SERVICE_FETCH_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case SINGLE_SERVICE_FETCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        service: action.response.data
      };
    case SINGLE_SERVICE_FETCH_FAILURE:
      return {
        ...state,
        isFetching: false
      };
    case USER_SERVICES_FETCH_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case USER_SERVICES_FETCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        userServices: action.response.data
      };
    case USER_SERVICES_FETCH_FAILURE:
      return {
        ...state,
        isFetching: false
      };
    case VENUE_RANGE_FILTER:
      return {
        ...state,
        max_range: action.max_range
      };
    case SERVICE_TAG_FILTER:
      return {
        ...state,
        tag: action.tag
      };
    case VENUE_CLEAR_FILTER:
      return {
        ...state,
        max_range: '',
        tag: ''
      };
    case SERVICES_SEARCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        services: action.response.data
      };
    case SERVICES_RESET:
      return { ...state, services: undefined };
    default:
      return state;
  }
};

export default servicesReducer;
