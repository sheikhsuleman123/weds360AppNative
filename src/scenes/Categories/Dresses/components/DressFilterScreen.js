import React from 'react';
import { ScrollView, View } from 'react-native';
import FilterComponent from '@components/FilterComponent';
import OutlinedButton from '@components/OutlinedButton';
import ColoredButton from '@components/ColoredButton';
import Overlay from '@components/Overlay';

export default class DressFilterScreen extends React.Component {
  render() {
    return (
          <Overlay
            isVisible={this.props.modalVisibile}
            onBackdropPress={this.props.onClose}
          >
            <FilterComponent type="SVG" header="Dress Cut" />
            <View
              style={{
                zIndex: 1,
                marginTop: 2,
                justifyContent: 'center',
                alignSelf: 'center',
                width: '105%',
                height: 0.5,
                backgroundColor: '#000000',
                opacity: 0.1,
                marginBottom: 2
              }}
            />
            <FilterComponent
              data={this.props.tags}
              header="Tags"
              type="Dress"
              style={{ width: '100%', margin: 6}}
            />
            <View
              style={{
                flexDirection: 'row',
                width: '100%',margin: 15, marginTop: 30,
              }}
            >
              <ColoredButton
                containerStyle={{
                  height: 20,
                  padding: 0,
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
                  height: 20,
                  padding: 0,
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
          </Overlay>
    );
  }
}
