import React from 'react';
import { Text, View, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { SignupScreenStyles } from './StyleSheet';
import TextInputCustom from '../../../../components/TextInputCustom';
import I18n from '@i18n';
import AdaptiveView from '../../../../components/AdaptiveView';
const mainPath = 'signup.text.';

export default class SignupScreen extends React.Component {
  render() {
    const { language } = this.props;
    let textArray = ['SIGN UP', 'OR', 'Already have an account?', 'SIGN IN'];
    if (language === 'ar') {
      textArray = ['انشاء حساب', 'أو', 'هل لديك حساب؟', 'تسجيل دخول'];
    }
    return (
      <ImageBackground
        source={require('../../../../../assets/background.png')}
        style={SignupScreenStyles.container}
        imageStyle={SignupScreenStyles.background}
      >
        <AdaptiveView>
          <TouchableOpacity
            style={{
              marginTop: '9.9%',
              marginLeft: '5.7%',
              alignItems: 'center',
              justifyContent: 'center',
              width: 30,
              height: 30
            }}
          />
          <Image
            style={SignupScreenStyles.logo}
            resizeMode={'contain'}
            source={require('../../../../../assets/logoblack.png')}
          />
          {/* <Text style={SignupScreenStyles.text}>
					Sign up to access device, tools, and the best local vendors.
				</Text> */}
          <TextInputCustom
            value={this.props.email}
            onEndEditing={this.props.mailonEndEditing}
            onSubmitEditing={this.props.mailonSubmitEditing}
            onFocus={this.props.mailonFocus}
            onChangeText={text => {
              this.props.mailOnChange(text);
            }}
            placeholder={I18n.t(`${mainPath}email`)}
            secure={false}
            inpstyle={SignupScreenStyles.email}
            line={SignupScreenStyles.line}
            textstyle={SignupScreenStyles.errorText}
            er={this.props.emailer}
            keyboardType={'email-address'}
            maxLength={50}
          />
          <TextInputCustom
            value={this.props.password}
            onEndEditing={this.props.passonEndEditing}
            onSubmitEditing={this.props.passonSubmitEditing}
            onFocus={this.props.passonFocus}
            placeholder={I18n.t(`${mainPath}password`)}
            secure
            maxLength={20}
            inpstyle={SignupScreenStyles.password}
            line={SignupScreenStyles.line}
            textstyle={SignupScreenStyles.errorText}
            er={this.props.passworder}
            maxLength={20}
          />
          <TextInputCustom
            onEndEditing={this.props.cpassonEndEditing}
            onSubmitEditing={this.props.cpassonSubmitEditing}
            placeholder={I18n.t(`${mainPath}confirm_password`)}
            secure
            maxLength={20}
            inpstyle={SignupScreenStyles.confirmpassword}
            line={SignupScreenStyles.line}
            textstyle={SignupScreenStyles.errorText}
            er={this.props.confirmpassworder}
          />
          <TouchableOpacity style={SignupScreenStyles.signup} onPress={this.props.onSignUpPress}>
            <Text style={SignupScreenStyles.signuptext}>{textArray[0]}</Text>
          </TouchableOpacity>
          <View
            style={{
              height: 50,
              flexDirection: 'row',
              alignSelf: 'center',
              marginTop: '2%'
            }}
          >
            <View
              style={{
                height: 1,
                opacity: 0.5,
                width: '40%',
                backgroundColor: 'black',
                alignSelf: 'center'
              }}
            />
            <Text style={SignupScreenStyles.or}>{textArray[1]}</Text>
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
          <Text style={SignupScreenStyles.alreadyhave}>{textArray[2]}</Text>
          <TouchableOpacity
            style={SignupScreenStyles.signin}
            onPress={() => {
              Actions.login();
            }}
          >
            <Text style={SignupScreenStyles.signintext}>{textArray[3]}</Text>
          </TouchableOpacity>
        </AdaptiveView>
      </ImageBackground>
    );
  }
}
