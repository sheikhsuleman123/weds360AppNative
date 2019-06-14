import React from 'react';
import { Badge } from 'react-native-elements';
import { TouchableOpacity, View, Text } from 'react-native';
import Image from 'react-native-image-progress';
import Moment from 'moment';
import { CILStyles } from './StyleSheet';

export default class ConversationItemList extends React.Component {
  formatAMPM = date => {
    const currentDate = Moment(new Date());
    const messageDate = Moment(date);
    if (currentDate.diff(messageDate, 'days') === 0) {
      let hours = date.getHours();
      let minutes = date.getMinutes();
      const ampm = hours >= 12 ? 'pm' : 'am';
      hours %= 12;
      hours = hours || 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? `0${minutes}` : minutes;
      const strTime = `${hours}:${minutes} ${ampm}`;
      return strTime;
    }
    return `${currentDate.diff(messageDate, 'days')} days ago`;
  };
  render() {
    return (
      <TouchableOpacity
        style={{ marginTop: '4%', justifyContent: 'center' }}
        onPress={this.props.onMessagePressed}
      >
        <View
          style={{
            flexDirection: 'row',
            marginLeft: '6%'
          }}
        >
          <Image
            source={{ uri: this.props.recipient_image }}
            style={{
              width: 55,
              height: 55
            }}
            imageStyle={{
              borderRadius: 27
            }}
          />
          <View style={{ marginLeft: 10, flexDirection: 'column' }}>
            <View style={{ flex: 1, flexWrap: 'wrap', width: '80%' }}>
              <View
                style={{
                  alignItems: 'center',
                  flexDirection: 'row'
                }}
              >
                <View
                  style={{
                    width: '75%'
                  }}
                >
                  <Text style={CILStyles.conversationTitleTextStyle}>{this.props.subject}</Text>
                  <Text style={CILStyles.conversationVendorTextStyle}>
                    {this.props.recipient_name}
                  </Text>
                </View>
                {this.props.isBold ? (
                  <Badge
                    value={this.props.badgeText}
                    textStyle={CILStyles.badgeTextStyle}
                    containerStyle={{
                      height: 15,
                      backgroundColor: 'rgb(237, 20 , 91)',
                      alignSelf: 'flex-start'
                    }}
                  />
                ) : null}
              </View>
              <Text
                style={[
                  this.props.isBold ? CILStyles.mediumText : CILStyles.lightText,
                  {
                    fontSize: 10,
                    marginTop: 3
                  }
                ]}
              >
                {this.props.text
                  .split('\n')
                  [this.props.text.split('\n').length - 1].substring(0, 100)}
                {this.props.text.length > 100 ? '...' : ''}
              </Text>
            </View>
          </View>
        </View>
        <Text style={CILStyles.timeTextStyle}>
          {this.formatAMPM(new Date(this.props.updated_at))}
        </Text>
        <View
          style={{
            marginTop: 15,
            width: '100%',
            backgroundColor: 'rgb(181, 181, 181)',
            height: 1
          }}
        />
      </TouchableOpacity>
    );
  }
}
