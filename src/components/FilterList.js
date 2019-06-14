import React from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import GridLayout from 'react-native-layout-grid';
import FilterListItem from './FilterListItem';
import { articleTag } from '../scenes/Posts/actions';
import { dressTag } from '@scenes/Categories/Dresses/actions';
import { clarityFilter, purityFilter, ringTag } from '@scenes/Categories/Rings/actions';
import { serviceRangeFilter, serviceTag } from '@scenes/Categories/Services/actions';

class FilterList extends React.Component {
  constructor() {
    super();
    this.state = {
      items: []
    };
  }

  componentDidMount() {
    const { type, header } = this.props;
    let items = [];
    if (header === 'Silhouettes') {
      items = ['Wedding', 'Chapel', 'Chiffon', 'Sans Bruttel', 'Long Sleeves', 'V-Neck', 'Mermaid'];
    }
    if (header === 'Ring Clarity') {
      items = ['FL_IF', 'VVS1_VVS2', 'VS1_VS2', 'SI1_SI2', 'I1', 'I2', 'I3'];
    }
    if (header === 'Ring Purity') {
      items = ['D_E_F', 'H_I_J', 'K_L_M', 'N_O_P_Q_R', 'D_T_U_V_X_Y_Z'];
    }
    if (header === 'Price Range') {
      items = ['Inexpensive', 'Affordable', 'Moderate', 'Expensive'];
    }
    if ((header === 'Tags' || header === 'Filters') && this.props.data !== null) {
      items = this.props.data.map(t => t.attributes.name);
    }
    this.setState({
      items
    });
  }

  _isSelected(item) {
    const { header, type } = this.props;
    if (header === 'Ring Clarity') {
      return this.props.clarity === item;
    }
    if (header === 'Ring Purity') {
      return this.props.purity === item;
    }
    if (header === 'Price Range') {
      return this.props.venue_max_range === item;
    }
    if (header === 'Tags' || header === 'Filters') {
      if (type === 'Ring') {
        return this.props.ring_tag === item;
      } else if (type === 'Dress') {
        return this.props.dress_tag === item;
      } else if (type === 'Article') {
        return this.props.article_tag === item;
      }
      return this.props.service_tag === item;
    }
  }

  onPress = item => {
    const { header, type } = this.props;
    if (header === 'Ring Clarity') {
      this.props.clarityFilter(item);
    }
    if (header === 'Ring Purity') {
      this.props.purityFilter(item);
    }
    if (header === 'Price Range') {
      this.props.serviceRangeFilter(item);
    }
    if (header === 'Tags' || header === 'Filters') {
      if (type === 'Ring') {
        this.props.ringTag(item);
      } else if (type === 'Dress') {
        this.props.dressTag(item);
      } else if (type === 'Article') {
        this.props.articleTag(item);
      } else {
        this.props.serviceTag(item);
      }
    }
  };

  render() {
    return (
      <FlatList
        style={{ width: '100%', height: 80 }}
        data={this.state.items}
        keyExtractor={(item, index) => `${index}`}
        renderItem={item => (
          <FilterListItem
            onPress={() => this.onPress(item.item)}
            isSelected={this._isSelected(item.item)}
            text={item.item}
          />
        )}
      />
    );
  }
}

function mapStateToProps(state, props) {
  return {
    clarity: state.ringsReducer.clarity,
    purity: state.ringsReducer.purity,
    venue_max_range: state.servicesReducer.max_range,
    ring_tag: state.ringsReducer.tag,
    dress_tag: state.dressesReducer.tag,
    service_tag: state.servicesReducer.tag,
    article_tag: state.articlesReducer.tag
  };
}

// Doing this merges our actions into the component’s props,
// while wrapping them in dispatch() so that they immediately dispatch an Action.
// Just by doing this, we will have access to the actions defined in out actions file (action/home.js)
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      serviceTag,
      dressTag,
      clarityFilter,
      purityFilter,
      serviceRangeFilter,
      ringTag,
      articleTag
    },
    dispatch
  );
}

//Connect everything

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterList);
