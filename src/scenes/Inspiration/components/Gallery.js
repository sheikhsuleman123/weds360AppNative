import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Image from 'react-native-image-progress';
import { Actions } from 'react-native-router-flux';

class Gallery extends React.Component {
  render() {
    const { inspirations } = this.props;
    return (
      <View style={[styles.wrapper, { height: 200 }]}>
        <View style={{ width: '65%' }}>
          <TouchableOpacity
            disabled={inspirations.length < 1}
            onPress={() => {
              Actions.image_single({
                image: inspirations[0]
              });
            }}
            style={{ marginRight: 2, width: '100%', height: '50%' }}
          >
            <Image
              style={{ width: '100%', height: '100%' }}
              source={{
                uri: inspirations.length > 0 ? inspirations[0].attributes.image_url : ''
              }}
              // indicator
              resizeMode={'cover'}
            />
          </TouchableOpacity>

          <View style={[styles.wrapper, { width: '100%', height: '50%', padding: 2 }]}>
            <TouchableOpacity
              disabled={inspirations.length < 2}
              onPress={() => {
                Actions.image_single({
                  image: inspirations[1]
                });
              }}
              style={{ margin: 2, width: '50%', height: '100%' }}
            >
              <Image
                source={{
                  uri: inspirations.length > 1 ? inspirations[1].attributes.image_url : ''
                }}
                style={{ width: '100%', height: '100%' }}
                resizeMode={'cover'}
              />
            </TouchableOpacity>

            <TouchableOpacity
              disabled={inspirations.length < 3}
              onPress={() => {
                Actions.image_single({
                  image: inspirations[2]
                });
              }}
              style={{ margin: 2, width: '50%', height: '100%' }}
            >
              <Image
                source={{
                  uri: inspirations.length > 2 ? inspirations[2].attributes.image_url : ''
                }}
                style={{ width: '100%', height: '100%' }}
                resizeMode={'cover'}
              />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          disabled={inspirations.length < 4}
          onPress={() => {
            Actions.image_single({
              image: inspirations[3]
            });
          }}
          style={{ margin: 2, width: '35%', height: '100%' }}
        >
          <Image
            source={{
              uri: inspirations.length > 3 ? inspirations[3].attributes.image_url : ''
            }}
            style={{ width: '100%', height: '100%' }}
            resizeMode={'cover'}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  wrapper: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  }
});

export default Gallery;
