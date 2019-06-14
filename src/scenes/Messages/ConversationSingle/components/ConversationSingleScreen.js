import React from 'react';
import {
  ActivityIndicator,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Image,
  Text
} from 'react-native';
import { Bubble, GiftedChat } from 'react-native-gifted-chat';
import ToolBar from '@components/ToolBar';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';
import { ConversationSingleScreenStyles } from './StyleSheet';

export default class ConversationSingleScreen extends React.Component {
  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: 'rgb(2,77,76)'
          }
        }}
      />
    );
  }

  render() {
    const { vendor, chat_data } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <ToolBar
          onBackPress={() => {
            Actions.pop();
            this.props.conversationsFetch();
          }}
          style={{
            backgroundColor: 'white',

            borderBottomWidth: 0.5
          }}
          backStyle={{ color: 'black' }}
          buttonContainerStyle={{ marginTop: 0 }}
          showMessager
          messager={chat_data && chat_data.attributes ? chat_data.attributes.subject : vendor.name}
          recipient_name={chat_data && chat_data.attributes.recipient_name}
        />
        <KeyboardAvoidingView
          style={{ backgroundColor: 'white', flex: 1 }}
          behavior={'padding'}
          enabled
        >
          {!this.props.isFetching ? (
            <View style={{ backgroundColor: 'white', flex: 1 }}>
              <GiftedChat
                messages={this.props.messages}
                onSend={newMessage => {
                  this.props.onSend(newMessage);
                }}
                user={{
                  _id: parseInt(this.props.profile.id)
                }}
                placeholder={'Write a message'}
                textInputProps={{ multiline: false }}
                renderBubble={this.renderBubble}
              />
            </View>
          ) : (
            <ActivityIndicator
              style={{
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: 'auto',
                marginBottom: 'auto',
                ...this.props.style
              }}
              size="large"
              color="#003430"
            />
          )}
          <View
            style={{
              flexDirection: 'row',
              padding: 7
            }}
          >
            <TouchableOpacity onPress={this.props.takePhoto}>
              <Image
                source={require('@assets/images/camera.png')}
                style={{ width: 30, height: 30 }}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.props.pickImage}>
              <Image
                source={require('@assets/images/cards.png')}
                style={{ marginLeft: 5, width: 30, height: 30 }}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
            {this.props.image ? (
              <View id={this.props.image}>
                <TouchableOpacity onPress={this.props.removeImage}>
                  <Icon name={'ios-close-circle'} size={15} />
                </TouchableOpacity>
                <Image
                  source={{ uri: this.props.image.uri }}
                  style={{ marginLeft: 5, width: 100, height: 100 }}
                  resizeMode={'contain'}
                />
              </View>
            ) : null}
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}
