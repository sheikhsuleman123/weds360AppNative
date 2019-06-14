import { CALL_API } from '@middleware/api';

export const SERVICES_FETCH_REQUEST = 'SERVICES_FETCH_REQUEST';
export const SERVICES_FETCH_FAILURE = 'SERVICES_FETCH_FAILURE';
export const SERVICES_FETCH_SUCCESS = 'SERVICES_FETCH_SUCCESS';

export const ALL_SERVICES_FETCH_REQUEST = 'ALL_SERVICES_FETCH_REQUEST';
export const ALL_SERVICES_FETCH_FAILURE = 'ALL_SERVICES_FETCH_FAILURE';
export const ALL_SERVICES_FETCH_SUCCESS = 'ALL_SERVICES_FETCH_SUCCESS';

export const SINGLE_SERVICE_FETCH_REQUEST = 'SINGLE_SERVICE_FETCH_REQUEST';
export const SINGLE_SERVICE_FETCH_FAILURE = 'SINGLE_SERVICE_FETCH_FAILURE';
export const SINGLE_SERVICE_FETCH_SUCCESS = 'SINGLE_SERVICE_FETCH_SUCCESS';

export const USER_SERVICES_FETCH_REQUEST = 'USER_SERVICES_FETCH_REQUEST';
export const USER_SERVICES_FETCH_FAILURE = 'USER_SERVICES_FETCH_FAILURE';
export const USER_SERVICES_FETCH_SUCCESS = 'USER_SERVICES_FETCH_SUCCESS';
export const SERVICES_SEARCH_SUCCESS = 'SERVICES_SEARCH_SUCCESS';
export const SERVICES_RESET = 'SERVICES_RESET';

export const VENUE_RANGE_FILTER = 'VENUE_RANGE_FILTER';
export const VENUE_CLEAR_FILTER = 'VENUE_CLEAR_FILTER';
export const SERVICE_TAG_FILTER = 'SERVICE_TAG_FILTER';

export const servicesFetch = (id, max_range = '', tag = '') => ({
  [CALL_API]: {
    endpoint: '/services',
    authenticated: true,
    customConfig: {
      method: 'GET',
      query: {
        category_id: id,
        localized: true,
        max_range,
        tags: tag
      }
    },
    types: [SERVICES_FETCH_REQUEST, SERVICES_FETCH_SUCCESS, SERVICES_FETCH_FAILURE]
  }
});

export const allServicesFetch = () => ({
  [CALL_API]: {
    endpoint: '/services',
    authenticated: true,
    customConfig: {
      method: 'GET',
      query: {
        localized: true
      }
    },
    types: [ALL_SERVICES_FETCH_REQUEST, ALL_SERVICES_FETCH_SUCCESS, ALL_SERVICES_FETCH_FAILURE]
  }
});

export const singleServiceFetch = id => ({
  [CALL_API]: {
    endpoint: `/services/${id}`,
    authenticated: true,
    customConfig: {
      method: 'GET'
    },
    types: [
      SINGLE_SERVICE_FETCH_REQUEST,
      SINGLE_SERVICE_FETCH_SUCCESS,
      SINGLE_SERVICE_FETCH_FAILURE
    ]
  }
});

export const userServicesFetch = () => ({
  [CALL_API]: {
    endpoint: '/users/services',
    authenticated: true,
    customConfig: {
      method: 'GET'
    },
    types: [USER_SERVICES_FETCH_REQUEST, USER_SERVICES_FETCH_SUCCESS, USER_SERVICES_FETCH_FAILURE]
  }
});

export const serviceRangeFilter = max_range => ({
  type: VENUE_RANGE_FILTER,
  max_range
});

export const serviceTag = tag => ({
  type: SERVICE_TAG_FILTER,
  tag
});

export const resetServices = tag => ({
  type: SERVICES_RESET,
  tag
});

export const clearFilter = () => ({
  type: VENUE_CLEAR_FILTER
});

export const servicesSearch = (category_id, query) => ({
  [CALL_API]: {
    endpoint: '/searches',
    authenticated: true,
    customConfig: {
      method: 'GET',
      query: {
        category_id,
        type: 'service',
        query
      }
    },
    types: [SERVICES_FETCH_REQUEST, SERVICES_SEARCH_SUCCESS, SERVICES_FETCH_FAILURE]
  }
});
