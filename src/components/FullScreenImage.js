import React from 'react';
import { Image, TouchableWithoutFeedback } from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class FullScreenImage extends React.Component {
  render() {
    return (
      <TouchableWithoutFeedback style={{ flex: 1 }} onPress={() => Actions.pop()}>
        <Image source={{ uri: this.props.image }} style={{ flex: 1 }} resizeMode={'contain'} />
      </TouchableWithoutFeedback>
    );
  }
}
