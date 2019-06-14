import {
  BUDGETER_FETCH_REQUEST,
  BUDGETER_FETCH_SUCCESS,
  BUDGETER_FETCH_FAILURE,
  BUDGETER_CREATE_REQUEST,
  BUDGETER_CREATE_SUCCESS,
  BUDGETER_CREATE_FAILURE,
  BUDGETER_UPDATE_REQUEST,
  BUDGETER_UPDATE_SUCCESS,
  BUDGETER_UPDATE_FAILURE,
  BUDGETER_DELETE_REQUEST,
  BUDGETER_DELETE_SUCCESS,
  BUDGETER_DELETE_FAILURE,
  SET_BUDGETER_PERCENTAGE,
  BUDGETER_SET_REQUEST,
  BUDGETER_SET_SUCCESS,
  BUDGETER_SET_FAILURE,
  CLEAR_BUDGETER_STATUS
} from './actions';

const budgeterReducer = (
  state = {
    percentage: 0,
    spent: 0,
    budgetSet: false
  },
  action
) => {
  switch (action.type) {
    case BUDGETER_FETCH_REQUEST:
      return {
        ...state,
        isFetching: true,
        refresh: false,
        error: false,
        budgetSet: false
      };
    case BUDGETER_FETCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        budgeters: action.response.data
      };
    case BUDGETER_FETCH_FAILURE:
      return {
        ...state,
        isFetching: false
      };
    case BUDGETER_CREATE_REQUEST:
      return {
        ...state
      };
    case BUDGETER_CREATE_SUCCESS:
      return {
        ...state,
        refresh: true,
        message: action.response.data
      };
    case BUDGETER_CREATE_FAILURE:
      return {
        ...state,
        error: action.error || true
      };
    case BUDGETER_UPDATE_REQUEST:
      return {
        ...state
      };
    case BUDGETER_UPDATE_SUCCESS:
      return {
        ...state,
        refresh: true
      };
    case BUDGETER_UPDATE_FAILURE:
      return {
        ...state,
        error: action.error || true
      };
    case BUDGETER_DELETE_REQUEST:
      return {
        ...state
      };
    case BUDGETER_DELETE_SUCCESS:
      return {
        ...state,
        refresh: true
      };
    case BUDGETER_DELETE_FAILURE:
      return {
        ...state,
        error: action.error || true
      };
    case SET_BUDGETER_PERCENTAGE:
      return {
        ...state,
        spent: action.spent,
        percentage: action.percentage
      };
    case BUDGETER_SET_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case BUDGETER_SET_SUCCESS:
      return {
        ...state,
        isFetching: false,
        budgetSet: true,
        refresh: true
      };
    case BUDGETER_SET_FAILURE:
      return {
        ...state,
        error: action.error || true,
        isFetching: false
      };
    case CLEAR_BUDGETER_STATUS:
      return {
        ...state,
        error: false,
        refresh: false,
        budgetSet: false,
        isFetching: false
      };
    default:
      return state;
  }
};

export default budgeterReducer;
