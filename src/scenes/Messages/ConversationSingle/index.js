import React, { PropTypes } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Bubble, GiftedChat } from 'react-native-gifted-chat';
import { ImagePicker, Permissions } from 'expo';
import * as ConversationSingleActions from '../actions';
import ConversationSingleScreen from './components/ConversationSingleScreen';

class ConversationSingle extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super();
    this.state = {
      messages: [],
      image: null
    };

    this._pickImage = this._pickImage.bind(this);
    this._takePhoto = this._takePhoto.bind(this);
    this.removeImage = this.removeImage.bind(this);
  }

  componentWillMount() {
    if (this.props.chat_data) {
      this.props.conversationFetch(this.props.chat_data.id);
    } else {
      this.props.conversationStart();
    }
  }

  componentWillReceiveProps(props) {
    if (props.single_conversation) {
      this.setState({
        messages: props.single_conversation.attributes.messages.data.reverse().map(message => ({
          _id: message.id,
          text: message.attributes.body,
          createdAt: new Date(message.attributes.created_at),
          user: {
            _id: message.attributes.sender_id
          },
          image: message.attributes.attachment_url
        }))
      });
    }
  }

  componentWillUnmount() {
    this.props.resetSingleConversation();
  }

  async _takePhoto() {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    await Permissions.askAsync(Permissions.CAMERA);
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3]
    });
    try {
      if (!result.cancelled) {
        this.setState({ image: result });
      }
    } catch (e) {}
  }

  async _pickImage() {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      mediaTypes: 'Images'
    });
    try {
      if (!result.cancelled) {
        this.setState({ image: result });
      }
    } catch (e) {}
  }

  onSend = async newMessage => {
    if (this.props.single_conversation) {
      this.props.replyConversation(
        this.props.single_conversation.id,
        newMessage[0].text,
        this.state.image
      );
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, newMessage),
        image: null
      }));
    } else {
      const id = this.props.service_id || this.props.vendor.vendor_id;
      const res = await this.props.createConversation(id, newMessage[0].text, this.state.image);
      this.props.conversationFetch(res && res.response && res.response.data && res.response.data.id);
      this.setState({
        image: null
      });
    }
  };

  removeImage() {
    this.setState({
      image: null
    });
  }

  render() {
    const props = this.props;
    const state = this.state;
    return (
      <ConversationSingleScreen
        {...props}
        {...state}
        onSend={this.onSend}
        pickImage={this._pickImage}
        takePhoto={this._takePhoto}
        removeImage={this.removeimage}
      />
    );
  }
}

function mapStateToProps(state, props) {
  return {
    isFetching: state.conversationsReducer.isFetching,
    single_conversation: state.conversationsReducer.single_conversation,
    profile: state.homescreenReducer.profile,
    ...state.languageReducer
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ConversationSingleActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConversationSingle);
