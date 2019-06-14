import React from 'react';
import { ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ServicesScreen from './components/ServicesScreen';
import * as ServicesActions from '@scenes/Categories/Services/actions';
import * as TagActions from '../../../actions/tags';

class Services extends React.Component {
  componentWillMount() {
    const categoryId = this.props.category.item.id;
    this.props.servicesFetch(categoryId);
    this.props.tagsFetch(categoryId);
  }
  pickLanguage = json => (this.props.language === 'ar' ? json.ar : json.en);
  render() {
    const props = this.props;
    return (
      <ServicesScreen
        {...props}
        tags={this.props.tags}
        services={this.props.services}
        name={this.props.category.item.attributes.name}
        applyFilter={() => {
          this.props.servicesFetch(
            this.props.category.item.id,
            this.props.max_range,
            this.props.tag
          );
        }}
        clearFilter={() => {
          this.props.clearFilter();
        }}
        servicesSearch={query => this.props.servicesSearch(this.props.category.item.id, query)}
      />
    );
  }
}

function mapStateToProps(state, props) {
  return {
    tags: state.tagsReducer.tags,
    ...state.servicesReducer,
    ...state.languageReducer
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign(ServicesActions, TagActions), dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Services);
