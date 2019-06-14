import EStyleSheet from 'react-native-extended-stylesheet';

export const SigninScreenStyles = EStyleSheet.create({
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
    fontFamily: '$black',
    fontSize: 14.6,
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
    fontFamily: '$black',
    fontSize: 15,
    textAlign: 'left',
    color: '#000000'
  },
  emailerror: {
    zIndex: 1,
    fontSize: 10.7,
    fontFamily: '$light',
    position: 'absolute',
    marginTop: '7.5%',
    marginLeft: '69%',
    color: '#000000'
  },
  password: {
    flex: 0,
    marginTop: '8%',
    marginLeft: '8.7%',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: '$black',
    fontSize: 15,
    textAlign: 'left'
  },
  passworderror: {
    zIndex: 1,
    position: 'absolute',
    fontSize: 10.7,
    fontWeight: 'bold',
    fontFamily: '$light',
    marginTop: '7%',
    marginLeft: '69%'
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
  signup: {
    width: '80%',
    height: 36,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000',
    marginTop: 40
  },
  signuptext: {
    fontFamily: '$black',
    fontSize: 11.7,
    color: '#ffffff'
  },
  alreadyhave: {
    marginTop: '3%',
    marginBottom: '3%',
    fontFamily: '$black',
    fontSize: 10.2,
    alignSelf: 'center',
    textAlign: 'left',
    color: '#ce1848'
  },
  signin: {
    width: '25%',
    height: 26,
    alignItems: 'center',
    backgroundColor: '#cccccc',
    alignSelf: 'center',
    justifyContent: 'center'
  },
  signintext: {
    fontFamily: '$black',
    fontSize: 12,
    color: '#000000'
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
  or: {
    fontFamily: '$light',
    alignSelf: 'center'
  }
});
