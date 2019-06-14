import React from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DatePicker from 'react-native-datepicker';
import EStyleSheet from 'react-native-extended-stylesheet';
import AdaptiveView from '@components/AdaptiveView';

import BackButton from '@components/BackButton';

export default class QuestionsSScreen extends React.Component {
  render() {
    const { language } = this.props;
    let textArray = [
      'What’s your partner’s name?',
      'First & Last Name',
      'NEXT',
      "What is your Fiance's date of birth? (Optional)",
      "Fiance's Phone Number (Optional)"
    ];
    if (language === 'ar') {
      textArray = [
        'ما اسم شريكك؟',
        'الاسم الأول  و الاسم الأخير',
        'التالي',
        'ما تاريخ ميلاد شريكك؟ (اختياري)',
        'رقم جوال شريكك (اختياري)'
      ];
    }
    return (
      <AdaptiveView style={styles.container}>
        {this.props.hideSkip ? (
          <BackButton />
        ) : (
          <TouchableOpacity style={styles.skip} onPress={this.props.onSkipPress}>
            <Text style={styles.skiptext}>Skip</Text>
          </TouchableOpacity>
        )}
        <Text style={styles.textn}>{textArray[0]}</Text>
        <TextInput
          value={this.props.fiance_full_name}
          underlineColorAndroid="rgba(0,0,0,0)"
          style={styles.input}
          multiline
          maxLength={50}
          placeholder={textArray[1]}
          placeholderTextColor="#80005d"
          onChangeText={text => this.props.saveFianceFullName(text)}
        />
        <Text
          style={{
            marginTop: '12.7%',
            fontFamily: language === 'ar' ? 'Tajawal-Bold' : 'Lato-Black',
            fontSize: 17,
            letterSpacing: 0,
            color: '#000000',
            alignSelf: 'center',
            width: '80%'
          }}
        >
          {textArray[3]}
        </Text>
        <DatePicker
          date={this.props.partner_dob}
          mode="date"
          placeholder="Select date"
          format="YYYY-MM-DD"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          showIcon={false}
          maxDate={new Date()}
          style={{ alignSelf: 'center', marginTop: '2%' }}
          customStyles={{
            placeholderText: {
              fontFamily: 'Lato-Light',
              fontSize: 13,
              padding: 5,
              color: '#b7b7b7'
            }
          }}
          onDateChange={this.props.onDOBChange}
        />
        <Text
          style={{
            marginTop: '10.7%',
            fontFamily: language === 'ar' ? 'Tajawal-Bold' : 'Lato-Black',
            fontSize: 17,
            letterSpacing: 0,
            color: '#000000',
            alignSelf: 'center'
          }}
        >
          {textArray[4]}
        </Text>
        <TextInput
          value={this.props.partner_phone_number}
          underlineColorAndroid="rgba(0,0,0,0)"
          style={{
            marginTop: '3%',
            fontFamily: language === 'ar' ? 'Tajawal-Light' : 'Lato-Light',
            alignItems: 'center',
            textAlign: 'center',
            justifyContent: 'center',
            fontSize: 20
          }}
          maxLength={15}
          keyboardType={'numeric'}
          returnKeyType="done"
          placeholder={textArray[4].toString()}
          placeholderTextColor="#80005d"
          onChangeText={this.props.saveFiancePhoneNumber}
        />
        <TouchableOpacity onPress={this.props.onNextPress} style={styles.next}>
          <Text style={styles.nexttext}>{textArray[2]}</Text>
        </TouchableOpacity>
      </AdaptiveView>
    );
  }
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    opacity: 0.75
  },
  skiptext: {
    marginTop: '10.9%',
    marginLeft: '76.3%',
    fontSize: 15,
    fontFamily: '$light',
    letterSpacing: 0,
    textAlign: 'center',
    color: '#000000'
  },
  textn: {
    marginTop: '18.7%',
    fontFamily: '$medium',
    fontSize: 17,
    letterSpacing: 0,
    textAlign: 'center',
    color: '#000000'
  },
  input: {
    marginTop: '5.2%',
    fontFamily: '$light',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 20
  },
  next: {
    width: '80%',
    backgroundColor: '#000000',
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 100
  },
  nexttext: {
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 11.7,
    margin: 8,
    fontFamily: '$medium'
  }
});
