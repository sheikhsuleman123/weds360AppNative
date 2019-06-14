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
import { ChangePasswordScreenStyles } from './StyleSheet';
import TextInputCustom from '@components/TextInputCustom';
import AdaptiveView from '@components/AdaptiveView';

export default class ChangePasswordScreen extends React.Component {
  state = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  };

  componentWillReceiveProps(nextProps) {
    const {
      passwordError,
      language,
      popBack,
      failureChangePasswordUtils,
      isFetchingPasswordRequest
    } = nextProps;
    let passwordArrayError = [];
    if (passwordError) {
      passwordArrayError = Object.keys(passwordError).map(
        key => `Field '${[key]}' ${passwordError[key]}\n`
      );
    }
    if (!isFetchingPasswordRequest) {
      if (failureChangePasswordUtils) {
        if (language === 'ar') Alert.alert('يرجى التأكد من أنك قدمت المحتوى الصحيح.');
        else {
          Alert.alert('Invalid input', `${passwordArrayError.map(field => `${field}`)}`);
        }
      } else {
        if (language === 'ar') Alert.alert('تم تغيير كلمة المرور بنجاح');
        else Alert.alert('Password changed successfully');
        popBack();
      }
    }
  }
  render() {
    const { language, changePassword, isFetchingPasswordRequest, passwordError } = this.props;
    return (
      <ImageBackground
        source={require('@assets/background.png')}
        style={ChangePasswordScreenStyles.container}
        imageStyle={ChangePasswordScreenStyles.background}
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
            onChangeText={currentPassword => {
              this.setState({
                currentPassword
              });
            }}
            maxLength={20}
            placeholder="Current Password"
            inpstyle={ChangePasswordScreenStyles.email}
            line={ChangePasswordScreenStyles.line}
            textstyle={ChangePasswordScreenStyles.emailerror}
            // er={passwordError && passwordError.current_password}
            secure
          />
          <TextInputCustom
            onChangeText={newPassword => {
              this.setState({
                newPassword
              });
            }}
            maxLength={20}
            placeholder="New Password"
            inpstyle={ChangePasswordScreenStyles.email}
            line={ChangePasswordScreenStyles.line}
            textstyle={ChangePasswordScreenStyles.emailerror}
            // er={passwordError && passwordError.password}
            secure
          />
          <TextInputCustom
            onChangeText={confirmPassword => {
              this.setState({
                confirmPassword
              });
            }}
            maxLength={20}
            placeholder="Confirm Password"
            inpstyle={ChangePasswordScreenStyles.email}
            line={ChangePasswordScreenStyles.line}
            textstyle={ChangePasswordScreenStyles.emailerror}
            secure
          />

          <TouchableOpacity
            style={{ alignSelf: 'center', marginTop: 30 }}
            onPress={async () => {
              const { currentPassword, newPassword, confirmPassword } = this.state;
              if (
                currentPassword.length > 0 &&
                newPassword.length > 0 &&
                confirmPassword.length > 0 &&
                newPassword === confirmPassword
              ) {
                await changePassword(currentPassword, newPassword, confirmPassword);
              } else if (newPassword !== confirmPassword){
                if (language === 'ar') {
                  Alert.alert('تأكيد كلمه المرور غير صحيح.');
                } else Alert.alert('New and confirm password does not match.');
              }else if(language === 'ar') {
                Alert.alert('يرجى ملء الخانات الفارغة بالمحتوى المناسب.');
              } else Alert.alert('Please fill in the blank boxes with appropriate content.');
            }}
          >
            <Text style={ChangePasswordScreenStyles.text}>
              {language === 'ar' ? 'تغيير كلمة المرور' : 'Change Password'}
            </Text>
          </TouchableOpacity>
          {isFetchingPasswordRequest ? (
            <View style={ChangePasswordScreenStyles.overlay}>
              <ActivityIndicator size="large" color="white" />
            </View>
          ) : null}
        </AdaptiveView>
      </ImageBackground>
    );
  }
}
