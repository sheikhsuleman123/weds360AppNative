import React from 'react';
import { TouchableOpacity, Image, ActivityIndicator, Text, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import ModalDropdown from 'react-native-modal-dropdown';
import ColoredButton from '@components/ColoredButton';
import OutlineTextInput from '@components/OutlineTextInput';
import { PlanningEditorStyles } from './StyleSheet';
import I18n from '@i18n';

const mainPath = 'planning_tools.general.text.';
const budgeterCreatePath = 'planning_tools.budgeter.text.create.';

export default class PlanningEditor extends React.Component {
  constructor() {
    super();
    this.state = {
      keyboardShown: false,
      position: 46,
      modalShown: false,
      title: '',
      description: '',
      amountSpent: '',
      notes: ''
    };
  }

  componentWillMount() {
    if (this.props.item) {
      this.setState({
        amountSpent: `${this.props.item.amount_spent}`,
        notes: this.props.item.note,
        serviceId: this.props.item.service_id
      });
    }
  }

  render() {
    return (
      <Animatable.View animation="fadeIn">
        <TouchableOpacity
          onPress={this.props.onClosePress}
          activeOpacity={this.props.activeOpacity}
          style={{
            zIndex: 1,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <View
            style={{
              backgroundColor: '#ffffff',
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              ...this.props.headerStyle
            }}
          >
            <Text
              style={[
                PlanningEditorStyles.headerTextStyle,
                {
                  ...this.props.headerTextStyle
                }
              ]}
            >
              {this.props.headerText}
            </Text>

            <Icon
              onPress={this.props.onClosePress}
              style={{
                fontSize: 30,
                color: this.props.isCreate ? 'rgb(0, 105, 99)' : 'white',
                width: '10%',
                alignSelf: 'center'
              }}
              name="ios-close-outline"
            />
          </View>
        </TouchableOpacity>
        {!this.props.isCreate ? (
          <View
            style={{
              backgroundColor: '#ebebeb'
            }}
          >
            <View
              style={{
                backgroundColor: '#ebebeb',
                maxHeight: 40,
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                borderBottomWidth: 1,
                borderColor: '#ffffff'
              }}
            >
              <Text style={PlanningEditorStyles.descriptionTextStyle}>
                {this.props.item.description}
              </Text>
            </View>

            <View
              style={{
                backgroundColor: '#ebebeb',
                height: 40,
                flexDirection: 'row',
                alignItems: 'center',
                borderBottomWidth: 1,
                borderColor: '#ffffff'
              }}
            >
              <Image
                source={require('@assets/images/tools-budgeter.png')}
                style={{ width: 25, marginLeft: '5%' }}
                resizeMode={'contain'}
              />
              <OutlineTextInput
                style={{
                  height: '80%',
                  width: '50%',
                  marginLeft: '8%',
                  marginTop: '0%'
                }}
                inputStyle={EStyleSheet.flatten(PlanningEditorStyles.lightText)}
                placeholder={I18n.t(`${mainPath}amount_spent`)}
                keyboardType={'numeric'}
                returnKeyType="done"
                onChangeText={text => {
                  this.setState({
                    amountSpent: text
                  });
                }}
                keyboardType={'numeric'}
                returnKeyType="done"
                value={this.state.amountSpent}
              />
            </View>
            <View
              style={{
                backgroundColor: '#ebebeb',
                height: 40,
                flexDirection: 'row',
                alignItems: 'center',
                borderBottomWidth: 1,
                borderColor: '#ffffff'
              }}
            >
              <Image
                source={require('@assets/images/venue_budg.png')}
                style={{ width: 25, marginLeft: '5%' }}
                resizeMode={'contain'}
              />
              <View
                style={{
                  width: '80%',
                  height: 40,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <ModalDropdown
                  options={this.props.servicesNames.map(item => item.name)}
                  style={{ width: '100%', marginLeft: '20%' }}
                  textStyle={PlanningEditorStyles.lightText}
                  dropdownStyle={{ borderRadius: 4, width: '50%' }}
                  dropdownTextStyle={PlanningEditorStyles.lightText}
                  defaultIndex={parseInt(this.state.serviceId, 10)}
                  defaultValue={
                    (
                      this.props.servicesNames.find(
                        item => parseInt(item.id, 10) === this.state.serviceId
                      ) || { name: 'none' }
                    ).name
                  }
                  onSelect={index => {
                    this.setState({
                      indexSelected: index,
                      serviceId: this.props.servicesNames[index].id
                    });
                  }}
                />
              </View>
            </View>
            <View
              style={{
                backgroundColor: '#ebebeb',
                height: 50,
                flexDirection: 'row',
                alignItems: 'center',
                borderBottomWidth: 1,
                borderColor: '#ffffff'
              }}
            >
              <Image
                source={require('@assets/checklist.png')}
                style={{ width: 25, marginLeft: '5%' }}
                resizeMode={'contain'}
              />
              <OutlineTextInput
                style={{
                  height: '80%',
                  marginLeft: '8%',
                  width: '50%',
                  marginTop: '0%'
                }}
                inputStyle={{
                  ...EStyleSheet.flatten(PlanningEditorStyles.lightText),
                  height: '100%'
                }}
                placeholder={I18n.t(`${mainPath}leave_notes`)}
                onChangeText={text => {
                  this.setState({
                    notes: text
                  });
                }}
                value={this.state.notes}
              />
            </View>

            <ColoredButton
              text={I18n.t(`${mainPath}edit`)}
              containerStyle={{
                backgroundColor: '#005555',
                justifyContent: 'center',
                marginLeft: '20%',
                width: '17%',
                marginTop: 8,
                borderRadius: 5,
                borderWidth: 0,
                height: 25,
                marginBottom: 8,
                padding: 0
              }}
              onPress={() => {
                this.props.onSavePress(
                  this.state.amountSpent,
                  this.state.notes,
                  this.state.serviceId
                );
              }}
            />
          </View>
        ) : (
          <View style={{ backgroundColor: '#ebebeb' }}>
            <View
              style={{
                backgroundColor: '#ebebeb',
                flexDirection: 'row',
                alignItems: 'center',
                borderBottomWidth: 1,
                borderColor: '#ffffff',
                height: 40
              }}
            >
              <OutlineTextInput
                style={{
                  height: '80%',
                  width: '80%',
                  marginLeft: '8%',
                  marginTop: '0%',
                  backgroundColor: 'white'
                }}
                inputStyle={EStyleSheet.flatten(PlanningEditorStyles.lightText)}
                placeholder={I18n.t(`${budgeterCreatePath}title`)}
                onChangeText={text => {
                  this.setState({
                    title: text
                  });
                }}
              />
            </View>
            <View
              style={{
                backgroundColor: '#ebebeb',
                height: 40,
                flexDirection: 'row',
                alignItems: 'center',
                borderBottomWidth: 1,
                borderColor: '#ffffff'
              }}
            >
              <OutlineTextInput
                style={{
                  height: '80%',
                  width: '80%',
                  marginLeft: '8%',
                  marginTop: '0%'
                }}
                inputStyle={EStyleSheet.flatten(PlanningEditorStyles.lightText)}
                placeholder={I18n.t(`${budgeterCreatePath}description`)}
                onChangeText={text => {
                  this.setState({
                    description: text
                  });
                }}
              />
            </View>
            {this.props.checklist ? null : (
              <View
                style={{
                  backgroundColor: '#ebebeb',
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderBottomWidth: 1,
                  borderColor: '#ffffff',
                  height: 40
                }}
              >
                <OutlineTextInput
                  style={{
                    height: '80%',
                    width: '80%',
                    marginLeft: '8%',
                    marginTop: '0%',
                    backgroundColor: 'white'
                  }}
                  inputStyle={EStyleSheet.flatten(PlanningEditorStyles.lightText)}
                  placeholder={I18n.t(`${budgeterCreatePath}amount`)}
                  keyboardType={'numeric'}
                  returnKeyType="done"
                  onChangeText={text => {
                    this.setState({
                      amount: text
                    });
                  }}
                />
              </View>
            )}
            <ColoredButton
              text={I18n.t(`${budgeterCreatePath}save`)}
              containerStyle={{
                backgroundColor: '#005555',
                justifyContent: 'center',
                alignSelf: 'center',
                width: '17%',
                margin: 8,
                borderRadius: 5,
                height: 25,
                padding: 0
              }}
              textStyle={{ fontSize: 14, fontFamily: 'Lato-Light' }}
              onPress={() => {
                if (this.props.checklist) {
                  this.props.onSavePress(this.state.title, this.state.description);
                } else {
                  this.props.onSavePress(
                    this.state.title,
                    this.state.description,
                    this.state.amount
                  );
                }
              }}
            />
          </View>
        )}
      </Animatable.View>
    );
  }
}
