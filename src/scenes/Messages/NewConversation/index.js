import React, { PropTypes } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { allServicesFetch } from '@scenes/Categories/Services/actions';
import NewConversationScreen from './components/NewConversationScreen';

class NewConversation extends React.Component {
  static navigationOptions = {
    header: null
  };

  async componentWillMount() {
    this.props.allServicesFetch();
  }

  render() {
    const props = this.props;
    return <NewConversationScreen {...props} />;
  }
}

function mapStateToProps(state, props) {
  return {
    vendors: state.servicesReducer.allServices,
    isFetching: state.servicesReducer.isFetching,
    ...state.languageReducer
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      allServicesFetch
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewConversation);
