import React from 'react';
import { TouchableOpacity, View, Text, Platform, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import StarRating from 'react-native-star-rating';
import Share from 'react-native-share';
import { InfoStyles } from './StyleSheet';
import I18n from '@i18n';

const mainPath = 'categories.general.text.';

export default class Info extends React.Component {
  propertyElement = (key, value, language, extension) => {
    if (value && value !== null) {
      return (
        <View
          style={{
            flexDirection: language === 'ar' ? 'row-reverse' : 'row',
            alignItems: 'center'
          }}
        >
          <Text style={InfoStyles.keyStyle}>{key}: </Text>
          <Text style={InfoStyles.valueStyle}>
            {value} {extension || ''}
          </Text>
        </View>
      );
    }
  };
  render() {
    let tags = '';
    if (this.props.tags) {
      tags = this.props.tags.map((item, index) => {
        const upper = item.charAt(0).toUpperCase() + item.substr(1);
        return (index ? ', ' : '') + upper;
      });
    }

    const {
      language,
      message,
      url,
      subject,
      onFacebookPress,
      onInstagramPress,
      facebookUrl,
      instagramUrl
    } = this.props;
    return (
      <View style={{ ...this.props.style }}>
        <View
          style={{
            width: '100%',
            marginBottom: 5,
            alignItems: 'center'
          }}
        >
          {this.props.removeTopInfo ? null : (
            <View style={{ width: '100%' }}>
              <View style={{ width: '100%', alignItems: 'center' }}>
                {this.propertyElement(I18n.t(`${mainPath}size`), this.props.size, language)}
                {this.propertyElement(I18n.t(`${mainPath}style`), this.props.dressStyle, language)}
                {this.propertyElement(
                  I18n.t(`${mainPath}stone_shape`),
                  this.props.stoneShape,
                  language
                )}
                {this.propertyElement(I18n.t(`${mainPath}gender`), this.props.gender, language)}
                {this.propertyElement(
                  I18n.t(`${mainPath}price`),
                  this.props.price,
                  language,
                  'EGP'
                )}
              </View>
            </View>
          )}
          <View style={{ marginTop: 10, width: '100%' }}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={InfoStyles.subHeaderTextStyle}>{this.props.middleInfoHeader}</Text>
              <View
                style={{
                  marginLeft: 'auto',
                  flexDirection: 'row',
                  marginRight: 10
                }}
              >
                {(!onFacebookPress || !!facebookUrl) && (
                  <TouchableOpacity
                    onPress={() => {
                      if (onFacebookPress) onFacebookPress();
                      else {
                        try {
                          const shareOptions = {
                            title: 'Share via',
                            subject,
                            message,
                            url
                          };
                          Share.shareSingle(
                            Object.assign(shareOptions, {
                              social: 'facebook'
                            })
                          );
                        } catch (e) {
                          console.log(e);
                        }
                      }
                    }}
                    style={{ padding: 2 }}
                  >
                    <Icon name="logo-facebook" style={{ fontSize: 25 }} />
                  </TouchableOpacity>
                )}
                {(!onInstagramPress || !!instagramUrl) && (
                  <TouchableOpacity
                    onPress={() => {
                      if (onInstagramPress) onInstagramPress();
                      else {
                        try {
                          const shareOptions = {
                            title: 'Share via',
                            message,
                            subject,
                            url
                          };
                          Share.shareSingle(
                            Object.assign(shareOptions, {
                              social: 'instagram'
                            })
                          );
                        } catch (e) {
                          console.log(e);
                        }
                      }
                    }}
                    style={{ padding: 2 }}
                  >
                    <Icon name="logo-instagram" style={{ fontSize: 25 }} />
                  </TouchableOpacity>
                )}
              </View>
            </View>
            {this.props.rating ? (
              <StarRating
                disabled
                maxStars={5}
                starSize={20}
                rating={3}
                selectedStar={rating => {
                  //
                }}
                containerStyle={{
                  width: '20%',
                  marginLeft: '5%',
                  marginTop: '1%'
                }}
              />
            ) : null}
            <Text style={InfoStyles.textStyle}>{this.props.middleInfoText}</Text>

            {this.props.removeBottomInfo ? null : (
              <View style={{ alignSelf: 'center', width: '90%' }}>
                <View
                  style={{
                    height: 1,
                    opacity: 0.7,
                    backgroundColor: '#000000',
                    marginTop: 10,
                    width: '85%',
                    alignSelf: 'center'
                  }}
                />
                {tags !== '' ? (
                  <View>
                    <Text style={InfoStyles.tagsHeaderTextStyle}>{I18n.t(`${mainPath}tags`)}</Text>
                    <Text style={InfoStyles.tagsTextStyle}>{tags}</Text>
                  </View>
                ) : null}
                <Text style={InfoStyles.tagsHeaderTextStyle}>
                  {I18n.t(`${mainPath}price_ranges`)}
                </Text>
                <Text style={InfoStyles.tagsTextStyle}>{this.props.price_range}</Text>
                <View
                  style={{
                    height: 1,
                    opacity: 0.7,
                    backgroundColor: '#000000',
                    marginLeft: '5%',
                    marginTop: '5%',
                    width: '85%'
                  }}
                />
              </View>
            )}
          </View>
        </View>
      </View>
    );
  }
}
