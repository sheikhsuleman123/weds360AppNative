import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CategoriesScreen from './components/CategoriesScreen';

class Categories extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    const props = this.props;
    return <CategoriesScreen {...props} />;
  }
}

function mapStateToProps(state) {
  return {
    ...state.categoriesReducer
  };
}

export default connect(
  mapStateToProps,
  null
)(Categories);
