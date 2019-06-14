import React, { PropTypes } from 'react';
import { ActivityIndicator, AsyncStorage, Alert, View, Linking } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux';
import LoginScreen from './components/SigninScreen';
import * as LoginActions from './actions';
import { mailCheckReq, setSocialLogin, socialMediaSignUp } from '../Signup/actions';
import { BASE_WEB_URL } from '../../../constants';

class Login extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = { email: '', password: '' };
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <LoginScreen
          language={this.props.language}
          setSocialLogin={this.props.setSocialLogin}
          onEmailChange={text => {
            this.setState({
              email: text
            });
          }}
          onPassChange={text => {
            this.setState({
              password: text
            });
          }}
          proceedToQuestions={this.props.proceedToQuestions}
          onSocialMediaLoginFinished={async () => {
            await this.props.socialMediaSignUp(null);
            if (this.props.newUser && this.props.newUser.token) {
              await AsyncStorage.setItem('token', this.props.newUser.token);
              if (!this.props.newUser.profile_completed) {
                await AsyncStorage.removeItem('token');
                Alert.alert('Missing Data', 'Please complete your profile on the web first.', [
                  {
                    text: 'Open Website',
                    onPress: () => Linking.openURL(`${BASE_WEB_URL}/en/users/sign_in`)
                  },
                  { text: 'Ok', onPress: () => {} }
                ]);
              } else {
                // Redirect to Homepage

                Actions.tabscreens();
              }
            } else {
              Alert.alert('Error', 'An Error has occured. please try again later.');
            }
          }}
          checkEmail={email => this.props.mailCheckReq(email)}
          onXPress={() => Actions.pop()}
          mailonEndEditing={e => {
            this.setState({
              email: e.nativeEvent.text
            });
          }}
          mailonSubmitEditing={e => {
            this.setState({
              email: e.nativeEvent.text
            });
          }}
          passonEndEditing={e => {
            this.setState({
              password: e.nativeEvent.text
            });
          }}
          passonSubmitEditing={e => {
            this.setState({
              password: e.nativeEvent.text
            });
          }}
          onLoginPress={async () => {
            await this.props.login(this.state.email, this.state.password);
            if (this.props.token !== undefined) {
              AsyncStorage.setItem('token', this.props.token);
              if (!this.props.profile_completed) {
                await AsyncStorage.removeItem('token');
                Alert.alert('Missing Data', 'Please complete your profile on the web first.', [
                  {
                    text: 'Open Website',
                    onPress: () =>
                      Linking.openURL(`${BASE_WEB_URL}/${this.props.language}/users/sign_in`)
                  },
                  { text: 'Ok', onPress: () => {} }
                ]);
              } else {
                // Redirect to Homepage

                Actions.tabscreens();
              }
            } else {
              Alert.alert('Request Unsuccessful', 'Invalid Email or Password.');
            }
          }}
          emailer={this.props.emailer}
          usernameer={this.props.usernameer}
          passworder={this.props.passworder}
          confirmpassworder={this.props.confirmpassworder}
        />
        {this.props.isFetching ? (
          <View
            style={{
              position: 'absolute',
              backgroundColor: 'rgba(0,0,0,0.4)',
              height: '100%',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <ActivityIndicator style={{}} size="large" color="white" />
          </View>
        ) : null}
      </View>
    );
  }
}

// The function takes data from the app current state,
// and insert/links it into the props of our component.
// This function makes Redux know that this component needs to be passed a piece of the state
function mapStateToProps(state, props) {
  return {
    ...state.loginReducer,
    ...state.signupReducer,
    ...state.languageReducer,
    newUser: state.signupReducer.newUser,
    proceedToQuestions: state.signupReducer.proceedToQuestions
  };
}

// Doing this merges our actions into the component’s props,
// while wrapping them in dispatch() so that they immediately dispatch an Action.
// Just by doing this, we will have access to the actions defined in out actions file (action/home.js)
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    Object.assign(LoginActions, {
      mailCheckReq,
      setSocialLogin,
      socialMediaSignUp
    }),
    dispatch
  );
}

//Connect everything

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
