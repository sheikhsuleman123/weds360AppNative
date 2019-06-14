import React from 'react';
import { Alert } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';
import QuestionsSScreen from './components/QuestionsSScreen';
import * as SignupActions from '../Signup/actions';

class QuestionsS extends React.Component {
  static navigationOptions = {
    title: 'Questions',
    header: null
  };
  render() {
    return (
      <QuestionsSScreen
        {...this.props}
        hideSkip
        saveFianceFullName={text => {
          this.props.saveFianceFullName(text);
        }}
        onSkipPress={() => Actions.questions_venue()}
        onNextPress={() => {
          if (this.props.fiance_full_name && this.props.fiance_full_name.split(' ').length > 1) {
            Actions.questions_venue();
          } else Alert.alert("Please enter your fiance's full name");
        }}
        onDOBChange={e => {
          this.props.saveFianceDOB(e);
        }}
      />
    );
  }
}
function mapStateToProps(state, props) {
  return {
    isFetching: state.authenticationReducer.isFetching,
    token: state.authenticationReducer.token,
    authenticated: state.authenticationReducer.authenticated,
    fiance_full_name: state.signupReducer.fiance_full_name,
    partner_dob: state.signupReducer.partner_dob,
    ...state.languageReducer
  };
}

// Doing this merges our actions into the component’s props,
// while wrapping them in dispatch() so that they immediately dispatch an Action.
// Just by doing this, we will have access to the actions defined in out actions file (action/home.js)
function mapDispatchToProps(dispatch) {
  return bindActionCreators(SignupActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionsS);
