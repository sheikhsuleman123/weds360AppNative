import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

export default class TouchableElement extends React.Component {
  render() {
    return (
      <TouchableOpacity
        style={this.props.item == this.props.state.currentYear ? null : styles.yeartouch}
        onPress={this.props.onPress}
      >
        <Text
          style={this.props.state.chosenYear == this.props.item ? styles.chosenyear : styles.year}
        >
          {this.props.item}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = EStyleSheet.create({
  scrolleryear: {
    width: 250,
    marginLeft: '16.8%',
    marginTop: '4.5%'
  },
  yeartouch: {
    marginLeft: 33.1
  },
  year: {
    fontSize: 16,
    fontFamily: 'Lato-Black'
  },
  chosenyear: {
    fontSize: 16,
    fontFamily: 'Lato-Black',
    color: '#80005d'
  },
  yeartouch: {
    marginLeft: 33.1
  }
});
