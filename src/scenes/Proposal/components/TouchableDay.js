import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

export default class TouchableDay extends React.Component {
  render() {
    return (
      <TouchableOpacity
        style={this.props.item == 1 ? null : styles.daytouch}
        onPress={this.props.onPress}
        disabled={
          this.props.state.monthchecked
            ? this.props.state.selectedMonthKey == this.props.state.currentMonth &&
              this.props.state.chosenYear == this.props.state.currentYear
              ? !!(
                  this.props.state.endDay < this.props.item ||
                  this.props.state.currentDay > this.props.item
                )
              : this.props.state.endDay < this.props.item
            : true
        }
      >
        <Text
          style={
            this.props.state.monthchecked
              ? this.props.state.selectedMonthKey == this.props.state.currentMonth &&
                this.props.state.chosenYear == this.props.state.currentYear
                ? this.props.state.currentDay > this.props.item &&
                  this.props.state.endDay >= this.props.item
                  ? this.props.state.chosenDay == this.props.item
                    ? styles.chosenday
                    : styles.daydis
                  : styles.day
                : this.props.state.endDay >= this.props.item
                ? this.props.state.chosenDay == this.props.item
                  ? styles.chosenday
                  : styles.day
                : styles.daydis
              : styles.daydis
          }
        >
          {this.props.item}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = EStyleSheet.create({
  day: {
    fontSize: 18,
    fontFamily: 'Lato-Black'
  },
  daydis: {
    fontSize: 18,
    fontFamily: 'Lato-Black',
    color: '#999999'
  },
  chosenday: {
    fontSize: 18,
    fontFamily: 'Lato-Black',
    color: '#80005d'
  },
  daytouch: {
    marginLeft: 19
  }
});
