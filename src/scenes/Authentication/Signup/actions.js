import { CALL_API } from '@middleware/api';

import store from '../../../../store';

export const SIGNUP_EMAIL_REQUIRED = 'SIGNUP_EMAIL_REQUIRED';
export const SIGNUP_EMAIL_INVALID = 'SIGNUP_EMAIL_INVALID';
export const SIGNUP_EMAIL_APPROVED = 'SIGNUP_EMAIL_APPROVED';
export const SIGNUP_EMAIL_RESET = 'SIGNUP_EMAIL_RESET';
export const SIGNUP_EMAIL_REQUEST = 'SIGNUP_EMAIL_REQUEST';
export const SIGNUP_EMAIL_FAILURE = 'SIGNUP_EMAIL_FAILURE';
export const SIGNUP_EMAIL_SUCCESS = 'SIGNUP_EMAIL_SUCCESS';

export const SIGNUP_USER_REQUIRED = 'SIGNUP_USER_REQUIRED';
export const SIGNUP_USER_TAKEN = 'SIGNUP_USER_TAKEN';
export const SIGNUP_USER_APPROVED = 'SIGNUP_USER_APPROVED';
export const SIGNUP_USER_RESET = 'SIGNUP_USER_RESET';

export const SIGNUP_PASSWORD_INVALID = 'SIGNUP_PASSWORD_INVALID';
export const SIGNUP_PASSWORD_REQUIRED = 'SIGNUP_PASSWORD_REQUIRED';
export const SIGNUP_PASSWORD_APPROVED = 'SIGNUP_PASSWORD_APPROVED';
export const SIGNUP_PASSWORD_RESET = 'SIGNUP_PASSWORD_RESET';

export const SIGNUP_CONF_PASSWORD_REQUIRED = 'SIGNUP_CONF_PASSWORD_REQUIRED';
export const SIGNUP_CONF_PASSWORD_APPROVED = 'SIGNUP_CONF_PASSWORD_APPROVED';
export const SIGNUP_CONF_PASSWORD_REJECTED = 'SIGNUP_CONF_PASSWORD_REJECTED';
export const SIGNUP_CONF_PASSWORD_RESET = 'SIGNUP_CONF_PASSWORD_RESET';

export const SIGNUP_EMAIL_MISSING = 'SIGNUP_EMAIL_MISSING';
export const SIGNUP_USERNAME_MISSING = 'SIGNUP_USERNAME_MISSING';
export const SIGNUP_PASSWORD_MISSING = 'SIGNUP_PASSWORD_MISSING';

export const CREATE_USER_REQUEST = 'CREATE_USER_REQUEST';
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
export const CREATE_USER_FAILURE = 'CREATE_USER_FAILURE';

export const SAVE_FULLNAME = 'SAVE_FULLNAME';
export const SAVE_FIANCE_FULLNAME = 'SAVE_FIANCE_FULLNAME';
export const SAVE_VENUE = 'SAVE_VENUE';
export const SAVE_ROLE = 'SAVE_ROLE';
export const SAVE_DOB = 'SAVE_DOB';
export const SAVE_PHONE_NUMBER = 'SAVE_PHONE_NUMBER';
export const SAVE_FIANCE_DOB = 'SAVE_FIANCE_DOB';
export const SAVE_FIANCE_PHONE_NUMBER = 'SAVE_FIANCE_PHONE_NUMBER';

export const SIGNUP_SOCIAL_MEDIA = 'SIGNUP_SOCIAL_MEDIA';
export const SET_SOCIAL_LOGIN = 'SET_SOCIAL_LOGIN';
export const SOCIAL_CREATE_USER_REQUEST = 'SOCIAL_CREATE_USER_REQUEST';
export const SOCIAL_CREATE_USER_SUCCESS = 'SOCIAL_CREATE_USER_SUCCESS';
export const SOCIAL_CREATE_USER_FAILURE = 'SOCIAL_CREATE_USER_FAILURE';

export const saveFullName = text => dispatch =>
  dispatch({
    type: SAVE_FULLNAME,
    text
  });

export const saveFianceFullName = text => dispatch =>
  dispatch({
    type: SAVE_FIANCE_FULLNAME,
    text
  });

export const saveRole = text => dispatch =>
  dispatch({
    type: SAVE_ROLE,
    text
  });

export const saveDOB = text => dispatch =>
  dispatch({
    type: SAVE_DOB,
    text
  });

export const saveFianceDOB = text => dispatch =>
  dispatch({
    type: SAVE_FIANCE_DOB,
    text
  });

export const savePhoneNumber = text => dispatch =>
  dispatch({
    type: SAVE_PHONE_NUMBER,
    text
  });

export const saveFiancePhoneNumber = text => dispatch =>
  dispatch({
    type: SAVE_FIANCE_PHONE_NUMBER,
    text
  });

export const saveVenue = text => dispatch =>
  dispatch({
    type: SAVE_VENUE,
    text
  });
