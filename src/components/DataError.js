import React from 'react';
import { TouchableOpacity, Text, View, ActivityIndicator } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from './Header';
import { DataErrorStyles } from './StyleSheet';

export default class DataError extends React.Component {
  render() {
    const { language, noData, isFetching } = this.props;
    return (
      <View
        style={{
          flex: 1
        }}
      >
        {this.props.header && (
          <Header
            showIcon
            showBottomLine
            showBackButton
            headerText={this.props.headerText}
            icon={require('../images/planning.png')}
            onBackPressed={() => {
              Actions.pop();
            }}
          />
        )}
        {isFetching ? (
          <View style={{ height: 90, width: '100%' }} />
        ) : (
          <View
            style={{
              flex: 1,
              alignSelf: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              marginTop: 50
            }}
          >
            <Text style={DataErrorStyles.textStyle}>
              {language === 'ar' ? 'لا تتوافر بيانات' : 'No data available'}
            </Text>
            <TouchableOpacity
              onPress={() => {
                this.props.onPress();
              }}
              style={{ marginTop: '3%' }}
            >
              <Icon name="ios-sync-outline" style={{ fontSize: 30 }} />
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}
