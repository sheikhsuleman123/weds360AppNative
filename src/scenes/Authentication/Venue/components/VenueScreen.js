import React from 'react';
import { Text, View, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import OutlinedButton from '../../../../components/OutlinedButton';
import ColoredButton from '../../../../components/ColoredButton';
import ToolBar from '../../../../components/ToolBar';
import { VenueScreenStyles } from './StyleSheet';

export default class VenueScreen extends React.Component {
  render() {
    const { language } = this.props;
    let textArray = [
      'Have you picked a venue yet?',
      'No, we need help!',
      'Yes, we are already set.'
    ];
    if (language === 'ar') {
      textArray = [
        'هل اخترت مكانًا حتى الآن؟',
        'لا ، نحن بحاجة إلى مساعدة!',
        'نعم، نحن على ما يرام.'
      ];
    }
    return (
      <View>
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
        <View
          style={{
            marginTop: 30,
            height: '60%',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Image
            resizeMode={'contain'}
            source={require('../../../../../assets/images/circle.png')}
            style={{ width: 100, height: 100 }}
          />
          <Text style={VenueScreenStyles.headerTextStyle}>{textArray[0]}</Text>
          <View style={{ width: '100%', alignItems: 'center' }}>
            <OutlinedButton
              containerStyle={{ width: '80%' }}
              text={textArray[1]}
              onPress={() => {
                Actions.questions_venue_no();
              }}
            />
            <ColoredButton
              text={textArray[2]}
              containerStyle={{
                width: '80%',
                marginTop: 20,
                backgroundColor: 'black'
              }}
              onPress={() => {
                Actions.questions_venue_yes();
              }}
            />
          </View>
        </View>
      </View>
    );
  }
}
