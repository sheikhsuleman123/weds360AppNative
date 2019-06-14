import { AsyncStorage } from 'react-native';

export const SET_LANGUAGE = 'SET_LANGUAGE';
export const ENGLISH_LANG = 'ENGLISH_LANG';
export const ARABIC_LANG = 'ARABIC_LANG';

export const languageSelect = (language, save, isRTL) => {
  if (save) {
    AsyncStorage.multiSet([['lang', language], ['rtl', `${isRTL}`]]);
  }
  return {
    type: SET_LANGUAGE,
    language,
    isRTL
  };
};

export const setLanguage = language => {
  if (language === 'en') {
    return dispatch => {
      dispatch(english());
    };
  }
  return dispatch => {
    dispatch(arabic());
  };
};

export const english = () => {
  AsyncStorage.setItem('lang', 'en');
  return {
    type: ENGLISH_LANG
  };
};

export const arabic = () => {
  AsyncStorage.setItem('lang', 'ar');
  return {
    type: ARABIC_LANG
  };
};
