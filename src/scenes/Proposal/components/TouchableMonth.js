import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

export default class TouchableDay extends React.Component {
  render() {
    return (
      <TouchableOpacity
        key={this.props.item.key}
        onPress={this.props.onPress}
        style={
          this.props.state.yearchecked
            ? this.props.state.currentYear == this.props.state.chosenYear
              ? this.props.state.currentMonth <= this.props.item.key
                ? this.props.state.selectedMonth == this.props.item.string
                  ? styles.monthRectac
                  : styles.monthRect
                : styles.monthRectdis
              : this.props.state.selectedMonth == this.props.item.string
              ? styles.monthRectac
              : styles.monthRect
            : styles.monthRectdis
        }
        disabled={
          this.props.state.yearchecked
            ? this.props.state.currentYear == this.props.state.chosenYear
              ? !(this.props.state.currentMonth <= this.props.item.key)
              : false
            : true
        }
      >
        <Text
          key={this.props.item.key}
          style={
            this.props.state.yearchecked
              ? this.props.state.currentYear == this.props.state.chosenYear
                ? this.props.state.currentMonth <= this.props.item.key
                  ? this.props.state.selectedMonth == this.props.item.string
                    ? styles.monthac
                    : styles.month
                  : styles.monthdis
                : this.props.state.selectedMonth == this.props.item.string
                ? styles.monthac
                : styles.month
              : styles.monthdis
          }
        >
          {this.props.item.string}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = EStyleSheet.create({
  monthRect: {
    height: 36,
    backgroundColor: '#ffffff',
    borderStyle: 'solid',
    borderWidth: 1.3,
    borderColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center'
  },
  monthRectac: {
    height: 36,
    backgroundColor: '#036361',
    alignItems: 'center',
    justifyContent: 'center'
  },
  month: {
    fontFamily: 'Lato-Black',
    fontSize: 9.5,
    lineHeight: 16.6,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#000000'
  },
  monthac: {
    fontFamily: 'Lato-Black',
    fontSize: 9,
    lineHeight: 16.6,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#fefefe'
  },
  monthRectdis: {
    height: 36,
    backgroundColor: '#ffffff',
    borderStyle: 'solid',
    borderWidth: 1.3,
    borderColor: '#999999',
    alignItems: 'center',
    justifyContent: 'center'
  },
  monthdis: {
    fontFamily: 'Lato-Black',
    fontSize: 9.5,
    lineHeight: 16.6,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#999999'
  }
});
