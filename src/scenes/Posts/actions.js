import { CALL_API } from '@middleware/api';
import store from '../../../store';

export const ARTICLES_FETCH_REQUEST = 'ARTICLES_FETCH_REQUEST';
export const ARTICLES_FETCH_FAILURE = 'ARTICLES_FETCH_FAILURE';
export const ARTICLES_FETCH_SUCCESS = 'ARTICLES_FETCH_SUCCESS';
export const SINGLE_ARTICLE_FETCH_REQUEST = 'SINGLE_ARTICLE_FETCH_REQUEST';
export const SINGLE_ARTICLE_FETCH_FAILURE = 'SINGLE_ARTICLE_FETCH_FAILURE';
export const SINGLE_ARTICLE_FETCH_SUCCESS = 'SINGLE_ARTICLE_FETCH_SUCCESS';
export const ARTICLES_REFRESH_REQUEST = 'ARTICLES_REFRESH_REQUEST';
export const ARTICLES_REFRESH_FAILURE = 'ARTICLES_REFRESH_FAILURE';
export const ARTICLES_REFRESH_SUCCESS = 'ARTICLES_REFRESH_SUCCESS';
export const ARTICLES_SEARCH_REQUEST = 'ARTICLES_SEARCH_REQUEST';
export const ARTICLES_SEARCH_FAILURE = 'ARTICLES_SEARCH_FAILURE';
export const ARTICLES_SEARCH_SUCCESS = 'ARTICLES_SEARCH_SUCCESS';
export const ARTICLES_TAGS_REQUEST = 'ARTICLES_TAGS_REQUEST';
export const ARTICLES_TAGS_SUCCESS = 'ARTICLES_TAGS_SUCCESS';
export const ARTICLES_TAGS_FAILURE = 'ARTICLES_TAGS_FAILURE';
export const ARTICLE_TAG_FILTER = 'ARTICLE_TAG_FILTER';
export const ARTICLES_RESET_SEARCH = 'ARTICLES_RESET_SEARCH';
export const RELATED_ARTICLES_FETCH_REQUEST = 'RELATED_ARTICLES_FETCH_REQUEST';
export const RELATED_ARTICLES_FETCH_FAILURE = 'RELATED_ARTICLES_FETCH_FAILURE';
export const RELATED_ARTICLES_FETCH_SUCCESS = 'RELATED_ARTICLES_FETCH_SUCCESS';

export const CLEAR_ARTICLE_FILTER = 'CLEAR_ARTICLE_FILTER';

export const articlesFetch = (page, tag = '') => ({
  [CALL_API]: {
    endpoint: '/posts',
    authenticated: true,
    customConfig: {
      method: 'GET',
      query: {
        localized: true,
        page,
        tags: tag
      }
    },
    params: { page },
    types: [ARTICLES_FETCH_REQUEST, ARTICLES_FETCH_SUCCESS, ARTICLES_FETCH_FAILURE]
  }
});

export const fetchSingleArticle = id => ({
  [CALL_API]: {
    endpoint: `/posts/${id}`,
    authenticated: true,
    customConfig: {
      method: 'GET',
      query: {
        localized: true
      }
    },
    types: [
      SINGLE_ARTICLE_FETCH_REQUEST,
      SINGLE_ARTICLE_FETCH_SUCCESS,
      SINGLE_ARTICLE_FETCH_FAILURE
    ]
  }
});

export const articlesRefresh = (page, tag = '') => ({
  [CALL_API]: {
    endpoint: '/posts',
    authenticated: true,
    customConfig: {
      method: 'GET',
      query: {
        localized: true,
        page,
        tags: tag
      }
    },
    params: { page },
    types: [ARTICLES_REFRESH_REQUEST, ARTICLES_REFRESH_SUCCESS, ARTICLES_REFRESH_FAILURE]
  }
});

export const articlesSearch = (page, query) => ({
  [CALL_API]: {
    endpoint: '/searches',
    authenticated: true,
    customConfig: {
      method: 'GET',
      query: {
        localized: true,
        type: 'post',
        page,
        query
      }
    },
    params: { page },
    types: [ARTICLES_SEARCH_REQUEST, ARTICLES_SEARCH_SUCCESS, ARTICLES_SEARCH_FAILURE]
  }
});

export const articleTagsFetch = () => ({
  [CALL_API]: {
    endpoint: '/tags',
    authenticated: true,
    customConfig: {
      method: 'GET',
      query: {
        localized: true,
        type: 'post'
      }
    },
    types: [ARTICLES_TAGS_REQUEST, ARTICLES_TAGS_SUCCESS, ARTICLES_TAGS_FAILURE]
  }
});

export const relatedArticlesFetch = id => ({
  [CALL_API]: {
    endpoint: `/posts/${id}/related`,
    authenticated: true,
    customConfig: {
      method: 'GET'
    },
    types: [
      RELATED_ARTICLES_FETCH_REQUEST,
      RELATED_ARTICLES_FETCH_SUCCESS,
      RELATED_ARTICLES_FETCH_FAILURE
    ]
  }
});

export const articleTag = tag => ({
  type: ARTICLE_TAG_FILTER,
  tag
});

export const clearFilter = () => ({
  type: CLEAR_ARTICLE_FILTER
});

export const resetMoreData = () => ({
  type: ARTICLES_RESET_SEARCH
});
