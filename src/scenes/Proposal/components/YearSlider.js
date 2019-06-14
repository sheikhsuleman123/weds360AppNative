import React from 'react';
import { FlatList, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import EStyleSheet from 'react-native-extended-stylesheet';

export default class DaySlider extends React.Component {
  render() {
    return (
      <View style={styles.scrolleryear}>
        <Icon name="chevron-left" style={{ marginRight: '3%', fontSize: 20 }} />
        <FlatList
          horizontal
          data={this.props.state.years}
          extraData={this.props.state.chosenYear}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => `${index}`}
          renderItem={this.props.renderItem}
        />
        <Icon name="chevron-right" style={{ marginLeft: '3%', fontSize: 20 }} />
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  scrolleryear: {
    width: '82%',
    marginTop: 15,
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center'
  }
});
