import React from 'react';
import { ScrollView, Text, View, TouchableOpacity } from 'react-native';
import ProgressCircle from 'react-native-progress-circle';
import Icon from 'react-native-vector-icons/FontAwesome';
import Image from 'react-native-image-progress';

export default class InviteeItem extends React.Component {
  render() {
    return (
      <View style={{ width: '100%', alignSelf: 'center' }}>
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            flexDirection: 'row',
            marginBottom: '2%',
            marginTop: '2%',
            justifyContent: 'center'
          }}
        >
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: '33%'
            }}
          >
            <Text
              style={{
                fontFamily: 'Lato-Light',
                fontSize: 12
              }}
            >
              {this.props.data.attributes.name}
            </Text>
          </View>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: '33%'
            }}
          >
            <Icon
              style={{ fontSize: 15, color: '#003430' }}
              name={this.props.data.attributes.invite_sent ? 'circle' : 'circle-o'}
            />
          </View>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: '33%'
            }}
          >
            <Text
              style={{
                fontFamily: 'Lato-Light',
                fontSize: 11
              }}
            >
              {this.props.data.attributes.rsvp.replace(/_/g, ' ')}
            </Text>
          </View>
        </View>
        <View
          style={{
            alignSelf: 'center',
            width: '80%',
            backgroundColor: 'rgb(181, 181, 181)',
            height: 0.3,
            marginTop: 10,
            marginBottom: 10
          }}
        />
      </View>
    );
  }
}
