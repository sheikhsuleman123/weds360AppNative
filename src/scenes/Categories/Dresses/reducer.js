import {
  DRESS_FETCH_REQUEST,
  DRESS_FETCH_SUCCESS,
  DRESS_FETCH_FAILURE,
  SINGLE_DRESS_FETCH_REQUEST,
  SINGLE_DRESS_FETCH_SUCCESS,
  SINGLE_DRESS_FETCH_FAILURE,
  DRESS_CUT_FILTER,
  DRESS_TAG_FILTER,
  CLEAR_DRESS_FILTER,
  DRESS_SEARCH_SUCCESS
} from './actions';


import { LIKE_SUCCESS, DISLIKE_SUCCESS } from '../../../actions/likes';


const dressesReducer = (state = { isFetching: false }, action) => {
  switch (action.type) {
    case LIKE_SUCCESS:
      return {
        ...state,
        dresses:
          action.params.type === 'Dress'
            ? state.dresses.map(item => {
                if (item.id === action.params.id) {
                  return { ...item, attributes: { ...item.attributes, liked: true } };
                }
                return item;
              })
            : state.rings
      };
    case DISLIKE_SUCCESS:
    return {
      ...state,
      dresses:
        action.params.type === 'Dress'
          ? state.dresses.map(item => {
              if (item.id === action.params.id) {
                return { ...item, attributes: { ...item.attributes, liked: false } };
              }
              return item;
            })
          : state.rings
    };
    case DRESS_FETCH_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case DRESS_FETCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        dresses:
          action.params.page == 1
            ? action.response.data
            : [...(state.dresses || []), ...action.response.data],
        moreData: action.response.data.length >= 10
      };
    case DRESS_FETCH_FAILURE:
      return {
        ...state,
        isFetching: false
      };
    case SINGLE_DRESS_FETCH_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case SINGLE_DRESS_FETCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        dress: action.response.data
      };
    case SINGLE_DRESS_FETCH_FAILURE:
      return {
        ...state,
        isFetching: false
      };
    case DRESS_CUT_FILTER:
      return {
        ...state,
        dress_cut: action.dress_cut
      };
    case DRESS_TAG_FILTER:
      return {
        ...state,
        tag: action.tag
      };
    case CLEAR_DRESS_FILTER:
      return {
        ...state,
        tag: '',
        dress_cut: ''
      };
    case DRESS_SEARCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        dresses:
          action.params.page == 1
            ? action.response.data
            : [...(state.dresses || []), ...action.response.data],
        moreData: action.response.data.length >= 10
      };
    default:
      return state;
  }
};

export default dressesReducer;
