import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { createMaterialTopTabNavigator, createAppContainer } from 'react-navigation';
import Vendors from '../../../scenes/Vendors/index'; 
import YourVendorsScreen from '../../../scenes/YourVendors'; 
import Header from '../../../components/Header';
import Messages from '../../../scenes/Messages/Conversations';
import store from '../../../../store';
import { VendorsTabStyles } from './StyleSheet';

import CustomTabBar from '@components/CustomTabBar';

import I18n from '../../../i18n';

export default class VendorsTab extends Component {
  initializeTabs() {
    const tabs = {
      [I18n.t('tabs.secondary_tabs.vendors_tab')]: Vendors,
      [I18n.t('tabs.secondary_tabs.conversations_tab')]: Messages,
      [I18n.t('tabs.secondary_tabs.yourvendors_tab')]: YourVendorsScreen
    };

    const Tab = createAppContainer(
      createMaterialTopTabNavigator(tabs, {
        tabBarComponent: CustomTabBar,
        tabBarPosition: 'top',
        animationEnabled: true,
        swipeEnabled: true,
        tabBarOptions: {
          activeTintColor: 'white',
          inactiveTintColor: 'black',
          activeBackgroundColor: 'black',
          style: {
            backgroundColor: 'white',
            borderColor: 'black',
            borderWidth: 0.5,
            justifyContent: 'center',
            alignItems: 'center',
            height: 29
          },
          labelStyle: VendorsTabStyles.labelStyle
        }
      })
    );

    return <Tab />;
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header
          showIcon
          headerText={store.getState().languageReducer.language === 'ar' ? 'الأقسام' : 'Categories'}
          icon={require('@assets/images/vendors.png')}
          language={store.getState().languageReducer.language}
        />
        {this.initializeTabs()}
      </View>
    );
  }
}
