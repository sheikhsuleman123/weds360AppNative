import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as HomeScreenActions from '../../scenes/Homescreen/actions'; 
import * as VendorsActions from './actions';
import VendorsScreen from './components/VendorsScreen';

class Vendors extends React.Component {
  static navigationOptions = {
    header: null
  };

  componentWillMount() {
    if (!this.props.categories) {
      this.props.categoriesFetch();
    }
  }

  render() {
    const props = this.props;
    return <VendorsScreen {...props} />;
  }
}

function mapStateToProps(state) {
  return {
    categories: state.homescreenReducer.categories,
    ...state.languageReducer
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(HomeScreenActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Vendors);
