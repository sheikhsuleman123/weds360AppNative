import React from 'react';
import { Text, FlatList, RefreshControl } from 'react-native';
import { OptimizedFlatList } from 'react-native-optimized-flatlist';
import { Actions } from 'react-native-router-flux';
import DressAndRingItemList from './DressAndRingItemList';

export default class DressesAndRingsList extends React.Component {
  render() {
    return (
      <FlatList
        onEndReachedThreshold={0.1}
        onEndReached={({ distanceFromEnd }) => {
          if (distanceFromEnd < 100) this.props.onEndReached();
        }}
        data={this.props.data}
        style={this.props.style}
        refreshControl={
          <RefreshControl
            refreshing={this.props.isFetching}
            onRefresh={() => this.props.onRefresh()}
            tintColor="#000"
            titleColor="#000"
          />
        }
        keyExtractor={(item, index) => `${index}`}
        numColumns={2}
        scrollEnabled
        ListEmptyComponent={
          <Text
            style={{
              fontFamily: 'Lato-Light',
              alignSelf: 'center',
              marginTop: '10%',
              fontSize: 15
            }}
          >
            No content found
          </Text>
        }
        extraData={this.props.data}
        renderItem={item => (
          <DressAndRingItemList
            onPress={() => {
              if (!this.props.rings) {
                Actions.dress_single({
                  dress: item.item
                });
              } else {
                Actions.ring_single({
                  ring: item.item
                });
              }
            }}
            modified
            dressName={item.item.attributes.name}
            dressSilhouette={item.item.attributes.silhouette}
            photo={{
              uri: item.item.attributes.images.data[0].attributes.image_url
            }}
            style={{ ...this.props.cardStyle, marginLeft: '1%', padding: 1 }}
            liked={item.item.attributes.liked}
            starCount={item.item.attributes.rating}
            language={this.props.language}
          />
        )}
      />
    );
  }
}
