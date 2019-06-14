import React from 'react';
import { Alert } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux';
import QuestionsFScreen from './components/QuestionsFScreen';
import * as SignupActions from '../Signup/actions';

class Questions extends React.Component {
  static navigationOptions = {
    title: 'Questions',
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      role: -1
    };
  }
  render() {
    return (
      <QuestionsFScreen
        {...this.props}
        hideSkip
        role={this.state.role}
        onBridePress={() => {
          this.setState({
            role: 0
          });
          this.props.saveRole('bride');
        }}
        onGroomPress={() => {
          this.setState({
            role: 1
          });
          this.props.saveRole('groom');
        }}
        onOthersPress={() => {
          this.setState({
            role: 2
          });
          this.props.saveRole('bride_and_groom');
          this.props.saveFianceFullName('nan');
        }}
        saveFullName={e => {
          this.props.saveFullName(e);
        }}
        onDOBChange={e => {
          this.setState({
            dob: e
          });
          this.props.saveDOB(e);
        }}
        savePhoneNumber={e => {
          this.props.savePhoneNumber(e);
        }}
        onNextPress={() => {
          if (this.props.full_name && this.props.full_name.split(' ').length > 1) {
            if (this.props.dob && this.props.dob != '') {
              if (this.props.phone_number && this.props.phone_number !== '') {
                if (this.props.wedding_role && this.props.wedding_role !== '') {
                  if (this.props.wedding_role === 'bride_and_groom') Actions.questions_venue();
                  else Actions.questions_n();
                } else Alert.alert('Please enter your role');
              } else Alert.alert('Please enter your phone number');
            } else Alert.alert('Please enter your date of birth');
          } else Alert.alert('Please enter your full name');
        }}
      />
    );
  }
}
function mapStateToProps(state, props) {
  return {
    ...state.signupReducer,
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
)(Questions);
