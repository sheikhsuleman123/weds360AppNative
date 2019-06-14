import React, { PropTypes } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import * as ForgotPasswordActions from './actions';
import ForgotPasswordScreen from './components/ForgotPasswordScreen';

class ForgotPassword extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
  }

  render() {
    const props = this.props;
    return <ForgotPasswordScreen {...props} popToLogin={() => Actions.reset('login', {})} />;
  }
}

function mapStateToProps(state, props) {
  return {
    ...state.forgotpasswordReducer,
    ...state.languageReducer
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ForgotPasswordActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgotPassword);
