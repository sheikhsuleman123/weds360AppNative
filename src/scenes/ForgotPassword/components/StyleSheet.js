import EStyleSheet from 'react-native-extended-stylesheet';

export const ForgotPasswordScreenStyles = EStyleSheet.create({
  container: {
    flex: 1,
    opacity: 0.75
  },
  exit: {
    marginTop: '9.9%',
    marginLeft: '5.7%',
    alignItems: 'center',
    justifyContent: 'center',
    width: 19,
    height: 19
  },
  text: {
    marginTop: '15%',
    marginLeft: '8.6%',
    width: 293,
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Lato-Black',
    fontSize: 14.6,
    fontWeight: '500',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'left',
    color: '#000000'
  },
  email: {
    flex: 0,
    marginTop: '7.6%',
    marginLeft: '8.7%',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Lato-Black',
    fontSize: 15,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'left',
    color: '#000000'
  },
  emailerror: {
    zIndex: 1,
    fontSize: 10.7,
    fontWeight: 'bold',
    fontFamily: 'Lato-Light',
    position: 'absolute',
    marginTop: '7.5%',
    marginLeft: '69%',
    color: '#000000'
  },
  line: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    width: '82.4%',
    left: '8.6%',
    opacity: 0.2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  background: {
    zIndex: -1,
    height: '100%',
    width: '100%',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.25,
    flex: 1
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  backText: {
    fontSize: 16,
    fontFamily: '$light'
  }
});
