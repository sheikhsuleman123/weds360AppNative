import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import GridView from 'react-native-super-grid';

export default class MonthGrid extends React.Component {
  render() {
    return (
      <GridView
        keyExtractor={(item, index) => `${index}`}
        itemDimension={59}
        scrollEnabled={false}
        items={this.props.state.months}
        spacing={7}
        style={styles.grid}
        renderItem={this.props.renderItem}
      />
    );
  }
}

const styles = EStyleSheet.create({
  grid: {
    width: '80%',
    marginTop: '2%',
    marginLeft: '10%'
  }
});
