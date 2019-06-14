import {
  SIGNUP_EMAIL_REQUIRED,
  SIGNUP_EMAIL_INVALID,
  SIGNUP_EMAIL_APPROVED,
  SIGNUP_EMAIL_RESET,
  SIGNUP_USER_REQUIRED,
  SIGNUP_USER_TAKEN,
  SIGNUP_USER_APPROVED,
  SIGNUP_USER_RESET,
  SIGNUP_PASSWORD_INVALID,
  SIGNUP_PASSWORD_REQUIRED,
  SIGNUP_PASSWORD_APPROVED,
  SIGNUP_PASSWORD_RESET,
  SIGNUP_CONF_PASSWORD_REQUIRED,
  SIGNUP_CONF_PASSWORD_APPROVED,
  SIGNUP_CONF_PASSWORD_REJECTED,
  SIGNUP_CONF_PASSWORD_RESET,
  SIGNUP_EMAIL_MISSING,
  SIGNUP_USERNAME_MISSING,
  SIGNUP_PASSWORD_MISSING,
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILURE,
  SIGNUP_EMAIL_REQUEST,
  SIGNUP_EMAIL_SUCCESS,
  SIGNUP_EMAIL_FAILURE,
  SAVE_FIANCE_FULLNAME,
  SAVE_FULLNAME,
  SAVE_ROLE,
  SAVE_VENUE,
  SAVE_DOB,
  SAVE_FIANCE_DOB,
  SIGNUP_SOCIAL_MEDIA,
  SET_SOCIAL_LOGIN,
  SOCIAL_CREATE_USER_REQUEST,
  SOCIAL_CREATE_USER_SUCCESS,
  SOCIAL_CREATE_USER_FAILURE,
  SAVE_PHONE_NUMBER,
  SAVE_FIANCE_PHONE_NUMBER
} from './actions';

const signupReducer = (
  state = {
    days: [],
    months: [],
    years: [],
    defaultDays: 32,
    social_auth: false,
    uid: '',
    provider: '',
    social_auth: false
  },
  action
) => {
  switch (action.type) {
    /*--------EMAIL CASES--------*/
    case SIGNUP_EMAIL_REQUIRED:
      return { ...state, emailer: 'E-Mail required', emailcheck: false };
    case SIGNUP_EMAIL_APPROVED:
      return {
        ...state,
        emailer: 'Approved',
        emailcheck: true,
        email: action.text
      };
    case SIGNUP_EMAIL_RESET:
      return { ...state, emailer: '', emailcheck: false, email: action.text };
    case SIGNUP_EMAIL_INVALID:
      return { ...state, emailer: 'Invalid E-Mail', emailcheck: false };
    case SIGNUP_EMAIL_REQUEST:
      return { ...state, isFetching: true };

    case SIGNUP_EMAIL_SUCCESS:
      return {
        ...state,
        isFetching: false,
        emailer: 'E-Mail already taken',
        emailcheck: false,
        proceedToQuestions: false
      };
    case SIGNUP_EMAIL_FAILURE:
      return {
        ...state,
        isFetching: false,
        emailcheck: true,
        proceedToQuestions: true,
        emailer: 'Approved'
      };

    /*--------USERNAME CASES--------*/
    case SIGNUP_USER_REQUIRED:
      return {
        ...state,
        usernameer: 'Username required',
        usernamecheck: false
      };
    case SIGNUP_USER_APPROVED:
      return { ...state, usernameer: 'Approved', usernamecheck: true };
    case SIGNUP_USER_RESET:
      return { ...state, usernameer: '', usernamecheck: false };
    case SIGNUP_USER_TAKEN:
      return { ...state, usernameer: 'Already taken', usernamecheck: false };

    /*--------PASSWORD CASES--------*/
    case SIGNUP_PASSWORD_REQUIRED:
      return {
        ...state,
        password: '',
        passworder: 'Password required',
        passwordcheck: false,
        confirmpassworder: ''
      };
    case SIGNUP_PASSWORD_INVALID:
      return {
        ...state,
        password: '',
        passworder: 'Password must be atleast 6 digits',
        passwordcheck: false,
        confirmpassworder: ''
      };
    case SIGNUP_PASSWORD_APPROVED:
      return {
        ...state,
        password: action.text,
        passworder: 'Approved',
        confirmpassworder: ''
      };
    case SIGNUP_PASSWORD_RESET:
      return {
        ...state,
        password: action.text,
        passworder: '',
        passwordcheck: false,
        confirmpassworder: ''
      };

    /*--------PASSWORD CONFIRMATION CASES--------*/
    case SIGNUP_CONF_PASSWORD_REQUIRED:
      return {
        ...state,
        confirmpassworder: 'Password confirmation required',
        passwordcheck: false
      };
    case SIGNUP_CONF_PASSWORD_REJECTED:
      return {
        ...state,
        confirmpassworder: 'Invalid Password',
        passwordcheck: false
      };
    case SIGNUP_CONF_PASSWORD_APPROVED:
      return {
        ...state,
        confirmpassworder: 'Approved',
        passwordcheck: true
      };
    case SIGNUP_CONF_PASSWORD_RESET:
      return {
        ...state,
        confirmpassworder: '',
        passwordcheck: false
      };

    /*--------SIGNUP PRESS CASE--------*/
    case SIGNUP_EMAIL_MISSING:
      return {
        ...state,
        emailer: '        X'
      };
    case SIGNUP_USERNAME_MISSING:
      return {
        ...state,
        usernameer: '        X'
      };
    case SIGNUP_PASSWORD_MISSING:
      return {
        ...state,
        passworder: '        X'
      };
    case SAVE_FULLNAME:
      return {
        ...state,
        full_name: action.text
      };
    case SAVE_FIANCE_FULLNAME:
      return {
        ...state,
        fiance_full_name: action.text
      };
    case SAVE_ROLE:
      return {
        ...state,
        role: 'bride_and_groom',
        wedding_role: action.text
      };
    case SAVE_VENUE:
      return {
        ...state,
        venue: action.text
      };
    case SAVE_DOB:
      return {
        ...state,
        dob: action.text
      };
    case SAVE_FIANCE_DOB:
      return {
        ...state,
        partner_dob: action.text
      };
    case SAVE_PHONE_NUMBER:
      return {
        ...state,
        phone_number: action.text
      };
    case SAVE_FIANCE_PHONE_NUMBER:
      return {
        ...state,
        partner_phone_number: action.text
      };
    case CREATE_USER_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case CREATE_USER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        newUser: {
          token: action.response.token,
          profile_completed: action.response && action.response.profile_completed
        }
      };
    case CREATE_USER_FAILURE:
      return {
        ...state,
        isFetching: false,
        newUser: {
          errorMessage: action.error
        }
      };
    case SIGNUP_SOCIAL_MEDIA:
      return {
        ...state,
        email: action.email,
        user_id: action.id,
        social_auth: true
      };
    case SET_SOCIAL_LOGIN:
      return {
        ...state,
        uid: action.id,
        provider: action.provider,
        social_auth: true,
        email: action.email,
        full_name: action.name
      };
    case SOCIAL_CREATE_USER_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case SOCIAL_CREATE_USER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        newUser: {
          token: action.response.token,
          profile_completed: action.response.profile_completed
        }
      };
    case SOCIAL_CREATE_USER_FAILURE:
      return {
        ...state,
        isFetching: false,
        newUser: {
          errorMessage: action.error
        }
      };
    default:
      return state;
  }
};

export default signupReducer;
