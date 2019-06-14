import {
  CATEGORIES_FETCH_REQUEST,
  CATEGORIES_FETCH_SUCCESS,
  CATEGORIES_FETCH_FAILURE,
  INSPIRATIONS_FETCH_REQUEST,
  INSPIRATIONS_FETCH_SUCCESS,
  INSPIRATIONS_FETCH_FAILURE,
  PROFILE_FETCH_REQUEST,
  PROFILE_FETCH_FAILURE,
  PROFILE_FETCH_SUCCESS,
  EDIT_PROFILE_REQUEST,
  EDIT_PROFILE_SUCCESS,
  EDIT_PROFILE_FAILURE,
  HOMESCREEN_RESET
} from './actions';

const homescreenReducer = (state = {}, action) => {
  switch (action.type) {
    case CATEGORIES_FETCH_REQUEST:
      return {
        ...state,
        isFetchingCategories: true
      };
    case CATEGORIES_FETCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        categories: action.response.data
      };
    case CATEGORIES_FETCH_FAILURE:
      return {
        ...state,
        isFetchingCategories: false
      };
    case INSPIRATIONS_FETCH_REQUEST:
      return {
        ...state,
        isFetchingPhotos: true
      };
    case INSPIRATIONS_FETCH_SUCCESS:
      return {
        ...state,
        isFetchingPhotos: false,
        inspirations: action.response.data
      };
    case INSPIRATIONS_FETCH_FAILURE:
      return {
        ...state,
        isFetchingPhotos: false
      };
    case PROFILE_FETCH_REQUEST:
      return {
        ...state,
        isFetchingProfile: true,
        profileFetchFailure: false
      };
    case PROFILE_FETCH_SUCCESS:
      return {
        ...state,
        isFetchingProfile: false,
        profile: action.response.data,
        budget: action.response.data.attributes.profile.data.attributes.budget,
        profileFetchFailure: false
      };
    case PROFILE_FETCH_FAILURE:
      return {
        ...state,
        isFetchingProfile: false,
        profileFetchFailure: true
      };
    case EDIT_PROFILE_REQUEST:
      return {
        ...state,
        isEditing: true
      };
    case EDIT_PROFILE_SUCCESS:
      return {
        ...state,
        isEditing: false,
        profile: action.response.data
      };
    case EDIT_PROFILE_FAILURE:
      return {
        ...state,
        isEditing: false
      };
    case HOMESCREEN_RESET:
      return {
        ...state,
        isFetchingCategories: false,
        profileFetchFailure: false,
        isFetchingPhotos: false,
        isFetchingProfile: false,
        isEditing: false,
        isFetching: false,
        categories: undefined,
        profile: undefined,
        budget: undefined,
        inspirations: undefined
      };
    default:
      return state;
  }
};

export default homescreenReducer;
