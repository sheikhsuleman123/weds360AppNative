import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { FilterButtonStyles } from './StyleSheet';
import store from '../../store';

export default class FilterButton extends React.Component {
  render() {
    const { disabled, onPress, language, isOpen } = this.props;
    return (
      <TouchableOpacity
        style={{
          ...this.props.style,
          width: 77,
          height: 26,
          backgroundColor: disabled ? 'rgb(167, 167, 167)' : 'rgb(0, 52, 48)',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center'
        }}
        onPress={onPress}
        disabled={disabled}
      >
        <Text style={FilterButtonStyles.textStyle}>
          {store.getState().languageReducer.language === 'en' ? 'Filters' : 'فلاتر'}
        </Text>
        <Icon
          style={{ marginLeft: '4%', color: '#ffffff', fontSize: 17 }}
          name={isOpen ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
        />
      </TouchableOpacity>
    );
  }
}
