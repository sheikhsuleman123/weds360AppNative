import { CALL_API } from '@middleware/api';

export const CHECKLIST_FETCH_REQUEST = 'CHECKLIST_FETCH_REQUEST';
export const CHECKLIST_FETCH_FAILURE = 'CHECKLIST_FETCH_FAILURE';
export const CHECKLIST_FETCH_SUCCESS = 'CHECKLIST_FETCH_SUCCESS';

export const CHECKLIST_TOGGLE_REQUEST = 'CHECKLIST_TOGGLE_REQUEST';
export const CHECKLIST_TOGGLE_FAILURE = 'CHECKLIST_TOGGLE_FAILURE';
export const CHECKLIST_TOGGLE_SUCCESS = 'CHECKLIST_TOGGLE_SUCCESS';

export const CHECKLIST_DELETE_REQUEST = 'CHECKLIST_DELETE_REQUEST';
export const CHECKLIST_DELETE_FAILURE = 'CHECKLIST_DELETE_FAILURE';
export const CHECKLIST_DELETE_SUCCESS = 'CHECKLIST_DELETE_SUCCESS';

export const CHECKLIST_CREATE_REQUEST = 'CHECKLIST_CREATE_REQUEST';
export const CHECKLIST_CREATE_FAILURE = 'CHECKLIST_CREATE_FAILURE';
export const CHECKLIST_CREATE_SUCCESS = 'CHECKLIST_CREATE_SUCCESS';

export const CHECKLIST_UPDATE_REQUEST = 'CHECKLIST_UPDATE_REQUEST';
export const CHECKLIST_UPDATE_FAILURE = 'CHECKLIST_UPDATE_FAILURE';
export const CHECKLIST_UPDATE_SUCCESS = 'CHECKLIST_UPDATE_SUCCESS';

export const SET_PERCENTAGE = 'SET_PERCENTAGE';

export const CLEAR_CHECKLIST_STATUS = 'CLEAR_CHECKLIST_STATUS';

export const checklistFetch = () => ({
  [CALL_API]: {
    endpoint: '/check_lists',
    authenticated: true,
    customConfig: {
      method: 'GET',
      query: {
        localized: true
      }
    },
    types: [CHECKLIST_FETCH_REQUEST, CHECKLIST_FETCH_SUCCESS, CHECKLIST_FETCH_FAILURE]
  }
});

export const toggleDone = id => ({
  [CALL_API]: {
    endpoint: `/check_lists/${id}/toggle_done`,
    authenticated: true,
    customConfig: {
      method: 'GET'
    },
    types: [CHECKLIST_TOGGLE_REQUEST, CHECKLIST_TOGGLE_SUCCESS, CHECKLIST_TOGGLE_FAILURE]
  }
});

export const checklistDelete = id => ({
  [CALL_API]: {
    endpoint: `/check_lists/${id}`,
    authenticated: true,
    customConfig: {
      method: 'DELETE'
    },
    types: [CHECKLIST_DELETE_REQUEST, CHECKLIST_DELETE_SUCCESS, CHECKLIST_DELETE_FAILURE]
  }
});

export const checklistCreate = (title, description) => ({
  [CALL_API]: {
    endpoint: '/check_lists',
    authenticated: true,
    customConfig: {
      method: 'POST',
      body: JSON.stringify({
        check_list_item: {
          title_en: title,
          title_ar: title,
          description_en: description,
          description_ar: description
        }
      }),
      query: {
        localized: true
      }
    },
    types: [CHECKLIST_CREATE_REQUEST, CHECKLIST_CREATE_SUCCESS, CHECKLIST_CREATE_FAILURE]
  }
});

export const checklistUpdate = (id, note) => ({
  [CALL_API]: {
    endpoint: `/check_lists/${id}`,
    authenticated: true,
    customConfig: {
      method: 'PUT',
      body: JSON.stringify({
        user_check_list_item: {
          note
        }
      })
    },
    types: [CHECKLIST_UPDATE_REQUEST, CHECKLIST_UPDATE_SUCCESS, CHECKLIST_UPDATE_FAILURE]
  }
});

export const resetChecklistStatus = () => ({
  type: CLEAR_CHECKLIST_STATUS
});

export const checklistPercentage = checklists => {
  let done = 0;
  if (checklists) {
    for (let i = 0; i < checklists.length; i++) {
      const item = checklists[i];
      if (item.attributes.done) {
        done++;
      }
    }
    const percentage =
      checklists.length !== 0 ? (done ? Math.round((done / checklists.length) * 100) : 0) : 100;
    return dispatch => {
      dispatch({
        type: SET_PERCENTAGE,
        percentage
      });
    };
  }
};
