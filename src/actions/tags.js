import { CALL_API } from '../middleware/api';

export const TAGS_FETCH_REQUEST = 'TAGS_FETCH_REQUEST';
export const TAGS_FETCH_SUCCESS = 'TAGS_FETCH_SUCCESS';
export const TAGS_FETCH_FAILURE = 'TAGS_FETCH_FAILURE';

export const tagsFetch = id => ({
  [CALL_API]: {
    endpoint: '/tags',
    authenticated: true,
    customConfig: {
      method: 'GET',
      query: {
        category_id: id,
        localized: true
      }
    },
    types: [TAGS_FETCH_REQUEST, TAGS_FETCH_SUCCESS, TAGS_FETCH_FAILURE]
  }
});
