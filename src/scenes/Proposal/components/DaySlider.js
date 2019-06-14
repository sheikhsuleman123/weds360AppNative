import React from 'react';
import { FlatList, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class DaySlider extends React.Component {
  render() {
    return (
      <View style={styles.scrollerday}>
        <Icon name="chevron-left" style={{ marginRight: '3%', fontSize: 20 }} />
        <FlatList
          ref={'daysList'}
          horizontal
          keyExtractor={(item, index) => `${index}`}
          style={styles.scroller}
          data={this.props.state.days}
          extraData={this.props.state}
          showsHorizontalScrollIndicator={false}
          renderItem={this.props.renderItem}
        />
        <Icon name="chevron-right" style={{ marginLeft: '3%', fontSize: 20 }} />
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  scrollerday: {
    width: '82%',
    marginTop: 35,
    marginBottom: 15,
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center'
  }
});
