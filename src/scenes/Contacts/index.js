import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as EventsActions from '../PlanningTools/Invites/actions';
import ContactsScreen from './components/ContactsScreen';

class Contacts extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor() {
    super();
    this.state = {
      contacts: [],
      page: 0,
      pageOffset: 50
    };
  }

  componentWillMount() {
      this.setState({
        isLoading: true
      });
      this.getContacts();
  }

  async getContacts() {
    if (!this.props.isFetchingContacts) {
      this.props.fetchingCotacts();
      if (this.state.hasNext || this.state.page === 0) {
        const contacts = await Expo.Contacts.getContactsAsync({
          fields: [Expo.Contacts.PHONE_NUMBERS, Expo.Contacts.EMAILS],
          pageSize: this.state.pageOffset,
          pageOffset: this.state.page * this.state.pageOffset
        });
        this.setState({
          isLoading: false,
          contacts: [...this.state.contacts, ...contacts.data],
          hasNext: contacts.hasNextPage,
          page: this.state.page + 1,
        });
        this.props.fetchingCotactsDone();
      }
    }
  }

  render() {
    const props = this.props;
    return (
      <ContactsScreen
      isLoading={this.state.isLoading}
      contacts={this.state.contacts}
      fetchContacts={() => this.getContacts()}
      {...props}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state.eventsReducer
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(EventsActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Contacts);
