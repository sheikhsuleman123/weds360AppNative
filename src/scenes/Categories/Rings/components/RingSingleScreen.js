import React from 'react';
import {
  ImageBackground,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Share,
  TouchableWithoutFeedback
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import ReviewsComponent from '../../../../scenes/Reviews/components/ReviewsComponent';
import * as ReviewsActions from '../../../Reviews/actions';
import * as LikesActions from '../../../../actions/likes';
import * as RingsActions from '../actions';
import DressAndRingHeader from '../../components/DressAndRingHeader';
import Info from '../../components/Info';
import { BASE_WEB_URL } from '../../../../constants';
import { RSSStyles } from './StyleSheet';

class RingSingleScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      dreringss: null
    };
  }

  componentWillMount() {
    this.setState({
      ring: this.props.ring
    });
  }

  componentWillReceiveProps(nextProps) {
    const { refreshLike, data, refreshReview } = nextProps;

    if (refreshLike) {
      this.props.liked();
      this.props.singleRingFetch(this.state.ring.id);
    }

    if (refreshReview) {
      this.props.reviewed();
      this.props.singleRingFetch(this.state.ring.id);
    }

    if (data !== this.props.data) {
      this.setState({
        ring: data
      });
    }
  }

  render() {
    const { language } = this.props;
    return (
      <View style={{ flex: 1, ...this.props.style }}>
        <DressAndRingHeader
          style={{
            margin: 10
          }}
          onBackPress={() => {
            Actions.pop();
          }}
          isLiked={this.state.ring.attributes.liked}
          onFavoritePress={() => {
            if (this.state.ring.attributes.liked) {
              this.props.dislikeResource(this.state.ring.id, 'Ring');
            } else {
              this.props.likeResource(this.state.ring.id, 'Ring');
            }
          }}
        />
        {this.state.ring && !this.props.isFetching ? (
          <ScrollView>
            <ImageBackground
              source={{
                uri: this.state.ring.attributes.images.data[0].attributes.image_url
              }}
              style={{
                height: 400
              }}
              resizeMode={'contain'}
            >
              <TouchableWithoutFeedback
                style={{
                  width: '100%'
                }}
                onPress={() =>
                  Actions.full_screen_image({
                    image: this.state.ring.attributes.images.data[0].attributes.image_url
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
                  <Text style={RSSStyles.nameTextStyle}>{this.state.ring.attributes.name}</Text>
                </View>
              </View>
            </ImageBackground>

            <Info
              language={language}
              stoneShape={this.state.ring.attributes.stone_shape}
              gender={this.state.ring.attributes.gender}
              price={this.state.ring.attributes.price}
              removeBottomInfo
              middleInfoHeader={this.state.ring.attributes.name}
              middleInfoText={this.state.ring.attributes.description}
              message={this.state.ring.attributes.description}
              url={
                this.state.ring.attributes.featured_image_url ||
                (this.state.ring.attributes.images.data.length &&
                  this.state.ring.attributes.images.data[0].attributes.image_url)
              }
              style={{ marginTop: 6 }}
            />

            <ReviewsComponent
              language={language}
              id={{ ring_id: this.state.ring.id }}
              reviews={this.state.ring.attributes.reviews.data}
            />
          </ScrollView>
        ) : (
          <ActivityIndicator
            style={{
              marginLeft: 'auto',
              marginRight: 'auto',
              marginTop: 'auto',
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

function mapStateToProps(state) {
  return {
    refreshLike: state.likesReducer.refresh,
    refreshReview: state.reviewsReducer.refresh,
    isFetching: state.ringsReducer.isFetching,
    data: state.ringsReducer.ring,
    ...state.languageReducer
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign(LikesActions, RingsActions, ReviewsActions), dispatch);
}

//Connect everything

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RingSingleScreen);

const styles = EStyleSheet.create({
  vendor_image: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 2,
    marginRight: 2
  },
  vendor_image_text: {
    textAlign: 'center',
    fontWeight: '500',
    color: 'white'
  },
  overlay: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    position: 'absolute',
    bottom: 0,
    height: '10%',
    width: '100%',
    flexDirection: 'column'
  }
});
