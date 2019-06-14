import { CALL_API } from '@middleware/api';

export const DRESS_FETCH_REQUEST = 'DRESS_FETCH_REQUEST';
export const DRESS_FETCH_FAILURE = 'DRESS_FETCH_FAILURE';
export const DRESS_FETCH_SUCCESS = 'DRESS_FETCH_SUCCESS';

export const SINGLE_DRESS_FETCH_REQUEST = 'SINGLE_DRESS_FETCH_REQUEST';
export const SINGLE_DRESS_FETCH_FAILURE = 'SINGLE_DRESS_FETCH_FAILURE';
export const SINGLE_DRESS_FETCH_SUCCESS = 'SINGLE_DRESS_FETCH_SUCCESS';

export const DRESS_CUT_FILTER = 'DRESS_CUT_FILTER';
export const DRESS_TAG_FILTER = 'DRESS_TAG_FILTER';
export const CLEAR_DRESS_FILTER = 'CLEAR_DRESS_FILTER';

export const DRESS_SEARCH_SUCCESS = 'DRESS_SEARCH_SUCCESS';

export const dressesFetch = (page, id, dress_cut = '', tag = '') => ({
  [CALL_API]: {
    endpoint: '/dresses',
    authenticated: true,
    customConfig: {
      method: 'GET',
      query: {
        localized: true,
        category_id: id,
        cut: dress_cut,
        tags: tag,
        page
      }
    },
    params: { page },
    types: [DRESS_FETCH_REQUEST, DRESS_FETCH_SUCCESS, DRESS_FETCH_FAILURE]
  }
});

export const singleDressFetch = dress_id => ({
  [CALL_API]: {
    endpoint: `/dresses/${dress_id}`,
    authenticated: true,
    customConfig: {
      method: 'GET'
    },
    types: [SINGLE_DRESS_FETCH_REQUEST, SINGLE_DRESS_FETCH_SUCCESS, SINGLE_DRESS_FETCH_FAILURE]
  }
});

export const dressCutFilter = dress_cut => ({
  type: DRESS_CUT_FILTER,
  dress_cut
});

export const dressTag = tag => ({
  type: DRESS_TAG_FILTER,
  tag
});

export const clearFilter = () => ({
  type: CLEAR_DRESS_FILTER
});

export const dressesSearch = (page, query) => ({
  [CALL_API]: {
    endpoint: '/searches',
    authenticated: true,
    customConfig: {
      method: 'GET',
      query: {
        localized: true,
        type: 'dress',
        query,
        page
      }
    },
    params: { page },
    types: [DRESS_FETCH_REQUEST, DRESS_SEARCH_SUCCESS, DRESS_FETCH_FAILURE]
  }
});
