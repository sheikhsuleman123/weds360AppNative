import React from 'react';
import {
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
  Text,
  View,
  Dimensions
} from 'react-native';
import ColoredButton from '@components/ColoredButton';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import StarRating from 'react-native-star-rating';
import I18n from '@i18n';
import { DARILStyles } from './StyleSheet';

const mainPath = 'categories.general.text.';

export default class DressAndRingItemList extends React.Component {
  constructor() {
    super();
    const { width, height } = Dimensions.get('window');
    this.state = {
      x: 0,
      y: 0,
      width,
      height,
      liked: false,
      isLoaded: false
    };
  }

  render() {
    const { language } = this.props;
    return (
      <TouchableOpacity
        style={{
          flex: 1,
          ...this.props.style,
          padding: 4
        }}
        onPress={this.props.onPress}
      >
        <ImageBackground
          source={this.props.photo}
          style={{
            height: '87%',
            alignItems: 'center',
            ...this.props.imageStyle
          }}
          resizeMode={'cover'}
          onLoadEnd={() => {
            this.setState({ isLoaded: true });
          }}
        >
          {this.state.isLoaded ? (
            <View style={{ height: '100%', width: '100%', justifyContent: 'space-between' }}>
              <View
                style={{
                  alignItems: 'flex-end',
                  margin: 10,
                  width: '30%',
                  height: '10%',
                  alignSelf: 'flex-end'
                }}
              >
                <Icon
                  style={{
                    color: 'black',
                    fontSize: 15,
                    ...this.props.iconStyle
                  }}
                  name={this.props.liked ? 'heart' : 'heart-outline'}
                />
              </View>
              <View
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.7)',
                  width: '100%',
                  alignSelf: 'center',
                  padding: 8,
                  justifyContent: 'space-between',
                }}
              >
                <Text style={DARILStyles.elementTypeStyle}>{this.props.dressSilhouette}</Text>
                <View style={{ width: '25%', alignSelf: 'flex-end' }}>
                  <StarRating
                    disabled
                    maxStars={5}
                    starSize={7}
                    rating={this.props.starCount}
                    selectedStar={rating => {
                      //
                    }}
                  />
                </View>
                <Text style={DARILStyles.elementNameStyle}>
                  {this.props.dressName.substring(0, 25)}
                  {this.props.dressName.length > 25 ? '...' : ''}
                </Text>
              </View>
            </View>
          ) : (
            <ActivityIndicator
              style={{
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: 'auto',
                marginBottom: 'auto'
              }}
              size="large"
              color="#003430"
            />
          )}
        </ImageBackground>

        <ColoredButton
          text={I18n.t(`${mainPath}book_now`)}
          containerStyle={{
            backgroundColor: '#003430',
            justifyContent: 'center',
            width: 77,
            marginTop: 10,
            borderWidth: 0
          }}
          textStyle={{
            fontSize: 13
          }}
          onPress={this.props.onPress}
        />
      </TouchableOpacity>
    );
  }
}
