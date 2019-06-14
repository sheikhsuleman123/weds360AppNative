import React from 'react';
import {
  Alert,
  ActivityIndicator,
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity
} from 'react-native';

import BackButton from '@components/BackButton';
import TextInputCustom from '@components/TextInputCustom';
import AdaptiveView from '@components/AdaptiveView';
import { ForgotPasswordScreenStyles } from './StyleSheet';

export default class ForgotPasswordScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      email: ''
    };
  }

  render() {
    const { language, passwordResetRequest, isFetchingPasswordRequest, popToLogin } = this.props;
    return (
      <ImageBackground
        source={require('@assets/background.png')}
        style={ForgotPasswordScreenStyles.container}
        imageStyle={ForgotPasswordScreenStyles.background}
      >
        <AdaptiveView>
          <BackButton />
          <Image
            style={{
              marginTop: '17%',
              alignSelf: 'center',
              width: 107,
              height: 74
            }}
            source={require('@assets/logoblack.png')}
            resizeMode="contain"
          />
          <TextInputCustom
            onChangeText={email => {
              this.setState({
                email: email.toLowerCase()
              });
            }}
            placeholder="E-Mail"
            inpstyle={ForgotPasswordScreenStyles.email}
            line={ForgotPasswordScreenStyles.line}
            textstyle={ForgotPasswordScreenStyles.emailerror}
            er={this.props.emailer}
            keyboardType={'email-address'}
          />

          <TouchableOpacity
            style={{ alignSelf: 'center', marginTop: 30 }}
            onPress={async () => {
              const { email } = this.state;
              if (email.includes('@') && email.includes('.')) {
                await passwordResetRequest(email);
                Alert.alert(
                  '',
                  'Password Reset Confirmation message was sent to the e-mail you provided.'
                );
                popToLogin();
              } else {
                Alert.alert('', 'Please fill in the email box with appropriate content.');
              }
            }}
          >
            <Text style={ForgotPasswordScreenStyles.text}>
              {language === 'ar' ? 'نسيت رقمك السري؟' : 'Reset password'}
            </Text>
          </TouchableOpacity>
          {isFetchingPasswordRequest ? (
            <View style={ForgotPasswordScreenStyles.overlay}>
              <ActivityIndicator size="large" color="white" />
            </View>
          ) : null}
        </AdaptiveView>
      </ImageBackground>
    );
  }
}
