import React, { PropTypes } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import * as ConversationsActions from '../actions';
import ConversationsScreen from './components/ConversationsScreen';

class Conversations extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor() {
    super();
    this.state = { conversations: [], unread: false };
    this.unreadMessages = this.unreadMessages.bind(this);
  }

  componentWillMount() {
    if (!this.props.conversations) this.props.conversationsFetch();
  }

  componentWillReceiveProps(props) {
    if (props.conversations) {
      this.setState({
        conversations: props.conversations
      });
      this.unreadMessages(props.conversations);
    }
  }

  unreadMessages(conversations) {
    for (let i = 0; i < conversations.length; i++) {
      if (conversations[i].attributes.unread > 0) {
        this.setState({
          unread: true
        });
        return;
      }
    }
    this.setState({
      unread: false
    });
  }

  render() {
    const props = this.props;
    const state = this.state;
    return (
      <ConversationsScreen
        {...props}
        {...state}
        unreadMessages={this.unreadMessages}
        filter={this.filter}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state.conversationsReducer,
    ...state.languageReducer
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ConversationsActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Conversations);
