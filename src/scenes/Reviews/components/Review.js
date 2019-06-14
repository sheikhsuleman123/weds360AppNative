import React from 'react';
import { View, Text, FlatList } from 'react-native';
import StarRating from 'react-native-star-rating';
import { ReviewStyles } from './StyleSheet';

export default class Review extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, ...this.props.style }}>
        <View style={{ flexDirection: 'row', alignItems: 'center'}}>
          <StarRating
            disabled
            maxStars={5}
            starSize={9}
            rating={this.props.rating}
            selectedStar={rating => {}}
            containerStyle={{
              width: '10%',
              marginLeft: 6,
              marginRight: 6,
              marginTop: 5
            }}
          />
          <Text style={ReviewStyles.titleDateTextStyle}>
            {this.props.title}, {this.props.date}
          </Text>
        </View>
        <Text style={ReviewStyles.bodyTextStyle}>{this.props.body}</Text>
      </View>
    );
  }
}
