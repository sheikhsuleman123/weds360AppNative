import React, { Component } from 'react';
import { Image, View, AsyncStorage, Alert, ActivityIndicator } from 'react-native';
import { createBottomTabNavigator, createAppContainer, BottomTabBar } from 'react-navigation';
import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import { connect } from 'react-redux';

import EventsScreen from '../scenes/PlanningTools/Invites/Events';
import Inspirations from '../scenes/Inspiration';
import Articles from '../scenes/Posts/Articles';
import PlanningScreen from '../scenes/PlanningTools';
import HomeScreen from '../scenes/Homescreen';
import VendorsTab from '../scenes/Vendors/components/VendorsTab';
import CustomTabBar from '../components/CustomTabBar';

import I18n from '../i18n';

import * as HomeScreenActions from '../scenes/Homescreen/actions';
import * as AuthenticationActions from '../scenes/Authentication/actions';

export const styles = EStyleSheet.create({
  labelStyle: {
    fontFamily: '$medium',
    fontSize: 9
  },
  tabStyle: {
    borderWidth: 0,
    flexGrow: 1
  }
});

class TabScreens extends Component {
  constructor() {
    super();
    this.state = {
      tabNotSet: true
    };
  }

  async logOut(fail) {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('lang');
    this.props.handleProfileReset();
    if (!fail) Alert.alert('Error', "Please use the vendor's app to login.");
    Actions.reset('language_select', {});
  }
  componentWillMount() {
    if (this.props.profile === undefined) {
      this.props.profileFetch();
    } else {
      this.createTab(this.props.profile);
    }
  }

  async componentWillReceiveProps(nextProps) {
    if (nextProps.profile) {
      // Notifications.initialLoad(nextProps.profile.id, nextProps.profile.fcm_stylestoken);
      if (nextProps.profile.attributes.role === 'vendor') {
        this.logOut(false);
        return;
      }
      this.createTab(nextProps.profile);
    }
    if (nextProps.profileFetchFailure) {
      this.logOut(true);
    }
  }

  handleBackPress = () => {
    Alert.alert('', 'Are you sure you want to sign out?', [
      {
        text: 'Signout',
        onPress: () => this.logOut(true)
      },
      { text: 'Cancel', onPress: () => {} }
    ]);
    return true;
  };

  pickIcon = (routeName, focused, tintColor) => {
    let source;
    let style = { opacity: focused ? 1 : 0.5 };
    switch (routeName) {
      case 'Home Page':
      case 'الصفحة الرئيسية':
        source = require('../images/home.png');
        style = { ...style, width: 25, height: 25, marginBottom: 0 };
        break;
      case 'Categories':
      case 'الأقسام':
        source = require('../images/planning.png');
        style = { ...style, width: 25, height: 25, marginBottom: 0 };
        break;
      case 'Planning':
      case 'تخطيط':
        source = require('../../assets/planner.png');
        style = { ...style, width: 25, height: 25, marginBottom: 0 };
        break;
      case 'Articles':
      case 'مقالات':
        source = require('../../assets/articles.png');
        style = { ...style, width: 25, height: 25, marginBottom: 0 };
        break;
      case 'Inspirations':
      case 'الهامات':
        source = require('../../assets/inspiration.png');
        style = { ...style, width: 25, height: 25, marginBottom: 0 };
        break;
      case 'Events':
      case 'أحداث':
        source = require('../images/guestlist.png');
        style = { ...style, width: 30, height: 30, marginBottom: 0 };
        break;
      default:
        source = require('../images/planning.png');
        style = { ...style, width: 25, height: 25, marginBottom: 0 };
    }
    return <Image source={source} style={style} resizeMode={'contain'} />;
  };

  async createTab(profile) {
    if (this.state.tabNotSet) {
      const tabs =
        profile.attributes.role !== 'user'
          ? {
              [I18n.t('tabs.primary_tabs.home_tab')]: HomeScreen,
              [I18n.t('tabs.primary_tabs.categories_tab')]: VendorsTab,
              [I18n.t('tabs.primary_tabs.planning_tab')]: PlanningScreen,
              [I18n.t('tabs.primary_tabs.articles_tab')]: Articles,
              [I18n.t('tabs.primary_tabs.inspirations_tab')]: Inspirations
            }
          : {
              [I18n.t('tabs.primary_tabs.home_tab')]: HomeScreen,
              [I18n.t('tabs.primary_tabs.categories_tab')]: VendorsTab,
              [I18n.t('tabs.primary_tabs.events_tab')]: EventsScreen,
              [I18n.t('tabs.primary_tabs.articles_tab')]: Articles,
              [I18n.t('tabs.primary_tabs.inspirations_tab')]: Inspirations
            };

      const Tab = await createAppContainer(
        createBottomTabNavigator(tabs, {
          defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) =>
              this.pickIcon(navigation.state.routeName, focused, tintColor)
          }),
          tabBarOptions: {
            activeTintColor: 'rgb(2, 74, 70)',
            inactiveTintColor: 'rgb(1, 0, 0)',
            labelStyle: styles.labelStyle,
            tabStyle: styles.tabStyle
          },
          animationEnabled: true,
          swipeEnabled: false
        })
      );

      this.setState({
        Tab,
        tabNotSet: false
      });
    }
  }

  render() {
    const { tabNotSet, Tab } = this.state;
    return (
      <View style={{ flexGrow: 1 }}>
        {tabNotSet || !this.props.profile ? (
          <ActivityIndicator
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
            size="large"
            color="black"
          />
        ) : (
          <Tab goto={this.props.redirect} language={this.props.language} />
        )}
      </View>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    ...state.homescreenReducer,
    ...state.languageReducer
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign(AuthenticationActions, HomeScreenActions), dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TabScreens);
