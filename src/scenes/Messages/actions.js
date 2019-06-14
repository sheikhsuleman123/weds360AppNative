import { CALL_API } from '@middleware/api';
export const CONVERSATIONS_FETCH_REQUEST = 'CONVERSATIONS_FETCH_REQUEST';
export const CONVERSATIONS_FETCH_FAILURE = 'CONVERSATIONS_FETCH_FAILURE';
export const CONVERSATIONS_FETCH_SUCCESS = 'CONVERSATIONS_FETCH_SUCCESS';
export const SINGLE_CONVERSATION_FETCH_REQUEST = 'SINGLE_CONVERSATION_FETCH_REQUEST';
export const SINGLE_CONVERSATION_FETCH_FAILURE = 'SINGLE_CONVERSATION_FETCH_FAILURE';
export const SINGLE_CONVERSATION_FETCH_SUCCESS = 'SINGLE_CONVERSATION_FETCH_SUCCESS';
export const SINGLE_CONVERSATION_REPLY_REQUEST = 'SINGLE_CONVERSATION_REPLY_REQUEST';
export const SINGLE_CONVERSATION_REPLY_FAILURE = 'SINGLE_CONVERSATION_REPLY_FAILURE';
export const SINGLE_CONVERSATION_REPLY_SUCCESS = 'SINGLE_CONVERSATION_REPLY_SUCCESS';
export const UPDATE_CONVERSATIONS = 'UPDATE_CONVERSATIONS';
export const SINGLE_CONVERSATION_RESET = 'SINGLE_CONVERSATION_RESET';

export const CREATE_CONVERSATION_REQUEST = 'CREATE_CONVERSATION_REQUEST';
export const CREATE_CONVERSATION_SUCCESS = 'CREATE_CONVERSATION_SUCCESS';
export const CREATE_CONVERSATION_FAILURE = 'CREATE_CONVERSATION_FAILURE';

export const CONVERSATION_START = 'CONVERSATION_START';

export const conversationsFetch = () => ({
  [CALL_API]: {
    endpoint: '/conversations',
    authenticated: true,
    customConfig: {
      method: 'GET'
    },
    types: [CONVERSATIONS_FETCH_REQUEST, CONVERSATIONS_FETCH_SUCCESS, CONVERSATIONS_FETCH_FAILURE]
  }
});

export const conversationFetch = conversation_id => ({
  [CALL_API]: {
    endpoint: `/conversations/${conversation_id}`,
    authenticated: true,
    customConfig: {
      method: 'GET'
    },
    types: [
      SINGLE_CONVERSATION_FETCH_REQUEST,
      SINGLE_CONVERSATION_FETCH_SUCCESS,
      SINGLE_CONVERSATION_FETCH_FAILURE
    ]
  }
});

export const replyConversation = (conversation_id, text, image) => {
  const form = getFormData(image);
  form.append('message', text);
  return {
    [CALL_API]: {
      endpoint: `/conversations/${conversation_id}`,
      authenticated: true,
      customConfig: {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        method: 'PUT',
        body: form
      },
      types: [
        SINGLE_CONVERSATION_REPLY_REQUEST,
        SINGLE_CONVERSATION_REPLY_SUCCESS,
        SINGLE_CONVERSATION_REPLY_FAILURE
      ]
    }
  };
};

export const createConversation = (recipient_id, message, image) => {
  const form = getFormData(image);
  form.append('message', message);
  form.append('recipient_id', recipient_id);
  return {
    [CALL_API]: {
      endpoint: '/conversations',
      authenticated: true,
      customConfig: {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        method: 'POST',
        body: form
      },
      types: [CREATE_CONVERSATION_REQUEST, CREATE_CONVERSATION_SUCCESS, CREATE_CONVERSATION_FAILURE]
    }
  };
};

export const conversationStart = () => ({
  type: CONVERSATION_START
});

export const resetSingleConversation = () => ({ type: SINGLE_CONVERSATION_RESET });

export const feedConversations = (conversation_id, content) => dispatch =>
  dispatch({
    type: UPDATE_CONVERSATIONS,
    conversation_id,
    content
  });

const getFormData = image => {
  const formData = new FormData();
  if (image) {
    const uri = image.uri;
    const uriParts = uri.split('/');
    const name = uriParts[uriParts.length - 1];
    formData.append('attachment', {
      uri,
      name: `${name}`,
      type: 'image/jpeg'
    });
  }
  return formData;
};
