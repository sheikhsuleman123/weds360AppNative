import React from 'react';
import { KeyboardAvoidingView, TextInput, Image, View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import ColoredButton from '../../../../components/ColoredButton';
import ToolBar from '../../../../components/ToolBar';
import AdaptiveView from '../../../../components/AdaptiveView';
import { VenueRejectedScreenStyles } from './StyleSheet';

export default class VenueRejectedScreen extends React.Component {
  render() {
    const { language } = this.props;
    let textArray = [
      'No problem! what do you\nhave in mind?',
      'Wherever you choose, will help you find a venue there.',
      'We have experts everywhere.',
      'Area, city',
      'Next'
    ];
    if (language === 'ar') {
      textArray = [
        'ليس هناك أى مشكلة! في ماذا تفكر؟',
        'أينما اخترت ، سوف نساعدك على العثور على مكان هناك.',
        'لدينا خبراء في كل مكان.',
        'منطقة و المدينة',
        'التالي'
      ];
    }
    return (
      <AdaptiveView>
        <ToolBar
          showLogo
          showSkip
          onBackPress={() => {
            Actions.pop();
          }}
          onSkipPress={() => {
            Actions.proposal();
          }}
          language={language}
        />
        <View style={VenueRejectedScreenStyles.container_answer}>
          <Image
            source={require('../../../../../assets/images/circle.png')}
            style={{ width: 80, height: 80, marginTop: 50 }}
            resizeMode={'contain'}
          />
          <Text style={VenueRejectedScreenStyles.headerTextStyle}>{textArray[0]}</Text>
          <Text style={VenueRejectedScreenStyles.descriptionTextStyle}>{textArray[1]}</Text>
          <Text style={VenueRejectedScreenStyles.descriptionTextStyle}>{textArray[2]}</Text>

          <KeyboardAvoidingView
            behavior={'padding'}
            keyboardVerticalOffset={-500}
            style={{ marginTop: 30, padding: 10 }}
          >
            <Text style={VenueRejectedScreenStyles.inputTextStyle}>{textArray[3]}</Text>
            <TextInput
              style={VenueRejectedScreenStyles.inputStyle}
              underlineColorAndroid="rgba(0,0,0,0)"
              onChangeText={e => {
                this.props.saveVenue(e);
              }}
            />
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%'
              }}
            >
              <ColoredButton
                text={textArray[4]}
                containerStyle={{
                  width: '50%',
                  marginTop: 25,
                  backgroundColor: 'black'
                }}
                onPress={() => {
                  Actions.proposal();
                }}
              />
            </View>
          </KeyboardAvoidingView>
        </View>
      </AdaptiveView>
    );
  }
}
