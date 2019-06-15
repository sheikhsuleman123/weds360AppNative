import React from 'react';
import { ActivityIndicator, View, Alert, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux';
import { ImagePicker, Permissions } from 'expo';
import EditProfileScreen from './components/EditProfileScreen';
import * as EditProfileActions from '../../scenes/Homescreen/actions';
import * as AuthenticationActions from '../../scenes/Authentication/actions';
import store from '../../../store';
import { english, arabic } from '../../scenes/LanguageSelect/actions';

class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      full_name: this.props.profile.attributes.profile.data.attributes.full_name,
      fiance_full_name: this.props.profile.attributes.profile.data.attributes.fiance_full_name,
      venue: this.props.profile.attributes.profile.data.attributes.venue,
      number_of_guests: this.props.profile.attributes.profile.data.attributes.number_of_guests,
      budget: this.props.profile.attributes.profile.data.attributes.budget,
      wedding_date: this.props.profile.attributes.profile.data.attributes.wedding_date,
      dob: this.props.profile.attributes.profile.data.attributes.dob,
      partner_dob: this.props.profile.attributes.profile.data.attributes.partner_dob,
      phone_number: this.props.profile.attributes.profile.data.attributes.phone_number,
      partner_phone_number: this.props.profile.attributes.profile.data.attributes
        .partner_phone_number,
      image: null
    };
    this._pickImage = this._pickImage.bind(this);
  }

  async _pickImage() {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      mediaTypes: 'Images'
    });
    try {
      if (!result.cancelled) {
        this.setState({ image: result });
      }
    } catch (e) {}
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <EditProfileScreen
          role={this.props.profile.attributes.role}
          language={this.props.language}
          profile={this.props.profile}
          isEditing={this.props.isEditing}
          image={this.state.image}
          handleProfileReset={this.props.handleProfileReset}
          homescreenReset={this.props.homescreenReset}
          onFullNameChange={full_name => {
            this.setState({
              full_name
            });
          }}
          onFianceNameChange={fiance_full_name => {
            this.setState({
              fiance_full_name
            });
          }}
          onVenueChange={venue => {
            this.setState({
              venue
            });
          }}
          onNumberOfGuestsChange={number_of_guests => {
            this.setState({
              number_of_guests
            });
          }}
          onBudgetChange={budget => {
            this.setState({
              budget
            });
          }}
          onWeddingDateChange={wedding_date => {
            this.setState({
              wedding_date
            });
          }}
          onPhoneNumberChange={number =>
            this.setState({
              phone_number: number
            })
          }
          onPartnerPhoneNumberChange={number =>
            this.setState({
              partner_phone_number: number
            })
          }
          onDOBChange={date => this.setState({ dob: date })}
          onPartnerDOBChange={date => this.setState({ partner_dob: date })}
          wedding_date={this.state.wedding_date}
          dob={this.state.dob}
          partner_dob={this.state.partner_dob}
          onChangeImagePress={this._pickImage}
          refresh={refresh =>
            this.setState({
              refresh
            })
          }
          onValueChange={async language => {
            AsyncStorage.setItem('lang', language);
            if (language === 'ar') {
              this.setState({ refresh: true });
              store.dispatch(english());
              // this.setState({ refresh: false });
            } else {
              this.setState({ refresh: true });
              store.dispatch(arabic());
              // this.setState({ refresh: false });
            }
          }}
          onDonePress={async () => {
            await this.props.profileUpdate(this.state);
            if (this.props.profile) {
              Actions.tabscreens();
            } else {
              Alert.alert('Request Unsuccessful', 'Please contact the admin for this issue.');
            }
          }}
        />
        {this.state.refresh ? (
          <View
            style={{
              position: 'absolute',
              zIndex: 5,
              height: '100%',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(0,0,0,0.5)'
            }}
          >
            <ActivityIndicator size="large" color="white" />
          </View>
        ) : null}
      </View>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    isEditing: state.homescreenReducer.isEditing,
    ...state.languageReducer
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign(AuthenticationActions, EditProfileActions), dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditProfile);
