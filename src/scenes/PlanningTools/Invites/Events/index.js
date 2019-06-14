import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as EventsActions from '../actions';
import EventsScreen from './components/EventsScreen';

class Events extends React.Component {
  static navigationOptions = {
    header: null
  };
  componentWillMount() {
    this.props.invitationsFetch();
  }
  render() {
    const props = this.props;
    return <EventsScreen {...props} />;
  }
}

function mapStateToProps(state) {
  return {
    ...state.eventsReducer,
    ...state.languageReducer
  };
}

// Doing this merges our actions into the component’s props,
// while wrapping them in dispatch() so that they immediately dispatch an Action.
// Just by doing this, we will have access to the actions defined in out actions file (action/home.js)
function mapDispatchToProps(dispatch) {
  return bindActionCreators(EventsActions, dispatch);
}

//Connect everything

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Events);
