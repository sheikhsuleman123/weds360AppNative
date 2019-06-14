import {
  REGISTRIES_FETCH_REQUEST,
  REGISTRIES_FETCH_SUCCESS,
  REGISTRIES_FETCH_FAILURE,
  REGISTRIES_CREATE_REQUEST,
  REGISTRIES_CREATE_SUCCESS,
  REGISTRIES_CREATE_FAILURE,
  REGISTRIES_DELETE_REQUEST,
  REGISTRIES_DELETE_SUCCESS,
  REGISTRIES_DELETE_FAILURE,
  REGISTRIES_UPDATE_REQUEST,
  REGISTRIES_UPDATE_SUCCESS,
  REGISTRIES_UPDATE_FAILURE,
  SET_REGISTRIES_PERCENTAGE,
  CLEAR_REGISTRY_STATUS
} from './actions';

const registriesReducer = (
  state = {
    percentage: 0
  },
  action
) => {
  switch (action.type) {
    case REGISTRIES_FETCH_REQUEST:
      return {
        ...state,
        isFetching: true,
        refresh: false,
        error: false
      };
    case REGISTRIES_FETCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        registries: action.response.data
      };
    case REGISTRIES_FETCH_FAILURE:
      return {
        ...state,
        isFetching: false
      };
    case REGISTRIES_CREATE_REQUEST:
      return {
        ...state
      };
    case REGISTRIES_CREATE_SUCCESS:
      return {
        ...state,
        refresh: true
      };
    case REGISTRIES_CREATE_FAILURE:
      return {
        ...state,
        error: action.error || true
      };
    case REGISTRIES_DELETE_REQUEST:
      return {
        ...state
      };
    case REGISTRIES_DELETE_SUCCESS:
      return {
        ...state,
        refresh: true
      };
    case REGISTRIES_DELETE_FAILURE:
      return {
        ...state,
        error: action.error || true
      };
    case REGISTRIES_UPDATE_REQUEST:
      return {
        ...state
      };
    case REGISTRIES_UPDATE_SUCCESS:
      return {
        ...state,
        refresh: true
      };
    case REGISTRIES_UPDATE_FAILURE:
      return {
        ...state,
        error: action.error || true
      };
    case SET_REGISTRIES_PERCENTAGE:
      return {
        ...state,
        percentage: action.percentage
      };
    case CLEAR_REGISTRY_STATUS:
      return {
        ...state,
        error: false,
        refresh: false,
        isFetching: false
      };
    default:
      return state;
  }
};

export default registriesReducer;
