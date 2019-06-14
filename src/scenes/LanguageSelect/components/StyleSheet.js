import EStyleSheet from 'react-native-extended-stylesheet';

import I18n from '../../../i18n';

export const LanguageSelectScreenStyles = EStyleSheet.create({
  animatedContainer: {
    height: '100%',
    width: '100%'
  },
  container: {
    flex: 1,
    backgroundColor: 'rgb(0, 137, 208)',
    alignItems: 'center'
  },
  mainText: {
    fontFamily: 'Hand-Of-Sean-Demo',
    fontSize: 27.8,
    color: 'white',
    textAlign: 'center',
    marginLeft: '20%',
    marginRight: '20%',
    marginTop: '30%',
    transform: [{ rotate: '-12deg' }]
  },
  mainTextUnderline: {
    fontFamily: 'Hand-Of-Sean-Demo',
    fontSize: 27.8,
    color: 'white',
    textAlign: 'center',
    marginLeft: '20%',
    marginRight: '20%',
    marginTop: '30%',
    textDecorationLine: 'underline',
    transform: [{ rotate: '-12deg' }]
  },
  logoContainer: {
    width: '100%',
    height: '20%',
    backgroundColor: 'rgb(0, 137, 208)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    width: '20%'
  },
  languageEnglish: {
    fontFamily: 'SohoGothicPro-Medium',
    color: 'white',
    fontSize: 25,
    textAlign: 'center'
  },
  languageArabic: {
    fontFamily: 'Tajawal-Bold',
    color: 'white',
    fontSize: 25,
    textAlign: 'center'
  },
  touchable: { margin: '10%', marginTop: '18%' },
  line: {
    marginTop: '15%',
    height: '15%',
    width: 1,
    backgroundColor: 'white'
  }
});
