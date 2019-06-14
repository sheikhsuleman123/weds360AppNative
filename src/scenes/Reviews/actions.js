import { CALL_API } from '@middleware/api';

export const REVIEW_CREATE_REQUEST = 'REVIEW_CREATE_REQUEST';
export const REVIEW_CREATE_FAILURE = 'REVIEW_CREATE_FAILURE';
export const REVIEW_CREATE_SUCCESS = 'REVIEW_CREATE_SUCCESS';

export const TOGGLE_REVIEW_REFRESH = 'TOGGLE_REVIEW_REFRESH';

export const reviewCreate = body => ({
  [CALL_API]: {
    endpoint: '/reviews',
    authenticated: true,
    customConfig: {
      method: 'POST',
      body
    },
    types: [REVIEW_CREATE_REQUEST, REVIEW_CREATE_SUCCESS, REVIEW_CREATE_FAILURE]
  }
});

export const reviewed = () => ({
  type: TOGGLE_REVIEW_REFRESH
});
