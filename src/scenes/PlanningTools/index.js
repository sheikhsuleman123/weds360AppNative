import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PlanningToolsScreen from './components/PlanningToolsScreen';
import * as HomeScreenActions from '../Homescreen/actions';
import * as ChecklistActions from '@scenes/PlanningTools/Checklist/actions';
import * as BudgeterActions from '@scenes/PlanningTools/Budgeter/actions';
import * as RegistriesActions from '@scenes/PlanningTools/Registry/actions';
import * as EventsActions from '@scenes/PlanningTools/Invites/actions';

class PlanningScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  componentWillMount() {
    if (!this.props.budgeterPercent) {
      this.props.budgeterFetch();
      this.props.profileFetch();
    }
    if (!this.props.eventsPercent) {
      this.props.eventsFetch();
    }
    if (!this.props.checklistPercent) {
      this.props.checklistFetch();
    }
    if (!this.props.registriesPercent) {
      this.props.registriesFetch();
    }
  }
  componentWillReceiveProps(nextProps) {
    const { checklists, budgeters, budget, registries } = nextProps;
    const { budgeterPercent, checklistPercent, registriesPercent } = this.props;

    if (!checklistPercent && checklists) {
      this.props.checklistPercentage(checklists);
    }
    if (!budgeterPercent && budgeters && budget) {
      this.props.budgeterPercentage(budgeters, budget);
    }
    if (!registriesPercent && registries) {
      this.props.registriesPercentage(registries);
    }
  }

  render() {
    const props = this.props;
    return <PlanningToolsScreen {...props} />;
  }
}

function mapStateToProps(state, props) {
  return {
    profile: state.homescreenReducer.profile,
    checklistPercent: state.checklistReducer.percentage,
    checklists: state.checklistReducer.checklists,
    budgeters: state.budgeterReducer.budgeters,
    budgeterPercent: state.budgeterReducer.percentage,
    budget: state.homescreenReducer.budget,
    registriesPercent: state.registriesReducer.percentage,
    registries: state.registriesReducer.registries,
    eventsPercent: state.eventsReducer.evPercentage,
    ...state.languageReducer
  };
}

// Doing this merges our actions into the component’s props,
// while wrapping them in dispatch() so that they immediately dispatch an Action.
// Just by doing this, we will have access to the actions defined in out actions file (action/home.js)
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    Object.assign(
      HomeScreenActions,
      BudgeterActions,
      ChecklistActions,
      RegistriesActions,
      EventsActions
    ),
    dispatch
  );
}

//Connect everything

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlanningScreen);
