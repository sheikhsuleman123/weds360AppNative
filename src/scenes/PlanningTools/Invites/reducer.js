import {
  EVENTS_FETCH_REQUEST,
  EVENTS_FETCH_FAILURE,
  EVENTS_FETCH_SUCCESS,
  EVENT_FETCH_REQUEST,
  EVENT_FETCH_SUCCESS,
  EVENT_FETCH_FAILURE,
  INVITATIONS_FETCH_REQUEST,
  INVITATIONS_FETCH_FAILURE,
  INVITATIONS_FETCH_SUCCESS,
  GUESTS_FETCH_REQUEST,
  GUESTS_FETCH_SUCCESS,
  GUESTS_FETCH_FAILURE,
  EVENTS_CREATE_REQUEST,
  EVENTS_CREATE_SUCCESS,
  EVENTS_CREATE_FAILURE,
  EVENTS_EDIT_REQUEST,
  EVENTS_EDIT_SUCCESS,
  EVENTS_EDIT_FAILURE,
  EVENTS_DELETE_REQUEST,
  EVENTS_DELETE_SUCCESS,
  EVENTS_DELETE_FAILURE,
  GUEST_INVITE_REQUEST,
  GUEST_INVITE_SUCCESS,
  GUEST_INVITE_FAILURE,
  UPLOAD_EVENT_PHOTO_REQUEST,
  UPLOAD_EVENT_PHOTO_FAILURE,
  UPLOAD_EVENT_PHOTO_SUCCESS,
  RESET_EVENT_STATUS,
  FETCHING_CONTACTS,
  FETCHING_CONTACTS_DONE
} from './actions';

const eventsReducer = (
  state = {
    evPercentage: 0,
    invPercentage: 0, percentage: 0
  },
  action
) => {
  switch (action.type) {
    case EVENTS_FETCH_REQUEST:
      return {
        ...state,
        isFetching: true,
        refresh: false,
        error: false,
        invited: false,
        update: false,
        deletedEvent: false,
        updatedInvite: false
      };
    case EVENTS_FETCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        myEvents: action.response.data,
        evPercentage: action.response.data.length > 0 ? 100 : 0
      };
    case EVENTS_FETCH_FAILURE:
      return {
        ...state,
        isFetching: false
      };
    case EVENT_FETCH_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case EVENT_FETCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        myEvents: state.myEvents.map(
          item => (item.id === action.response.data.id ? action.response.data : item)
        ),
        updatedInvite: true
      };
    case EVENT_FETCH_FAILURE:
      return {
        ...state,
        isFetching: false
      };
    case INVITATIONS_FETCH_REQUEST:
      return {
        ...state,
        isFetching: true,
        refresh: false,
        error: false,
        invited: false
      };
    case INVITATIONS_FETCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        myInvitations: action.response.data,
        invPercentage: action.response.data.length > 0 ? 100 : 0
      };
    case INVITATIONS_FETCH_FAILURE:
      return {
        ...state,
        isFetching: false
      };
    case GUESTS_FETCH_REQUEST:
      return {
        ...state,
        isFetching: true,
        refresh: false,
        error: false,
        invited: false
      };
    case GUESTS_FETCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        guests: action.response.data
      };
    case GUESTS_FETCH_FAILURE:
      return {
        ...state,
        isFetching: false
      };
    case EVENTS_CREATE_REQUEST:
      return {
        ...state,
        isFetching: true,
        refresh: false,
        error: false
      };
    case EVENTS_CREATE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        refresh: true,
        createdEvent: action.response.data
      };
    case EVENTS_CREATE_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error || true
      };
    case EVENTS_EDIT_REQUEST:
      return {
        ...state,
        isFetchingEdit: true,
        update: false
      };
    case EVENTS_EDIT_FAILURE:
      return {
        ...state,
        isFetchingEdit: false,
        update: false,
        singleEventErrors: action.error || true
      };
    case EVENTS_EDIT_SUCCESS:
      return {
        ...state,
        isFetchingEdit: false,
        update: true,
        createdEvent: action.response.data
      };
    case EVENTS_DELETE_REQUEST:
      return {
        ...state,
        deletedEvent: false
      };
    case EVENTS_DELETE_FAILURE:
      return {
        ...state,
        deletedEvent: false
      };
    case EVENTS_DELETE_SUCCESS:
      return {
        ...state,
        deletedEvent: true
      };
    case GUEST_INVITE_REQUEST:
      return {
        ...state,
        isFetching: true,
        invited: false,
        error: false
      };
    case GUEST_INVITE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        invited: true
      };
    case GUEST_INVITE_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error || true
      };
    case UPLOAD_EVENT_PHOTO_REQUEST:
      return {
        ...state,
        isUploading: true,
        error: false,
        imageUploaded: false
      };
    case UPLOAD_EVENT_PHOTO_FAILURE:
      return {
        ...state,
        isUploading: false,
        error: action.error || true,
        imageUploaded: false
      };
    case UPLOAD_EVENT_PHOTO_SUCCESS:
      return {
        ...state,
        isUploading: false,
        error: false,
        imageUploaded: true,
        siteUrl: action.response.site_url
      };
    case RESET_EVENT_STATUS:
      return {
        ...state,
        isFetching: false,
        refresh: false,
        error: false,
        invited: false,
        update: false,
        deletedEvent: false,
        updatedInvite: false,
        singleEventErrors: false
      };
    case FETCHING_CONTACTS:
      return {
        ...state,
        isFetchingContacts: true
      };
    case FETCHING_CONTACTS_DONE:
      return {
        ...state,
        isFetchingContacts: false
      };
    default:
      return state;
  }
};

export default eventsReducer;
