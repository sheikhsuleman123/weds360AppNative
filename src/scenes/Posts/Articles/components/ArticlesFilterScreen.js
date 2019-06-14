import React from 'react';
import { ScrollView, View } from 'react-native';
import Overlay from '@components/Overlay';
import FilterComponent from '@components/FilterComponent';
import OutlinedButton from '@components/OutlinedButton';
import ColoredButton from '@components/ColoredButton';

export default class ArticlesFilterScreen extends React.Component {
  render() {
    return (
      <Overlay isVisible={this.props.modalVisibile} onBackdropPress={this.props.onClose}>
        <View>
        <FilterComponent
          data={this.props.tags}
          header="Filters"
          type="Article"
          style={{ width: '100%' }}
        />
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <ColoredButton
            containerStyle={{
              marginLeft: 7,
              justifyContent: 'center',
              width: '40%',
              backgroundColor: '#003430'
            }}
            textStyle={{ fontSize: 10 }}
            text={'Apply'}
            onPress={this.props.applyFilter}
          />
          <OutlinedButton
            containerStyle={{
              marginLeft: 7,
              justifyContent: 'center',
              width: '40%',
              borderColor: '#003430'
            }}
            textStyle={{ fontSize: 10, color: '#003430' }}
            text={'Clear'}
            onPress={this.props.clearFilter}
          />
        </View>
        </View>
      </Overlay>
    );
  }
}
