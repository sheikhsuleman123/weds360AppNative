import React from 'react';
import { ActivityIndicator, TouchableOpacity, ScrollView, Text, View, Linking } from 'react-native';
import ImageSlider from 'react-native-image-slider';
import call from 'react-native-phone-call';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux';
import CustomToolBar from '../components/CustomToolBar';
import Header from '../components/Header';
import Info from '@scenes/Categories/components/Info';
import * as ServicesActions from '@scenes/Categories/Services/actions';
import * as ReviewsActions from '@scenes/Reviews/actions';
import * as LikesActions from '../actions/likes';
import ReviewsComponent from '../scenes/Reviews/components/ReviewsComponent';
import I18n from '@i18n';

const mainPath = 'categories.general.text.';

class VendorProfile extends React.Component {
  constructor() {
    super();
    this.state = {
      service: null
    };
  }

  componentWillMount() {
    this.setState({
      service: this.props.service
    });
  }

  componentWillReceiveProps(nextProps) {
    const { refreshLike, data, refreshReview } = nextProps;

    if (refreshLike) {
      this.props.liked();
      this.props.singleServiceFetch(this.state.service.id);
      this.props.userServicesFetch();
    }

    if (refreshReview) {
      this.props.reviewed();
      this.props.singleServiceFetch(this.state.service.id);
    }

    if (data !== this.props.data) {
      this.setState({
        service: data
      });
    }
  }

  render() {
    const { service } = this.state;
    const images = service.attributes.images.data.map(item => item.attributes.image_url);
    let price_range = '$';
    if (service.attributes.price_range === 'inexpensive') {
      price_range = '$';
    } else if (service.attributes.price_range === 'affordable') {
      price_range = '$$';
    } else if (service.attributes.price_range === 'moderate') {
      price_range = '$$$';
    } else if (service.attributes.price_range === 'expensive') {
      price_range = '$$$$';
    }

    const args = {
      number: service.attributes.phone_number, // String value with the number to call
      prompt: true // Optional boolean property. Determines if the user should be prompt prior to the call
    };
    const { language } = this.props;
    return (
      <View style={{ flex: 1, ...this.props.style }}>
        <Header
          showBottomLine
          showCustomIcon
          iconName={service.attributes.liked ? 'ios-heart' : 'ios-heart-outline'}
          iconNameSelected="md-heart"
          customIconStyle={{
            color: '#003430',
            fontSize: 25
          }}
          customIconSelected={false}
          headerText={service.attributes.name}
          showBackButton
          onBackPressed={() => {
            Actions.pop();
          }}
          onCustomIconPress={() => {
            if (service.attributes.liked) {
              this.props.dislikeResource(service.id, 'Service');
            } else {
              this.props.likeResource(service.id, 'Service');
            }
          }}
        />
        {this.state.service && !this.props.isFetching ? (
          <ScrollView style={{ width: '100%' }}>
            <ImageSlider
              images={images}
              loadingIndicatorSource={ActivityIndicator}
              style={{ height: 350 }}
            />
            <CustomToolBar
              firstButtonText={I18n.t(`${mainPath}message`)}
              secondButtonText={I18n.t(`${mainPath}call`)}
              numberOfButtons={2}
              onSecondButtonPress={() => {
                call(args).catch(console.error);
              }}
              onFirstButtonPress={() => {
                Actions.chat({
                  service_id: service.id,
                  vendor: service.attributes
                });
              }}
            />
            <Info
              removeTopInfo
              middleInfoHeader={service.attributes.name}
              middleInfoText={service.attributes.description}
              style={{ marginTop: '4%' }}
              price_range={price_range}
              tags={service.attributes.tags}
              facebookUrl={service.attributes.facebook_url}
              instagramUrl={service.attributes.instagram_url}
              onFacebookPress={() => {
                Linking.openURL(service.attributes.facebook_url).catch(
                  err => console.error('An error occurred', err)
                );
              }}
              onInstagramPress={() => {
                Linking.openURL(service.attributes.instagram_url || 'https://instagram.com').catch(
                  err => console.error('An error occurred', err)
                );
              }}
            />
            <ReviewsComponent
              reviews={service.attributes.reviews.data}
              language={language}
              id={{ service_id: service.id }}
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
    isFetching: state.servicesReducer.isFetching,
    data: state.servicesReducer.service,
    ...state.languageReducer
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign(LikesActions, ServicesActions, ReviewsActions), dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VendorProfile);
