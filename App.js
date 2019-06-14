import React from 'react';
import {
  AsyncStorage,
  AppRegistry,
  Text,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { Font, Asset } from 'expo';
import { Provider } from 'react-redux';
import store from './store';
import MainRouter from './src/router';
import Loader from './src/components/Loader';
import { setLanguage } from './src/scenes/LanguageSelect/actions';
import { storeToken } from './src/actions';
import Notifications from './src/utils/Notifications';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      fontLoaded: false,
      imagesLoaded: false,
      loaderOnline: false,
      loaderDone: false
    };
    this.checkUserSignedIn = this.checkUserSignedIn.bind(this);
    this.setLanguage = this.setLanguage.bind(this);
  }

  async componentWillMount() {
    StatusBar.setHidden(true);
    // Notifications.initialLoad();
    // Notifications.setListeners();
    this.setState({ loadingElement: 'Fonts' });
    await Font.loadAsync({
      'Lato-Black': require('./assets/fonts/Lato-Black.ttf'),
      'Lato-Bold': require('./assets/fonts/Lato-Bold.ttf'),
      'Lato-Light': require('./assets/fonts/Lato-Light.ttf'),
      'Lato-Regular': require('./assets/fonts/Lato-Regular.ttf'),
      'Lato-Italic': require('./assets/fonts/Lato-Italic.ttf'),
      'Tajawal-Light': require('./assets/fonts/Tajawal-Light.ttf'),
      'Tajawal-Black': require('./assets/fonts/Tajawal-Black.ttf'),
      'Tajawal-Bold': require('./assets/fonts/Tajawal-Bold.ttf')
    });
    await Asset.loadAsync([
      require('./assets/images/wed1.jpg'),
      require('./assets/images/wed2.jpg'),
      require('./assets/images/wed3.jpg'),
      require('./assets/images/wed4.jpg')
    ]);
    this.setState({ loaderOnline: true, loadingElement: 'Assets' });
    await Asset.loadAsync([
      require('./assets/images/start_screen1.png'),
      require('./assets/images/start_screen2.png'),
      require('./assets/images/start_screen3.png'),
      require('./assets/hometab.png'),
      require('./assets/planningtab.png'),
      require('./assets/vendorstab.png'),
      require('./assets/gueststab.png'),
      require('./assets/weddingwebsitetab.png'),
      require('./assets/icons/articles.png'),
      require('./assets/icons/planning.png'),
      require('./assets/icons/planner.png'),
      require('./assets/icons/articles.png'),
      require('./assets/icons/inspiration.png')
      /*Loading 25% of the assets only.*/

      // require('./assets/images/amount_spent.png'),
      // require('./assets/images/venue_budg.png'),
      // require('./assets/images/vert_buttlets.png'),
      // require('./assets/images/clip_checklist.png'),
      // require('./assets/images/planning.png'),
      // require('./assets/checklist.png'),
      // require('./assets/openMessage.png'),
      // require('./assets/newmsg.png'),
      // require('./assets/find.png'),
      // require('./assets/inspiration.png'),
      // require('./assets/weds360.png'),
      // require('./assets/background.png'),
      // require('./assets/up.png'),
      // require('./assets/mid.png'),
      // require('./assets/down.png'),
      // require('./assets/images/circle.png'),
      // require('./assets/images/short_dress.png'),
      // require('./assets/images/mermaid_dress.png'),
      // require('./assets/images/sheath_dress.png'),
      // require('./assets/images/ballgrowth_dress.png'),
      // require('./assets/images/aline_dress.png'),
      // require('./assets/asscher.png'),
      // require('./assets/cushion.png'),
      // require('./assets/emerald.png'),
      // require('./assets/heart.png'),
      // require('./assets/pear.png'),
      // require('./assets/princess.png'),
      // require('./assets/radiant.png'),
      // require('./assets/round.png'),
      // require('./assets/logowhite.png'),
      // require('./assets/logoblack.png'),
      // require('./assets/images/vendors.png'),
      // require('./assets/images/camera.png'),
      // require('./assets/images/cards.png'),
      // require('./assets/images/rings.png'),
      // require('./assets/guestlist.png'),
      // require('./assets/images/downlist.png'),
      // require('./assets/images/wedding-website.png'),
      // require('./assets/images/registry_logo.png')
    ]);
    await this.checkUserSignedIn();
    await this.setLanguage();
    this.setState({ fontLoaded: true, imagesLoaded: true, loadingElement: 'almost done' });
  }

  async setLanguage() {
    const value = await AsyncStorage.getItem('lang');
    store.dispatch(setLanguage(value));
    this.setState({
      language: value
    });
  }
  async checkUserSignedIn() {
    const value = await AsyncStorage.getItem('token');
    store.dispatch(storeToken(value));
    this.setState({
      token: value
    });
  }

  render() {
    const {
      token,
      language,
      loaderOnline,
      loaderDone,
      fontLoaded,
      imagesLoaded,
      loadingElement
    } = this.state;
    return language !== undefined &&
      token !== undefined &&
      loaderDone &&
      (fontLoaded && imagesLoaded) ? (
      <ActionSheetProvider>
        <Provider store={store}>
          <MainRouter token={token} />
        </Provider>
      </ActionSheetProvider>
    ) : (
      <Loader
        setReady={async () => {
          await this.setState({ loaderDone: true });
        }}
        loadingElement={loadingElement}
        loaderOnline={loaderOnline}
      />
    );
  }
}

Text.defaultProps = {
  allowFontScaling: false
};
export default App;
AppRegistry.registerComponent('App', () => App);
