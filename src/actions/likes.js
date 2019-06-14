import { CALL_API } from '../middleware/api';
export const LIKE_REQUEST = 'LIKE_REQUEST';
export const LIKE_FAILURE = 'LIKE_FAILURE';
export const LIKE_SUCCESS = 'LIKE_SUCCESS';

export const DISLIKE_REQUEST = 'DISLIKE_REQUEST';
export const DISLIKE_FAILURE = 'DISLIKE_FAILURE';
export const DISLIKE_SUCCESS = 'DISLIKE_SUCCESS';

export const TOGGLE_REFRESH = 'TOGGLE_REFRESH';

export const likeResource = (id, type) => ({
  [CALL_API]: {
    endpoint: '/likes',
    authenticated: true,
    customConfig: {
      method: 'POST',
      body: JSON.stringify({
        id,
        type
      })
    },
    types: [LIKE_REQUEST, LIKE_SUCCESS, LIKE_FAILURE],
    params: { id, type }
  }
});

export const dislikeResource = (id, type) => ({
  [CALL_API]: {
    endpoint: `/likes/${id}`,
    authenticated: true,
    customConfig: {
      method: 'DELETE',
      body: JSON.stringify({
        type
      })
    },
    types: [DISLIKE_REQUEST, DISLIKE_SUCCESS, DISLIKE_FAILURE],
    params: { id, type }
  }
});

export const liked = () => ({
  type: TOGGLE_REFRESH
});
