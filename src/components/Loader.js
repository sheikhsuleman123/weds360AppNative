import React from 'react';
import { Animated, ActivityIndicator, Text, View, ImageBackground } from 'react-native';
import * as Animatable from 'react-native-animatable';

export default class Loader extends React.Component {
  constructor() {
    super();
    this.state = {
      opacity: new Animated.Value(0),
      spinValue: new Animated.Value(0),
      looping: true,
      color: new Animated.Value(300),
      done: false,
      counter: 2
    };
  }
  componentWillMount() {}
  componentDidMount() {
    setTimeout(() => this.props.setReady(), 3500);
    this.clearId = setTimeout(() => this.handleTransition(), 5000);
    // this.handleAnimation();
  }
  componentWillUnmount() {
    clearTimeout(this.clearId);
  }
  handleTransition = () => {
    this.setState(prevState => ({
      counter: prevState.counter + 1
    }));
    this.clearId = setTimeout(() => this.handleTransition(), 5000);
  };
  // handleAnimation = () => {
  //   Animated.sequence([
  //     Animated.timing(this.state.color, {
  //       toValue: 300,
  //       duration: 3000
  //     }),
  //     Animated.timing(this.state.color, {
  //       toValue: 0,
  //       duration: 3000
  //     })
  //   ]).start(() => this.handleAnimation());
  // };

  render() {
    const color = this.state.color.interpolate({
      inputRange: [0, 300],
      outputRange: ['rgba(255, 255, 255, 1)', 'rgb(0, 52, 48)']
    });
    const textColor = this.state.color.interpolate({
      inputRange: [0, 300],
      outputRange: ['rgb(0, 52, 48)', 'rgba(255, 255, 255, 1)']
    });
    const picturesArray = [
      require('../images/wed1.jpg'),
      require('../images/wed2.jpg'),
      require('../images/wed3.jpg'),
      require('../images/wed4.jpg')
    ];
    return (
      <Animatable.View
        style={{
          height: '100%',
          width: '100%',
          backgroundColor: 'white',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        animation="fadeIn"
        ease="zoomOut"
      >
        {this.props.loaderOnline ? (
          <View
            style={{
              flex: 1,
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.5)'
            }}
          >
            <Animatable.Image
              // animation="fadeIn"
              // duration={4100}
              // iterationCount="infinite"
              source={picturesArray[this.state.counter % 4]}
              resizeMode={'cover'}
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                opacity: 0.8
              }}
              blurRadius={0.2}
            />
            <View
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                height: '100%',
                width: '100%',

                position: 'absolute'
              }}
            />
            <Animatable.View
              animation="fadeInDown"
              style={{
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <Animatable.Text
                animation="pulse"
                easing="ease-out"
                style={{
                  fontFamily: 'Lato-Light',
                  color: textColor,
                  fontSize: 60,
                  zIndex: 2,
                  letterSpacing: -3
                }}
              >
                WEDS360
              </Animatable.Text>
              <Animated.Text
                style={{
                  fontFamily: 'Lato-Italic',
                  color: textColor,
                  fontSize: 16,
                  zIndex: 2,
                  textAlign: 'center'
                }}
              >
                WEDDING PLANNING HAS NEVER BEEN EASIER
              </Animated.Text>
            </Animatable.View>
            <Animatable.Text
              animation="pulse"
              duration={1500}
              iterationCount="infinite"
              style={{
                fontFamily: 'Lato-Light',
                color: textColor,
                fontSize: 20,
                zIndex: 2,
                position: 'absolute',
                bottom: 30
              }}
            >
              Loading {this.props.loadingElement}...
            </Animatable.Text>
          </View>
        ) : (
          <ActivityIndicator size="large" />
        )}
      </Animatable.View>
    );
  }
}
