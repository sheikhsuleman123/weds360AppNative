import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import * as LanguageSelectActions from './actions';
import LanguageSelectScreen from './components/LanguageSelectScreen';

class LanguageSelect extends React.Component {
  render() {
    const props = this.props;
    return (
      <LanguageSelectScreen
        languageSelect={async (language, isRTL) => {
          await this.props.languageSelect(language, true, isRTL);
          Actions.login();
        }}
        {...props}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    language: state.languageReducer.language,
    ...state.authenticationReducer
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(LanguageSelectActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LanguageSelect);
