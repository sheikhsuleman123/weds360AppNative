import { AsyncStorage, View, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import React from 'react';
import { Facebook, Google } from 'expo';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  FB_APP_ID,
  ANDROID_CLIENT_ID,
  IOS_CLIENT_ID,
  RELEASE_IOS_CLIENT_ID
} from '../../../constants';
import * as SignupActions from '../Signup/actions';
import { SMLStyles } from './StyleSheet';

class SocialMediaLogin extends React.Component {
  logInFB = async () => {
    const { type, token } = await Facebook.logInWithReadPermissionsAsync(FB_APP_ID, {
      permissions: ['public_profile', 'email']
    });
    if (type && token) {
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}&fields=id,name,email`
        );
        return response.json();
      }
      return null;
    }
  };

  logInGoogle = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId: ANDROID_CLIENT_ID,
        iosClientId: IOS_CLIENT_ID,
        androidStandaloneAppClientId: ANDROID_CLIENT_ID,
        iosStandaloneAppClientId: RELEASE_IOS_CLIENT_ID,
        scopes: ['profile', 'email']
      });
      if (result && result.type === 'success') {
        const jsonResp = await result.user;
        return result;
      }
      return { cancelled: true };
    } catch (e) {
      return { error: true };
    }
  };

  onGooglePress = async () => {
    this.setState({ allowReceiveProps: true });
    const response = await this.logInGoogle();
    const { user, accessToken } = response;
    await AsyncStorage.setItem('socialAccessToken', accessToken);
    if (user) {
      this.props.checkEmail(response.user.email);
      this.setState({ response: response.user, provider: 'google' });
    }
  };

  onFacebookPress = async () => {
    this.setState({ allowReceiveProps: true });
    const response = await this.logInFB();
    if (response) {
      this.props.checkEmail(response.email);
      this.setState({ response, provider: 'facebook' });
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.proceedToQuestions !== undefined && this.state && this.state.allowReceiveProps) {
      const { response, provider } = this.state;
      this.setState({ allowReceiveProps: false });
      if (nextProps.proceedToQuestions) {
        this.props.signup(response && response.name, response.id, response.email, provider);
      } else {
        this.props.signin(response && response.name, response.id, response.email, provider);
      }
    }
  }
  render() {
    return (
      <View
        style={{
          flexDirection: 'row',
          width: '80%',
          alignSelf: 'center',
          marginTop: '3%'
        }}
      >
        <View style={{ width: '50%', alignItems: 'center' }}>
          <TouchableOpacity
            style={{
              width: '80%',
              alignItems: 'center',
              alignSelf: 'center',
              backgroundColor: 'rgb(219, 13, 13)',
              height: 36,
              flexDirection: 'row'
            }}
            onPress={this.onGooglePress}
          >
            <Icon
              style={{
                color: 'white',
                padding: 4,
                marginLeft: '9%',
                fontSize: 17
              }}
              name="google-plus"
            />
            <Text style={SMLStyles.text}>GOOGLE</Text>
          </TouchableOpacity>
        </View>
        <View style={{ width: '50%', alignItems: 'center' }}>
          <TouchableOpacity
            style={{
              width: '80%',
              alignItems: 'center',
              backgroundColor: 'rgb(16, 42, 184)',
              height: 36,
              flexDirection: 'row'
            }}
            onPress={this.onFacebookPress}
          >
            <Icon
              style={{
                color: 'white',
                padding: 4,
                marginLeft: '9%',
                fontSize: 17
              }}
              name="facebook"
            />
            <Text style={SMLStyles.text}>FACEBOOK</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

// The function takes data from the app current state,
// and insert/links it into the props of our component.
// This function makes Redux know that this component needs to be passed a piece of the state
function mapStateToProps(state, props) {
  return {
    emailcheck: state.signupReducer.emailcheck
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
  null,
  null
)(SocialMediaLogin);
