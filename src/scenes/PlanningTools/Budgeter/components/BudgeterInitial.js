import React from 'react';
import { Image, Text, View } from 'react-native';
import ColoredButton from '@components/ColoredButton';
import OutlineTextInput from '@components/OutlineTextInput';
import { BudgeterInitialStyles } from './StyleSheet';
import I18n from '@i18n';

const mainPath = 'planning_tools.budgeter.text.initial.';

export default class BudgeterInitial extends React.Component {
  constructor() {
    super();
    this.state = {
      newBudget: 0
    };
  }

  render() {
    const { state, props } = this;
    const { language, onButtonPress } = props;
    const { newBudget } = state;
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Image
          style={{ width: 80, height: 80, marginTop: '15%', marginBottom: '3%' }}
          source={require('@assets/images/tools-budgeter.png')}
          resizeMode={'contain'}
        />
        <Text style={BudgeterInitialStyles.textStyle}>{I18n.t(`${mainPath}header_intro`)}</Text>
        <Text style={BudgeterInitialStyles.descriptionStyle}>
          {I18n.t(`${mainPath}description_intro`)}
        </Text>
        <Text style={BudgeterInitialStyles.amountSpendStyle}>
          {I18n.t(`${mainPath}amount_to_spend`)}
        </Text>
        <OutlineTextInput
          placeholder={`EGP   ${this.state.newBudget}`}
          onChangeText={text => {
            this.setState({
              newBudget: text
            });
          }}
        />
        <ColoredButton
          text={I18n.t(`${mainPath}manage_budget`)}
          containerStyle={{
            backgroundColor: '#006862',
            marginTop: '4%',
            width: '40%',
            borderWidth: 0
          }}
          textStyle={{ fontSize: 14 }}
          onPress={() => onButtonPress(newBudget)}
          disabled={newBudget === 0}
        />
      </View>
    );
  }
}
