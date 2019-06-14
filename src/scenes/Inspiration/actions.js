import { CALL_API } from '@middleware/api';

import store from '../../../store';

export const PHOTOS_FETCH_REQUEST = 'PHOTOS_FETCH_REQUEST';
export const PHOTOS_FETCH_FAILURE = 'PHOTOS_FETCH_FAILURE';
export const PHOTOS_FETCH_SUCCESS = 'PHOTOS_FETCH_SUCCESS';
export const PHOTOS_SEARCH_REQUEST = 'PHOTOS_SEARCH_REQUEST';
export const PHOTOS_SEARCH_FAILURE = 'PHOTOS_SEARCH_FAILURE';
export const PHOTOS_SEARCH_SUCCESS = 'PHOTOS_SEARCH_SUCCESS';
export const PHOTOS_RESET_SEARCH = 'PHOTOS_RESET_SEARCH';
export const RELATED_PHOTOS_FETCH_REQUEST = 'RELATED_PHOTOS_FETCH_REQUEST';
export const RELATED_PHOTOS_FETCH_FAILURE = 'RELATED_PHOTOS_FETCH_FAILURE';
export const RELATED_PHOTOS_FETCH_SUCCESS = 'RELATED_PHOTOS_FETCH_SUCCESS';

export const photosFetch = page => ({
  [CALL_API]: {
    endpoint: '/photos',
    authenticated: true,
    customConfig: {
      method: 'GET',
      query: {
        localized: true,
        page
      }
    },
    params: { page },
    types: [PHOTOS_FETCH_REQUEST, PHOTOS_FETCH_SUCCESS, PHOTOS_FETCH_FAILURE]
  }
});

export const relatedPhotosFetch = id => ({
  [CALL_API]: {
    endpoint: `/photos/${id}/related`,
    authenticated: true,
    customConfig: {
      method: 'GET',
      localized: true
    },
    types: [
      RELATED_PHOTOS_FETCH_REQUEST,
      RELATED_PHOTOS_FETCH_SUCCESS,
      RELATED_PHOTOS_FETCH_FAILURE
    ]
  }
});

export const photosSearch = (page, query) => ({
  [CALL_API]: {
    endpoint: '/searches',
    authenticated: true,
    customConfig: {
      method: 'GET',
      query: {
        localized: true,
        type: 'photo',
        query,
        page
      }
    },
    params: { page },
    types: [PHOTOS_SEARCH_REQUEST, PHOTOS_SEARCH_SUCCESS, PHOTOS_SEARCH_FAILURE]
  }
});

export const resetMoreData = () => ({
  type: PHOTOS_RESET_SEARCH
});
