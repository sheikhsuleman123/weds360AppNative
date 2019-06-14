import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ChecklistActions from '@scenes/PlanningTools/Checklist/actions';
import * as HomeScreenActions from './actions';
import * as BudgeterActions from '../PlanningTools/Budgeter/actions';
import * as RegistriesActions from '../PlanningTools/Registry/actions';
import * as EventsActions from '../PlanningTools/Invites/actions';
import HomescreenScreen from './components/HomescreenScreen';

class Homescreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  componentWillReceiveProps(nextProps) {
    const { checklists, budgeters, budget, registries } = nextProps;
    const { checklistPercent, budgeterPercent, registriesPercent } = this.props;
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

  componentWillMount() {
    this.props.categoriesFetch();
    this.props.photosSample();
    this.props.eventsFetch();
    if (
      this.props.profile &&
      this.props.profile.attributes &&
      this.props.profile.attributes.role !== 'user'
    ) {
      this.props.checklistFetch();
      this.props.budgeterFetch();
      this.props.registriesFetch();
    }
  }
  render() {
    const props = this.props;
    return <HomescreenScreen {...props} />;
  }
}

function mapStateToProps(state, props) {
  return {
    categories: state.homescreenReducer.categories,
    isFetchingCategories: state.homescreenReducer.isFetchingCategories,
    inspirations: state.homescreenReducer.inspirations,
    isFetchingPhotos: state.homescreenReducer.isFetchingPhotos,
    profile: state.homescreenReducer.profile,
    isFetchingProfile: state.homescreenReducer.isFetchingProfile,
    checklistPercent: state.checklistReducer.percentage,
    checklists: state.checklistReducer.checklists,
    budgeters: state.budgeterReducer.budgeters,
    budgeterPercent: state.budgeterReducer.percentage,
    registriesPercent: state.registriesReducer.percentage,
    registries: state.registriesReducer.registries,
    budget: state.homescreenReducer.budget,
    eventsPercent: state.eventsReducer.percentage,
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
      ChecklistActions,
      BudgeterActions,
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
)(Homescreen);
