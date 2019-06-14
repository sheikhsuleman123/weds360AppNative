import {
  ARTICLES_FETCH_REQUEST,
  ARTICLES_FETCH_SUCCESS,
  ARTICLES_FETCH_FAILURE,
  ARTICLES_RESET_SEARCH,
  SINGLE_ARTICLE_FETCH_REQUEST,
  SINGLE_ARTICLE_FETCH_SUCCESS,
  SINGLE_ARTICLE_FETCH_FAILURE,
  ARTICLES_SEARCH_REQUEST,
  ARTICLES_SEARCH_SUCCESS,
  ARTICLES_SEARCH_FAILURE,
  ARTICLES_TAGS_REQUEST,
  ARTICLES_TAGS_SUCCESS,
  ARTICLES_TAGS_FAILURE,
  ARTICLE_TAG_FILTER,
  CLEAR_ARTICLE_FILTER,
  RELATED_ARTICLES_FETCH_REQUEST,
  RELATED_ARTICLES_FETCH_SUCCESS,
  RELATED_ARTICLES_FETCH_FAILURE,
  ARTICLES_REFRESH_REQUEST,
  ARTICLES_REFRESH_SUCCESS,
  ARTICLES_REFRESH_FAILURE
} from './actions';

const articlesReducer = (
  state = { isFetchingSearch: false, isFetchingArticles: false },
  action
) => {
  switch (action.type) {
    case ARTICLES_REFRESH_REQUEST:
      return {
        ...state,
        isFetchingArticles: action.params && action.params.page === 1,
        fetched: true
      };
    case ARTICLES_REFRESH_SUCCESS:
      return {
        ...state,
        isFetchingArticles: false,
        articles: action.response.data,
        moreData: action.response.data.length >= 5
      };
    case ARTICLES_REFRESH_FAILURE:
      return {
        ...state,
        isFetchingArticles: false
      };
    case ARTICLES_FETCH_REQUEST:
      return {
        ...state,
        isFetchingArticles: action.params && action.params.page === 1,
        fetched: true
      };
    case ARTICLES_FETCH_SUCCESS:
      return {
        ...state,
        isFetchingArticles: false,
        articles:
          action.params.page === 1
            ? action.response.data
            : [...(state.articles || []), ...action.response.data],
        moreData: action.response.data.length >= 5
      };
    case ARTICLES_FETCH_FAILURE:
      return {
        ...state,
        isFetchingArticles: false
      };
    case ARTICLES_SEARCH_FAILURE:
      return {
        ...state,
        isFetchingSearch: false
      };
    case ARTICLES_SEARCH_REQUEST:
      return {
        ...state,
        isFetchingSearch: true
      };
    case ARTICLES_SEARCH_SUCCESS:
      return {
        ...state,
        isFetchingSearch: false,
        articlesQueried:
          action.params.page === 1
            ? action.response.data
            : [...(state.articlesQueried || []), ...action.response.data],
        moreDataSearch: action.response.data.length >= 10
      };
    case ARTICLES_RESET_SEARCH:
      return {
        ...state,
        articlesQueried: [],
        moreDataSearch: true
      };
    case SINGLE_ARTICLE_FETCH_REQUEST:
      return {
        ...state,
        isFetchingSingleArticle: true,
        singleArticle: undefined,
        relatedArticles: undefined
      };
    case SINGLE_ARTICLE_FETCH_SUCCESS:
      return {
        ...state,
        isFetchingSingleArticle: false,
        singleArticle: action.response.data
      };
    case SINGLE_ARTICLE_FETCH_FAILURE:
      return {
        ...state,
        isFetchingSingleArticle: false
      };
    case ARTICLES_TAGS_REQUEST:
      return {
        ...state
      };
    case ARTICLES_TAGS_SUCCESS:
      return {
        ...state,
        tags: action.response.data
      };
    case ARTICLES_TAGS_FAILURE:
      return {
        ...state
      };
    case ARTICLE_TAG_FILTER:
      return {
        ...state,
        tag: action.tag
      };
    case CLEAR_ARTICLE_FILTER:
      return {
        ...state,
        tag: ''
      };
    case RELATED_ARTICLES_FETCH_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case RELATED_ARTICLES_FETCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        relatedArticles: action.response.data
      };
    case RELATED_ARTICLES_FETCH_FAILURE:
      return {
        ...state,
        isFetching: false
      };
    default:
      return state;
  }
};

export default articlesReducer;
