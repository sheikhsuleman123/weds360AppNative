import { combineReducers } from 'redux';

import signupReducer from './scenes/Authentication/Signup/reducer';
import loginReducer from './scenes/Authentication/Signin/reducer';
import authenticationReducer from './scenes/Authentication/reducer';

import articlesReducer from './scenes/Posts/reducer';
import inspirationReducer from './scenes/Inspiration/reducer';
import forgotpasswordReducer from './scenes/ForgotPassword/reducer';
import changepasswordReducer from './scenes/ChangePassword/reducer';

import budgeterReducer from './scenes/PlanningTools/Budgeter/reducer';
import checklistReducer from './scenes/PlanningTools/Checklist/reducer';
import registriesReducer from './scenes/PlanningTools/Registry/reducer';
import eventsReducer from './scenes/PlanningTools/Invites/reducer';

import languageReducer from './scenes/LanguageSelect/reducer';

import reviewsReducer from './scenes/Reviews/reducer';
import proposalReducer from './scenes/Proposal/reducer';

import homescreenReducer from './scenes/Homescreen/reducer';

import dressesReducer from './scenes/Categories/Dresses/reducer';
import ringsReducer from './scenes/Categories/Rings/reducer';
import servicesReducer from './scenes/Categories/Services/reducer';
// import vendorsReducer from './reducers/vendors';
import conversationsReducer from './scenes/Messages/reducer';

import likesReducer from './reducers/likes';
import tagsReducer from './reducers/tags';

import { PROFILE_RESET, TOKEN_STORE, CONNECTION_STORE } from './actions';

const globalReducer = (state = {}, action) => {
  switch (action.type) {
    case TOKEN_STORE:
      return {
        ...state,
        token: action.token
      };
    case CONNECTION_STORE:
      return {
        ...state,
        connection: action.connected
      };
    default:
      return state;
  }
};

// Combine all the reducers
const appReducer = combineReducers({
  signupReducer,
  proposalReducer,
  loginReducer,
  dressesReducer,
  authenticationReducer,
  // vendorsReducer,
  homescreenReducer,
  servicesReducer,
  articlesReducer,
  inspirationReducer,
  budgeterReducer,
  languageReducer,
  checklistReducer,
  conversationsReducer,
  registriesReducer,
  reviewsReducer,
  likesReducer,
  ringsReducer,
  tagsReducer,
  eventsReducer,
  forgotpasswordReducer,
  changepasswordReducer,
  globalReducer
});

const rootReducer = (state, action) => {
  if (action.type === 'PROFILE_RESET') {
    state = {};
  }
  return appReducer(state, action);
};

export default rootReducer;
