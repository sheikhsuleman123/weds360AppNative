import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import VenueRejectedScreen from './components/VenueRejectedScreen';
import * as SignupActions from '../Signup/actions';

class VenueRejected extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    header: null
  };

  render() {
    const props = this.props;
    return <VenueRejectedScreen {...props} />;
  }
}
function mapStateToProps(state) {
  return {
    email: state.signupReducer.email,
    emailer: state.signupReducer.emailer,
    emailcheck: state.signupReducer.emailcheck,
    usernameer: state.signupReducer.usernameer,
    usernamecheck: state.signupReducer.usernamecheck,
    passworder: state.signupReducer.passworder,
    passwordcheck: state.signupReducer.passwordcheck,
    confirmpassworder: state.signupReducer.confirmpassworder,
    password: state.signupReducer.password,
    full_name: state.signupReducer.full_name,
    role: state.signupReducer.role,
    isFetching: state.signupReducer.isFetching,
    newUser: state.signupReducer.newUser,
    ...state.languageReducer
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(SignupActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VenueRejected);
