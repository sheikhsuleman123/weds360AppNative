import React from 'react';
import { View, TouchableWithoutFeedback, Dimensions} from 'react-native';

export default class Overlay extends React.Component {
  render() {
    const { props } = this;
    const { children, isVisible, onBackdropPress } = props;
    return isVisible ? (
      <View
        style={{
          position: 'absolute',
          zIndex: 10,
          height: '100%',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: 8
        }}>
        <TouchableWithoutFeedback onPress={onBackdropPress}>
          <View
            style={{
              height: '100%',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <View style={{ backgroundColor: 'white',
                  justifyContent: 'space-between', padding: 15, borderRadius: 4}} >
              {children}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    ) : (
      <View
        style={{
          position: 'absolute',
          zIndex: -10
        }}
      />
    );
  }
}
