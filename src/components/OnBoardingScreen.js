import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Image, ImageBackground, Text, View } from 'react-native';

export default class OnBoardingScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ImageBackground
          resizeMode={'cover'}
          source={this.props.source}
          style={styles.mainContainer}
        >
          <View
            style={{
              position: 'absolute',
              height: '100%',
              width: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.1)'
            }}
          />
          <Image
            // source={require('../images/logowhite.png')}
            style={{ width: 100, height: 100, marginBottom: 20 }}
            resizeMode={'contain'}
          />
          <Text style={styles.subtitleText}>{this.props.firstLineText}</Text>
          <Text style={styles.subtitleText}>{this.props.secondLineText}</Text>
        </ImageBackground>
      </View>
    );
  }
}
const styles = EStyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%'
  },
  buttonsContainer: {
    position: 'absolute',
    bottom: 50,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-end',
    flexDirection: 'row'
  },
  loginButtonContainer: {
    marginLeft: 5,
    marginRight: 5,
    width: '45%',
    padding: 6,
    overflow: 'hidden',
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: 'transparent'
  },
  signUpButtonContainer: {
    marginLeft: 5,
    marginRight: 5,
    width: '45%',
    padding: 6,
    overflow: 'hidden',
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: 'black'
  },
  subtitleText: {
    fontFamily: '$medium',
    textAlign: 'center',
    color: 'white',
    fontSize: 30,
    textShadowColor: '#000000',
    textShadowOffset: { width: 1, height: 4 },
    textShadowRadius: 5
  }
});
