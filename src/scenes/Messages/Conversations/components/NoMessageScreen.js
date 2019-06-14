import React from 'react';
import { View, Text, Image } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { NMSStyles } from './StyleSheet';
import I18n from '@i18n';

const mainPath = 'messages.general.text.';

export default class NoMessageScreen extends React.Component {
  render() {
    return (
      <View
        style={{
          height: '100%',
          backgroundColor: 'white',
          justifyContent: 'center',
          padding: 10
        }}
      >
        <View style={NMSStyles.wrapper}>
          <Text style={NMSStyles.headerTextStyle}>{I18n.t(`${mainPath}no_messages`)}</Text>
          <Text style={NMSStyles.descriptionTextStyle}>
            {I18n.t(`${mainPath}guide_no_messages`)}
          </Text>
        </View>
      </View>
    );
  }
}
