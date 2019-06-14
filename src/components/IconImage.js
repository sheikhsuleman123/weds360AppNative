import React from 'react';
import { View, ImageBackground, Text, TouchableOpacity } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Image from 'react-native-image-progress';
import * as Animatable from 'react-native-animatable';

export default class IconImage extends React.Component {
  render() {
    return (
      <ImageBackground
        source={this.props.background}
        style={{
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          marginLeft: 2,
          marginRight: 2,
          ...this.props.imageStyle
        }}
        resizeMode={'cover'}
      >
        <View style={styles.overlay} />
        <TouchableOpacity
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%'
          }}
          onPress={this.props.onPress}
        >
          <Image
            source={this.props.icon}
            style={{
              width: 30,
              height: 30
            }}
            resizeMode={'contain'}
          />
          <Animatable.Text
            animation={'pulse'}
            style={[styles.textStyle, { ...this.props.textStyle }]}
          >
            {this.props.text}
          </Animatable.Text>
        </TouchableOpacity>
      </ImageBackground>
    );
  }
}

const styles = EStyleSheet.create({
  vendor_image: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 2,
    marginRight: 2
  },
  vendor_image_text: {
    textAlign: 'center',
    fontWeight: '500',
    color: 'white'
  },
  overlay: {
    ...EStyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.52)'
  },
  textStyle: {
    color: 'white',
    fontFamily: '$medium',
    fontSize: 12,
    width: '80%',
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: 2
  }
});
