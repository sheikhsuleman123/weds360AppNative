import React from 'react';
import { Image, Text, View } from 'react-native';
import ColoredButton from '@components/ColoredButton';
import { RegistryInitialStyles } from './StyleSheet';
import I18n from '@i18n';

const mainPath = 'planning_tools.registry.text.initial.';

class RegistryInitial extends React.Component {
  constructor() {
    super();
    this.state = {
      budget: 0
    };
  }

  render() {
    const { language } = this.props;
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Image
          style={{ width: 100, marginTop: '15%' }}
          source={require('@assets/images/registry_logo.png')}
          resizeMode={'contain'}
        />
        <Text style={RegistryInitialStyles.textStyle}>{I18n.t(`${mainPath}header_intro`)}</Text>
        <Text style={RegistryInitialStyles.descriptionStyle}>
          {I18n.t(`${mainPath}description_intro`)}
        </Text>

        <ColoredButton
          text={I18n.t(`${mainPath}manage_registry`)}
          containerStyle={{
            backgroundColor: '#006862',
            justifyContent: 'center',
            marginTop: 10,
            width: 150,
            borderWidth: 0
          }}
          textStyle={{ fontSize: 14 }}
          onPress={this.props.onButtonPress}
        />
      </View>
    );
  }
}
export default RegistryInitial;
