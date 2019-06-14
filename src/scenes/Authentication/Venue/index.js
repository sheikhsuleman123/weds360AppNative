import React, { PropTypes } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import * as VenueActions from './actions';
import VenueScreen from './components/VenueScreen';

class Venue extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
  }

  render() {
    const props = this.props;
    return <VenueScreen {...props} />;
  }
}

function mapStateToProps(state, props) {
  return {
    ...state.venueReducer,
    ...state.languageReducer
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(VenueActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Venue);
