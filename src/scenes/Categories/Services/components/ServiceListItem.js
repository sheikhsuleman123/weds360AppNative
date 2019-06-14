import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Image from 'react-native-image-progress';
import { SLIStyles } from './StyleSheet';

export default class ServiceListItem extends React.Component {
  render() {
    return (
      <TouchableOpacity
        style={{ marginRight: '5%', marginLeft: '5%' }}
        onPress={this.props.onPress}
      >
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            flexDirection: 'row',
            marginBottom: '2%',
            marginTop: '2%',
            justifyContent: 'space-between'
          }}
        >
          <Image
            source={this.props.image}
            style={{
              width: 110,
              height: 80
            }}
            resizeMode={'cover'}
          />
          <View style={{ width: '55%', marginLeft: 5}}>
            <Text style={SLIStyles.titleTextStyle}>{this.props.title}</Text>
            <Text style={SLIStyles.subtitleTextStyle}>{this.props.subtitle}</Text>
          </View>
          <Icon name="chevron-right" style={{ fontSize: 20, }} />
        </View>
        <View
          style={{
            width: '100%',
            backgroundColor: 'rgb(181, 181, 181)',
            height: 1,
            marginTop: 10,
            marginBottom: 10
          }}
        />
      </TouchableOpacity>
    );
  }
}
