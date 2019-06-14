import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import VenueAcceptedScreen from './components/VenueAcceptedScreen';
import * as SignupActions from '../Signup/actions';

class VenueAccepted extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    header: null,
    fontLoaded: false
  };
  render() {
    const props = this.props;
    return <VenueAcceptedScreen {...props} />;
  }
}

//Connect everything
function mapStateToProps(state, props) {
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

// Doing this merges our actions into the component’s props,
// while wrapping them in dispatch() so that they immediately dispatch an Action.
// Just by doing this, we will have access to the actions defined in out actions file (action/home.js)
function mapDispatchToProps(dispatch) {
  return bindActionCreators(SignupActions, dispatch);
}

//Connect everything

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VenueAccepted);
