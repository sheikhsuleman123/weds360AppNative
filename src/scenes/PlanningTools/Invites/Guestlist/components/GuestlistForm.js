import React from 'react';
import { TouchableOpacity, Animated, Text, View, Button } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import DatePicker from 'react-native-datepicker';
import { CheckBox } from 'react-native-elements';
import EStyleSheet from 'react-native-extended-stylesheet';
import ColoredButton from '@components/ColoredButton';
import OutlineTextInput from '@components/OutlineTextInput';
import { GuestlistFormStyles } from './StyleSheet';
import I18n from '@i18n';

const mainPath = 'planning_tools.general.text.';
const guestlistCreatePath = 'planning_tools.guestlist.text.create.';

export default class GuestlistForm extends React.Component {
  constructor(props) {
    super();
    const { edit, data } = props;

    if (edit && data) {
      const { attributes } = data;
      const { name, location, date, display_on_wedding_website, allow_rsvp } = attributes;

      this.state = {
        name: name || '',
        location: location || '',
        date: date || '',
        onWebsite: display_on_wedding_website || false,
        rsvp: allow_rsvp || false
      };
    } else {
      this.state = {
        name: '',
        location: '',
        date: '',
        onWebsite: false,
        rsvp: false
      };
    }
  }

  render() {
    const { state } = this;
    const { name, location, date } = state;
    return (
      <Animatable.View animation={'fadeIn'} style={this.props.style}>
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
              justifyContent: 'center',
              alignItems: 'center',
              ...this.props.headerStyle
            }}
          >
            <Text
              style={[
                GuestlistFormStyles.headerTextStyle,
                {
                  ...this.props.headerTextStyle
                }
              ]}
            >
              {this.props.headerText}
            </Text>

            <Icon
              onPress={this.props.onClosePress}
              style={{ fontSize: 30 }}
              name="ios-close-outline"
            />
          </View>
        </TouchableOpacity>
        <View>
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
                width: '50%',
                marginLeft: '20%',
                marginTop: '0%'
              }}
              inputStyle={EStyleSheet.flatten(GuestlistFormStyles.lightText)}
              placeholder={I18n.t(`${guestlistCreatePath}event_name`)}
              onChangeText={text => {
                this.setState({
                  name: text
                });
              }}
              value={name}
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
                width: '50%',
                marginLeft: '20%',
                marginTop: '0%'
              }}
              inputStyle={EStyleSheet.flatten(GuestlistFormStyles.lightText)}
              placeholder={I18n.t(`${guestlistCreatePath}event_location`)}
              onChangeText={text => {
                this.setState({
                  location: text
                });
              }}
              value={location}
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
            <DatePicker
              style={{
                justifyContent: 'center',
                height: '80%',
                width: '50%',
                marginLeft: '20%',
                marginTop: '0%',
                backgroundColor: 'white'
              }}
              date={date}
              mode="date"
              minDate={new Date()}
              placeholder={I18n.t(`${guestlistCreatePath}select_date`)}
              placeholderTextColor={'rgb(36, 36, 36)'}
              format="YYYY-MM-DD"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              showIcon={false}
              customStyles={{
                placeholderText: {
                  letterSpacing: 1,
                  fontFamily: 'Lato-Light',
                  backgroundColor: '#ffffff',
                  fontSize: 13,
                  margin: 7
                },
                dateInput: {
                  backgroundColor: '#ffffff',
                  height: '75%'
                }
              }}
              onDateChange={date => {
                this.setState({
                  date
                });
              }}
            />
          </View>
          <View
            style={{
              backgroundColor: '#ebebeb',
              height: 60,
              flexDirection: 'row',
              alignItems: 'center',
              borderBottomWidth: 1,
              borderColor: '#ffffff'
            }}
          >
            <CheckBox
              title={I18n.t(`${guestlistCreatePath}show_on_website`)}
              checked={this.state.onWebsite}
              onIconPress={() => {
                this.setState({
                  onWebsite: !this.state.onWebsite
                });
              }}
              onPress={() => {
                this.setState({
                  onWebsite: !this.state.onWebsite
                });
              }}
              textStyle={{ fontFamily: 'Lato-Italic', fontSize: 12 }}
              containerStyle={{
                borderWidth: 1,
                justifyContent: 'center',
                height: '80%',
                width: '50%',
                marginLeft: '20%',
                marginTop: '0%'
              }}
            />
          </View>
          <View
            style={{
              backgroundColor: '#ebebeb',
              height: 60,
              flexDirection: 'row',
              alignItems: 'center',
              borderBottomWidth: 1,
              borderColor: '#ffffff'
            }}
          >
            <CheckBox
              title={I18n.t(`${guestlistCreatePath}allow_rsvp`)}
              checked={this.state.rsvp}
              onIconPress={() => {
                this.setState({
                  rsvp: !this.state.rsvp
                });
              }}
              onPress={() => {
                this.setState({
                  rsvp: !this.state.rsvp
                });
              }}
              textStyle={{ fontFamily: 'Lato-Italic', fontSize: 12 }}
              containerStyle={{
                borderWidth: 1,
                justifyContent: 'center',
                height: '80%',
                width: '50%',
                marginLeft: '20%',
                marginTop: '0%'
              }}
            />
          </View>
          <ColoredButton
            text={
              this.props.edit
                ? I18n.t(`${guestlistCreatePath}update`)
                : I18n.t(`${guestlistCreatePath}save`)
            }
            containerStyle={{
              backgroundColor: '#005555',
              justifyContent: 'center',
              marginLeft: '20%',
              width: '19%',
              marginTop: 4,
              borderRadius: 5,
              borderWidth: 0,
              height: 30,
              marginBottom: 4
            }}
            onPress={() => {
              const { name, location, date, onWebsite, rsvp } = this.state;
              this.props.onSavePress(name, location, date, onWebsite, rsvp);
            }}
          />
        </View>
      </Animatable.View>
    );
  }
}
