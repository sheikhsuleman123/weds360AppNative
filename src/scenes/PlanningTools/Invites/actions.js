import { CALL_API } from '@middleware/api';

export const EVENTS_FETCH_REQUEST = 'EVENTS_FETCH_REQUEST';
export const EVENTS_FETCH_FAILURE = 'EVENTS_FETCH_FAILURE';
export const EVENTS_FETCH_SUCCESS = 'EVENTS_FETCH_SUCCESS';

export const EVENT_FETCH_REQUEST = 'EVENT_FETCH_REQUEST';
export const EVENT_FETCH_FAILURE = 'EVENT_FETCH_FAILURE';
export const EVENT_FETCH_SUCCESS = 'EVENT_FETCH_SUCCESS';

export const GUESTS_FETCH_REQUEST = 'GUESTS_FETCH_REQUEST';
export const GUESTS_FETCH_FAILURE = 'GUESTS_FETCH_FAILURE';
export const GUESTS_FETCH_SUCCESS = 'GUESTS_FETCH_SUCCESS';

export const EVENTS_CREATE_REQUEST = 'EVENTS_CREATE_REQUEST';
export const EVENTS_CREATE_FAILURE = 'EVENTS_CREATE_FAILURE';
export const EVENTS_CREATE_SUCCESS = 'EVENTS_CREATE_SUCCESS';
export const EVENTS_EDIT_REQUEST = 'EVENTS_EDIT_REQUEST';
export const EVENTS_EDIT_FAILURE = 'EVENTS_EDIT_FAILURE';
export const EVENTS_EDIT_SUCCESS = 'EVENTS_EDIT_SUCCESS';
export const EVENTS_DELETE_REQUEST = 'EVENTS_DELETE_REQUEST';
export const EVENTS_DELETE_FAILURE = 'EVENTS_DELETE_FAILURE';
export const EVENTS_DELETE_SUCCESS = 'EVENTS_DELETE_SUCCESS';

export const INVITATIONS_FETCH_REQUEST = 'INVITATIONS_FETCH_REQUEST';
export const INVITATIONS_FETCH_FAILURE = 'INVITATIONS_FETCH_FAILURE';
export const INVITATIONS_FETCH_SUCCESS = 'INVITATIONS_FETCH_SUCCESS';

export const GUEST_INVITE_REQUEST = 'GUEST_INVITE_REQUEST';
export const GUEST_INVITE_FAILURE = 'GUEST_INVITE_FAILURE';
export const GUEST_INVITE_SUCCESS = 'GUEST_INVITE_SUCCESS';

export const UPLOAD_EVENT_PHOTO_REQUEST = 'UPLOAD_EVENT_PHOTO_REQUEST';
export const UPLOAD_EVENT_PHOTO_FAILURE = 'UPLOAD_EVENT_PHOTO_FAILURE';
export const UPLOAD_EVENT_PHOTO_SUCCESS = 'UPLOAD_EVENT_PHOTO_SUCCESS';
export const RESET_EVENT_STATUS = 'RESET_EVENT_STATUS';

export const FETCHING_CONTACTS = 'FETCHING_CONTACTS';
export const FETCHING_CONTACTS_DONE = 'FETCHING_CONTACTS_DONE';

const getFormData = image => {
  const formData = new FormData();
  if (image) {
    const uri = image.uri;
    const uriParts = uri.split('.');
    const fileType = uriParts[uriParts.length - 1];
    formData.append('image', {
      uri,
      name: `photo.${fileType}`,
      type: 'image/jpeg'
    });
  }
  return formData;
};

export const uploadEvenPhoto = body => {
  const form = getFormData(body.image);
  form.append('event_id', body.event_id);
  return {
    [CALL_API]: {
      endpoint: '/guest_photos',
      authenticated: true,
      customConfig: {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        method: 'POST',
        body: form
      },
      types: [UPLOAD_EVENT_PHOTO_REQUEST, UPLOAD_EVENT_PHOTO_SUCCESS, UPLOAD_EVENT_PHOTO_FAILURE]
    }
  };
};
export const eventsFetch = () => ({
  [CALL_API]: {
    endpoint: '/events',
    authenticated: true,
    customConfig: {
      method: 'GET'
    },
    types: [EVENTS_FETCH_REQUEST, EVENTS_FETCH_SUCCESS, EVENTS_FETCH_FAILURE]
  }
});

export const invitationsFetch = () => ({
  [CALL_API]: {
    endpoint: '/events?guest=true',
    authenticated: true,
    customConfig: {
      method: 'GET'
    },
    types: [INVITATIONS_FETCH_REQUEST, INVITATIONS_FETCH_SUCCESS, INVITATIONS_FETCH_FAILURE]
  }
});

export const createEvent = (name, location, date, display_on_wedding_website, allow_rsvp) => ({
  [CALL_API]: {
    endpoint: '/events',
    authenticated: true,
    customConfig: {
      method: 'POST',
      body: JSON.stringify({
        event: {
          name,
          location,
          date,
          display_on_wedding_website,
          allow_rsvp
        }
      })
    },
    types: [EVENTS_CREATE_REQUEST, EVENTS_CREATE_SUCCESS, EVENTS_CREATE_FAILURE]
  }
});

export const editEvent = (id, name, location, date, display_on_wedding_website, allow_rsvp) => ({
  [CALL_API]: {
    endpoint: `/events/${id}`,
    authenticated: true,
    customConfig: {
      method: 'PUT',
      body: JSON.stringify({
        event: {
          name,
          location,
          date,
          display_on_wedding_website,
          allow_rsvp
        }
      })
    },
    types: [EVENTS_EDIT_REQUEST, EVENTS_EDIT_SUCCESS, EVENTS_EDIT_FAILURE]
  }
});
export const deleteEvent = id => ({
  [CALL_API]: {
    endpoint: `/events/${id}`,
    authenticated: true,
    customConfig: {
      method: 'DELETE'
    },
    types: [EVENTS_DELETE_REQUEST, EVENTS_DELETE_SUCCESS, EVENTS_DELETE_FAILURE]
  }
});

export const eventFetch = id => ({
  [CALL_API]: {
    endpoint: `/events/${id}`,
    authenticated: true,
    customConfig: {
      method: 'GET'
    },
    types: [EVENT_FETCH_REQUEST, EVENT_FETCH_SUCCESS, EVENT_FETCH_FAILURE]
  }
});

export const inviteGuest = (id, name, email, phoneNumber, template) => ({
  [CALL_API]: {
    endpoint: `/events/${id}/guests`,
    authenticated: true,
    customConfig: {
      method: 'POST',
      body: JSON.stringify({
        guest: {
          name,
          email,
          phoneNumber,
          template
        }
      })
    },
    types: [GUEST_INVITE_REQUEST, GUEST_INVITE_SUCCESS, GUEST_INVITE_FAILURE]
  }
});

export const guestsFetch = event_id => ({
  [CALL_API]: {
    endpoint: `/events/${event_id}/guests`,
    authenticated: true,
    customConfig: {
      method: 'GET'
    },
    types: [GUESTS_FETCH_REQUEST, GUESTS_FETCH_SUCCESS, GUESTS_FETCH_FAILURE]
  }
});

export const resetEventStatus = () => ({
  type: RESET_EVENT_STATUS
});

export const fetchingCotacts = () => ({
  type: FETCHING_CONTACTS
});
export const fetchingCotactsDone = () => ({
  type: FETCHING_CONTACTS_DONE
});
