import React from 'react';
import { TextInput, View } from 'react-native';

export default class OutlineTextInput extends React.Component {
  render() {
    return (
      <View
        style={[
          {
            borderWidth: 0.7,
            width: '40%',
            marginTop: '3%',
            justifyContent: 'center',
            backgroundColor: 'white'
          },
          this.props.style
        ]}
      >
        <TextInput
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder={this.props.placeholder}
          maxLength={this.props.maxLength}
          onFocus={this.props.onFocus}
          onEndEditing={this.props.onEndEditing}
          onSubmitEditing={this.props.onSubmitEditing}
          onChangeText={this.props.onChangeText}
          keyboardType={this.props.keyboardType}
          style={[
            {
              letterSpacing: 1,
              fontFamily: 'Lato-Light',
              backgroundColor: '#ffffff',
              fontSize: 13,
              margin: 7
            },
            this.props.inputStyle
          ]}
          placeholderTextColor={'rgb(36, 36, 36)'}
          value={this.props.value}
        />
      </View>
    );
  }
}