/*--------------------EMAIL FUNCTIONS--------------------*/
export const mailCheckReq = text => {
  if (text == '') {
    return dispatch =>
      dispatch({
        type: SIGNUP_EMAIL_REQUIRED
      });
  }
  const array = text.split('@');
  if (array.length < 2 || array[1].split('.').length < 2) {
    return dispatch =>
      dispatch({
        type: SIGNUP_EMAIL_INVALID
      });
  }
  return {
    [CALL_API]: {
      endpoint: `/users/check_email?email=${text}`,
      authenticated: false,
      types: [SIGNUP_EMAIL_REQUEST, SIGNUP_EMAIL_SUCCESS, SIGNUP_EMAIL_FAILURE],
      params: { email: text }
    }
  };
  // };
};

export const mailReset = text => dispatch =>
  dispatch({
    type: SIGNUP_EMAIL_RESET,
    text
  });

/*--------------------USERNAME FUNCTIONS--------------------*/
export const userCheckReq = text => {
  if (text == '') {
    return dispatch =>
      dispatch({
        type: SIGNUP_USER_REQUIRED
      });
  }
  if (text == 'You') {
    return dispatch =>
      dispatch({
        type: SIGNUP_USER_TAKEN
      });
  }
  return dispatch =>
    dispatch({
      type: SIGNUP_USER_APPROVED
    });
};

export const userReset = () => dispatch =>
  dispatch({
    type: SIGNUP_USER_RESET
  });

/*--------------------PASSWORD FUNCTIONS--------------------*/
export const passCheckReq = text => {
  if (text === '') {
    return dispatch =>
      dispatch({
        type: SIGNUP_PASSWORD_REQUIRED,
        text
      });
  } else if (text.length < 6) {
    return dispatch =>
      dispatch({
        type: SIGNUP_PASSWORD_INVALID,
        text
      });
  }
  return dispatch =>
    dispatch({
      type: SIGNUP_PASSWORD_APPROVED,
      text
    });
};

export const passReset = () => dispatch =>
  dispatch({
    type: SIGNUP_PASSWORD_RESET
  });

/*--------------------PASSWORD CONFIRMATION FUNCTIONS--------------------*/
export const cpassCheckReq = (pass, cpass) => {
  if (cpass == '') {
    return dispatch =>
      dispatch({
        type: SIGNUP_CONF_PASSWORD_REQUIRED
      });
  }
  if (cpass == pass) {
    return dispatch =>
      dispatch({
        type: SIGNUP_CONF_PASSWORD_APPROVED
      });
  }
  return dispatch =>
    dispatch({
      type: SIGNUP_CONF_PASSWORD_REJECTED
    });
};

export const cpassReset = () => dispatch =>
  dispatch({
    type: SIGNUP_CONF_PASSWORD_RESET
  });

/*--------------------SIGNUP PRESS FUNCTION--------------------*/
export const signupCheckReq = email => dispatch => {
  if (!email) {
    dispatch({
      type: SIGNUP_EMAIL_MISSING
    });
  }
  // if (!user)
  // 	dispatch({
  // 		type: SIGNUP_USERNAME_MISSING
  // 	});
  // if (!pass)
  // 	dispatch({
  // 		type: SIGNUP_PASSWORD_MISSING
  // 	});
};

/*--------------------SIGNUP REQUEST FUNCTION--------------------*/
export const socialMediaSignUp = wedding_date => {
  const {
    role,
    uid,
    provider,
    full_name,
    fiance_full_name,
    wedding_role,
    venue,
    email,
    dob,
    partner_dob,
    phone_number,
    partner_phone_number
  } = store.getState().signupReducer;
  const body = {
    social_auth: true,
    user: {
      email,
      role,
      uid,
      provider,
      profile_attributes: {
        full_name,
        fiance_full_name,
        wedding_role,
        wedding_date,
        budget: 0,
        number_of_guests: 0,
        venue,
        dob,
        partner_dob,
        phone_number,
        partner_phone_number
      }
    }
  };
  return {
    [CALL_API]: {
      endpoint: '/users',
      authenticated: false,
      customConfig: {
        method: 'POST',
        body: JSON.stringify(body)
      },
      types: [SOCIAL_CREATE_USER_REQUEST, SOCIAL_CREATE_USER_SUCCESS, SOCIAL_CREATE_USER_FAILURE]
    }
  };
};
export const signup = (
  email,
  pass,
  cpass,
  role,
  full_name,
  fiance_full_name,
  wedding_role,
  wedding_date,
  venue,
  dob,
  partner_dob,
  phone_number,
  partner_phone_number
) => {
  const body = {
    social_auth: false,
    user: {
      email,
      password: pass,
      password_confirmation: cpass,
      role,
      uid: '',
      provider: '',
      profile_attributes: {
        full_name,
        fiance_full_name,
        wedding_role,
        wedding_date,
        budget: 0,
        number_of_guests: 0,
        venue,
        dob,
        partner_dob,
        phone_number,
        partner_phone_number
      }
    }
  };
  return {
    [CALL_API]: {
      endpoint: '/users',
      authenticated: false,
      customConfig: {
        method: 'POST',
        body: JSON.stringify(body)
      },
      types: [CREATE_USER_REQUEST, CREATE_USER_SUCCESS, CREATE_USER_FAILURE]
    }
  };
};

export const socialMediaAddition = (email, id) => dispatch => {
  dispatch({
    type: SIGNUP_SOCIAL_MEDIA,
    email,
    id
  });
};

export const setSocialLogin = (name, id, email, provider) => ({
  type: SET_SOCIAL_LOGIN,
  name,
  id,
  email,
  provider
});
