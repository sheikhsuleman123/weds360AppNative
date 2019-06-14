import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import * as ChangePasswordActions from './actions';
import ChangePasswordScreen from './components/ChangePasswordScreen';

class ChangePassword extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    const props = this.props;
    return (
      <ChangePasswordScreen
        {...props}
        changePassword={(currentPassword, password, passwordConfirmation) =>
          props.changePassword(currentPassword, password, passwordConfirmation)
        }
        popBack={() => Actions.pop()}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state.changepasswordReducer,
    ...state.languageReducer
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ChangePasswordActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangePassword);
