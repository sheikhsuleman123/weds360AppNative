import React from 'react';
import { ImageBackground, Text, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import ColoredButton from '../../../components/ColoredButton'; 
import { SwiperItemStyles } from './StyleSheet';

export default class SwiperItem extends React.Component {
  render() {
    return (
      <ImageBackground
        source={this.props.icon}
        style={{
          width: '100%',
          height: 180,
          marginRight: 3,
          alignItems: 'center',
          justifyContent: 'flex-start',
          paddingTop: 15,
          ...this.props.style
        }}
        resizeMode={'cover'}
      >
        {this.props.removeOverlay ? null : (
          <View
            style={{
              ...EStyleSheet.absoluteFillObject,
              backgroundColor: 'rgba(0,0,0,0.3)'
            }}
          />
        )}
        <Text
          style={
            ([SwiperItemStyles.headerTextStyle],
            {
              ...this.props.headerStyle
            })
          }
        >
          {this.props.header}
        </Text>
        <Text
          style={
            ([SwiperItemStyles.textStyle],
            {
              ...this.props.textStyle
            })
          }
        >
          {this.props.text}
        </Text>
        {this.props.showButton ? (
          <ColoredButton
            text={'Request Quote!'}
            containerStyle={{
              width: '20%',
              marginTop: 20,
              backgroundColor: 'rgb(0,52,48)'
            }}
            textStyle={SwiperItemStyles.buttonTextStyle}
          />
        ) : null}
      </ImageBackground>
    );
  }
}
