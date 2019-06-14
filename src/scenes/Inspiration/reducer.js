import {
  PHOTOS_FETCH_REQUEST,
  PHOTOS_FETCH_SUCCESS,
  PHOTOS_FETCH_FAILURE,
  PHOTOS_SEARCH_REQUEST,
  PHOTOS_SEARCH_SUCCESS,
  PHOTOS_SEARCH_FAILURE,
  PHOTOS_RESET_SEARCH,
  RELATED_PHOTOS_FETCH_REQUEST,
  RELATED_PHOTOS_FETCH_SUCCESS,
  RELATED_PHOTOS_FETCH_FAILURE
} from './actions';

const photosReducer = (state = { isFetchingSearch: false, isFetching: false }, action) => {
  switch (action.type) {
    case PHOTOS_FETCH_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case PHOTOS_FETCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        photos:
          action.params.page === 1
            ? action.response.data
            : [...(state.photos || []), ...action.response.data],
        moreData: action.response.data.length >= 10
      };
    case PHOTOS_FETCH_FAILURE:
      return {
        ...state,
        isFetching: false
      };
    case RELATED_PHOTOS_FETCH_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case RELATED_PHOTOS_FETCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        relatedPhotos: action.response.data
      };
    case RELATED_PHOTOS_FETCH_FAILURE:
      return {
        ...state,
        isFetching: false
      };
    case PHOTOS_SEARCH_REQUEST:
      return {
        ...state,
        isFetchingSearch: true
      };
    case PHOTOS_SEARCH_FAILURE:
      return {
        ...state,
        isFetchingSearch: false
      };
    case PHOTOS_SEARCH_SUCCESS:
      return {
        ...state,
        isFetchingSearch: false,
        photosQueried:
          action.params.page === 1
            ? action.response.data
            : [...(state.photosQueried || []), ...action.response.data],
        moreDataSearch: action.response.data.length >= 10
      };
    case PHOTOS_RESET_SEARCH:
      return {
        ...state,
        photosQueried: [],
        moreDataSearch: true
      };
    default:
      return state;
  }
};

export default photosReducer;
