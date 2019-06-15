import React from 'react';
import { Text, View, TextInput } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import ToolBar from  '../../../components/ToolBar';
import ColoredButton from  '../../../components/ColoredButton';
import DaySlider from '../components/DaySlider';
import YearSlider from '../components/YearSlider';
import MonthGrid from '../components/MonthGrid';

export default class ProposalScreen extends React.Component {
  render() {
    const { language } = this.props;
    return (
      <View>
        <ToolBar
          showLogo
          onBackPress={this.props.onBackPress}
          onSkipPress={this.props.onSkipPress}
        />
        <Text style={styles.question}>
          {language === 'ar'
            ? 'متى يعقد حفل الزفاف الخاص بك؟'
            : 'When is your wedding planned to take place?'}
        </Text>
        <TextInput
          underlineColorAndroid="rgba(0,0,0,0)"
          ref="input"
          style={styles.input}
          value={`${this.props.dayText + this.props.monthText + this.props.yearText}`}
          placeholder="Engagement Date"
          placeholderTextColor="#80005d"
          editable={false}
        />
        <DaySlider state={this.props} renderItem={this.props.onDayRender} />
        <View style={styles.line} />
        <MonthGrid state={this.props} renderItem={this.props.onMonthRender} />
        <View style={styles.line} />
        <YearSlider state={this.props} renderItem={this.props.onYearRender} />
        <View
          style={{
            marginTop: 45,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <ColoredButton
            onPress={this.props.onNextPress}
            text={language === 'ar' ? 'التالي' : 'NEXT'}
            containerStyle={{ width: '75%', backgroundColor: 'black' }}
          />
        </View>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  header: {
    height: 70,
    backgroundColor: '#000000'
  },
  back: {
    width: 9,
    height: 14,
    marginTop: '9.5%',
    marginLeft: '5.7%',
    backgroundColor: '#ffffff'
  },
  logo: {
    width: 56,
    height: 39,
    marginTop: '-8%',
    marginLeft: '42.2%'
  },
  skiptext: {
    marginTop: '-6.4%',
    marginLeft: '78%',
    fontSize: 15,
    fontFamily: '$light',
    textAlign: 'center',
    color: '#ffffff'
  },
  question: {
    marginTop: '12.5%',
    marginLeft: '14%',
    width: '70%',
    fontFamily: '$black',
    fontSize: 16,
    textAlign: 'center',
    color: '#000000'
  },
  input: {
    fontSize: 19,
    marginTop: '5.2%',
    fontFamily: '$light',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    color: '#80005d'
  },
  dectouch: {
    position: 'absolute',
    marginTop: '73.5%',
    marginLeft: '8.4%',
    opacity: 0.5
  },
  decimg: {
    width: 6.5,
    height: 13
  },
  inctouch: {
    position: 'absolute',
    marginTop: '73.5%',
    marginLeft: '89.4%',
    opacity: 0.5
  },
  incimg: {
    width: 6.5,
    height: 13
  },
  line: {
    width: 305,
    alignSelf: 'center',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    opacity: 0.5
  },
  next: {
    width: 320.5,
    height: 25.5,
    backgroundColor: '#000000',
    marginTop: '13%',
    marginLeft: '7.1%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  nexttext: {
    fontFamily: '$black',
    fontSize: 12,
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'center',
    color: '#ffffff'
  },
  dectouch1: {
    position: 'absolute',
    top: '84.4%',
    left: '8%',
    marginLeft: '0.4%',
    opacity: 0.5
  },
  decimg1: {
    width: 6.5,
    height: 13
  },
  inctouch1: {
    position: 'absolute',
    top: '84.4%',
    right: '8.5%',
    opacity: 0.5
  },
  incimg1: {
    width: 6.5,
    height: 13
  }
});
