import React from 'react';
import { Dimensions, FlatList } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Carousel from 'react-native-snap-carousel';
import ColoredButton from '../components/ColoredButton';
import SectionHeader from '../components/SectionHeader';
import IconImage from '../components/IconImage';
import { Actions } from 'react-native-router-flux';

export default class MainServiceCategory extends React.Component {
  state = { index: 1 };

  render() {
    const { width, height } = Dimensions.get('window');
    return (
      <Animatable.View animation="fadeInRight" style={{ alignItems: 'center' }}>
        <Carousel
          data={this.props.data}
          sliderWidth={width / 1}
          itemWidth={105}
          loop
          autoplay
          renderItem={item => (
            <IconImage
              background={{ uri: item.item.attributes.image_url }}
              text={item.item.attributes.name}
              icon={{ uri: item.item.attributes.icon_url }}
              onPress={() =>
                item.item.attributes.layout === 'dresses'
                  ? Actions.dresses({
                      category: item
                    })
                  : item.item.attributes.layout === 'rings'
                  ? Actions.rings({
                      category: item
                    })
                  : Actions.services({
                      category: item
                    })
              }
              imageStyle={{
                width: 110,
                height: 110
              }}
            />
          )}
        />
      </Animatable.View>
    );
  }
}

/*<FlatList
  horizontal
  keyExtractor={(item, index) => `${index}`}
  data={this.props.data}
  showsHorizontalScrollIndicator={false}
  renderItem={item => (
    <IconImage
      background={{ uri: item.item.attributes.image_url }}
      text={item.item.attributes.name}
      icon={{ uri: item.item.attributes.icon_url }}
      onPress={() =>
        item.item.attributes.layout === 'dresses'
          ? Actions.dresses({
              category: item
            })
          : item.item.attributes.layout === 'rings'
            ? Actions.rings({
                category: item
              })
            : Actions.services({
                category: item
              })
      }
      imageStyle={{
        width: 110,
        height: 110
      }}
    />
  )}
/>*/

/*  */
