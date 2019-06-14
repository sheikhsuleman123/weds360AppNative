import React from 'react';
import { TouchableOpacity, Image, ScrollView, Text, View, Slider } from 'react-native';
import ColoredButton from '../components/ColoredButton';
/*
This component takes the following props:
style - it takes styles
firstButtonText - string
onFirstButtonPress - function
secondButtonText - string
onSecondButtonPress - function
thirdButtonText - string
onThirdButtonPress - function
*/
export default class CustomToolBar extends React.Component {
  render() {
    return (
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          ...this.props.style
        }}
      >
        <ColoredButton
          text={this.props.firstButtonText}
          containerStyle={{
            backgroundColor: '#005555',
            justifyContent: 'center',
            width: `${100 / this.props.numberOfButtons}%`,
            borderWidth: 0,
            borderRightWidth: 1,
            borderColor: '#b5b5b5'
          }}
          textStyle={{ fontSize: 14 }}
          onPress={this.props.onFirstButtonPress}
        />
        <ColoredButton
          text={this.props.secondButtonText}
          containerStyle={{
            backgroundColor: '#005555',
            justifyContent: 'center',
            width: `${100 / this.props.numberOfButtons}%`,
            borderWidth: 0
          }}
          textStyle={{
            fontSize: 14
          }}
          onPress={this.props.onSecondButtonPress}
        />
        <ColoredButton
          text={this.props.thirdButtonText}
          containerStyle={{
            backgroundColor: '#005555',
            justifyContent: 'center',
            width: `${100 / this.props.numberOfButtons}%`,
            borderWidth: 0,
            borderLeftWidth: 1,
            borderColor: '#b5b5b5'
          }}
          textStyle={{
            fontSize: 14
          }}
          onPress={this.props.onThirdButtonPress}
        />
      </View>
    );
  }
}
