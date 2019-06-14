import React from 'react';
import { Text, View, TextInput } from 'react-native';
import { EntryHandlerStyles } from './StyleSheet';

export default class EditProfileScreen extends React.Component {
  render() {
    const { text, language, children, defaultValue, ...props } = this.props;
    return (
      <View
        style={{
          flexDirection: language === 'ar' ? 'row' : 'row-reverse',
          margin: 10,
          marginBottom: 0,
          alignSelf: 'center'
        }}
      >
        <View
          style={{
            width: '50%'
          }}
        >
          {children || (
            <TextInput
              placeholderTextColor="#b7b7b7"
              underlineColorAndroid="rgba(0,0,0,0)"
              style={EntryHandlerStyles.inputStyle}
              placeholder={text}
              defaultValue={defaultValue !== 'null' ? defaultValue : ''}
              {...props}
            />
          )}
          <View
            style={{
              marginTop: 10,
              borderColor: 'rgba(184, 184, 184, 0.63)',
              borderWidth: 0.5,
              width: '100%'
            }}
          />
        </View>
        <View
          style={{
            width: '50%',
            justifyContent: 'center'
          }}
        >
          <Text style={EntryHandlerStyles.textStyle}>{text}</Text>
        </View>
      </View>
    );
  }
}
