import React from 'react';
import { View, Text } from 'react-native';
import { TDLIStyles } from './StyleSheet';

export default class ToDoListItem extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, padding: '2%', alignItems: 'center' }}>
        <Text style={TDLIStyles.textHeader}>{this.props.item.attributes.title}</Text>
        <Text style={TDLIStyles.textDescription}>{this.props.item.attributes.description}</Text>
      </View>
    );
  }
}
