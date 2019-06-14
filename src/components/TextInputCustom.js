import React from 'react';
import { KeyboardAvoidingView, Alert, Text, View, TouchableOpacity, TextInput } from 'react-native';

export default class TextInputCustom extends React.Component {
  render() {
    return (
      <View style={this.props.style}>
        <View
          style={{
            zIndex: 1,
            position: 'absolute',
            width: '90%',
            alignSelf: 'flex-end',
            top: 10,
            right: 10,
            alignItems: 'flex-end'
          }}
        >
          <Text style={this.props.textstyle}>{this.props.er}</Text>
        </View>
        <TextInput
          style={this.props.inpstyle}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder={this.props.placeholder}
          placeholderTextColor="#685552"
          secureTextEntry={this.props.secure}
          onEndEditing={this.props.onEndEditing}
          onSubmitEditing={this.props.onSubmitEditing}
          onFocus={this.props.onFocus}
          maxLength={this.props.maxLength}
          onChangeText={this.props.onChangeText}
          keyboardType={this.props.keyboardType}
        />

        <View style={this.props.line} />
      </View>
    );
  }
}
