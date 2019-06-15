import React from 'react';
import {
  ImageBackground,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Share
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReviewsComponent from '../../../../scenes/Reviews/components/ReviewsComponent'
import * as ReviewActions from '../../../Reviews/actions';
import Info from '../../components/Info';
import DressAndRingHeader from '../../components/DressAndRingHeader';
import { BASE_WEB_URL } from '../../../../constants';
import * as LikesActions from '../../../../actions/likes';
import * as DressesActions from '../actions';
import { DSSStyles } from './StyleSheet';

class DressSingleScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      dress: null
    };
  }

  componentWillMount() {
    this.setState({
      dress: this.props.dress,
      liked: this.props.dress.attributes.liked
    });
  }

  componentWillReceiveProps(nextProps) {
    const { refreshLike, data, refreshReview } = nextProps;
    if (refreshLike) {
      this.props.liked();
      this.props.singleDressFetch(this.state.dress.id);
    }

    if (refreshReview) {
      this.props.reviewed();
      this.props.singleDressFetch(this.state.dress.id);
    }

    if (data) {
      this.setState({
        dress: data,
        liked: data.attributes.liked
      });
    }
  }

  render() {
    const { language } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <DressAndRingHeader
          style={{
            margin: 10,
            zIndex: 1
          }}
          onBackPress={() => {
            Actions.pop();
          }}
          isLiked={this.state.liked}
          onFavoritePress={() => {
            this.setState(prevState => ({
              liked: !prevState.liked
            }));
            if (this.state.dress.attributes.liked) {
              this.props.dislikeResource(this.state.dress.id, 'Dress');
            } else {
              this.props.likeResource(this.state.dress.id, 'Dress');
            }
          }}
        />
        {this.state.dress ? (
          <ScrollView style={{ width: '100%', height: '100%' }}>
            <ImageBackground
              source={{
                uri: this.state.dress.attributes.images.data[0].attributes.image_url
              }}
              style={{
                height: 500
              }}
              resizeMode={'contain'}
            >
              <TouchableWithoutFeedback
                style={{
                  width: '100%'
                }}
                onPress={() =>
                  Actions.full_screen_image({
                    image: this.state.dress.attributes.images.data[0].attributes.image_url
                  })
                }
              >
                <View style={{ flex: 1 }} />
              </TouchableWithoutFeedback>
              <View
                style={{
                  height: '100%',
                  width: '100%',
                  position: 'absolute',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <View style={{ height: '70%' }} />
                <View
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.55)',
                    width: '100%',
                    padding: 8
                  }}
                >
                  <Text style={DSSStyles.silhouetteTextStyle}>
                    {this.state.dress.attributes.silhouette}
                  </Text>
                  <Text style={DSSStyles.nameTextStyle}>{this.state.dress.attributes.name}</Text>
                </View>
              </View>
            </ImageBackground>

            <Info
              language={language}
              size={this.state.dress.attributes.size}
              dressStyle={this.state.dress.attributes.style}
              price={this.state.dress.attributes.price}
              removeBottomInfo
              middleInfoHeader={this.state.dress.attributes.silhouette}
              middleInfoText={this.state.dress.attributes.description}
              subject={this.state.dress.attributes.description}
              url={
                this.state.dress.attributes.featured_image_url ||
                (this.state.dress.attributes.images.data.length &&
                  this.state.dress.attributes.images.data[0].attributes.image_url)
              }
              style={{ marginTop: 6 }}
            />

            <ReviewsComponent
              language={language}
              id={{ dress_id: this.state.dress.id }}
              reviews={this.state.dress.attributes.reviews.data}
            />
          </ScrollView>
        ) : (
          <ActivityIndicator
            style={{
              marginLeft: 'auto',
              marginRight: 'auto',
              marginTop: '40%',
              marginBottom: 'auto',
              ...this.props.style
            }}
            size="large"
            color="#003430"
          />
        )}
      </View>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    refreshLike: state.likesReducer.refresh,
    refreshReview: state.reviewsReducer.refresh,
    isFetching: state.dressesReducer.isFetching,
    data: state.dressesReducer.dress,
    ...state.languageReducer
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign(LikesActions, DressesActions, ReviewActions), dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DressSingleScreen);
