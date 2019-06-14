import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import DressesScreen from './components/DressesScreen';
import * as DressesActions from './actions';
import * as TagActions from '../../../actions/tags';

class Dresses extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
  }

  render() {
    const props = this.props;
    return <DressesScreen {...props} />;
  }
}

function mapStateToProps(state) {
  return {
    dressesData: state.dressesReducer.dresses,
    isFetching: state.dressesReducer.isFetching,
    dress_cut: state.dressesReducer.dress_cut,
    tag: state.dressesReducer.tag,
    tags: state.tagsReducer.tags,
    moreData: state.dressesReducer.moreData,
    ...state.languageReducer
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign(DressesActions, TagActions), dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dresses);
