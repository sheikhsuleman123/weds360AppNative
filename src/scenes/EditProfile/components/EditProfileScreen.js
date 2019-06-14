import React from 'react';
import {
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  Text,
  View,
  Alert,
  AsyncStorage,
  Dimensions,
  KeyboardAvoidingView,
  Switch,
  Platform
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import I18n from '@i18n';
import { Google } from 'expo';
import {
  FB_APP_ID,
  ANDROID_CLIENT_ID,
  IOS_CLIENT_ID,
  RELEASE_IOS_CLIENT_ID
} from '../../../constants';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Actions } from 'react-native-router-flux';
import DatePicker from 'react-native-datepicker';
import Image from 'react-native-image-progress';
import Header from '@components/Header';
import AdaptiveView from '@components/AdaptiveView';
import EntryHandler from './EntryHandler';
import { EditProfileScreenStyles } from './StyleSheet';

export default class EditProfileScreen extends React.Component {
  render() {
    const { language, role } = this.props;
    let textArray = [
      'Edit Profile',
      'Done',
      'Change Profile Photo',
      'Name',
      "Partner's Name",
      'Wedding Location',
      'Number Of Guests',
      'Wedding Date',
      'Budget',
      'Language',
      'Logout',
      'Submitting',
      'Change Password',
      'Phone Number',
      "Partner's Number",
      'Date of Birth',
      "Partner's Date of Birth",
      'Email'
    ];
    if (language === 'ar') {
      textArray = [
        'تعديل الملف الشخصي',
        'تم',
        'تغيير صورة الملف الشخصي',
        'الاسم',
        'اسم الشريك',
        'موقع الزفاف',
        'عدد الضيوف',
        'موعد العرس',
        'ميزانية',
        'اللغه',
        'الخروج',
        'تحميل',
        'تغيير كلمة المرور',
        'رقم الهاتف',
        'رقم الشريك',
        'تاريخ الولادة',
        'تاريخ ميلاد الشريك',
        'البريد الالكتروني'
      ];
    }
    return (
      <View style={{ flex: 1 }}>
        <Header
          showBottomLine
          iconNameSelected="md-heart"
          customIconStyle={{
            color: '#003430',
            fontSize: 25
          }}
          headerText={textArray[0]}
          showBackButton
          onBackPressed={() => {
            Actions.pop();
          }}
          language={this.props.language}
          rightHeaderText={textArray[1]}
          rightHeaderTextPressed={this.props.onDonePress}
          language={language}
        />

        {this.props.isEditing ? (
          <View
            style={{
              height: Dimensions.get('window').height,
              backgroundColor: '#f0eeee',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column'
            }}
          >
            <Text style={{ fontFamily: 'Lato-Light' }}>{textArray[11]}...</Text>
            <ActivityIndicator
              style={{
                margin: 'auto'
              }}
              size="large"
              color="#003430"
            />
          </View>
        ) : (
          <KeyboardAwareScrollView style={{ flex: 1 }}>
            <AdaptiveView>
              <View
                style={{
                  height: 192.5,
                  backgroundColor: '#f0eeee',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Image
                  source={{
                    uri:
                      (this.props.image && this.props.image.uri) ||
                      this.props.profile.attributes.profile.data.attributes.profile_photo_url
                  }}
                  style={{
                    width: 120,
                    height: 120
                  }}
                  imageStyle={{
                    borderRadius: 60
                  }}
                  resizeMode={'cover'}
                />
                <TouchableOpacity onPress={this.props.onChangeImagePress}>
                  <Text style={EditProfileScreenStyles.pictureChange}>{textArray[2]}</Text>
                </TouchableOpacity>
              </View>
              <EntryHandler
                defaultValue={this.props.profile.attributes.profile.data.attributes.full_name}
                onChangeText={this.props.onFullNameChange}
                text={textArray[3]}
                language={language}
              />

              <EntryHandler
                defaultValue={this.props.profile.attributes.email}
                editable={false}
                text={textArray[17]}
                language={language}
              />

              {role !== 'user' ? (
                <View>
                  <EntryHandler
                    defaultValue={
                      this.props.profile.attributes.profile.data.attributes.fiance_full_name
                    }
                    onChangeText={this.props.onFianceNameChange}
                    text={textArray[4]}
                    language={language}
                  />

                  <EntryHandler
                    defaultValue={
                      this.props.profile.attributes.profile.data.attributes.venue === 'null'
                        ? ''
                        : this.props.profile.attributes.profile.data.attributes.venue
                    }
                    onChangeText={this.props.onVenueChange}
                    text={textArray[5]}
                    language={language}
                  />
                  <EntryHandler
                    defaultValue={`${
                      this.props.profile.attributes.profile.data.attributes.number_of_guests
                    }`}
                    onChangeText={this.props.onNumberOfGuestsChange}
                    text={textArray[6]}
                    language={language}
                  />

                  {/*Phone Number*/}
                  <EntryHandler
                    defaultValue={`${
                      this.props.profile.attributes.profile.data.attributes.phone_number
                    }`}
                    maxLength={15}
                    onChangeText={this.props.onPhoneNumberChange}
                    text={textArray[13]}
                    language={language}
                  />
                  <EntryHandler
                    defaultValue={`${
                      this.props.profile.attributes.profile.data.attributes.partner_phone_number
                    }`}
                    maxLength={15}
                    onChangeText={this.props.onPartnerPhoneNumberChange}
                    text={textArray[14]}
                    language={language}
                  />

                  {/*Date of Birth*/}
                  <EntryHandler text={textArray[7]} language={language}>
                    <DatePicker
                      date={this.props.wedding_date}
                      mode="date"
                      format="YYYY-MM-DD"
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      minDate={new Date()}
                      showIcon={false}
                      customStyles={{
                        placeholderText: EditProfileScreenStyles.placeholderText,
                        dateInput: EditProfileScreenStyles.dateInput
                      }}
                      onDateChange={this.props.onWeddingDateChange}
                    />
                  </EntryHandler>
                  <EntryHandler text={textArray[15]} language={language}>
                    <DatePicker
                      date={this.props.dob}
                      mode="date"
                      placeholder="select date"
                      format="YYYY-MM-DD"
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      showIcon={false}
                      maxDate={new Date()}
                      customStyles={{
                        placeholderText: EditProfileScreenStyles.placeholderText,
                        dateInput: EditProfileScreenStyles.dateInput
                      }}
                      onDateChange={this.props.onDOBChange}
                    />
                  </EntryHandler>
                  <EntryHandler text={textArray[16]} language={language}>
                    <DatePicker
                      date={this.props.partner_dob}
                      mode="date"
                      placeholder="select date"
                      format="YYYY-MM-DD"
                      confirmBtnText="Confirm"
                      maxDate={new Date()}
                      cancelBtnText="Cancel"
                      showIcon={false}
                      customStyles={{
                        placeholderText: EditProfileScreenStyles.placeholderText,
                        dateInput: EditProfileScreenStyles.dateInput
                      }}
                      onDateChange={this.props.onPartnerDOBChange}
                    />
                  </EntryHandler>
                  <EntryHandler
                    placeholder="Budget"
                    defaultValue={`${this.props.profile.attributes.profile.data.attributes.budget ||
                      '0'}`}
                    onChangeText={this.props.onBudgetChange}
                    text={textArray[8]}
                    language={language}
                  />
                  <EntryHandler text={textArray[9]} language={language}>
                    <View
                      style={{
                        width: '50%',
                        flexDirection: 'row'
                      }}
                    >
                      <Text style={{ fontFamily: 'Tajawal-Light', margin: 4 }}>العربيه</Text>
                      <Switch
                        style={{}}
                        onValueChange={() => this.props.onValueChange(language)}
                        value={language === 'en'}
                      />
                      <Text style={{ fontFamily: 'Lato-Light', margin: 4 }}>English</Text>
                    </View>
                  </EntryHandler>
                </View>
              ) : null}
              <View
                style={{
                  marginTop: 30,
                  borderColor: '#b7b7b7',
                  borderWidth: 0.5,
                  width: '100%'
                }}
                View
              />
              {this.props.profile.attributes.provider !== 'facebook' &&
                this.props.profile.attributes.provider !== 'google' && (
                  <TouchableOpacity
                    style={{
                      marginTop: 10,
                      marginBottom: 10,
                      alignSelf: 'center'
                    }}
                    onPress={async () => {
                      Actions.change_password();
                    }}
                  >
                    <Text style={EditProfileScreenStyles.textStyle}>{textArray[12]}</Text>
                  </TouchableOpacity>
                )}
              <TouchableOpacity
                style={{
                  marginTop: 10,
                  marginBottom: 10,
                  alignSelf: 'center'
                }}
                onPress={async () => {
                  Alert.alert('', I18n.t('signout.message'), [
                    {
                      text: I18n.t('signout.yes'),
                      onPress: async () => {
                        await AsyncStorage.removeItem('token');
                        await AsyncStorage.removeItem('lang');
                        const socialAccessToken = await AsyncStorage.getItem('socialAccessToken');
                        // if (socialAccessToken !== null) {
                        //   await Google.logOutAsync({
                        //     accessToken: socialAccessToken,
                        //     clientId: Platform.OS === 'ios' ? FB_APP_ID : ANDROID_CLIENT_ID
                        //   });
                        // }
                        this.props.handleProfileReset();
                        this.props.homescreenReset();
                        Actions.reset('language_select', {});
                      }
                    },
                    { text: I18n.t('signout.cancel'), onPress: () => {} }
                  ]);
                }}
              >
                <Text style={EditProfileScreenStyles.textStyle}>{textArray[10]}</Text>
              </TouchableOpacity>
              <View
                style={{
                  borderColor: '#b7b7b7',
                  borderWidth: 0.5,
                  width: '100%'
                }}
              />
            </AdaptiveView>
          </KeyboardAwareScrollView>
        )}
      </View>
    );
  }
}
