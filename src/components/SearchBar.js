import React from 'react';
import { TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SearchBarStyles } from './StyleSheet';

export default class SearchBar extends React.Component {
  render() {
    const { language, style, ...inheritedProps } = this.props;
    return (
      <View
        style={{
          ...style,
          flexDirection: language === 'ar' ? 'row' : 'row-reverse',
          alignSelf: 'center',
          alignItems: 'center',
          margin: 6,
          borderColor: 'black',
          borderWidth: 1,
          padding: 2,
          paddingLeft: 5,
          paddingRight: 5,
          justifyContent: 'center',
          height: 35
        }}
      >
        <View style={{ height: '100%', width: '10%', justifyContent: 'center' }}>
          <Icon name="search" />
        </View>
        <View style={{ height: '100%', width: '90%' }}>
          <TextInput

          {...inheritedProps}
            placeholder={` ${this.props.placeholder}`}
            placeholderTextColor="black"
            style={SearchBarStyles.textInputStyle}
            underlineColorAndroid="rgba(0,0,0,0)"
            onChangeText={this.props.onChangeText}
            returnKeyType="search"
            onSubmitEditing={this.props.onSubmitEditing}

          />
        </View>
      </View>
    );
  }
}
