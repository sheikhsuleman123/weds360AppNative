import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ToolBarStyles } from './StyleSheet';

export default class ToolBar extends React.Component {
  render() {
    const { language } = this.props;
    return (
      <View
        style={{
          width: '100%',
          paddingLeft: 10,
          paddingTop: 30,
          paddingBottom: 10,
          backgroundColor: 'black',
          flexDirection: 'row',
          justifyContent: 'space-between',
          ...this.props.style
        }}
      >
        <TouchableOpacity
          style={{
            width: '38%',
            marginTop: '2%',
            alignItems: 'flex-start',
            ...this.props.buttonContainerStyle
          }}
          onPress={this.props.onBackPress}
        >
          <Icon
            style={{
              color: '#ffffff',
              fontSize: 32,
              ...this.props.backStyle
            }}
            name="chevron-left"
          />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          {this.props.showMessager ? (
            <View style={{ alignItems: 'center' }}>
              <Text style={ToolBarStyles.conversationTitleTextStyle}>{this.props.messager}</Text>
              <Text style={ToolBarStyles.conversationVendorTextStyle}>
                {this.props.recipient_name}
              </Text>
            </View>
          ) : null}
          {this.props.showLogo ? (
            <Image
              style={{
                width: 55,
                height: 40,
                ...this.props.logoStyle
              }}
              source={require('../../assets/logowhite.png')}
              resizeMode={'contain'}
            />
          ) : null}
        </View>
        {this.props.showSkip ? (
          <TouchableOpacity
            style={{ width: '38%', marginTop: '4%', alignItems: 'flex-end' }}
            onPress={this.props.onSkipPress}
          >
            <Text
              style={[
                ToolBarStyles.textStyle,
                {
                  marginRight: 10,
                  color: 'white',

                  ...this.props.skipStyle
                }
              ]}
            >
              {language === 'ar' ? 'تخطى' : 'Skip'}
            </Text>
          </TouchableOpacity>
        ) : (
          <View style={{ width: '38%' }} />
        )}
      </View>
    );
  }
}
