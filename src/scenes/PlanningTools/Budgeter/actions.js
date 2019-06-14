import { CALL_API } from '@middleware/api';

export const BUDGETER_FETCH_REQUEST = 'BUDGETER_FETCH_REQUEST';
export const BUDGETER_FETCH_FAILURE = 'BUDGETER_FETCH_FAILURE';
export const BUDGETER_FETCH_SUCCESS = 'BUDGETER_FETCH_SUCCESS';

export const BUDGETER_CREATE_REQUEST = 'BUDGETER_CREATE_REQUEST';
export const BUDGETER_CREATE_FAILURE = 'BUDGETER_CREATE_FAILURE';
export const BUDGETER_CREATE_SUCCESS = 'BUDGETER_CREATE_SUCCESS';

export const BUDGETER_UPDATE_REQUEST = 'BUDGETER_UPDATE_REQUEST';
export const BUDGETER_UPDATE_FAILURE = 'BUDGETER_UPDATE_FAILURE';
export const BUDGETER_UPDATE_SUCCESS = 'BUDGETER_UPDATE_SUCCESS';

export const BUDGETER_DELETE_REQUEST = 'BUDGETER_DELETE_REQUEST';
export const BUDGETER_DELETE_FAILURE = 'BUDGETER_DELETE_FAILURE';
export const BUDGETER_DELETE_SUCCESS = 'BUDGETER_DELETE_SUCCESS';

export const SET_BUDGETER_PERCENTAGE = 'SET_BUDGETER_PERCENTAGE';

export const BUDGETER_SET_REQUEST = 'BUDGETER_SET_REQUEST';
export const BUDGETER_SET_FAILURE = 'BUDGETER_SET_FAILURE';
export const BUDGETER_SET_SUCCESS = 'BUDGETER_SET_SUCCESS';

export const CLEAR_BUDGETER_STATUS = 'CLEAR_BUDGETER_STATUS';

export const budgeterFetch = () => ({
  [CALL_API]: {
    endpoint: '/budgets',
    authenticated: true,
    customConfig: {
      method: 'GET',
      query: {
        localized: true
      }
    },
    types: [BUDGETER_FETCH_REQUEST, BUDGETER_FETCH_SUCCESS, BUDGETER_FETCH_FAILURE]
  }
});

export const budgeterDelete = id => ({
  [CALL_API]: {
    endpoint: `/budgets/${id}`,
    authenticated: true,
    customConfig: {
      method: 'DELETE'
    },
    types: [BUDGETER_DELETE_REQUEST, BUDGETER_DELETE_SUCCESS, BUDGETER_DELETE_FAILURE]
  }
});

export const budgeterCreate = (title, description, amount) => ({
  [CALL_API]: {
    endpoint: '/budgets',
    authenticated: true,
    customConfig: {
      method: 'POST',
      body: JSON.stringify({
        budget_item: {
          title_en: title,
          title_ar: title,
          description_en: description,
          description_ar: description,
          amount_spent: amount
        }
      }),
      query: {
        localized: true
      }
    },
    types: [BUDGETER_CREATE_REQUEST, BUDGETER_CREATE_SUCCESS, BUDGETER_CREATE_FAILURE]
  }
});

export const budgeterUpdate = (id, amount, note, service_id) => ({
  [CALL_API]: {
    endpoint: `/budgets/${id}`,
    authenticated: true,
    customConfig: {
      method: 'PUT',
      body: JSON.stringify({
        user_budget_item: {
          note,
          amount_spent: amount,
          service_id
        }
      })
    },
    types: [BUDGETER_UPDATE_REQUEST, BUDGETER_UPDATE_SUCCESS, BUDGETER_UPDATE_FAILURE]
  }
});

export const setUserBudget = newBudget => ({
  [CALL_API]: {
    endpoint: '/budgets/set_budget',
    authenticated: true,
    customConfig: {
      method: 'POST',
      body: JSON.stringify({
        budget: newBudget
      })
    },
    types: [BUDGETER_SET_REQUEST, BUDGETER_SET_SUCCESS, BUDGETER_SET_FAILURE]
  }
});

export const resetBudgeterStatus = () => ({
  type: CLEAR_BUDGETER_STATUS
});

export const budgeterPercentage = (budgeters, budget) => {
  let spent = 0;
  if (budgeters && budget && budget > 0) {
    for (let i = 0; i < budgeters.length; i++) {
      const item = budgeters[i];
      spent += item.attributes.amount_spent;
    }
    const percentage =
      budgeters.length !== 0
        ? spent && budget && budget !== 0
          ? Math.floor((spent / budget) * 100) >= 100
            ? 100
            : Math.floor((spent / budget) * 100)
          : 0
        : 100;
    return dispatch => {
      dispatch({
        type: SET_BUDGETER_PERCENTAGE,
        percentage,
        spent
      });
    };
  }
  return dispatch => {
    dispatch({
      type: SET_BUDGETER_PERCENTAGE,
      percentage: 0,
      spent: 0
    });
  };
};
