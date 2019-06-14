import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import SVGList from '@scenes/Categories/components/SVGList';
import FilterList from '../components/FilterList';

export default class FilterComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      selected: 0
    };
    this.renderItem = this.renderItem.bind(this);
  }

  renderItem(type, header) {
    switch (type) {
      case 'SVG':
        return <SVGList header={header} type={header} />;
      default:
        return <FilterList header={header} type={type} data={this.props.data} />;
    }
  }

  render() {
    return (
      <View style={{ height: 105, margin: 8 }}>
        <Text style={{ fontSize: 15, fontFamily: 'Lato-Black', margin: 5 }}>
          {this.props.header}
        </Text>
        <Text style={{ marginTop: 3, fontSize: 12, fontFamily: 'Lato-Light' }}>
          {this.props.subHeader}
        </Text>
        {this.renderItem(this.props.type, this.props.header)}
      </View>
    );
  }
}
