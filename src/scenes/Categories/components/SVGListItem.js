import React from 'react';
import { TouchableOpacity, Image, Text, View } from 'react-native';
import { connect } from 'react-redux';

class SVGListItem extends React.Component {
  isSelected() {
    return this.props.item === this.props.dress_cut || this.props.item === this.props.stone_shape;
  }

  render() {
    return (
      <TouchableOpacity style={[this.props.style,{ height: '100%'}]} onPress={this.props.onPress}>
        <View style={{ alignItems: 'center' }}>
          <Image source={this.props.image} style={this.props.imageStyle} resizeMode={'contain'} />
          <Text
            style={{

              fontFamily: 'Lato-Regular',
              fontSize: 11,
              color: this.isSelected() ? '#rgb(23, 106, 76)' : '#000'
            }}
          >
            {this.props.description}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    dress_cut: state.dressesReducer.dress_cut,
    stone_shape: state.ringsReducer.stone_shape
  };
}

export default connect(
  mapStateToProps,
  null
)(SVGListItem);
