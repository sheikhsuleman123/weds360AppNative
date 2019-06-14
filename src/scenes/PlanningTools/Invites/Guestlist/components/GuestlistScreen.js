import React from 'react';
import {
  Animated,
  Image,
  View,
  ActivityIndicator,
  KeyboardAvoidingView,
  FlatList
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import CustomHeader from '../../../components/CustomHeader';
import GuestlistItem from '../../components/GuestlistItem';

class GuestlistScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      isVisible: false
    };
  }
  pickLanguage = json => (this.props.language === 'ar' ? json.ar : json.en);
  render() {
    const { language } = this.props;

    return (
      <View
        style={{
          height: '100%',
          width: '100%',
          ...this.props.style
        }}
      >
        {this.props.isFetching ? (
          <ActivityIndicator
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
            size="large"
            color="#003430"
          />
        ) : (
          <KeyboardAvoidingView
            style={{ backgroundColor: 'white', flex: 1, marginBottom: '10%' }}
            behavior={'padding'}
            enabled
          >
            <CustomHeader
              language={language}
              header={`${this.pickLanguage({ ar: 'قائمة ضيوفك', en: 'Guest List' })} \n${
                this.props.description
              }`}
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
            <FlatList
              data={this.props.events}
              extraData={this.props.events}
              onRefresh={this.props.onRefresh}
              refreshing={this.props.isFetching}
              keyExtractor={(item, index) => `${index}`}
              renderItem={item => (
                <GuestlistItem
                  data={item.item}
                  onPress={() => {
                    Actions.single_event({
                      data: item.item,
                      isGuest: this.props.isGuest,
                      myEvents: this.props.events,
                      eventFetch: this.props.eventFetch,
                      resetEventStatus: this.props.resetEventStatus
                    });
                  }}
                  hideOwner={this.props.isGuest === false}
                />
              )}
            />
          </KeyboardAvoidingView>
        )}
      </View>
    );
  }
}

export default GuestlistScreen;
