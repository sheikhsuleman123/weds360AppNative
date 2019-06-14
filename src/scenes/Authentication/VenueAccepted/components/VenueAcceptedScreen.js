import React from 'react';
import { TextInput, Image, Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import ColoredButton from '../../../../components/ColoredButton';
import ToolBar from '../../../../components/ToolBar';

import AdaptiveView from '../../../../components/AdaptiveView';
import { VenueAcceptedScreenStyles } from './StyleSheet';

export default class VenueAcceptedScreen extends React.Component {
  render() {
    const { language } = this.props;
    let textArray = [
      'What venue did you choose?',
      'Wherever you choose, will help you find a venue there.',
      'We have experts everywhere.',
      'Reception Venue',
      'Next'
    ];
    if (language === 'ar') {
      textArray = [
        'ما هو المكان الذي اخترته؟',
        'أينما اخترت ، سوف نساعدك على العثور على مكان هناك.',
        'لدينا خبراء في كل مكان.',
        'مكان الاستقبال',
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
        />
        <View style={VenueAcceptedScreenStyles.container_answer}>
          <Image
            source={require('../../../../../assets/images/circle.png')}
            style={{ width: 80, height: 80, marginTop: 50 }}
            resizeMode={'contain'}
          />
          <Text style={VenueAcceptedScreenStyles.headerTextStyle}>{textArray[0]}</Text>
          <Text style={VenueAcceptedScreenStyles.descriptionTextStyle}>{textArray[1]}</Text>
          <Text style={VenueAcceptedScreenStyles.descriptionTextStyle}>{textArray[2]}</Text>

          <View style={{ marginTop: 30, padding: 10 }}>
            <Text style={VenueAcceptedScreenStyles.inputTextStyle}>{textArray[3]}</Text>
            <TextInput
              style={VenueAcceptedScreenStyles.inputStyle}
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
          </View>
        </View>
      </AdaptiveView>
    );
  }
}
