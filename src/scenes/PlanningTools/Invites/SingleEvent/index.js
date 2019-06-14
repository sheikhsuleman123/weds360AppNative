import React, { PropTypes } from 'react';
import { View } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import * as EventsActions from '../actions';
import SingleEventScreen from './components/SingleEventScreen';
import ErrorModal from '../../../../components/ErrorModal';

class SingleEvent extends React.Component {
  static navigationOptions = {
    header: null
  };
  componentWillReceiveProps(nextProps) {
    const { data, invited, myEvents, updatedInvite } = nextProps;
    if (invited) {
      this.props.eventFetch(data.id);
    }
    if (updatedInvite) {
      this.props.resetEventStatus();
      Actions.refresh({
        data: myEvents.find(item => `${item.id}` === `${data.id}`),
        isGuest: false
      });
    }
  }
  render() {
    const props = this.props;
    return (
      <View style={{ flex: 1 }}>
        <SingleEventScreen {...props} />
        <ErrorModal
          isVisible={!!this.props.singleEventErrors}
          hideModal={this.props.resetEventStatus}
          errors={this.props.singleEventErrors}
        />
      </View>
    );
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
)(SingleEvent);
