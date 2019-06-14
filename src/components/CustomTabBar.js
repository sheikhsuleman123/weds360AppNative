import React from 'react';
import { View, Image, TouchableOpacity, Text, Dimensions } from 'react-native';
import * as Animatable from 'react-native-animatable';
import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from 'react-native-vector-icons/EvilIcons';
import { Actions } from 'react-native-router-flux';
import { CTBStyles } from './StyleSheet';

/**
 * Custom Tab Bar Class
 * props:
 * @type {Object}
 * @param logo image [image displayed as a logo]
 */

export default class CustomTabBar extends React.Component {
  constructor(props) {
    super();
    this.state = {
      activeTintColor: 'white',
      inactiveTintColor: 'black',
      activeBackgroundColor: 'black',
      inactiveBackgroundColor: 'white',
      labelStyle: {},
      showLabel: true,
      showSelected: false,
      routes: []
    };
  }

  async componentWillMount() {
    const { navigate, state } = this.props.navigation;
    const { params, index, routes } = state;
    const navParamsDefault = this.state;
    let paramsMod;
    if (params) {
      paramsMod = await Object.assign(this.state, params);
    } else {
      paramsMod = navParamsDefault;
    }
    const {
      activeTintColor,
      inactiveTintColor,
      activeBackgroundColor,
      inactiveBackgroundColor,
      showLabel,
      tabBarLabel,
      showSelected,
      labelStyle
    } = paramsMod;
    this.setState({
      index,
      routes,
      navigate,
      activeTintColor,
      inactiveTintColor,
      activeBackgroundColor,
      inactiveBackgroundColor,
      showLabel,
      showSelected,
      labelStyle
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { navigate, state } = nextProps.navigation;
    const { params, index, routes } = state;
    if (nextState.index !== index) {
      this.setState({ index });
    }
    return true;
  }

  render() {
    const { width, height } = Dimensions.get('window');
    const {
      index,
      routes,
      navigate,
      activeTintColor,
      inactiveTintColor,
      activeBackgroundColor,
      inactiveBackgroundColor,
      showLabel,
      showSelected,
      labelStyle
    } = this.state;
    const { navigation, icon } = this.props;
    return (
      <View style={CTBStyles.container}>
        {routes.map((item, sceneIndex) => {
          const sceneParamsDefault = {
            tabBarLabel: '',
            icon: null
          };
          const sceneParams = Object.assign(
            sceneParamsDefault,
            item,
            item.routes && item.routes[0].params,
            item.params
          );
          const { tabBarLabel, routeName } = sceneParams;
          const singleSceneStyle = EStyleSheet.flatten(CTBStyles.singleScene);
          const singleSceneText = EStyleSheet.flatten(CTBStyles.singleSceneText);
          return (
            <TouchableOpacity
              key={`${sceneIndex}`}
              onPress={() => {
                navigate(`${item.key}`);
              }}
              style={{
                ...singleSceneStyle,
                width: width / routes.length,
                backgroundColor:
                  sceneIndex === index ? activeBackgroundColor : inactiveBackgroundColor
              }}
            >
              <Animatable.View style={CTBStyles.singleSceneInner}>
                {icon ? (
                  <Animatable.View animation="pulse" duration={300}>
                    {icon(navigation)}
                  </Animatable.View>
                ) : null}

                {showLabel ? (
                  <Text
                    style={{
                      ...singleSceneText,
                      ...labelStyle,
                      color: sceneIndex === index ? activeTintColor : inactiveTintColor
                    }}
                  >
                    {tabBarLabel || routeName}
                  </Text>
                ) : null}
              </Animatable.View>
              {showSelected ? (
                sceneIndex === index ? (
                  <View style={CTBStyles.highlightSelected} />
                ) : null
              ) : null}
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
}
