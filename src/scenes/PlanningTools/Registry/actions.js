import { CALL_API } from '@middleware/api';
import store from '../../../../store';

export const REGISTRIES_FETCH_REQUEST = 'REGISTRIES_FETCH_REQUEST';
export const REGISTRIES_FETCH_FAILURE = 'REGISTRIES_FETCH_FAILURE';
export const REGISTRIES_FETCH_SUCCESS = 'REGISTRIES_FETCH_SUCCESS';

export const REGISTRIES_CREATE_REQUEST = 'REGISTRIES_CREATE_REQUEST';
export const REGISTRIES_CREATE_FAILURE = 'REGISTRIES_CREATE_FAILURE';
export const REGISTRIES_CREATE_SUCCESS = 'REGISTRIES_CREATE_SUCCESS';

export const REGISTRIES_DELETE_REQUEST = 'REGISTRIES_DELETE_REQUEST';
export const REGISTRIES_DELETE_FAILURE = 'REGISTRIES_DELETE_FAILURE';
export const REGISTRIES_DELETE_SUCCESS = 'REGISTRIES_DELETE_SUCCESS';

export const REGISTRIES_UPDATE_REQUEST = 'REGISTRIES_UPDATE_REQUEST';
export const REGISTRIES_UPDATE_FAILURE = 'REGISTRIES_UPDATE_FAILURE';
export const REGISTRIES_UPDATE_SUCCESS = 'REGISTRIES_UPDATE_SUCCESS';

export const SET_REGISTRIES_PERCENTAGE = 'SET_REGISTRIES_PERCENTAGE';
export const CLEAR_REGISTRY_STATUS = 'CLEAR_REGISTRY_STATUS';

export const registriesFetch = () => ({
  [CALL_API]: {
    endpoint: '/registries',
    authenticated: true,
    customConfig: {
      method: 'GET',
      query: {
        localized: true
      }
    },
    types: [REGISTRIES_FETCH_REQUEST, REGISTRIES_FETCH_SUCCESS, REGISTRIES_FETCH_FAILURE]
  }
});

export const registriesDelete = id => ({
  [CALL_API]: {
    endpoint: `/registries/${id}`,
    authenticated: true,
    customConfig: {
      method: 'DELETE'
    },
    types: [REGISTRIES_DELETE_REQUEST, REGISTRIES_DELETE_SUCCESS, REGISTRIES_DELETE_FAILURE]
  }
});

export const registriesCreate = (title, address, note, price, image) => {
  const form = getFormData(image);
  form.append('registry[title]', title);
  form.append('registry[address]', address);
  form.append('registry[note]', note);
  form.append('registry[price]', price);

  return {
    [CALL_API]: {
      endpoint: '/registries',
      authenticated: true,
      customConfig: {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        method: 'POST',
        body: form
      },
      types: [REGISTRIES_CREATE_REQUEST, REGISTRIES_CREATE_SUCCESS, REGISTRIES_CREATE_FAILURE]
    }
  };
};

export const registriesUpdate = (id, title, address, note, price, image) => {
  const form = getFormData(image);
  form.append('registry[title]', title);
  form.append('registry[address]', address);
  form.append('registry[note]', note);
  form.append('registry[price]', price);

  return {
    [CALL_API]: {
      endpoint: `/registries/${id}`,
      authenticated: true,
      customConfig: {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        method: 'PUT',
        body: form
      },
      types: [REGISTRIES_UPDATE_REQUEST, REGISTRIES_UPDATE_SUCCESS, REGISTRIES_UPDATE_FAILURE]
    }
  };
};

export const registriesPercentage = registries => {
  let assigned = 0;
  if (registries) {
    for (let i = 0; i < registries.length; i++) {
      const item = registries[i];
      if (item.attributes.buyer) {
        assigned++;
      }
    }
    const percentage =
      registries.length !== 0
        ? assigned
          ? Math.round((assigned / registries.length) * 100)
          : 0
        : 0;
    return dispatch => {
      dispatch({
        type: SET_REGISTRIES_PERCENTAGE,
        percentage
      });
    };
  }
};

export const resetRegistryStatus = () => ({
  type: CLEAR_REGISTRY_STATUS
});

const getFormData = image => {
  const formData = new FormData();
  if (image) {
    const uri = image.uri;
    const uriParts = uri.split('.');
    const fileType = uriParts[uriParts.length - 1];
    formData.append('registry[image]', {
      uri,
      name: `photo.${fileType}`,
      type: 'image/jpeg'
    });
  }
  return formData;
};
