import React, { PropTypes } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import * as ArticleSingleActions from '../actions';
import ArticleSingleScreen from './components/ArticleSingleScreen';

class ArticleSingle extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    const props = this.props;
    return <ArticleSingleScreen {...props} />;
  }
}

function mapStateToProps(state, props) {
  return {
    ...state.articlesReducer,
    ...state.languageReducer
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ArticleSingleActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticleSingle);
