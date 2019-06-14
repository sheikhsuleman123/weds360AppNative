import React from 'react';
import { Text, ActivityIndicator, View, FlatList, KeyboardAvoidingView } from 'react-native';
import CustomModal from '../../components/CustomModal';
import CustomHeader from '../../components/CustomHeader';
import TableHeader from '../../components/TableHeader';
import SwiperRow from '../../components/SwiperRow';
import ErrorModal from '@components/ErrorModal';
import ColoredButton from '@components/ColoredButton';
import { BudgeterScreenStyles } from './StyleSheet';
import I18n from '@i18n';

const budgeterPath = 'planning_tools.budgeter.text.';

export default class BudgeterScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedEditView: -1,
      isVisible: false,
      modifyBudget: false
    };
  }

  calculateNumeral = number => {
    let string = '';
    let numeral = number;
    while (numeral >= 1000) {
      if (numeral >= 1000000) {
        string += 'm';
        numeral /= 1000000;
      }
      if (numeral >= 1000) {
        string += 'K';
        numeral /= 1000;
      }
    }
    return `${Math.round(numeral * 10) / 10}${string}`;
  };
  render() {
    const {
      language,
      percentage,
      budget,
      spent,
      isFetching,
      budgetersData,
      resetBudgeterStatus,
      error,
      budgeterCreate,
      allServices,
      budgeterUpdate,
      budgeterDelete,
      setUserBudget,
      servicesNames
    } = this.props;
    return (
      <View style={{ flex: 1, width: '100%' }}>
        <View style={{ height: '30%' }}>
          <CustomHeader
            editingView={this.state.modifyBudget}
            percentage={percentage}
            budget={this.state.newBudget !== undefined ? this.state.newBudget : budget}
            header={I18n.t(`${budgeterPath}header`)}
            belowProgress={`${I18n.t(`${budgeterPath}of`)} ${this.calculateNumeral(budget || 0)}`}
            description={I18n.t(`${budgeterPath}description`)}
            onBudgetValueEdit={text => this.setState({ newBudget: text })}
            child={
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: language === 'ar' ? 'Tajawal-Bold' : 'Lato-Bold',
                  color: '#004d45'
                }}
              >
                {`${this.calculateNumeral(spent)}`}
              </Text>
            }
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '91%',
              alignSelf: 'center'
            }}
          >
            <ColoredButton
              text={I18n.t(`${budgeterPath}add_item`)}
              onPress={() => {
                this.setState({
                  isVisible: true
                });
              }}
              containerStyle={{
                backgroundColor: '#004d45',
                justifyContent: 'center',
                width: 70,
                borderWidth: 0,
                borderRadius: 2,
                padding: 0
              }}
              textStyle={{
                fontSize: 12
              }}
            />
            {spent - budget > 0 ? (
              <Text
                style={{
                  fontFamily: 'Lato-Light',
                  fontSize: 10,
                  color: 'rgb(219, 60, 60)',
                  width: '50%',
                  textAlign: 'center'
                }}
              >
                {I18n.t(`${budgeterPath}overflow_budget`)} {this.calculateNumeral(spent - budget)}
              </Text>
            ) : null}
            <ColoredButton
              text={
                this.state.modifyBudget
                  ? I18n.t(`${budgeterPath}submit_budget`)
                  : I18n.t(`${budgeterPath}modify_budget`)
              }
              onPress={() => {
                if (this.state.modifyBudget) {
                  if (this.state.newBudget && this.state.newBudget !== budget) {
                    setUserBudget(this.state.newBudget);
                  }
                  this.setState({ modifyBudget: false });
                } else {
                  this.setState({ modifyBudget: true });
                }
              }}
              containerStyle={{
                backgroundColor: '#004d45',
                justifyContent: 'center',
                width: 70,
                borderWidth: 0,
                borderRadius: 2,
                padding: 2,
                marginLeft: '3%'
              }}
              textStyle={{
                fontSize: 12
              }}
            />
          </View>
        </View>
        <Text style={BudgeterScreenStyles.guideStyle}>{I18n.t(`${budgeterPath}swipe_guide`)}</Text>
        <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }} keyboardVerticalOffset={65}>
          <TableHeader language={language} style={{ marginTop: 7, height: 25 }} />
          {isFetching ? (
            <ActivityIndicator
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
              }}
              size="large"
              color="#003430"
            />
          ) : (
            <FlatList
              data={budgetersData}
              keyExtractor={(item, index) => `${index}`}
              extraData={this.state.selectedEditView}
              style={{ height: '100%' }}
              renderItem={item => (
                <SwiperRow
                  calculateNumeral={this.calculateNumeral}
                  servicesNames={servicesNames}
                  disabled={!servicesNames}
                  allServices={allServices}
                  rowData={item.item.attributes}
                  index={item.index}
                  editView={this.state.selectedEditView === item.index}
                  openView={() => {
                    this.setState({
                      selectedEditView: item.index
                    });
                  }}
                  closeView={() => {
                    this.setState({ selectedEditView: -1 });
                  }}
                  onSavePress={(amount, notes, serviceId) => {
                    this.setState({ selectedEditView: -1 });
                    budgeterUpdate(item.item.id, amount, notes, parseInt(serviceId, 10));
                  }}
                  onDeletePress={() => {
                    budgeterDelete(item.item.id);
                  }}
                />
              )}
            />
          )}
        </KeyboardAvoidingView>
        <CustomModal
          isCreate
          isVisible={this.state.isVisible}
          headerText={I18n.t(`${budgeterPath}create_budget_item`)}
          onBackdropPress={() => {
            this.setState({ isVisible: false });
          }}
          onClosePress={() => {
            this.setState({ isVisible: false });
          }}
          onSavePress={(title, description, amount) => {
            this.setState({ isVisible: false });
            budgeterCreate(title, description, amount);
          }}
        />
        {
          <ErrorModal
            isVisible={!!error}
            hideModal={resetBudgeterStatus}
            errors={error && error.errors}
          />
        }
      </View>
    );
  }
}
