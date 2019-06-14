import {
  RING_FETCH_REQUEST,
  RING_FETCH_SUCCESS,
  RING_FETCH_FAILURE,
  SINGLE_RING_FETCH_REQUEST,
  SINGLE_RING_FETCH_SUCCESS,
  SINGLE_RING_FETCH_FAILURE,
  CLARITY_FILTER,
  PURITY_FILTER,
  CLEAR_RING_FILTER,
  STONE_SHAPE_FILTER,
  RING_TAG_FILTER,
  RING_SEARCH_SUCCESS
} from './actions';

import { LIKE_SUCCESS, DISLIKE_SUCCESS } from '../../../actions/likes';

const ringsReducer = (state = { isFetchingRings: false }, action) => {
  switch (action.type) {
    case LIKE_SUCCESS:
      return {
        ...state,
        rings:
          action.params.type === 'Ring'
            ? state.rings.map(item => {
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
      rings:
        action.params.type === 'Ring'
          ? state.rings.map(item => {
              if (item.id === action.params.id) {
                return { ...item, attributes: { ...item.attributes, liked: false } };
              }
              return item;
            })
          : state.rings
    };
    case RING_FETCH_REQUEST:
      return {
        ...state,
        isFetchingRings: true
      };
    case RING_FETCH_SUCCESS:
      return {
        ...state,
        isFetchingRings: false,
        rings:
          action.params.page === 1
            ? action.response.data
            : [...(state.rings || []), ...action.response.data],
        moreData: action.response.data.length >= 10
      };
    case RING_FETCH_FAILURE:
      return {
        ...state,
        isFetchingRings: false
      };
    case SINGLE_RING_FETCH_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case SINGLE_RING_FETCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        ring: action.response.data
      };
    case SINGLE_RING_FETCH_FAILURE:
      return {
        ...state,
        isFetching: false
      };
    case CLARITY_FILTER:
      return {
        ...state,
        clarity: action.clarity
      };
    case PURITY_FILTER:
      return {
        ...state,
        purity: action.purity
      };
    case STONE_SHAPE_FILTER:
      return {
        ...state,
        stone_shape: action.stone_shape
      };
    case RING_TAG_FILTER:
      return {
        ...state,
        tag: action.tag
      };
    case CLEAR_RING_FILTER:
      return {
        ...state,
        clarity: '',
        purity: '',
        stone_shape: '',
        tag: ''
      };
    case RING_SEARCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        rings:
          action.params.page === 1
            ? action.response.data
            : [...(state.rings || []), ...action.response.data],
        moreData: action.response.data.length >= 10
      };
    default:
      return state;
  }
};

export default ringsReducer;
