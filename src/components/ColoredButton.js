import React from 'react';
import { View, Text } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Button from 'react-native-button';
import { ButtonStyles } from './StyleSheet';

export default class OutlinedButton extends React.Component {
  static defaultProps = {
    width: '100%'
  };

  render() {
    const { containerStyle, textStyle, text, onPress, disabled, ...props } = this.props;
    const containerStyleVar =
      typeof containerStyle === 'number' ? EStyleSheet.flatten(containerStyle) : containerStyle;
    return (
      <Button
        {...props}
        disabled={disabled}
        onPress={onPress}
        containerStyle={[
          {
            borderColor: 'black',
            borderWidth: 1
          },
          containerStyleVar,
          disabled
            ? {
                backgroundColor: disabled ? 'rgb(167, 167, 167)' : 'rgb(0, 52, 48)'
              }
            : {}
        ]}
      >
        <Text
          style={[
            {
              color: 'white',
              textAlign: 'center'
            },
            ButtonStyles.textStyle,
            textStyle
          ]}
        >
          {text}
        </Text>
      </Button>
    );
  }
}
