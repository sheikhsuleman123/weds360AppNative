import React from 'react';
import { Image, Text, View } from 'react-native';
import ColoredButton from '@components/ColoredButton';
import { GuestlistInitialStyles } from './StyleSheet';

class GuestlistInitial extends React.Component {
  pickLanguage = json => (this.props.language === 'ar' ? json.ar : json.en);
  render() {
    const { language } = this.props;
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Image
          style={{ width: 100, marginTop: '15%' }}
          source={require('@assets/guestlist.png')}
          resizeMode={'contain'}
        />
        <Text style={GuestlistInitialStyles.headerTextStyle}>
          {this.pickLanguage({ ar: 'ابدأ قائمة أحلام ضيوفك', en: 'Start Your Dream Guest List' })}
        </Text>
        <Text style={GuestlistInitialStyles.descriptionTextStyle}>
          {this.pickLanguage({
            ar:
              'بسهولة تنظيم جميع الدعوات الخاصة بك ثم الجلوس وتتبع RSVPs عبر موقع الزفاف الخاص بك',
            en:
              'Easily organize all your invitiees then sit back and track their RSVPs via your Wedding Website'
          })}
        </Text>

        <ColoredButton
          text={this.pickLanguage({ ar: 'انشاء حدث', en: 'Create Event' })}
          containerStyle={{
            backgroundColor: '#006862',
              marginTop: 9,
            width: '40%',
            borderWidth: 0
          }}
          textStyle={{ fontSize: 14 }}
          onPress={this.props.onCreatePress}
        />
        <ColoredButton
          text={this.pickLanguage({ ar: 'أحداثي', en: 'My Events' })}
          containerStyle={{
            backgroundColor: '#006862',
            marginTop: 9,
            width: '40%',
            borderWidth: 0
          }}
          textStyle={{ fontSize: 14 }}
          onPress={this.props.onEventsPress}
        />
        <ColoredButton
          text={this.pickLanguage({ ar: 'عزوماتي', en: 'Invitations' })}
          containerStyle={{
            backgroundColor: '#006862',
            marginTop: 9,
            width: '40%',
            borderWidth: 0
          }}
          textStyle={{ fontSize: 14 }}
          onPress={this.props.onInvitationsPress}
        />
      </View>
    );
  }
}
export default GuestlistInitial;
