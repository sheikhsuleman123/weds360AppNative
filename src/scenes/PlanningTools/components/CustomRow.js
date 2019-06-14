import React from 'react';
import {
  TouchableOpacity,
  Image,
  Text,
  View,
  Alert,
  Platform,
  ActivityIndicator
} from 'react-native';
import Swipeable from 'react-native-swipeable';
import Icon from 'react-native-vector-icons/Feather';
import { CustomRowStyles } from './StyleSheet';
import I18n from '@i18n';

export default class CustomRow extends React.Component {
  render() {
    const rightButtons = [
      <TouchableOpacity
        style={{
          height: '100%',
          backgroundColor: '#e1e1e1',
          alignItems: 'flex-start',
          justifyContent: 'center'
        }}
        onPress={this.props.onPress}
        disabled={this.props.disabled}
      >
        <View style={{ width: 75, alignItems: 'center' }}>
          {this.props.disabled ? (
            <ActivityIndicator size="small" color="#003430" />
          ) : (
            <Text style={CustomRowStyles.editTextStyle}>
              {this.props.registry
                ? I18n.t('planning_tools.general.text.edit')
                : I18n.t('planning_tools.general.text.more')}
            </Text>
          )}
        </View>
      </TouchableOpacity>,
      <TouchableOpacity
        style={{
          backgroundColor: '#006862',
          height: '100%',
          alignItems: 'flex-start',
          justifyContent: 'center'
        }}
        onPress={() => {
          Alert.alert(
            '',
            I18n.t('planning_tools.general.text.delete_confirm'),
            [
              {
                text: I18n.t('planning_tools.general.text.delete'),
                onPress: () => {
                  this.props.onDeletePress();
                }
              },
              { text: I18n.t('planning_tools.general.text.cancel'), style: 'cancel' }
            ],
            { cancelable: false }
          );
        }}
      >
        <View style={{ width: 75, alignItems: 'center' }}>
          <Icon
            style={{
              color: '#ffffff',
              alignSelf: 'center',
              fontSize: 25
            }}
            name="trash-2"
          />
        </View>
      </TouchableOpacity>
    ];
    return (
      <Swipeable rightButtons={rightButtons} style={{ backgroundColor: '#ffffff' }}>
        {!this.props.registry ? (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderColor: '#e1e1e1',

              borderBottomWidth: 0.5,
              justifyContent: 'center'
            }}
          >
            <View
              style={{
                width: '53%',
                marginTop: 15,
                marginBottom: 15,
                borderColor: '#e1e1e1',

                borderRightWidth: 0.5,
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Text style={CustomRowStyles.titleTextStyle}>{this.props.rowData.title}</Text>
            </View>
            <View
              style={{
                width: '26%',
                borderColor: '#e1e1e1',
                borderRightWidth: 0.5,

                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 15,
                marginBottom: 15
              }}
            >
              <Text style={CustomRowStyles.recommendedAmount}>
                {this.props.calculateNumeral(this.props.rowData.recommended_amount)}
              </Text>
            </View>
            <View
              style={{
                width: '21%',

                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Text style={CustomRowStyles.spentAmount}>
                {this.props.calculateNumeral(this.props.rowData.amount_spent)} LE
              </Text>
            </View>
          </View>
        ) : (
          <View style={{ flexDirection: 'column' }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center'
                // opacity: this.props.rowData.newRecord ? 0.5 : 1
              }}
            >
              <View
                style={{
                  width: '20%',
                  marginLeft: '4%',
                  justifyContent: 'center',
                  backgroundColor: this.props.rowData.image_url == null ? '#ebebeb' : '#ffffff'
                }}
              >
                {this.props.rowData.image_url == null ? (
                  <Icon style={{ fontSize: 65, alignSelf: 'center' }} name="plus" />
                ) : (
                  <Image
                    style={{ width: 70, height: 70, margin: 5, alignSelf: 'center' }}
                    source={{ uri: this.props.rowData.image_url }}
                    resizeMode="contain"
                  />
                )}
              </View>
              <View style={{ flexDirection: 'column', marginLeft: '3%', width: '45%' }}>
                <Text style={CustomRowStyles.titleTextStyle}>{this.props.rowData.title}</Text>
                <Text style={CustomRowStyles.spentAmount}>
                  {this.props.calculateNumeral(this.props.rowData.price)} LE
                </Text>
                <Text style={CustomRowStyles.textStyle}>{this.props.rowData.address}</Text>
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  position: 'absolute',
                  right: '2.5%',
                  width: '30%',
                  margin: 5,
                  alignItems: 'center'
                }}
              >
                {!this.props.rowData.buyer ? (
                  <View
                    style={{
                      width: 35,
                      height: 35,
                      borderRadius: 75,
                      borderWidth: 1,
                      borderColor: this.props.rowData.buyer ? '#ffffff' : '#006862',
                      backgroundColor: this.props.rowData.buyer ? '#ffffff' : '#006862'
                    }}
                  />
                ) : (
                  <Image
                    source={{ uri: this.props.rowData.buyer.data.attributes.profile_photo_url }}
                    style={
                      Platform.OS === 'ios'
                        ? {
                            width: 35,
                            height: 35,
                            borderRadius: 75,
                            borderWidth: 1,
                            borderColor: this.props.rowData.buyer ? '#ffffff' : '#006862'
                          }
                        : {
                            width: 35,
                            height: 35,
                            borderRadius: 75,
                            borderWidth: 1,
                            borderColor: this.props.rowData.buyer ? '#ffffff' : '#006862'
                          }
                    }
                    resizeMode={'cover'}
                  />
                )}
                <Text style={CustomRowStyles.registryTextStyle}>
                  {this.props.rowData.buyer
                    ? I18n.t('planning_tools.general.text.reserved')
                    : I18n.t('planning_tools.general.text.available')}
                </Text>
              </View>
            </View>
            <View
              style={{
                width: '85%',
                alignSelf: 'center',
                marginTop: '2%',
                height: 1,
                opacity: 0.1,
                backgroundColor: '#000000'
              }}
            />
          </View>
        )}
      </Swipeable>
    );
  }
}
