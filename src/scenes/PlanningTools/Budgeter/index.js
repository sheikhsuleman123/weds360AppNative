import React from 'react';
import { Animated, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';
import Header from '../../../components/Header';
import BudgeterInitial from './components/BudgeterInitial';
import BudgeterScreen from './components/BudgeterScreen';
import * as BudgeterActions from './actions';
import * as ServicesActions from '../../../scenes/Categories/Services/actions';
import * as HomeScreenActions from '../../Homescreen/actions';

class Budgeter extends React.Component {
  constructor() {
    super();
    this.state = { marginBottom: 0, budgetSet: false };
  }
  componentWillMount() {
    if (!this.props.budgeters) {
      this.props.budgeterFetch();
    }
    if (!this.props.allServices) {
      this.props.allServicesFetch();
    }
  }

  componentWillReceiveProps(nextProps) {
    const {
      refresh,
      budgetersData,
      error,
      budget,
      allServices,
      budgetSet,
      profileFetch,
      budgeterFetch,
      budgeterPercentage
    } = nextProps;
    if (budgetSet) {
      profileFetch();
    }
    if (refresh) {
      budgeterFetch();
    }

    if (this.props.budgetersData !== budgetersData || this.props.budget !== budget) {
      budgeterPercentage(budgetersData, budget);
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

    if (!this.state.servicesNames && allServices) {
      const names = [];
      for (let i = 0; i < allServices.length; i++) {
        names.push({
          id: allServices[i].id,
          name: allServices[i].attributes.name
        });
      }
      this.setState({
        servicesNames: names
      });
    }
  }

  render() {
    const { language, budget, budgeters, isFetching, isFetchingProfile } = this.props;
    const { servicesNames } = this.state;
    return (
      <Animated.View
        style={{
          height: '100%'
        }}
      >
        <Header
          onBackPressed={() => {
            Actions.pop();
          }}
          showIcon
          icon={require('../../../../assets/images/tools-budgeter.png')}
          headerText={language === 'ar' ? 'مدير الميزانية' : 'Budgeter'}
          showBottomLine
          showBackButton
          language={language}
        />
        {isFetching || isFetchingProfile ? (
          <ActivityIndicator
            style={{
              marginLeft: 'auto',
              marginRight: 'auto',
              marginTop: '40%',
              marginBottom: 'auto'
            }}
            size="large"
            color="#003430"
          />
        ) : budget === 0 ? (
          <BudgeterInitial
            language={language}
            onButtonPress={budgetVar => {
              this.props.setUserBudget(budgetVar);
            }}
          />
        ) : (
          <BudgeterScreen {...this.props} servicesNames={servicesNames} />
        )}
      </Animated.View>
    );
  }
}
function mapStateToProps(state, props) {
  return {
    ...state.budgeterReducer,
    ...state.languageReducer,
    budgetersData: state.budgeterReducer.budgeters,
    budget: state.homescreenReducer.budget,
    isFetchingProfile: state.homescreenReducer.isFetchingProfile,
    allServices: state.servicesReducer.allServices
  };
}

// Doing this merges our actions into the component’s props,
// while wrapping them in dispatch() so that they immediately dispatch an Action.
// Just by doing this, we will have access to the actions defined in out actions file (action/home.js)
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    Object.assign(BudgeterActions, HomeScreenActions, ServicesActions),
    dispatch
  );
}

//Connect everything

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Budgeter);
