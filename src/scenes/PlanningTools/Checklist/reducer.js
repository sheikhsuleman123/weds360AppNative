import {
  CHECKLIST_FETCH_REQUEST,
  CHECKLIST_FETCH_SUCCESS,
  CHECKLIST_FETCH_FAILURE,
  CHECKLIST_TOGGLE_REQUEST,
  CHECKLIST_TOGGLE_SUCCESS,
  CHECKLIST_TOGGLE_FAILURE,
  CHECKLIST_DELETE_REQUEST,
  CHECKLIST_DELETE_SUCCESS,
  CHECKLIST_DELETE_FAILURE,
  CHECKLIST_CREATE_REQUEST,
  CHECKLIST_CREATE_SUCCESS,
  CHECKLIST_CREATE_FAILURE,
  CHECKLIST_UPDATE_REQUEST,
  CHECKLIST_UPDATE_SUCCESS,
  CHECKLIST_UPDATE_FAILURE,
  SET_PERCENTAGE,
  CLEAR_CHECKLIST_STATUS
} from './actions';

const checklistReducer = (
  state = {
    percentage: 0
  },
  action
) => {
  switch (action.type) {
    case CHECKLIST_FETCH_REQUEST:
      return {
        ...state,
        isFetching: true,
        refresh: false,
        error: false
      };
    case CHECKLIST_FETCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        checklists: action.response.data
      };
    case CHECKLIST_FETCH_FAILURE:
      return {
        ...state,
        isFetching: false
      };
    case CHECKLIST_TOGGLE_REQUEST:
      return {
        ...state
      };
    case CHECKLIST_TOGGLE_SUCCESS:
      return {
        ...state,
        refresh: true
      };
    case CHECKLIST_TOGGLE_FAILURE:
      return {
        ...state,
        error: action.error || true
      };
    case CHECKLIST_DELETE_REQUEST:
      return {
        ...state
      };
    case CHECKLIST_DELETE_SUCCESS:
      return {
        ...state,
        refresh: true
      };
    case CHECKLIST_DELETE_FAILURE:
      return {
        ...state,
        error: action.error || true
      };
    case CHECKLIST_CREATE_REQUEST:
      return {
        ...state
      };
    case CHECKLIST_CREATE_SUCCESS:
      return {
        ...state,
        refresh: true
      };
    case CHECKLIST_CREATE_FAILURE:
      return {
        ...state,
        error: action.error || true
      };
    case CHECKLIST_UPDATE_REQUEST:
      return {
        ...state
      };
    case CHECKLIST_UPDATE_SUCCESS:
      return {
        ...state,
        refresh: true
      };
    case CHECKLIST_UPDATE_FAILURE:
      return {
        ...state,
        error: action.error || true
      };
    case SET_PERCENTAGE:
      return {
        ...state,
        percentage: action.percentage
      };
    case CLEAR_CHECKLIST_STATUS:
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

export default checklistReducer;
