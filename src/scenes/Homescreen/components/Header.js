import React from 'react';
import { Image, Text, View, TouchableOpacity, Platform } from 'react-native';
import Moment from 'moment';
import ImageProgress from 'react-native-image-progress';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome';
import { HomescreenStyles } from './StyleSheet';

export default class Header extends React.Component {
  constructor(props) {
    super();
    const currentDate = Moment(new Date()); //todays date
    const weddingDate = Moment(props.profile.attributes.profile.data.attributes.wedding_date).add(
      1,
      'days'
    ); // another date
    const daysLeft = currentDate.diff(weddingDate, 'days');
    this.state = {
      daysLeft
    };
  }
  render() {
    const { language } = this.props;
    return (
      <Animatable.View style={HomescreenStyles.header_container} animation="fadeInDown">
        <View style={{ alignItems: 'center' }}>
          {this.props.profile.attributes.role === 'user' ? null : (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '100%'
              }}
            >
              <Image
                source={require('@assets/images/rings.png')}
                style={{ width: 25, height: 25 }}
                resizeMode={'contain'}
              />
              <Text style={HomescreenStyles.noteTextStyle}>
                {language === 'ar'
                  ? this.state.daysLeft === 0
                    ? 'اليوم يوم الاحتفال'
                    : this.state.daysLeft < 0
                    ? `${-this.state.daysLeft} عدد أيام متبقية!`
                    : 'يوم للذكرى!'
                  : this.state.daysLeft === 0
                  ? 'Today is the big day!'
                  : this.state.daysLeft < 0
                  ? `${-this.state.daysLeft} days left!`
                  : 'A day to remember!'}
              </Text>
            </View>
          )}
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              width: '95%'
            }}
          >
            <View style={{ width: '77%' }}>
              {this.props.profile &&
              this.props.profile.attributes.profile.data.attributes.full_name ? (
                this.props.profile.attributes.role === 'user' ? (
                  <Text style={HomescreenStyles.nameTextStyle}>
                    {this.props.profile.attributes.profile.data.attributes.full_name !== null &&
                    this.props.profile.attributes.profile.data.attributes.full_name.split(' ')
                      .length > 0
                      ? this.props.profile.attributes.profile.data.attributes.full_name.split(
                          ' '
                        )[0]
                      : ''}
                  </Text>
                ) : (
                  <Text style={HomescreenStyles.nameTextStyle}>
                    {this.props.profile.attributes.profile.data.attributes.full_name !== null &&
                    this.props.profile.attributes.profile.data.attributes.full_name.split(' ')
                      .length > 0
                      ? this.props.profile.attributes.profile.data.attributes.full_name.split(
                          ' '
                        )[0]
                      : ''}
                    {' & '}
                    {this.props.profile.attributes.profile.data.attributes.fiance_full_name !==
                      null &&
                    this.props.profile.attributes.profile.data.attributes.fiance_full_name.split(
                      ' '
                    ).length > 0
                      ? this.props.profile.attributes.profile.data.attributes.fiance_full_name.split(
                          ' '
                        )[0]
                      : ''}
                  </Text>
                )
              ) : null}
            </View>
            <TouchableOpacity
              style={{
                alignItems: 'center',
                marginLeft: 'auto'
              }}
              onPress={this.props.onDropDownPress}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Icon
                  name={'chevron-down'}
                  style={{
                    width: 15,
                    height: 15,
                    marginTop: 50
                  }}
                  resizeMode={'contain'}
                />
                <ImageProgress
                  source={{
                    uri: this.props.profile.attributes.profile.data.attributes.profile_photo_url
                  }}
                  style={
                    Platform.OS === 'ios'
                      ? {
                          width: 60,
                          height: 60,
                          borderRadius: 30
                        }
                      : {
                          width: 65,
                          height: 65,
                          borderRadius: 32.5
                        }
                  }
                  imageStyle={
                    Platform.OS === 'ios'
                      ? {
                          borderRadius: 30
                        }
                      : {
                          borderRadius: 32.5
                        }
                  }
                  resizeMode={'cover'}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Animatable.View>
    );
  }
}
