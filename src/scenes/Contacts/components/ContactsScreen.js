import React from 'react';
import { View, ActivityIndicator, FlatList, Platform } from 'react-native';
import { Actions } from 'react-native-router-flux';
import ContactsListItem from './ContactsListItem';
import InvitationModal from './InvitationModal';
import { ContactsScreenStyles } from './StyleSheet';
import Header from '@components/Header';
import store from '../../../../store';

export default class ContactsScreen extends React.Component {
  constructor(props) {
    super();
    this.state = {
      showModal: false,
      event_id: props.event_id,
      emails: [],
      phones: []
    };
    this.renderFooter = this.renderFooter.bind(this);
  }

  renderFooter() {
    if (this.props.isFetchingContacts) {
      return (
        <ActivityIndicator
          style={{ justifyContent: 'center', alignItems: 'center' }}
          size="large"
          color="#003430"
        />
      );
    }
    return null;
  }

  render() {
    return (
      <View style={ContactsScreenStyles.container}>
        <Header
          showIcon
          onBackPressed={() => {
            Actions.pop();
          }}
          headerText={
            store.getState().languageReducer.language === 'ar' ? 'جهات الإتصال' : 'Contacts'
          }
          showBottomLine
          showBackButton
          language={store.getState().languageReducer.language}
        />

        {this.props.isLoading ? (
          <ActivityIndicator
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
            size="large"
            color="#003430"
          />
        ) : (
          <FlatList
            ref={ref => {
              this.list = ref;
            }}
            data={this.props.contacts}
            keyExtractor={(item, index) => `${index}`}
            onEndReached={() => {
              this.props.fetchContacts();
            }}
            onEndReachedThreshold={0.8}
            renderItem={item => (
              <ContactsListItem
                name={item.item.name ? item.item.name : 'No Name'}
                onPress={() => {
                  this.setState({
                    phones:
                      Platform.OS === 'ios'
                        ? item.item.phoneNumbers.map(x => x.digits)
                        : item.item.phoneNumbers.map(x => x.number),
                    emails: item.item.emails.map(x => x.email),
                    name: item.item.name,
                    showModal: true
                  });
                }}
              />
            )}
            ListFooterComponent={this.renderFooter}
          />
        )}
        {
          <InvitationModal
            isCreate
            isVisible={this.state.showModal}
            headerText={'Invite Friend'}
            onBackdropPress={() => {
              this.setState({ showModal: false });
            }}
            onClosePress={() => {
              this.setState({ showModal: false });
            }}
            onSavePress={(name, email, phone, template) => {
              this.props.inviteGuest(
                this.state.event_id,
                name,
                email,
                phone,
                (template || '').toLowerCase()
              );
              this.setState({ showModal: false });
            }}
            name={this.state.name}
            phones={this.state.phones}
            emails={this.state.emails}
          />
        }
      </View>
    );
  }
}
