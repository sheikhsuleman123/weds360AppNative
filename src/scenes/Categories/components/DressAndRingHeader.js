import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class DressAndRingHeader extends React.Component {
  constructor(props) {
    super();
    this.state = {
      liked: props.isLiked
    };
  }
  render() {
    return (
      <View style={{ flexDirection: 'row', ...this.props.style }}>
        <TouchableOpacity
          style={{ marginLeft: '4%', width: '85%' }}
          onPress={this.props.onBackPress}
        >
          <Icon style={{ color: '#003430', fontSize: 30 }} name="ios-arrow-back-outline" />
        </TouchableOpacity>
        <TouchableOpacity style={{ marginRight: '2%' }} onPress={this.props.onFavoritePress}>
          {this.props.isLiked ? (
            <Icon style={{ color: '#003430', fontSize: 30 }} name="ios-heart" />
          ) : (
            <Icon style={{ color: '#003430', fontSize: 30 }} name="ios-heart-outline" />
          )}
        </TouchableOpacity>
      </View>
    );
  }
}
