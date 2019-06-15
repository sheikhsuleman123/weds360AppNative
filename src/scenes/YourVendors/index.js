import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as YourVendorsActions from './actions';
import * as ServicesActions from '../../scenes/Categories/Services/actions';  
import * as HomeScreenActions from  '../../scenes/Homescreen/actions' ;
import YourVendorsScreen from './components/YourVendorsScreen';

class YourVendors extends React.Component {
  static navigationOptions = {
    header: null
  };
  componentDidMount() {
    this.props.userServicesFetch();
    if (!this.props.categories) {
      this.props.categoriesFetch();
    }
  }

  render() {
    const props = this.props;
    return <YourVendorsScreen {...props} />;
  }
}

function mapStateToProps(state, props) {
  return {
    isFetching: state.servicesReducer.isFetching,
    userServices: state.servicesReducer.userServices,
    categories: state.homescreenReducer.categories,
    ...state.languageReducer
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign(ServicesActions, HomeScreenActions), dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(YourVendors);
