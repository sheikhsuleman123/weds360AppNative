import React from 'react';
import { Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { ContactsScreenStyles } from './StyleSheet';
import ColoredButton from '@components/ColoredButton';

export default class ContactsListItem extends React.Component {
  render() {
    const { name, phone, email } = this.props;
    return (
      <View>
        <View style={ContactsScreenStyles.listItemContainer}>
          <Text style={ContactsScreenStyles.listItemName}>{name}</Text>
          <ColoredButton
            text={'Invite'}
            containerStyle={{
              backgroundColor: '#005555',
              justifyContent: 'center',
              width: 60,
              marginLeft: 'auto',
              borderRadius: 5,
              borderWidth: 0,
              height: 30,
              alignSelf: 'center'
            }}
            textStyle={{ fontSize: 14, fontFamily: 'Lato-Light' }}
            onPress={() => this.props.onPress(phone, email)}
          />
        </View>
        <View style={ContactsScreenStyles.separator} />
      </View>
    );
  }
}
