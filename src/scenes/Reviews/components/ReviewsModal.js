import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';
import StarRating from 'react-native-star-rating';
import * as Animatable from 'react-native-animatable';
import ColoredButton from '../../../components/ColoredButton';
import OutlineTextInput from '../../../components/OutlineTextInput';
import I18n from '@i18n';
import { ReviewsModalStyles } from './StyleSheet';

export default class ReviewsModal extends React.Component {
  constructor() {
    super();
    this.state = {
      body: '',
      rating: 0
    };
  }

  render() {
    return (
      <Modal isVisible={this.props.isVisible} onBackdropPress={this.props.onBackdropPress}>
        <Animatable.View animation="fadeIn">
          <TouchableOpacity
            onPress={this.props.onClosePress}
            activeOpacity={this.props.activeOpacity}
            style={{
              zIndex: 1,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <View
              style={{
                backgroundColor: '#ffffff',
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                ...this.props.headerStyle
              }}
            >
              <Text
                style={[
                  ReviewsModalStyles.headerTextStyle,
                  {
                    ...this.props.headerTextStyle
                  }
                ]}
              >
                Add a review
              </Text>

              <Icon
                onPress={this.props.onClosePress}
                style={{ fontSize: 30 }}
                name="ios-close-outline"
              />
            </View>
          </TouchableOpacity>

          <View
            style={{
              backgroundColor: '#ebebeb',
              height: 50,
              flexDirection: 'row',
              alignItems: 'center',
              borderBottomWidth: 1,
              borderColor: '#ffffff'
            }}
          >
            <StarRating
              maxStars={5}
              starSize={20}
              rating={this.state.rating}
              selectedStar={rating => {
                this.setState({
                  rating
                });
              }}
              containerStyle={{ width: '50%', marginLeft: '20%' }}
            />
          </View>
          <View
            style={{
              backgroundColor: '#ebebeb',
              height: 80,
              flexDirection: 'row',
              alignItems: 'center',
              borderBottomWidth: 1,
              borderColor: '#ffffff'
            }}
          >
            <OutlineTextInput
              inputStyle={{
                height: '100%'
              }}
              style={{
                height: '80%',
                width: '50%',
                marginLeft: '20%',
                marginTop: '0%'
              }}
              placeholder="Content"
              onChangeText={text => {
                this.setState({
                  body: text
                });
              }}
              value={this.state.body}
            />
          </View>
          <View
            style={{
              backgroundColor: '#ebebeb',
              height: 40,
              flexDirection: 'row',
              borderBottomWidth: 1,
              borderColor: '#ffffff'
            }}
          >
            <ColoredButton
              text={'Save'}
              containerStyle={{
                backgroundColor: '#005555',
                justifyContent: 'center',
                marginLeft: '20%',
                width: '17%',
                marginTop: 5,
                borderRadius: 5,
                borderWidth: 0,
                height: '80%'
              }}
              disabled={!this.state.rating || !this.state.body.length}
              onPress={() => {
                this.props.onSavePress(this.state.rating, this.state.body);
              }}
            />
          </View>
        </Animatable.View>
      </Modal>
    );
  }
}
