import React from 'react';
import { AsyncStorage, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Swiper from 'react-native-swiper';
import { Actions } from 'react-native-router-flux';
import EStyleSheet from 'react-native-extended-stylesheet';
import OnBoardingScreen from './OnBoardingScreen';
import AdaptiveView from './AdaptiveView';
import ColoredButton from './ColoredButton';
import OutlinedButton from './OutlinedButton';

class StartScreen extends React.Component {
  render() {
    const { language } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <Swiper loop={false} dotColor="#ffffff" activeDotColor={'rgb(226, 20 , 78)'}>
          <OnBoardingScreen
            firstLineText={language === 'ar' ? 'مخطط الزفاف' : 'YOUR ALL - IN - ONE'}
            secondLineText={language === 'ar' ? 'الخاص بك' : 'WEDDING PLANNER'}
            source={require('../images/start_screen1.png')}
          />
          <OnBoardingScreen
            firstLineText={language === 'ar' ? 'إنشاء موقع الزفاف' : 'CREATE YOUR OWN'}
            secondLineText={language === 'ar' ? 'الخاص بك' : 'WEDDING WEBSITE'}
            source={require('../images/start_screen2.png')}
          />
          <OnBoardingScreen
            firstLineText={language === 'ar' ? 'دعوة أصدقائك' : 'INVITE YOUR FRIENDS'}
            secondLineText={language === 'ar' ? 'وعائلتك' : 'AND FAMILY'}
            source={require('../images/start_screen3.png')}
          />
        </Swiper>
        <View
          style={{
            bottom: 10,
            width: '100%',
            position: 'absolute',
            justifyContent: 'flex-end',
            alignItems: 'center'
          }}
        >
          <View style={styles.buttonsContainer}>
            <OutlinedButton
              onPress={() => {
                Actions.login();
              }}
              containerStyle={styles.loginButtonContainer}
              textStyle={styles.buttonText}
              text={language === 'ar' ? 'تسجيل دخول' : 'Login'}
            />
            <ColoredButton
              onPress={() => Actions.questions()}
              containerStyle={styles.signUpButtonContainer}
              textStyle={styles.buttonText}
              text={language === 'ar' ? 'انشاء حساب' : 'Sign up'}
            />
          </View>
        </View>
      </View>
    );
  }
}
// The function takes data from the app current state,
// and insert/links it into the props of our component.
// This function makes Redux know that this component needs to be passed a piece of the state
function mapStateToProps(state, props) {
  return {
    ...state.languageReducer
  };
}

//Connect everything

export default connect(
  mapStateToProps,
  undefined
)(StartScreen);

const styles = EStyleSheet.create({
  mainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%'
  },
  buttonsContainer: {
    position: 'absolute',
    bottom: 80,
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
    backgroundColor: 'rgba(0,0,0,0.5)'
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
    color: 'rgba(255,255,255,1)',
    fontSize: 30
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    fontFamily: '$light'
  }
});
