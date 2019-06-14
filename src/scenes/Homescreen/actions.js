import { CALL_API } from '@middleware/api';
import store from '../../../store';
export const PROFILE_FETCH_REQUEST = 'PROFILE_FETCH_REQUEST';
export const PROFILE_FETCH_FAILURE = 'PROFILE_FETCH_FAILURE';
export const PROFILE_FETCH_SUCCESS = 'PROFILE_FETCH_SUCCESS';
export const CATEGORIES_FETCH_REQUEST = 'CATEGORIES_FETCH_REQUEST';
export const CATEGORIES_FETCH_FAILURE = 'CATEGORIES_FETCH_FAILURE';
export const CATEGORIES_FETCH_SUCCESS = 'CATEGORIES_FETCH_SUCCESS';
export const INSPIRATIONS_FETCH_REQUEST = 'INSPIRATIONS_FETCH_REQUEST';
export const INSPIRATIONS_FETCH_FAILURE = 'INSPIRATIONS_FETCH_FAILURE';
export const INSPIRATIONS_FETCH_SUCCESS = 'INSPIRATIONS_FETCH_SUCCESS';
export const EDIT_PROFILE_REQUEST = 'EDIT_PROFILE_REQUEST';
export const EDIT_PROFILE_FAILURE = 'EDIT_PROFILE_FAILURE';
export const EDIT_PROFILE_SUCCESS = 'EDIT_PROFILE_SUCCESS';
export const HOMESCREEN_RESET = 'HOMESCREEN_RESET';

export const profileUpdate = body => {
  const form = getFormData(body.image);
  form.append('user[full_name]', body.full_name);
  form.append('user[fiance_full_name]', body.fiance_full_name);
  form.append('user[venue]', body.venue);
  form.append('user[number_of_guests]', body.number_of_guests);
  form.append('user[budget]', body.budget);
  form.append('user[wedding_date]', body.wedding_date);
  form.append('user[dob]', body.dob);
  form.append('user[partner_dob]', body.partner_dob);
  form.append('user[phone_number]', body.phone_number);
  form.append('user[partner_phone_number]', body.partner_phone_number);
  return {
    [CALL_API]: {
      endpoint: '/users/update',
      authenticated: true,
      customConfig: {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        method: 'PUT',
        body: form
      },
      types: [EDIT_PROFILE_REQUEST, EDIT_PROFILE_SUCCESS, EDIT_PROFILE_FAILURE]
    }
  };
};

const getFormData = image => {
  const formData = new FormData();
  if (image) {
    const uri = image.uri;
    const uriParts = uri.split('.');
    const fileType = uriParts[uriParts.length - 1];
    formData.append('user[profile_photo]', {
      uri,
      name: `photo.${fileType}`,
      type: 'image/jpeg'
    });
  }
  return formData;
};

export const profileFetch = () => ({
  [CALL_API]: {
    endpoint: '/users/profile',
    authenticated: true,
    customConfig: {
      method: 'GET'
    },
    types: [PROFILE_FETCH_REQUEST, PROFILE_FETCH_SUCCESS, PROFILE_FETCH_FAILURE]
  }
});

export const categoriesFetch = () => ({
  [CALL_API]: {
    endpoint: '/categories',
    authenticated: true,
    customConfig: {
      method: 'GET',
      query: {
        localized: true
      }
    },
    types: [CATEGORIES_FETCH_REQUEST, CATEGORIES_FETCH_SUCCESS, CATEGORIES_FETCH_FAILURE]
  }
});

export const photosSample = () => ({
  [CALL_API]: {
    endpoint: '/photos',
    authenticated: true,
    customConfig: {
      method: 'GET',
      query: {
        page: 1,
        localized: true
      }
    },
    types: [INSPIRATIONS_FETCH_REQUEST, INSPIRATIONS_FETCH_SUCCESS, INSPIRATIONS_FETCH_FAILURE]
  }
});

export const homescreenReset = () => dispatch => {
  dispatch({
    type: HOMESCREEN_RESET
  });
};
