import React, { Component } from 'react';
import { Text, View, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import ColoredButton from '@components/ColoredButton';
import OnBoardingScreen from '@components/OnBoardingScreen';

export default class LanguageSelectScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <OnBoardingScreen
          firstLineText={'CHOOSE YOUR LANGUAGE'}
          source={require('@assets/images/start_screen1.png')}
        />
        <View
          style={{
            bottom: 10,
            width: '100%',
            position: 'absolute',
            justifyContent: 'flex-end',
            alignItems: 'center'
          }}
        >
          <View
            style={{
              flex: 1,
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '20%'
            }}
          >
            <ColoredButton
              text="English"
              containerStyle={{
                marginLeft: 5,
                marginRight: 5,
                width: '60%',
                padding: 6,
                overflow: 'hidden',
                borderColor: 'black',
                borderWidth: 1,
                backgroundColor: 'black'
              }}
              textStyle={{ fontSize: 17, fontFamily: 'Lato-Regular', color: 'white' }}
              onPress={async () => {
                await AsyncStorage.setItem('lang', 'en');
                this.props.setLanguage('en');
                if (this.props.authenticated) Actions.tabscreens();
                else Actions.start();
              }}
            />

            <ColoredButton
              text="عربي"
              containerStyle={{
                marginLeft: 5,
                marginRight: 5,
                width: '60%',
                padding: 6,
                overflow: 'hidden',
                borderColor: 'black',
                borderWidth: 1,
                backgroundColor: 'black',
                marginTop: 30
              }}
              textStyle={{ fontSize: 17, color: 'white', fontFamily: 'Tajawal-Light' }}
              onPress={async () => {
                await AsyncStorage.setItem('lang', 'ar');
                this.props.setLanguage('ar');
                if (this.props.authenticated) Actions.tabscreens();
                else Actions.start();
              }}
            />
          </View>
        </View>
      </View>
    );
  }
}
