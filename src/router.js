import React from 'react';
import { AsyncStorage, Alert, Image, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Scene, Router, Reducer, Stack, Actions, Modal, Tabs } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import * as AuthenticationActions from './scenes/Authentication/actions';
import StartScreen from './components/StartScreen';

import Signup from './scenes/Authentication/Signup';
import Login from './scenes/Authentication/Signin';

import TabScreens from './containers/TabScreens';

import ForgotPassword from './scenes/ForgotPassword';
import ChangePassword from './scenes/ChangePassword';
import ArticleSingle from './scenes/Posts/ArticleSingle';
import ImageSingle from './scenes/Inspiration/components/ImageSingle';
import Contacts from './scenes/Contacts';

import Budgeter from './scenes/PlanningTools/Budgeter';
import Registry from './scenes/PlanningTools/Registry';
import Guestlist from './scenes/PlanningTools/Invites/Guestlist';
import Checklist from './scenes/PlanningTools/Checklist';
import EventsScreen from './scenes/PlanningTools/Invites/Events';
import SingleEvent from './scenes/PlanningTools/Invites/SingleEvent';
import Categories from './scenes/Categories';

import Proposal from './scenes/Proposal';

import LanguageSelect from './scenes/LanguageSelect';

import Questions from './scenes/Authentication/QuestionsF';
import QuestionsN from './scenes/Authentication/QuestionsS';
import VenueRejected from './scenes/Authentication/VenueRejected';
import VenueAccepted from './scenes/Authentication/VenueAccepted';

import DressesScreen from './scenes/Categories/Dresses';
import RingsScreen from './scenes/Categories/Rings';

import DressSingleScreen from './scenes/Categories/Dresses/components/DressSingleScreen';
import RingSingleScreen from './scenes/Categories/Rings/components/RingSingleScreen';

import YourVendorsList from './scenes/YourVendors/components/YourVendorsList';

import EditProfile from './scenes/EditProfile';

import ConversationSingle from './scenes/Messages/ConversationSingle';
import NewConversation from './scenes/Messages/NewConversation';

import Services from './scenes/Categories/Services';

import Venue from './scenes/Authentication/Venue';

import VendorProfile from './containers/VendorProfile';
import FullScreenImage from './components/FullScreenImage';

import I18n from './i18n';

const reducerCreate = params => {
  const defaultReducer = new Reducer(params);
  return (state, action) => defaultReducer(state, action);
};

const getSceneStyle = () => ({
  backgroundColor: '#FFFFFF',
  shadowOpacity: 1,
  shadowRadius: 3
});

const iconPicker = ({ key, focused }) => {
  let image;
  let style;
  switch (key) {
    case 'home_tab':
      image = require('../assets/icons/home.png');
      style = { width: 25, height: 25, marginBottom: 0 };

      break;
    case 'categories_tab':
      image = require('../assets/icons/planning.png');
      style = { width: 25, height: 25, marginBottom: 0 };
      break;
    case 'planning_tab':
      image = require('../assets/icons/planner.png');
      style = { width: 25, height: 25, marginBottom: 0 };
      break;
    case 'articles_tab':
      image = require('../assets/icons/articles.png');
      style = { width: 25, height: 25, marginBottom: 0 };
      break;
    case 'inspirations_tab':
      image = require('../assets/icons/inspiration.png');
      style = { width: 25, height: 25, marginBottom: 0 };
      break;
    default:
      image = null;
      style = { height: 0, width: 0 };
      break;
  }
  return <Image source={image} style={style} resizeMode={'contain'} />;
};

class MainRouter extends React.Component {
  constructor(props) {
    super();
  }

  logOut = async fail => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('lang');
    this.props.handleProfileReset();
    if (!fail) Alert.alert('Error', "Please use the vendor's app to login.");
    Actions.reset('language_select', {});
  };

  onBackPress = () => {
    if (Actions.currentScene === 'tabscreens') {
      Alert.alert('', 'Are you sure you want to sign out?', [
        {
          text: 'Signout',
          onPress: () => this.logOut(true)
        },
        { text: 'Cancel', onPress: () => {} }
      ]);
    } else {
      Actions.pop();
    }
    return true;
  };

  render() {
    const { token, language } = this.props;
    I18n.locale = `${language}`;
    EStyleSheet.clearCache();

    let styling = {
      $light: 'Tajawal-Light',
      $medium: 'Tajawal-Bold',
      $black: 'Tajawal-Black',
      $italic: 'Tajawal-Light'
    };
    if (language === 'en') {
      styling = {
        $light: 'Lato-Light',
        $medium: 'Lato-Bold',
        $black: 'Lato-Black',
        $italic: 'Lato-Italic'
      };
    }
    EStyleSheet.build({ $outline: 0, $language: language, ...styling });
    return (
      <Router
        createReducer={reducerCreate}
        getSceneStyle={getSceneStyle}
        backAndroidHandler={this.onBackPress}
      >
        <Stack hideNavBar key="root" titleStyle={{ alignSelf: 'center' }}>
          <Scene
            key="language_select"
            initial={language === null || language === undefined}
            component={LanguageSelect}
          />
          <Scene key="start" component={StartScreen} />
          <Scene key="questions" component={Questions} />
          <Scene key="questions_n" component={QuestionsN} />
          <Scene key="questions_venue" component={Venue} />
          <Scene key="questions_venue_yes" component={VenueAccepted} />
          <Scene key="questions_venue_no" component={VenueRejected} />
          <Scene key="proposal" component={Proposal} />
          <Scene key="signup" component={Signup} title="signup" />
          <Scene key="login" component={Login} />
          <Scene key="forgot_password" component={ForgotPassword} />
          <Scene key="contacts" component={Contacts} />
          {/*Tab screens implemented using a TabNavigator due to
							 'react-native-router-flux' is not stable
							 and it makes the icons disappear*/}
          <Scene
            key="tabscreens"
            component={TabScreens}
            panHandlers={null}
            initial={token !== undefined && token !== null}
          />
          <Scene key="chat" component={ConversationSingle} />
          <Scene key="categories_screens" component={Categories} />
          <Scene key="articles_single_screen" component={ArticleSingle} />
          <Scene key="image_single" component={ImageSingle} />
          <Scene key="dresses" component={DressesScreen} />
          <Scene key="rings" component={RingsScreen} />
          <Scene key="dress_single" component={DressSingleScreen} />
          <Scene key="ring_single" component={RingSingleScreen} />
          <Scene key="vendor_profile" component={VendorProfile} />
          <Scene key="services" component={Services} />
          <Scene key="single_event" component={SingleEvent} />
          <Scene key="your_vendors_list" component={YourVendorsList} />
          <Scene key="budgeter" component={Budgeter} />
          <Scene key="new_message" component={NewConversation} />
          <Scene key="checklist" component={Checklist} />
          <Scene key="registry" component={Registry} />
          <Scene key="guestlist" component={Guestlist} />
          <Scene key="edit_profile" component={EditProfile} />
          <Scene key="events" component={EventsScreen} />
          <Scene key="change_password" component={ChangePassword} />
          <Modal key="full_screen_image" component={FullScreenImage} />
        </Stack>
      </Router>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    isFetching: state.authenticationReducer.isFetching,
    authenticated: state.authenticationReducer.authenticated,
    ...state.languageReducer
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(AuthenticationActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainRouter);
