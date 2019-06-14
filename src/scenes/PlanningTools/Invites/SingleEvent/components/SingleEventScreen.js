import React from 'react';
import {
  Alert,
  Image,
  FlatList,
  ScrollView,
  View,
  ActivityIndicator,
  KeyboardAvoidingView,
  Linking
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { ImagePicker, Permissions } from 'expo';
import { connectActionSheet } from '@expo/react-native-action-sheet';
import Icon from 'react-native-vector-icons/FontAwesome';
import InviteeItem from './InviteeItem';
import SingleEventHeader from './SingleEventHeader';
import InviteGuestModal from './InviteGuestModal';
import GuestlistModal from '../../Guestlist/components/GuestlistModal';
import CustomHeader from '../../../components/CustomHeader';
import Header from '@components/Header';
import ColoredButton from '@components/ColoredButton';

@connectActionSheet
export default class SingleEventScreen extends React.Component {
  constructor(props) {
    super();
    this.state = {
      showGuests: null,
      image: null,
      event_id: props.data.id,
      showModal: false,
      editModalVisible: false
    };
    this.pickImage = this.pickImage.bind(this);
    this.takePhoto = this.takePhoto.bind(this);
  }

  async takePhoto() {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    await Permissions.askAsync(Permissions.CAMERA);
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      mediaTypes: 'Images'
    });
    try {
      if (!result.cancelled) {
        this.setState({ image: result });
      }
    } catch (e) {}
  }

  async pickImage() {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      mediaTypes: 'Images'
    });
    try {
      if (!result.cancelled) {
        this.setState({ image: result });
      }
    } catch (e) {}
  }

  async generateGuestlist(guests) {
    if (!this.props.isGuest) {
      const accepted = guests.filter(guest => {
        if (guest.attributes.rsvp === 'going') {
          return guest;
        }
      });
      const declined = guests.filter(guest => {
        if (guest.attributes.rsvp === 'no') {
          return guest;
        }
      });
      const noResponse = guests.filter(guest => {
        if (guest.attributes.rsvp === 'no_response') {
          return guest;
        }
      });
      this.setState({
        showGuests: guests,
        accepted,
        declined,
        noResponse
      });
    }
  }

  async componentWillMount() {
    if (!this.props.isGuest) {
      await this.props.guestsFetch(this.props.data.id);
      this.generateGuestlist(this.props.guests);
    }
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.isGuest && nextProps.imageUploaded) {
      this.setState({ image: null });
      if (this.props.language === 'ar') Alert.alert('تم تحميل الصورة بنجاح');
      else {
        Alert.alert('Success', 'Image uploaded successfully!', [
          { text: 'View wedding gallery', onPress: () => Linking.openURL(this.props.siteUrl) },
          { text: 'Ok', onPress: () => {} }
        ]);
      }
    }
    if (nextProps.invited) {
      Alert.alert('Success', 'Invitation sent successfully.');
      this.props.guestsFetch(this.props.data.id);
    }
    if (this.props.guests !== nextProps.guests) {
      this.generateGuestlist(nextProps.guests);
    }
  }
  pickLanguage = json => (this.props.language === 'ar' ? json.ar : json.en);
  render() {
    const { language, isUploading } = this.props;
    if (!this.props.isGuest) {
      return (
        <View
          style={{
            height: '100%',
            width: '100%',
            ...this.props.style
          }}
        >
          <InviteGuestModal
            isCreate
            isVisible={this.state.showModal}
            headerText={'Invite Friend'}
            onBackdropPress={() => {
              this.setState({ showModal: false });
            }}
            onClosePress={() => {
              this.setState({ showModal: false });
            }}
            onSavePress={(name, email, phone, template) => {
              this.props.inviteGuest(
                this.state.event_id,
                name,
                email,
                phone,
                (template || '').toLowerCase()
              );
              this.setState({ showModal: false });
            }}
          />
          <Header
            language={language}
            onBackPressed={() => {
              Actions.pop();
            }}
            headerText={this.pickLanguage({ ar: 'قائمة ضيوفك', en: 'Guest List' })}
            showBottomLine
            showBackButton
          />

          <KeyboardAvoidingView
            style={{ backgroundColor: 'white', flex: 1 }}
            behavior={'padding'}
            enabled
          >
            <CustomHeader
              header={this.pickLanguage({ ar: 'قائمة ضيوفك', en: 'Guest List' })}
              percentage={this.props.percentage}
              belowProgress={this.pickLanguage({
                ar: `${this.props.percentage}% استجاب`,
                en: `${this.props.percentage}% Responded`
              })}
              description={this.pickLanguage({
                ar: 'الطريقة السهلة للبقاء منظّمة (وعقلانية) خلال رحلة التخطيط لحفل زفافك.',
                en:
                  'The easy way to stay organized (and sane) during your wedding planning journey.'
              })}
              child={
                <Image
                  style={{ width: 45 }}
                  source={require('@assets/guestlist.png')}
                  resizeMode={'contain'}
                />
              }
            />
            <View
              style={{
                height: 1,
                width: '90%',
                alignSelf: 'center',
                backgroundColor: 'rgb(181, 181, 181)',
                marginBottom: 10
              }}
            />
            <View style={{ height: '100%', flex: 1 }}>
              <SingleEventHeader
                language={language}
                data={this.props.data}
                onInvited={() => {
                  this.setState({
                    showGuests: this.props.guests
                  });
                }}
                onAccepted={() => {
                  this.setState({
                    showGuests: this.state.accepted
                  });
                }}
                onDeclined={() => {
                  this.setState({
                    showGuests: this.state.declined
                  });
                }}
                onNoResponse={() => {
                  this.setState({
                    showGuests: this.state.noResponse
                  });
                }}
                showModal={() => {
                  this.setState({
                    showModal: true
                  });
                }}
                showEditModal={() => {
                  this.setState({
                    editModalVisible: true
                  });
                }}
                deleteEvent={() => this.props.deleteEvent(this.props.data.id)}
              />
              {this.props.isFetching ? (
                <ActivityIndicator
                  style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                  size="large"
                  color="#003430"
                />
              ) : (
                <ScrollView contentContainerStyle={{ height: '100%', flex: 1 }}>
                  <FlatList
                    data={this.state.showGuests}
                    extraData={this.state.showGuests}
                    keyExtractor={(item, index) => `${index}`}
                    renderItem={item => <InviteeItem data={item.item} />}
                  />
                </ScrollView>
              )}
            </View>
          </KeyboardAvoidingView>
          <GuestlistModal
            language={this.props.language}
            isVisible={this.state.editModalVisible}
            eventEditingForm
            data={this.props.data}
            onClosePress={() => {
              this.setState({
                editModalVisible: false
              });
            }}
            onSavePress={(name, location, date, display_on_wedding_website, allow_rsvp) => {
              this.props.editEvent(
                this.props.data.id,
                name,
                location,
                date,
                display_on_wedding_website,
                allow_rsvp
              );
              this.setState({ editModalVisible: false });
            }}
          />
        </View>
      );
    }
    return (
      <View
        style={{
          height: '100%',
          width: '100%',
          ...this.props.style
        }}
      >
        <Header
          onBackPressed={() => {
            Actions.pop();
          }}
          headerText={this.props.data.attributes.name}
          showBottomLine
          showBackButton
        />
        {!this.state.image ? (
          <View
            style={{
              marginTop: '20%',
              height: '50%',
              width: '90%',
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 0.2,
              borderRadius: 5,
              backgroundColor: 'rgba(128,128,128,0.2)',
              borderColor: '#000000'
            }}
          >
            <Icon
              style={{ fontSize: 150, color: 'rgb(128,128,128)', marginTop: '20%' }}
              name="camera"
            />
          </View>
        ) : (
          <Image
            source={this.state.image}
            style={{ height: '50%', marginTop: '20%', width: '90%', alignSelf: 'center' }}
            resizeMode={'contain'}
          />
        )}

        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <ColoredButton
            text={language === 'ar' ? 'اختر صورة' : 'Select Image'}
            containerStyle={{
              backgroundColor: '#006862',
              marginTop: '4%',
              width: '40%',
              borderWidth: 0
            }}
            textStyle={{ fontSize: 14, fontFamily: 'Lato-Light', textAlign: 'center' }}
            onPress={() => {
              this.props.showActionSheetWithOptions(
                {
                  options:
                    language === 'ar'
                      ? ['إلغاء', 'من المكتبة', 'تصوير']
                      : ['Cancel', 'From Library', 'Take Photo'],
                  destructiveButtonIndex: 0,
                  cancelButtonIndex: 0
                },
                buttonIndex => {
                  switch (buttonIndex) {
                    case 1:
                      this.pickImage();
                      break;
                    case 2:
                      this.takePhoto();
                      break;
                    default:
                  }
                }
              );
            }}
          />
          {isUploading ? (
            <ActivityIndicator style={{ marginTop: '4%' }} size="large" color="#003430" />
          ) : (
            <ColoredButton
              text={language === 'ar' ? 'تحميل' : 'Upload'}
              containerStyle={{
                backgroundColor: '#006862',
                marginTop: '4%',
                width: '40%',
                borderWidth: 0
              }}
              textStyle={{ fontSize: 14, fontFamily: 'Lato-Light', textAlign: 'center' }}
              onPress={async () => {
                this.props.uploadEvenPhoto(this.state);
              }}
            />
          )}
        </View>
      </View>
    );
  }
}
