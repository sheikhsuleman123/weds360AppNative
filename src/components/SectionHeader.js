import React from 'react';
import { Image, Text, View, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { SectionHeaderStyles } from './StyleSheet';

export default class SectionHeader extends React.Component {
  static defaultProps = {
    iconWidth: 22,
    iconHeight: 22,
    marginBottom: 5,
    marginTop: 0,
    marginRight: 0,
    marginLeft: 0,
    showButton: false,
    showIcon: false
  };

  render() {
    const { buttonText, headerText, language } = this.props;
    return (
      <View
        style={{
          alignItems: 'center',
          flexDirection: language === 'ar' ? 'row' : 'row-reverse',
          justifyContent: 'flex-end',
          ...this.props.style
        }}
      >
        {this.props.showButton ? (
          <TouchableOpacity
            style={{
              marginRight: 'auto',
              paddingLeft: 10,
              paddingRight: 10,
              borderColor: 'black',
              borderWidth: 1,
              width: 75,
              height: 21,
              justifyContent: 'center',
              ...this.props.buttonStyle
            }}
            onPress={this.props.onPress}
          >
            <Text style={SectionHeaderStyles.buttonTextStyle}>{buttonText}</Text>
          </TouchableOpacity>
        ) : null}

        <Text style={SectionHeaderStyles.headerTextStyle}>{headerText}</Text>
        {this.props.showIcon ? (
          <Image
            source={this.props.icon}
            style={{
              width: this.props.iconWidth,
              height: this.props.iconHeight
            }}
            resizeMode={'contain'}
          />
        ) : null}
      </View>
    );
  }
}
