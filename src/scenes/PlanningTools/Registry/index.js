import React from 'react';
import { View, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from '../../../components/Header';
import RegistryInitial from './components/RegistryInitial';
import RegistryScreen from './components/RegistryScreen';
import * as RegistriesActions from './actions';
import ErrorModal from '../../../components/ErrorModal';

class Registry extends React.Component {
  constructor() {
    super();
    this.state = {
      marginBottom: 0,
      manageRegistry: false,
      errors: []
    };
  }

  componentWillMount() {
    if (!this.props.registries) this.props.registriesFetch();
  }

  componentWillReceiveProps(nextProps) {
    const { refresh, error, registries } = nextProps;
    if (refresh) {
      this.props.registriesFetch();
    }
    if (registries !== this.props.registries) {
      this.props.registriesPercentage(registries);
    }
    if (error) {
      try {
        const keys = Object.keys(error.errors);
        const errors = [];
        keys.forEach(key => {
          errors.push(`${key}: ${error.errors[key].join(',')}`);
        });

        this.setState({ errors });
      } catch (e) {
        this.setState({ errors: ['An error has occured.'] });
      }
    }
  }
  pickLanguage = json => (this.props.language === 'ar' ? json.ar : json.en);
  render() {
    const { language } = this.props;
    return (
      <View
        style={{
          height: '100%'
        }}
      >
        <Header
          language={language}
          onBackPressed={() => {
            Actions.pop();
          }}
          showIcon
          icon={require('../../../../assets/images/registry_logo.png')}
          headerText={this.pickLanguage({ ar: 'سجل', en: 'Registry' })}
          showBottomLine
          showBackButton
        />
        {(this.props.registries && this.props.registries.length) || this.state.manageRegistry ? (
          <RegistryScreen
            language={language}
            percentage={this.props.percentage}
            isFetching={this.props.isFetching}
            registries={this.props.registries}
            registriesCreate={this.props.registriesCreate}
            onDeletePress={this.props.registriesDelete}
            onEditPress={this.props.registriesUpdate}
          />
        ) : (
          <RegistryInitial
            language={language}
            onButtonPress={() => {
              this.setState({ manageRegistry: true });
            }}
          />
        )}
        <ErrorModal
          isVisible={!!this.props.error}
          hideModal={this.props.resetRegistryStatus}
          errors={this.state.errors}
        />
      </View>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    isFetching: state.registriesReducer.isFetching,
    registries: state.registriesReducer.registries,
    refresh: state.registriesReducer.refresh,
    error: state.registriesReducer.error,
    percentage: state.registriesReducer.percentage,
    ...state.languageReducer
  };
}

// Doing this merges our actions into the component’s props,
// while wrapping them in dispatch() so that they immediately dispatch an Action.
// Just by doing this, we will have access to the actions defined in out actions file (action/home.js)
function mapDispatchToProps(dispatch) {
  return bindActionCreators(RegistriesActions, dispatch);
}

//Connect everything

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Registry);
