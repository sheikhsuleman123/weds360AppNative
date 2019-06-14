import React from 'react';
import { Text, View, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { SigninScreenStyles } from './StyleSheet';
import TextInputCustom from '../../../../components/TextInputCustom';

import AdaptiveView from '../../../../components/AdaptiveView';
import SocialMediaLogin from '../../SocialMedia/SocialMediaLogin';
import I18n from '@i18n';

const mainPath = 'signin.text.';

export default class LoginScreen extends React.Component {
  render() {
    const { language, proceedToQuestions } = this.props;
    return (
      <ImageBackground
        source={require('../../../../../assets/background.png')}
        style={SigninScreenStyles.container}
        imageStyle={SigninScreenStyles.background}
      >
        <AdaptiveView>
          <Image
            style={{
              marginTop: '17%',
              alignSelf: 'center',
              width: 107,
              height: 74
            }}
            source={require('../../../../../assets/logoblack.png')}
            resizeMode={'contain'}
          />
          <TextInputCustom
            onEndEditing={this.props.mailonEndEditing}
            onSubmitEditing={this.props.mailonSubmitEditing}
            onFocus={this.props.mailonFocus}
            onChangeText={this.props.onEmailChange}
            placeholder={I18n.t(`${mainPath}email`)}
            secure={false}
            inpstyle={SigninScreenStyles.email}
            line={SigninScreenStyles.line}
            textstyle={SigninScreenStyles.emailerror}
            er={this.props.emailer}
            keyboardType={'email-address'}
            maxLength={50}
          />
          <TextInputCustom
            onEndEditing={this.props.passonEndEditing}
            onSubmitEditing={this.props.passonSubmitEditing}
            onFocus={this.props.passonFocus}
            onChangeText={this.props.onPassChange}
            placeholder={I18n.t(`${mainPath}password`)}
            secure
            inpstyle={SigninScreenStyles.password}
            line={SigninScreenStyles.line}
            textstyle={SigninScreenStyles.passworderror}
            er={this.props.passworder}
            maxLength={20}
          />
          <TouchableOpacity style={SigninScreenStyles.signup} onPress={this.props.onLoginPress}>
            <Text style={SigninScreenStyles.signuptext}>{I18n.t(`${mainPath}header`)}</Text>
          </TouchableOpacity>
          <Text style={SigninScreenStyles.alreadyhave}>{I18n.t(`${mainPath}sign_up_text`)}</Text>
          <TouchableOpacity
            style={SigninScreenStyles.signin}
            onPress={() => {
              Actions.questions();
            }}
          >
            <Text style={SigninScreenStyles.signintext}>{I18n.t(`${mainPath}sign_up`)}</Text>
          </TouchableOpacity>
          <View style={{ height: 50, flexDirection: 'row', alignSelf: 'center', marginTop: '2%' }}>
            <View
              style={{
                height: 1,
                opacity: 0.5,
                width: '40%',
                backgroundColor: 'black',
                alignSelf: 'center'
              }}
            />
            <Text style={SigninScreenStyles.or}>{language === 'ar' ? 'أو' : 'OR'}</Text>
            <View
              style={{
                height: 1,
                opacity: 0.5,
                width: '40%',
                backgroundColor: 'black',
                alignSelf: 'center'
              }}
            />
          </View>
          <SocialMediaLogin
            proceedToQuestions={proceedToQuestions}
            checkEmail={this.props.checkEmail}
            signin={async (name, id, email, provider) => {
              await this.props.setSocialLogin(name, id, email, provider);
              this.props.onSocialMediaLoginFinished();
            }}
            signup={(name, id, email, provider) => {
              this.props.setSocialLogin(name, id, email, provider);
              Actions.questions();
            }}
          />
          <TouchableOpacity
            style={{ alignSelf: 'center', marginTop: 30 }}
            onPress={() => Actions.forgot_password()}
          >
            <Text style={SigninScreenStyles.alreadyhave}>
              {I18n.t(`${mainPath}forgot_password`)}
            </Text>
          </TouchableOpacity>
        </AdaptiveView>
      </ImageBackground>
    );
  }
}
