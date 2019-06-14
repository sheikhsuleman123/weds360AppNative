import React from 'react';
import { View, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from '../../../../components/Header';
import GuestlistInitial from './components/GuestlistInitial';
import GuestlistModal from './components/GuestlistModal';
import GuestlistScreen from './components/GuestlistScreen';
import * as EventsActions from '../actions';
import ErrorModal from '../../../../components/ErrorModal';

class Guestlist extends React.Component {
  constructor() {
    super();
    this.state = {
      manageGuestList: false,
      modalVisible: false,
      invitedTo: false,
      errors: []
    };
  }

  componentWillMount() {
    this.props.eventsFetch();
  }
  componentWillReceiveProps(nextProps) {
    const { refresh, deletedEvent, update, error, createdEvent, invited } = nextProps;
    if (refresh) {
      Actions.single_event({ data: createdEvent, isGuest: false });
      this.props.eventsFetch();
    }
    if (update) {
      Actions.refresh({
        data: createdEvent,
        isGuest: false,
        myEvents: this.props.events,
        eventFetch: this.props.eventFetch,
        resetEventStatus: this.props.resetEventStatus
      });
      this.props.eventsFetch();
    }
    if (deletedEvent) {
      Actions.pop();
      this.props.eventsFetch();
    }

    if (error) {
      try {
        const keys = Object.keys(error);
        const errors = [];
        keys.forEach(key => {
          errors.push(`${key}: ${error[key].join(',')}`);
        });

        this.setState({ errors });
      } catch (e) {
        this.setState({ errors: ['An error has occured.'] });
      }
    }
  }
  pickLanguage = json => (this.props.language === 'ar' ? json.ar : json.en);
  render() {
    const {invPercentage, evPercentage} = this.props;
    return (
      <View style={{ height: '100%' }}>
        <Header
          onBackPressed={() => {
            if (this.state.manageGuestList) {
              this.setState({
                manageGuestList: false
              });
            } else Actions.pop();
          }}
          showIcon
          icon={require('../../../../../assets/guestlist.png')}
          headerText={this.pickLanguage({ ar: 'قائمة الضيوف', en: 'Guest List' })}
          showBottomLine
          showBackButton
        />
        {!this.state.manageGuestList ? (
          <GuestlistInitial
            language={this.props.language}
            onEventsPress={() => {
              this.setState({
                manageGuestList: true,
                invitedTo: false,
                description: this.props.language === 'ar' ? 'أحداثي' : 'My Events',
                percentage: evPercentage
              });
              if (!this.props.myEvents || this.props.myEvents.length === 0) {
                this.props.eventsFetch();
              }
            }}
            onCreatePress={() => {
              this.setState({ modalVisible: true });
            }}
            onInvitationsPress={() => {
              this.setState({
                manageGuestList: true,
                invitedTo: true,
                description: this.props.language === 'ar' ? 'عزوماتي' : 'Invitations',
                percentage: invPercentage
              });
              if (!this.props.myInvitations || this.props.myInvitations.length === 0) {
                this.props.invitationsFetch();
              }
            }}
          />
        ) : (
          <GuestlistScreen
            description={this.state.description}
            onRefresh={() => this.props.eventsFetch()}
            language={this.props.language}
            percentage={this.state.percentage}
            {...this.props}
            events={this.state.invitedTo ? this.props.myInvitations : this.props.myEvents}
            isGuest={this.state.invitedTo}
            isFetching={this.props.isFetching}
          />
        )}
        <GuestlistModal
          language={this.props.language}
          isVisible={this.state.modalVisible}
          onClosePress={() => {
            this.setState({
              modalVisible: false
            });
          }}
          onSavePress={(name, location, date, display_on_wedding_website, allow_rsvp) => {
            this.props.createEvent(name, location, date, display_on_wedding_website, allow_rsvp);
            this.setState({ modalVisible: false });
          }}
        />
        <ErrorModal
          isVisible={!!this.props.error}
          hideModal={this.props.resetEventStatus}
          errors={this.state.errors}
        />
      </View>
    );
  }
}

function mapStateToProps(state, props) {
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
)(Guestlist);
