import React from 'react';
import { Text } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Button from 'react-native-button';
import { ButtonStyles } from './StyleSheet';

export default class OutlinedButton extends React.Component {
  static defaultProps = {
    width: '100%'
  };

  render() {
    const { containerStyle, textStyle, text, onPress } = this.props;
    const containerStyleVar =
      typeof containerStyle === 'number' ? EStyleSheet.flatten(containerStyle) : containerStyle;
    const textStyleVar = typeof textStyle === 'number' ? EStyleSheet.flatten(textStyle) : textStyle;
    return (
      <Button
        onPress={onPress}
        containerStyle={{
          borderColor: 'black',
          borderWidth: 1,
          backgroundColor: 'transparent',
          ...containerStyleVar
        }}
      >
        <Text
          style={[
            {
              color: 'black',
              textAlign: 'center'
            },
            ButtonStyles.textStyle,
            textStyleVar
          ]}
        >
          {text}
        </Text>
      </Button>
    );
  }
}
