import { ENGLISH_LANG, ARABIC_LANG } from './actions';

const languageReducer = (state = { language: 'en' }, action) => {
  switch (action.type) {
    case ENGLISH_LANG:
      return {
        ...state,
        language: 'en'
      };
    case ARABIC_LANG:
      return {
        ...state,
        language: 'ar'
      };
    default:
      return state;
  }
};

export default languageReducer;
