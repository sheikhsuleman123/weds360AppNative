import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import * as RingsActions from './actions';
import * as tagsActions from '../../../actions/tags';
import RingsScreen from './components/RingsScreen';

class Rings extends React.Component {
  static navigationOptions = {
    header: null
  };
  componentWillMount() {
    if (!this.props.ringsData && !this.props.isFetchingRings) {
      this.props.ringsFetch(1, this.props.category.item.id);
    }
    this.props.tagsFetch(this.props.category.item.id);
  }

  render() {
    const props = this.props;
    return <RingsScreen {...props} />;
  }
}

function mapStateToProps(state) {
  return {
    ringsData: state.ringsReducer.rings,
    isFetchingRings: state.ringsReducer.isFetchingRings,
    clarity: state.ringsReducer.clarity,
    purity: state.ringsReducer.purity,
    stone_shape: state.ringsReducer.stone_shape,
    tags: state.tagsReducer.tags,
    tag: state.ringsReducer.tag,
    moreData: state.ringsReducer.moreData,
    ...state.languageReducer
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign(RingsActions, tagsActions), dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Rings);
