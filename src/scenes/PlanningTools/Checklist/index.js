import React from 'react';
import { View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ChecklistScreen from './components/ChecklistScreen';
import Header from '../../../components/Header';
import * as ChecklistActions from './actions';

class Checklist extends React.Component {
  constructor() {
    super();
    this.state = { manageRegistry: false };
  }

  componentWillMount() {
    const { checklists, checklistFetch } = this.props;
    if (!checklists) checklistFetch();
  }

  render() {
    const props = this.props;
    const { language } = props;

    return (
      <View style={{ height: '100%' }}>
        <Header
          showIcon
          icon={require('../../../../assets/checklist.png')}
          onBackPressed={() => {
            Actions.pop();
          }}
          headerText={language === 'ar' ? 'قائمة تدقيق' : 'Checklist'}
          showBottomLine
          showBackButton
          language={language}
        />

        <ChecklistScreen {...props} />
      </View>
    );
  }
}
function mapStateToProps(state, props) {
  return {
    ...state.checklistReducer,
    ...state.languageReducer
  };
}

// Doing this merges our actions into the component’s props,
// while wrapping them in dispatch() so that they immediately dispatch an Action.
// Just by doing this, we will have access to the actions defined in out actions file (action/home.js)
function mapDispatchToProps(dispatch) {
  return bindActionCreators(ChecklistActions, dispatch);
}

//Connect everything

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Checklist);
