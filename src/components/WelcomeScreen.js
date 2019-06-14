import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import EStyleSheet from 'react-native-extended-stylesheet';
import Signup from '../containers/Signup';

export default class WelcomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
    header: null
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Image
            resizeMode={'contain'}
            style={{ height: 50, width: 60, marginTop: 30 }}
            source={require('../../assets/logoblack.png')}
          />
        </View>
        <View style={styles.line} />
        <Text style={styles.welcome}>{this.props.header}</Text>
        <Text style={styles.paragraph}>
          {this.props.line1}
          {'\n'}
          {'\n'}
          {'\n'}
          {this.props.line2}
          {'\n'}
          {'\n'}
          {'\n'}
          {this.props.line3}
          {'\n'}
          {'\n'}
          {'\n'}
          {this.props.line4}
          <Text style={styles.special}>{this.props.italicline}</Text>
        </Text>
        <TouchableOpacity
          style={styles.ask}
          onPress={() => this.props.navigation.navigate('Next', { go_back_key: state.key })}
        >
          <Text style={styles.asktext}>ASK!</Text>
        </TouchableOpacity>
        <Image style={styles.background} source={require('../../assets/background.png')} />
      </View>
    );
  }
}
const styles = EStyleSheet.create({
  container: {
    flex: 1,
    opacity: 0.75
  },
  welcome: {
    marginTop: '11.3%',
    marginLeft: '5.7%',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Lato-Black',
    fontSize: 14.6,
    fontWeight: '900',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'left',
    color: '#000000'
  },
  image: {
    height: '40',
    width: '40'
  },
  line: {
    marginTop: '3%',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    opacity: 0.5
  },
  paragraph: {
    marginTop: '10%',
    marginLeft: '5.7%',
    fontSize: 14.6,
    fontFamily: 'Lato-Regular',
    fontWeight: '300',
    letterSpacing: 0,
    textAlign: 'left',
    width: '75.3%'
  },
  special: {
    color: '#80005D',
    fontStyle: 'italic',
    fontFamily: 'Lato-BlackItalic'
  },
  ask: {
    width: 169.5,
    height: 36,
    marginLeft: '26.2%',
    marginTop: '15%',
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center'
  },
  asktext: {
    fontSize: 11.7,
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'center',
    color: '#ffffff'
  },
  background: {
    zIndex: -1,
    height: '100%',
    width: '100%',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.25,
    flex: 1
  }
});
