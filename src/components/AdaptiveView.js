import React from 'react';
import { View, TouchableWithoutFeedback, Keyboard } from 'react-native';

export default class AdaptiveView extends React.Component {
  render() {
    const { props } = this;
    const { children, ...inheritedProps } = props;
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View {...inheritedProps}>{children}</View>
      </TouchableWithoutFeedback>
    );
  }
}
