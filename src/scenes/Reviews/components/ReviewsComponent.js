import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import Moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';
import Reviews from '../../../scenes/Reviews';
import Review from './Review';
import { ReviewsComponentStyle } from './StyleSheet';
export default class ReviewsComponent extends React.Component {
  state = { modalVisibile: false };
  render() {
    const { language, reviews, id } = this.props;
    return (
      <View style={{ minHeight: 80, width: '90%', alignSelf: 'center', margin: 9 }}>
        <TouchableOpacity
          style={{
            alignSelf: 'flex-end',
            flexDirection: language === 'ar' ? 'row-reverse' : 'row',
            backgroundColor: 'transparent',
            marginRight: 10,
            justifyContent: 'center',
            alignItems: 'center'
          }}
          onPress={() => {
            this.setState({
              modalVisibile: true
            });
          }}
        >
          <Icon style={{ paddingRight: 5, paddingLeft: 5 }} name="edit" />
          <Text style={ReviewsComponentStyle.writeReviewTextStyle}>
            {language === 'ar' ? 'اكتب تعليق' : 'Write a Review'}
          </Text>
        </TouchableOpacity>
        <FlatList
          data={reviews}
          keyExtractor={(item, index) => `${index}`}
          numColumns={1}
          scrollEnabled
          ListEmptyComponent={
            <View style={{ height: 80, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={ReviewsComponentStyle.noContentTextStyle}>
                {language === 'ar' ? 'لا توجد تعليقات حتى الآن' : 'No reviews yet'}
              </Text>
            </View>
          }
          renderItem={item => (
            <Review
              rating={item.item.attributes.rating}
              body={item.item.attributes.body}
              date={Moment(item.item.attributes.created_at).format('MMMM YYYY')}
              title={item.item.attributes.user_name}
              style={{ marginTop: 5, marginBottom: 5 }}
            />
          )}
        />
        <Reviews
          isVisible={this.state.modalVisibile}
          id={id}
          onClosePress={() => {
            this.setState({
              modalVisibile: false
            });
          }}
          onBackdropPress={() => {
            this.setState({
              modalVisibile: false
            });
          }}
          onSavePress={() => {
            this.setState({
              modalVisibile: false
            });
          }}
        />
      </View>
    );
  }
}
