import EStyleSheet from 'react-native-extended-stylesheet';

export const SignupScreenStyles = EStyleSheet.create({
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
  logo: {
    marginTop: '4.8%',
    marginLeft: '34.8%',
    alignItems: 'center',
    justifyContent: 'center',
    width: 107,
    height: 74
  },
  text: {
    marginTop: '15%',
    marginLeft: '8.6%',
    width: 293,
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: '$black',
    fontSize: 14.6,

    letterSpacing: 0,
    textAlign: 'left',
    color: '#000000'
  },
  email: {
    marginTop: '7%',
    marginLeft: '8.7%',
    alignItems: 'center',
    fontFamily: '$black',
    fontSize: 15,
    width: '80%',
    letterSpacing: 0,
    textAlign: 'left',
    color: '#000000'
  },
  errorText: {
    fontSize: 10.7,
    textAlign: 'right',
    fontFamily: '$light'
  },
  username: {
    flex: 0,
    marginTop: '8%',
    left: '8.7%',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: '$black',
    fontSize: 15,

    letterSpacing: 0,
    textAlign: 'left',
    color: '#000000'
  },
  usernameerror: {
    zIndex: 1,
    position: 'absolute',
    fontSize: 10.7,

    fontFamily: '$light',
    marginTop: '7.5%',
    marginLeft: '69%'
  },
  password: {
    flex: 0,
    marginTop: '8%',
    marginLeft: '8.7%',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: '$black',
    fontSize: 15,

    width: '80%',
    letterSpacing: 0,
    textAlign: 'left',
    color: '#000000'
  },
  passworderror: {
    fontSize: 10.7,
    fontFamily: '$light'
  },
  confirmpassword: {
    flex: 0,
    marginTop: '8%',
    marginLeft: '8.7%',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: '$black',
    fontSize: 15,

    width: '80%',
    letterSpacing: 0,
    textAlign: 'left',
    color: '#000000'
  },
  confirmpassworderror: {
    fontSize: 10.7,
    fontFamily: '$light'
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
    marginTop: 40,
    alignSelf: 'center',
    backgroundColor: '#000000'
  },
  signuptext: {
    fontFamily: '$black',
    fontSize: 11.7,

    letterSpacing: 0,
    marginTop: 10,
    textAlign: 'center',
    color: '#ffffff'
  },
  alreadyhave: {
    marginTop: '6.1%',
    marginBottom: '3%',
    // marginLeft: "34.9%",
    alignSelf: 'center',
    fontFamily: '$black',
    fontSize: 10.2,

    alignItems: 'center',
    justifyContent: 'center',
    letterSpacing: 0,
    textAlign: 'left',
    color: '#ce1848'
  },
  signin: {
    width: '25%',
    height: 26,
    // marginLeft: "34.4%",
    backgroundColor: '#cccccc',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  signintext: {
    fontFamily: '$black',
    fontSize: 12,

    letterSpacing: 0,
    // textAlign: "center",
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
