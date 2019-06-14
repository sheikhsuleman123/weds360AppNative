import React from 'react';
import { Text, View } from 'react-native';
import ProgressCircle from 'react-native-progress-circle';
import OutlineTextInput from '@components/OutlineTextInput';
import { CustomHeaderStyles } from './StyleSheet';
import I18n from '@i18n';

const budgeterPath = 'planning_tools.budgeter.text.';

class CustomHeader extends React.Component {
  render() {
    const {
      editingView,
      budget,
      child,
      belowProgress,
      header,
      description,
      actionButton
    } = this.props;
    return (
      <View>
        <View style={{ flexDirection: 'row', padding: '3%' }}>
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <ProgressCircle
              percent={this.props.percentage}
              radius={40}
              borderWidth={8}
              color="#004d45"
              shadowColor="#e1e1e1"
              bgColor="#fff"
            >
              <View
                style={{
                  height: '100%',
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {child}
              </View>
            </ProgressCircle>
            <Text style={CustomHeaderStyles.belowProgress}>{belowProgress}</Text>
            {actionButton}
          </View>
          <View style={{ flexDirection: 'column', width: '70%', marginLeft: '3%' }}>
            <Text style={CustomHeaderStyles.headerStyle}>{header}</Text>
            {editingView ? (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={CustomHeaderStyles.budgetPreviewStyle}>
                  {I18n.t(`${budgeterPath}budget`)}:
                </Text>
                <OutlineTextInput
                  style={{
                    marginLeft: '8%'
                  }}
                  keyboardType={'numeric'}
                  returnKeyType="done"
                  placeholder={I18n.t(`${budgeterPath}enter_budget`)}
                  onChangeText={this.props.onBudgetValueEdit}
                  value={`${budget}`}
                />
              </View>
            ) : (
              <Text style={CustomHeaderStyles.descriptionStyle}>{description}</Text>
            )}
          </View>
        </View>
      </View>
    );
  }
}
export default CustomHeader;
