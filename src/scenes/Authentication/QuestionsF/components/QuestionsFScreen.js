import React from 'react';
import { Image, TouchableOpacity, View, TextInput, Text } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import DatePicker from 'react-native-datepicker';
import AdaptiveView from '../../../../components/AdaptiveView';

import BackButton from '../../../../components/BackButton';
import { QuestionsFScreenStyles } from './StyleSheet';

export default class QuestionsFScreen extends React.Component {
  render() {
    const { language } = this.props;
    let textArray = [
      "First, what's your name?",
      'First & Last Name',
      "What's your role?",
      'Bride',
      'Groom',
      'Other',
      'NEXT',
      'Skip',
      "What's your date of birth?",
      'Phone Number'
    ];
    if (language === 'ar') {
      textArray = [
        'أولاَ, ما اسمك؟',
        'الاسم الأول  و الاسم الأخير',
        'ما هو دورك؟',
        'عروس',
        'عريس',
        'اّخر',
        'التالي',
        'تخطى',
        'ما هو تاريخ ميلادك؟',
        'رقم الجوال'
      ];
    }
    return (
      <AdaptiveView style={styles.container}>
        <BackButton />
        <Text
          style={{
            marginTop: '15.7%',
            fontFamily: language === 'ar' ? 'Tajawal-Bold' : 'Lato-Black',
            fontSize: 17,
            letterSpacing: 0,
            color: '#000000',
            alignSelf: 'center'
          }}
        >
          {textArray[0]}
        </Text>
        <TextInput
          value={this.props.full_name}
          underlineColorAndroid="rgba(0,0,0,0)"
          style={{
            marginTop: '3%',
            fontFamily: language === 'ar' ? 'Tajawal-Light' : 'Lato-Light',
            alignSelf: 'center',
            textAlign: 'center',
            justifyContent: 'center',
            fontSize: 20,
            width: '90%'
          }}
          multiline
          maxLength={50}
          placeholder={textArray[1].toString()}
          placeholderTextColor="#80005d"
          onChangeText={this.props.saveFullName}
        />
        <Text
          style={{
            marginTop: '10%',
            fontFamily: language === 'ar' ? 'Tajawal-Bold' : 'Lato-Black',
            fontSize: 17,
            letterSpacing: 0,
            color: '#000000',
            alignSelf: 'center'
          }}
        >
          {textArray[8]}
        </Text>
        <DatePicker
          date={this.props.dob}
          mode="date"
          placeholder="Select date"
          format="YYYY-MM-DD"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          showIcon={false}
          style={{ alignSelf: 'center', marginTop: '2%' }}
          maxDate={new Date()}
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
          {textArray[9]}
        </Text>
        <TextInput
          maxLength={15}
          value={this.props.phone_number}
          underlineColorAndroid="rgba(0,0,0,0)"
          style={{
            marginTop: '3%',
            fontFamily: language === 'ar' ? 'Tajawal-Light' : 'Lato-Light',
            alignItems: 'center',
            textAlign: 'center',
            justifyContent: 'center',
            fontSize: 20
          }}
          keyboardType={'numeric'}
          returnKeyType="done"
          placeholder={textArray[9].toString()}
          placeholderTextColor="#80005d"
          onChangeText={this.props.savePhoneNumber}
        />
        <Text
          style={{
            marginTop: '12.7%',
            fontFamily: language === 'ar' ? 'Tajawal-Bold' : 'Lato-Black',
            fontSize: 17,
            letterSpacing: 0,
            color: '#000000',
            alignSelf: 'center'
          }}
        >
          {textArray[2]}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            justifyContent: 'space-between'
          }}
        >
          <TouchableOpacity
            style={{
              width: '30%',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onPress={this.props.onBridePress}
          >
            <View
              style={{
                alignItems: 'center',
                flex: 1,
                justifyContent: 'center'
              }}
            >
              <Image
                style={{
                  width: 18,
                  height: 4.5
                }}
                source={require('../../../../../assets/up.png')}
                resizeMode={'contain'}
              />
              <Image
                style={{
                  width: 18,
                  height: 9
                }}
                source={require('../../../../../assets/mid.png')}
                resizeMode={'contain'}
              />
              <Image
                style={{
                  width: 44.5,
                  height: 44.5
                }}
                source={require('../../../../../assets/down.png')}
                resizeMode={'contain'}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: '30%',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onPress={this.props.onGroomPress}
          >
            <Image
              style={{
                width: 45,
                height: 44.5
              }}
              source={require('../../../../../assets/down.png')}
              resizeMode={'contain'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: '30%',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onPress={this.props.onOthersPress}
          >
            <View
              style={{
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'center'
              }}
            >
              <View
                style={{
                  alignItems: 'center'
                }}
              >
                <Image
                  style={{
                    width: 18,
                    height: 4.5,
                    marginTop: '7%'
                  }}
                  source={require('../../../../../assets/up.png')}
                  resizeMode={'contain'}
                />
                <Image
                  style={{
                    width: 18,
                    height: 9
                  }}
                  source={require('../../../../../assets/mid.png')}
                  resizeMode={'contain'}
                />
                <Image
                  style={{
                    width: 44.5,
                    height: 44.5
                  }}
                  source={require('../../../../../assets/down.png')}
                  resizeMode={'contain'}
                />
              </View>
              <Image
                style={{
                  top: 16.5,
                  width: 45,
                  position: 'absolute',
                  height: 44.5,
                  marginLeft: 0,
                  left: 20
                }}
                source={require('../../../../../assets/down.png')}
                resizeMode={'contain'}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Text
            style={[
              this.props.role === 0
                ? QuestionsFScreenStyles.textActive
                : QuestionsFScreenStyles.textInactive,
              {
                color: this.props.role === 0 ? '#80005d' : '#000000'
              }
            ]}
          >
            {textArray[3]}
          </Text>

          <Text
            style={[
              this.props.role === 1
                ? QuestionsFScreenStyles.textActive
                : QuestionsFScreenStyles.textInactive,
              {
                color: this.props.role === 1 ? '#80005d' : '#000000'
              }
            ]}
          >
            {textArray[4]}
          </Text>

          <Text
            style={[
              this.props.role === 2
                ? QuestionsFScreenStyles.textActive
                : QuestionsFScreenStyles.textInactive,
              {
                color: this.props.role === 2 ? '#80005d' : '#000000'
              }
            ]}
          >
            {textArray[5]}
          </Text>
        </View>
        <TouchableOpacity onPress={this.props.onNextPress} style={styles.next}>
          <Text style={styles.nexttext}>{textArray[6]}</Text>
        </TouchableOpacity>
      </AdaptiveView>
    );
  }
}

const styles = EStyleSheet.create({
  container: {
    opacity: 0.75,
    width: '100%',
  },
  other: {},
  brideother: {},
  otherview: {},
  obrideup: {},
  obridemid: {},
  obridedown: {},
  next: {
    width: '80%',
    backgroundColor: '#000000',
    alignSelf: 'center',
    justifyContent: 'center'
  },
  nexttext: {
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 11.7,
    margin: 8,
    fontFamily: '$medium'
  }
});
