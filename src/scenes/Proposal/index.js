import React from 'react';
import { AsyncStorage, Alert } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';
import ProposalScreen from './components/ProposalScreen';
import TouchableYear from './components/TouchableYear';
import TouchableDay from './components/TouchableDay';
import TouchableMonth from './components/TouchableMonth';
import * as ProposalActions from './actions';
import { socialMediaSignUp } from '../Authentication/Signup/actions';

class Proposal extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.addDays = this.addDays.bind(this);
    this.addMonths = this.addMonths.bind(this);
  }
  componentWillMount() {
    this.addDays(this.props.defaultDays);
    this.addMonths();
    const day = new Date().getDate();
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    this.props.initialize(day, month, year);

    this.addYears(year);
    let monthTemp;
    switch (month) {
      case 1:
        monthTemp = { key: '1', string: 'JAN' };
        break;
      case 2:
        monthTemp = { key: '2', string: 'FEB' };
        break;
      case 3:
        monthTemp = { key: '3', string: 'MAR' };
        break;
      case 4:
        monthTemp = { key: '4', string: 'APR' };
        break;
      case 5:
        monthTemp = { key: '5', string: 'MAY' };
        break;
      case 6:
        monthTemp = { key: '6', string: 'JUNE' };
        break;
      case 7:
        monthTemp = { key: '7', string: 'JULY' };
        break;
      case 8:
        monthTemp = { key: '8', string: 'AUG' };
        break;
      case 9:
        monthTemp = { key: '9', string: 'SEPT' };
        break;
      case 10:
        monthTemp = { key: '10', string: 'OCT' };
        break;
      case 11:
        monthTemp = { key: '11', string: 'NOV' };
        break;
      case 12:
        monthTemp = { key: '12', string: 'DEC' };
        break;
    }
    this.monthSelect(monthTemp);
    this.handleClick(day);
  }
  handleClick(num) {
    this.props.daySelect(num);
  }
  yearSelect(item) {
    this.props.yearSelect(
      item,
      this.props.currentYear,
      this.props.selectedMonth,
      this.props.selectedMonthKey,
      this.props.currentMonth,
      this.props.endDay,
      this.props.dayText,
      this.props.chosenDay,
      this.props.chosenYear,
      this.props.currentDay
    );
  }
  monthSelect(item) {
    let current = '';
    let daysofm = '';
    const pastMonth = this.props.selectedMonthKey;
    switch (item.string) {
      case 'JAN':
        current = 'January, ';
        daysofm = 31;
        break;
      case 'FEB':
        current = 'February, ';
        daysofm = this.props.chosenYear % 4 === 0 ? 29 : 28;
        break;
      case 'MAR':
        current = 'March, ';
        daysofm = 31;
        break;
      case 'APR':
        current = 'April, ';
        daysofm = 30;
        break;
      case 'MAY':
        current = 'May, ';
        daysofm = 31;
        break;
      case 'JUNE':
        current = 'June, ';
        daysofm = 30;
        break;
      case 'JULY':
        current = 'July, ';
        daysofm = 31;
        break;
      case 'AUG':
        current = 'August, ';
        daysofm = 31;
        break;
      case 'SEPT':
        current = 'September, ';
        daysofm = 30;
        break;
      case 'OCT':
        current = 'October, ';
        daysofm = 31;
        break;
      case 'NOV':
        current = 'November, ';
        daysofm = 30;
        break;
      case 'DEC':
        current = 'December, ';
        daysofm = 31;
        break;
    }
    this.props.monthSelect(
      item,
      this.props.currentMonth,
      this.props.chosenDay,
      daysofm,
      this.props.currentDay,
      current,
      this.props.endDay
    );
  }
  addDays(num) {
    if (this.props.days.length === 0) {
      for (let i = 1; i < num; i++) {
        this.props.days.push(i);
      }
    }
  }
  addMonths() {
    if (this.props.months.length === 0) {
      this.props.months.push(
        { key: '1', string: 'JAN' },
        { key: '2', string: 'FEB' },
        { key: '3', string: 'MAR' },
        { key: '4', string: 'APR' },
        { key: '5', string: 'MAY' },
        { key: '6', string: 'JUNE' },
        { key: '7', string: 'JULY' },
        { key: '8', string: 'AUG' },
        { key: '9', string: 'SEPT' },
        { key: '10', string: 'OCT' },
        { key: '11', string: 'NOV' },
        { key: '12', string: 'DEC' }
      );
    }
  }
  addYears(year) {
    if (this.props.years.length === 0) {
      for (let i = 0; i <= 10; i++) {
        this.props.years.push(year + i);
      }
    }
  }
  render() {
    return (
      <ProposalScreen
        onSkipPress={() => {
          Actions.signup();
        }}
        onNextPress={async () => {
          if (this.props.social_auth) {
            await this.props.socialMediaSignUp(
              `${this.props.chosenYear}-${this.props.selectedMonthKey}-${this.props.chosenDay}`
            );
            if (this.props.newUser && this.props.newUser.token) {
              AsyncStorage.setItem('token', this.props.newUser.token);
              // Redirect to Homepage
              Actions.tabscreens();
            } else {
              Alert.alert('Error', 'An Error has occured. please try again later.');
            }
          } else {
            Actions.signup();
          }
        }}
        onBackPress={() => {
          Actions.pop();
        }}
        {...this.props}
        onDayRender={item => (
          <TouchableDay
            state={this.props}
            onPress={this.handleClick.bind(this, item.item)}
            item={item.item}
          />
        )}
        onMonthRender={item => (
          <TouchableMonth
            state={this.props}
            item={item}
            onPress={this.monthSelect.bind(this, item)}
          />
        )}
        onYearRender={item => (
          <TouchableYear
            state={this.props}
            onPress={this.yearSelect.bind(this, item.item)}
            item={item.item}
          />
        )}
        onNext={() => {
          Actions.signup();
        }}
      />
    );
  }
}
function mapStateToProps(state, props) {
  return {
    ...state.proposalReducer,
    ...state.languageReducer,
    newUser: state.signupReducer.newUser,
    social_auth: state.signupReducer.social_auth
  };
}

// Doing this merges our actions into the component’s props,
// while wrapping them in dispatch() so that they immediately dispatch an Action.
// Just by doing this, we will have access to the actions defined in out actions file (action/home.js)
function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign(ProposalActions, { socialMediaSignUp }), dispatch);
}

//Connect everything

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Proposal);
