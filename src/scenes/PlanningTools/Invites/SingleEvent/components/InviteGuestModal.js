import React from 'react';
import { TouchableOpacity, Text, View, Picker, Platform } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import ModalDropdown from 'react-native-modal-dropdown';
import ColoredButton from '@components/ColoredButton';
import OutlineTextInput from '@components/OutlineTextInput';

export default class InviteGuestModal extends React.Component {
  constructor() {
    super();
    this.state = {
      templates: ['Old', 'Young']
    };
  }

  render() {
    return (
      <Modal isVisible={this.props.isVisible} onBackdropPress={this.props.onBackdropPress}>
        <Animatable.View animation="fadeIn">
          <TouchableOpacity
            onPress={this.props.onClosePress}
            activeOpacity={1}
            style={{
              zIndex: 1,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <View
              style={{
                backgroundColor: '#ffffff',
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                ...this.props.headerStyle
              }}
            >
              <Text
                style={{
                  fontFamily: 'Lato-Black',
                  color: '#006862',
                  marginLeft: '5%',
                  width: '60%',
                  fontSize: 14,
                  ...this.props.headerTextStyle
                }}
              >
                {this.props.headerText}
              </Text>

              <Icon
                onPress={this.props.onClosePress}
                style={{ fontSize: 30 }}
                name="ios-close-outline"
              />
            </View>
          </TouchableOpacity>
          <View
            style={{
              backgroundColor: '#ebebeb'
            }}
          >
            <View
              style={{
                backgroundColor: '#ebebeb',
                height: 40,
                flexDirection: 'row',
                alignItems: 'center',
                borderBottomWidth: 0.5,
                borderColor: '#ffffff'
              }}
            >
              <OutlineTextInput
                style={{
                  height: '80%',
                  width: '50%',
                  marginLeft: '8%',
                  marginTop: '0%'
                }}
                placeholder="Name"
                onChangeText={text => {
                  this.setState({
                    name: text
                  });
                }}
                value={this.state.name}
              />
            </View>
            <View
              style={{
                backgroundColor: '#ebebeb',
                height: 40,
                flexDirection: 'row',
                alignItems: 'center',
                borderBottomWidth: 1,
                borderColor: '#ffffff'
              }}
            >
              <OutlineTextInput
                style={{
                  height: '80%',
                  width: '50%',
                  marginLeft: '8%',
                  marginTop: '0%'
                }}
                placeholder="Email"
                onChangeText={text => {
                  this.setState({
                    email: text
                  });
                }}
                value={this.state.email}
              />
            </View>
            <View
              style={{
                backgroundColor: '#ebebeb',
                height: 40,
                flexDirection: 'row',
                alignItems: 'center',
                borderBottomWidth: 1,
                borderColor: '#ffffff'
              }}
            >
              <OutlineTextInput
                style={{
                  height: '80%',
                  width: '50%',
                  marginLeft: '8%',
                  marginTop: '0%'
                }}
                maxLength={15}
                placeholder="Phone Number"
                onChangeText={text => {
                  this.setState({
                    phone_number: text
                  });
                }}
                value={this.state.phone_number}
              />
            </View>
            <View
              style={{
                backgroundColor: '#ebebeb',
                height: 40,
                flexDirection: 'row',
                alignItems: 'center',
                borderBottomWidth: 1,
                borderColor: '#ffffff'
              }}
            >
              <Text
                style={{
                  fontFamily: 'Lato-Black',
                  color: '#006862',
                  marginLeft: '8%',
                  fontSize: 14
                }}
              >
                Age Category
              </Text>
              <View
                style={{
                  flexDirection: 'column',
                  width: '100%',
                  marginLeft: '2%',
                  height: 40,
                  justifyContent: 'center'
                }}
              >
                {Platform.OS === 'ios' ? (
                  <ModalDropdown
                    options={this.state.templates}
                    style={{ width: '100%' }}
                    textStyle={{ fontFamily: 'Lato-Light' }}
                    defaultValue="Select Template"
                    dropdownStyle={{ borderRadius: 4, width: '50%' }}
                    dropdownTextStyle={{ fontFamily: 'Lato-Light' }}
                    onSelect={index => {
                      this.setState({
                        template: this.state.templates[index]
                      });
                    }}
                  />
                ) : (
                  <Picker
                    selectedValue={this.state.template}
                    style={{ height: 50, width: 150 }}
                    itemStyle={{ fontFamily: 'Lato-Light' }}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState({
                        template: this.state.templates[itemIndex]
                      })
                    }
                  >
                    {this.state.templates.map((item, index) => (
                      <Picker.Item key={`${index}`} label={`${item}`} value={`${item}`} />
                    ))}
                  </Picker>
                )}
              </View>
            </View>

            <ColoredButton
              text="Invite"
              containerStyle={{
                backgroundColor: '#005555',
                justifyContent: 'center',
                marginLeft: '20%',
                width: '17%',
                marginTop: 8,
                borderRadius: 5,
                borderWidth: 0,
                height: 25,
                marginBottom: 8,
                padding: 0
              }}
              textStyle={{ fontSize: 14, fontFamily: 'Lato-Light' }}
              onPress={() => {
                this.props.onSavePress(
                  this.state.name,
                  this.state.email,
                  this.state.phone_number,
                  this.state.template
                );
              }}
            />
          </View>
        </Animatable.View>
      </Modal>
    );
  }
}
