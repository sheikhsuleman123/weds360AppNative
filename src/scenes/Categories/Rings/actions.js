import { CALL_API } from '@middleware/api';

export const RING_FETCH_REQUEST = 'RING_FETCH_REQUEST';
export const RING_FETCH_FAILURE = 'RING_FETCH_FAILURE';
export const RING_FETCH_SUCCESS = 'RING_FETCH_SUCCESS';
export const RING_SEARCH_SUCCESS = 'RING_SEARCH_SUCCESS';

export const SINGLE_RING_FETCH_REQUEST = 'SINGLE_RING_FETCH_REQUEST';
export const SINGLE_RING_FETCH_FAILURE = 'SINGLE_RING_FETCH_FAILURE';
export const SINGLE_RING_FETCH_SUCCESS = 'SINGLE_RING_FETCH_SUCCESS';

export const CLARITY_FILTER = 'CLARITY_FILTER';
export const CLEAR_RING_FILTER = 'CLEAR_RING_FILTER';
export const PURITY_FILTER = 'PURITY_FILTER';
export const STONE_SHAPE_FILTER = 'STONE_SHAPE_FILTER';
export const RING_TAG_FILTER = 'RING_TAG_FILTER';

export const ringsFetch = (page, id, stone_shape = '', clarity = '', purity = '', tag = '') => ({
  [CALL_API]: {
    endpoint: '/rings',
    authenticated: true,
    customConfig: {
      method: 'GET',
      query: {
        localized: true,
        category_id: id,
        max_clarity: clarity,
        max_purity: purity,
        stone_shape,
        tags: tag,
        page
      }
    },
    params: { page },
    types: [RING_FETCH_REQUEST, RING_FETCH_SUCCESS, RING_FETCH_FAILURE]
  }
});

export const singleRingFetch = ring_id => ({
  [CALL_API]: {
    endpoint: `/rings/${ring_id}`,
    authenticated: true,
    customConfig: {
      method: 'GET'
    },
    types: [SINGLE_RING_FETCH_REQUEST, SINGLE_RING_FETCH_SUCCESS, SINGLE_RING_FETCH_FAILURE]
  }
});

export const clarityFilter = clarity => ({
  type: CLARITY_FILTER,
  clarity
});

export const purityFilter = purity => ({
  type: PURITY_FILTER,
  purity
});

export const stoneShapeFilter = stone_shape => ({
  type: STONE_SHAPE_FILTER,
  stone_shape
});

export const ringTag = tag => ({
  type: RING_TAG_FILTER,
  tag
});

export const clearFilter = () => ({
  type: CLEAR_RING_FILTER
});

export const ringsSearch = (page, query) => ({
  [CALL_API]: {
    endpoint: '/searches',
    authenticated: true,
    customConfig: {
      method: 'GET',
      query: {
        type: 'ring',
        query,
        page
      }
    },
    params: { page },
    types: [RING_FETCH_REQUEST, RING_SEARCH_SUCCESS, RING_FETCH_FAILURE]
  }
});
