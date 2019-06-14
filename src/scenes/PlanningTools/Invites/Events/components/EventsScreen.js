import React from 'react';
import { Text, View, FlatList } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Header from '@components/Header';
import GuestlistItem from '../../components/GuestlistItem';

export default class EventsScreen extends React.Component {
  render() {
    return (
      <View style={{ marginBottom: 10 }}>
        <Header showBottomLine headerText={'My Events'} />
        <View style={{ padding: '4%' }}>
          <Text
            style={{
              fontFamily: 'Lato-Bold',
              fontSize: 22,
              color: '#000000'
            }}
          >
            My Events
          </Text>
          <Text
            style={{
              fontFamily: 'Lato-Light',
              fontSize: 13,
              color: '#000000'
            }}
          >
            Events I have been invited to.
          </Text>
        </View>
        <View
          style={{
            height: 1,
            width: '100%',
            alignSelf: 'center',
            backgroundColor: 'rgb(181, 181, 181)',
            marginBottom: 10
          }}
        />
        <FlatList
          data={this.props.myInvitations}
          extraData={this.props.myInvitations}
          keyExtractor={(item, index) => `${index}`}
          renderItem={item => (
            <GuestlistItem
              data={item.item}
              onPress={() => {
                Actions.single_event({ data: item.item, isGuest: true });
              }}
            />
          )}
        />
      </View>
    );
  }
}
