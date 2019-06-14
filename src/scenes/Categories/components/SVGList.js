import React from 'react';
import { View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { dressCutFilter } from '../../../scenes/Categories/Dresses/actions';
import { stoneShapeFilter } from '../../../scenes/Categories/Rings/actions';
import { bindActionCreators } from 'redux';
import SVGListItem from './SVGListItem';

class SVGList extends React.Component {
  constructor() {
    super();
    this.state = {
      items: []
    };
  }

  componentWillMount() {
    const { type } = this.props;
    let items = [];
    if (type === 'Dress Cut') {
      items = [
        {
          description: 'Short',
          item: 'short',
          image: require('../../../../assets/images/short_dress.png')
        },
        {
          description: 'Mermaid',
          item: 'mermaid',
          image: require('../../../../assets/images/mermaid_dress.png')
        },
        {
          description: 'Sheath',
          item: 'sheath',
          image: require('../../../../assets/images/sheath_dress.png')
        },
        {
          description: 'Ball Gown',
          item: 'ball_gown',
          image: require('../../../../assets/images/ballgrowth_dress.png')
        },
        {
          description: 'Aline',
          item: 'aline',
          image: require('../../../../assets/images/aline_dress.png')
        }
      ];
    }
    if (type === 'Stone Shape') {
      items = [
        {
          description: 'Asscher',
          item: 'asscher',
          image: require('../../../../assets/asscher.png')
        },
        {
          description: 'Cushion',
          item: 'cushion',
          image: require('../../../../assets/cushion.png')
        },
        {
          description: 'Emerald',
          item: 'emerald',
          image: require('../../../../assets/emerald.png')
        },
        {
          description: 'Heart',
          item: 'heart',
          image: require('../../../../assets/heart.png')
        },
        {
          description: 'Pear',
          item: 'pear',
          image: require('../../../../assets/pear.png')
        },
        {
          description: 'Princess',
          item: 'princess',
          image: require('../../../../assets/princess.png')
        },
        {
          description: 'Radiant',
          item: 'radiant',
          image: require('../../../../assets/radiant.png')
        },
        {
          description: 'Round',
          item: 'round',
          image: require('../../../../assets/round.png')
        }
      ];
    }
    this.setState({
      items
    });
  }

  _isSelected(item) {
    const { type } = this.props;
    if (type === 'Dress Cut') {
      return this.props.dress_cut === item;
    }
    if (type === 'Stone Shape') {
      return this.props.stone_shape === item;
    }
  }

  onPress = item => {
    const { type } = this.props;
    if (type === 'Dress Cut') {
      this.props.dressCutFilter(item);
    }
    if (type === 'Stone Shape') {
      this.props.stoneShapeFilter(item);
    }
  };

  renderItem = item => (
    <SVGListItem
      item={item.item.item}
      image={item.item.image}
      imageStyle={{
        width: 20,
        height: 40
      }}
      description={item.item.description}
      textStyle={{ margin: 7 }}
      style={{ margin: 5}}
      onPress={() => this.onPress(item.item.item)}
    />
  );

  render() {
    const { type } = this.props;
    return (
        <FlatList
          horizontal

          keyExtractor={(item, index) => `${index}`}
          data={this.state.items}
          showsHorizontalScrollIndicator
          renderItem={this.renderItem}
        />
    );
  }
}

function mapStateToProps(state, props) {
  return {
    dress_cut: state.dressesReducer.dress_cut,
    stone_shape: state.ringsReducer.stone_shape
  };
}

// Doing this merges our actions into the component’s props,
// while wrapping them in dispatch() so that they immediately dispatch an Action.
// Just by doing this, we will have access to the actions defined in out actions file (action/home.js)
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ stoneShapeFilter, dressCutFilter }, dispatch);
}

//Connect everything

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SVGList);
