import React, { PropTypes } from 'react';
import { ActivityIndicator, AsyncStorage, Alert, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SignupScreen from './components/SignupScreen';
import * as SignupActions from './actions';

class Signup extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false
    };
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <SignupScreen
          {...this.props}
          language={this.props.language}
          onXPress={() => Actions.tabscreens()}
          mailonEndEditing={e => {
            this.props.mailCheckReq(e.nativeEvent.text);
          }}
          mailonSubmitEditing={e => {
            this.props.mailCheckReq(e.nativeEvent.text);
          }}
          mailonFocus={() => {
            this.props.mailReset('');
          }}
          mailOnChange={text => {
            this.props.mailReset(text);
          }}
          useronEndEditing={e => {
            this.props.userCheckReq(e.nativeEvent.text);
          }}
          useronSubmitEditing={e => {
            this.props.userCheckReq(e.nativeEvent.text);
          }}
          useronFocus={() => {
            this.props.userReset();
          }}
          passonEndEditing={e => {
            this.props.passCheckReq(e.nativeEvent.text);
          }}
          passonSubmitEditing={e => {
            this.props.passCheckReq(e.nativeEvent.text);
          }}
          cpassonEndEditing={e => {
            this.props.cpassCheckReq(e.nativeEvent.text, this.props.password);
          }}
          cpassonSubmitEditing={e => {
            this.props.cpassCheckReq(e.nativeEvent.text, this.props.password);
          }}
          checkEmail={email => this.props.mailCheckReq(email)}
          onSignUpPress={async () => {
            if (this.props.emailcheck) {
              await this.props.signup(
                this.props.email,
                this.props.password,
                this.props.password,
                this.props.role,
                this.props.full_name,
                this.props.fiance_full_name,
                this.props.wedding_role,
                `${this.props.chosenYear}-${this.props.selectedMonthKey}-${this.props.chosenDay}`,
                this.props.venue,
                this.props.dob,
                this.props.partner_dob,
                this.props.phone_number,
                this.props.partner_phone_number
              );
              if (this.props.newUser) {
                if (this.props.newUser && this.props.newUser.token) {
                  AsyncStorage.setItem('token', this.props.newUser.token);
                  // Redirect to Homepage
                  Actions.tabscreens();
                } else {
                  Alert.alert(
                    'Request Unsuccessful',
                    'Sign up request refused, please re-check your data.'
                  );
                }
              }
            } else {
              this.props.signupCheckReq(this.props.emailcheck);
            }
          }}
          onLoginPress={async () => {
            const authentication = await AsyncStorage.getItem('item');
            if (authentication) Actions.tabscreens();
            else Actions.login();
          }}
          emailer={this.props.emailer}
          usernameer={this.props.usernameer}
          passworder={this.props.passworder}
          confirmpassworder={this.props.confirmpassworder}
        />
        {this.props.isFetching ? (
          <View
            style={{
              flex: 1,
              height: '100%',
              width: '100%',
              position: 'absolute',
              backgroundColor: 'rgba(0,0,0,0.5)',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <ActivityIndicator size="large" color="white" />
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
    email: state.signupReducer.email,
    emailer: state.signupReducer.emailer,
    emailcheck: state.signupReducer.emailcheck,
    usernameer: state.signupReducer.usernameer,
    usernamecheck: state.signupReducer.usernamecheck,
    passworder: state.signupReducer.passworder,
    passwordcheck: state.signupReducer.passwordcheck,
    confirmpassworder: state.signupReducer.confirmpassworder,
    password: state.signupReducer.password,
    full_name: state.signupReducer.full_name,
    fiance_full_name: state.signupReducer.fiance_full_name,
    role: state.signupReducer.role,
    wedding_role: state.signupReducer.wedding_role,
    venue: state.signupReducer.venue,
    selectedMonthKey: state.proposalReducer.selectedMonthKey,
    chosenDay: state.proposalReducer.chosenDay,
    chosenYear: state.proposalReducer.chosenYear,
    isFetching: state.signupReducer.isFetching,
    newUser: state.signupReducer.newUser,
    social_auth: state.signupReducer.social_auth,
    uid: state.signupReducer.uid,
    provider: state.signupReducer.provider,
    dob: state.signupReducer.dob,
    partner_dob: state.signupReducer.partner_dob,
    phone_number: state.signupReducer.phone_number,
    partner_phone_number: state.signupReducer.partner_phone_number,
    ...state.languageReducer
  };
}

// Doing this merges our actions into the component’s props,
// while wrapping them in dispatch() so that they immediately dispatch an Action.
// Just by doing this, we will have access to the actions defined in out actions file (action/home.js)
function mapDispatchToProps(dispatch) {
  return bindActionCreators(SignupActions, dispatch);
}

//Connect everything

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signup);
