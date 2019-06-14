import React from 'react';
import { Animated, TouchableOpacity, Text, TextInput, View, Alert } from 'react-native';
import { CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import ColoredButton from '@components/ColoredButton';
import AdaptiveView from '@components/AdaptiveView';
import { ChecklistRowStyles } from './StyleSheet';
import I18n from '@i18n';

const mainPath = 'planning_tools.general.text.';
const checklistPath = 'planning_tools.checklist.text.';

export default class ChecklistRow extends React.Component {
  constructor() {
    super();
    this._height = new Animated.Value(0);
    this.state = {
      note: null
    };
  }
  saveContent = () => {
    Animated.sequence([
      Animated.timing(this._height, {
        toValue: this._height._value === 120 ? 0 : 120
      })
    ]).start();
  };
  render() {
    return (
      <AdaptiveView style={{ margin: 2 }}>
        <View>
          <CheckBox
            component={View}
            onPress={this.props.onIconPress}
            title={`${this.props.item.title}`}
            checked={this.props.checked}
            onIconPress={this.props.onIconPress}
            textStyle={ChecklistRowStyles.checkBoxTextStyle}
            titleProps={ChecklistRowStyles.checkBoxTitleStyle}
            containerStyle={ChecklistRowStyles.checkBoxStyle}
          />
          <View
            style={{
              flexDirection: 'row',
              position: 'absolute',
              right: '6%',
              top: '28%',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <TouchableOpacity
              onPress={() => {
                this.setState({
                  showEdit: this._height._value === 0
                });
                this.saveContent();
              }}
            >
              <Icon style={{ fontSize: 28 }} name="ellipsis-h" />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginLeft: 17 }}
              onPress={() => {
                Alert.alert(
                  I18n.t(`${mainPath}delete`),
                  I18n.t(`${mainPath}delete_confirm`),
                  [
                    {
                      text: I18n.t(`${mainPath}delete`),
                      onPress: () => {
                        this.props.onDeletePress();
                      }
                    },
                    { text: I18n.t(`${mainPath}cancel`), style: 'cancel' }
                  ],
                  { cancelable: false }
                );
              }}
            >
              <Icon style={{ fontSize: 28 }} name="trash" />
            </TouchableOpacity>
          </View>
        </View>
        <Animated.View
          style={{
            backgroundColor: '#ebebeb',
            height: this._height,
            width: '93%',
            borderRadius: 3,
            alignSelf: 'center',
            zIndex: -1
          }}
        >
          {this.state.showEdit ? (
            <View>
              <Text style={ChecklistRowStyles.descriptionTextStyle}>
                {this.props.item.description}
              </Text>
              <TextInput
                style={ChecklistRowStyles.textInputStyle}
                multiline
                underlineColorAndroid="rgba(0,0,0,0)"
                placeholder={I18n.t(`${checklistPath}note`)}
                onChangeText={text => {
                  this.setState({
                    note: text
                  });
                }}
                value={this.state.note !== null ? this.state.note : this.props.item.note}
              />
              {this.state.showEdit && (
                <ColoredButton
                  text={I18n.t(`${checklistPath}save_note`)}
                  onPress={() => {
                    if (this.state.note !== this.props.item.note) {
                      this.props.onSavePress(this.state.note);
                    }
                    this.setState({
                      showEdit: this._height._value === 0
                    });
                    Animated.sequence([
                      Animated.timing(this._height, {
                        toValue: this._height._value === 120 ? 0 : 120
                      })
                    ]).start();
                  }}
                  containerStyle={{
                    backgroundColor: '#004d45',
                    justifyContent: 'center',
                    width: '30%',
                    borderWidth: 0,
                    alignSelf: 'center',
                    borderRadius: 2,
                    padding: 0,
                    height: 20,
                    marginTop: 10
                  }}
                />
              )}
            </View>
          ) : null}
        </Animated.View>
      </AdaptiveView>
    );
  }
}
