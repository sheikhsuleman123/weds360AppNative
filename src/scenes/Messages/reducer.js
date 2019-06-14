import {
  CONVERSATIONS_FETCH_REQUEST,
  CONVERSATIONS_FETCH_FAILURE,
  CONVERSATIONS_FETCH_SUCCESS,
  SINGLE_CONVERSATION_FETCH_REQUEST,
  SINGLE_CONVERSATION_FETCH_FAILURE,
  SINGLE_CONVERSATION_FETCH_SUCCESS,
  SINGLE_CONVERSATION_REPLY_REQUEST,
  SINGLE_CONVERSATION_REPLY_FAILURE,
  SINGLE_CONVERSATION_REPLY_SUCCESS,
  UPDATE_CONVERSATIONS,
  CREATE_CONVERSATION_REQUEST,
  CREATE_CONVERSATION_SUCCESS,
  CREATE_CONVERSATION_FAILURE,
  CONVERSATION_START,
  SINGLE_CONVERSATION_RESET
} from './actions';

const conversationsReducer = (state = { isFetching: false }, action) => {
  switch (action.type) {
    case CONVERSATIONS_FETCH_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case CONVERSATIONS_FETCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        conversations: action.response.data
      };
    case CONVERSATIONS_FETCH_FAILURE:
      return {
        ...state,
        isFetching: false
      };
    case SINGLE_CONVERSATION_FETCH_REQUEST:
      return {
        ...state,
        isFetching: true,
        single_conversation: null
      };
    case SINGLE_CONVERSATION_FETCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        single_conversation: action.response.data
      };
    case SINGLE_CONVERSATION_FETCH_FAILURE:
      return {
        ...state,
        isFetching: false
      };
    case SINGLE_CONVERSATION_REPLY_REQUEST:
      return {
        ...state,
        isFetching: true,
        single_conversation: null
      };
    case SINGLE_CONVERSATION_REPLY_SUCCESS:
      return {
        ...state,
        isFetching: false,
        single_conversation: action.response.data
      };
    case SINGLE_CONVERSATION_REPLY_FAILURE:
      return {
        ...state,
        isFetching: false
      };
    case CREATE_CONVERSATION_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case CREATE_CONVERSATION_SUCCESS:
      return {
        ...state,
        isFetching: false,
        conversation_id: action.response.data.id
      };
    case CREATE_CONVERSATION_FAILURE:
      return {
        ...state,
        isFetching: false
      };
    case UPDATE_CONVERSATIONS:
      return {
        ...state,
        conversations: state.conversations.map(conv => {
          if (conv.id === action.content.id) conv.content = action.content.attributes;
          return conv;
        })
      };
    case CONVERSATION_START:
      return {
        ...state,
        isFetching: false
      };
    case SINGLE_CONVERSATION_RESET:
      return {
        ...state,
        single_conversation: undefined
      };
    default:
      return state;
  }
};

export default conversationsReducer;
