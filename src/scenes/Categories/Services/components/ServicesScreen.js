import React from 'react';
import { ScrollView, Text, FlatList, View, Linking, RefreshControl } from 'react-native';
import call from 'react-native-phone-call';
import { Actions } from 'react-native-router-flux';
import SwiperItem from '@scenes/Vendors/components/SwiperItem';
import Info from '@scenes/Categories/components/Info';
import Search from '@components/SearchBar';
import Header from '@components/Header';
import FilterButton from '@components/FilterButton';
import CustomToolBar from '@components/CustomToolBar';
import SectionHeader from '@components/SectionHeader';
import DataError from '@components/DataError';
import I18n from '@i18n';
import ServiceFilterScreen from './ServiceFilterScreen';
import ServiceListItem from './ServiceListItem';
import { ServicesScreenStyles } from './StyleSheet';

const mainPath = 'categories.general.text.';

export default class ServicesScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      featuredServices: undefined,
      notFeaturedServices: [],
      stateSet: false
    };
  }
  shouldComponentUpdate(nextProps, nextState) {
    const { services, name } = nextProps;
    const { services: prevServices } = this.props;
    const { stateSet } = nextState;
    if ((!stateSet || prevServices !== services) && services) {
      const featuredServices = services.find(service => service.attributes.featured);
      const notFeaturedServices = services.filter(service => featuredServices !== service);

      this.setState({
        modalVisibile: false,
        notFeaturedServices,
        featuredServices,
        name,
        query: '',
        modified: false,
        stateSet: true
      });
    }
    return true;
  }

  pickLanguage = json => (this.props.language === 'ar' ? json.ar : json.en);
  render() {
    const { featuredServices, notFeaturedServices, query } = this.state;
    const { language, isFetching, name, services } = this.props;
    return (
      <View style={{ marginBottom: 70 }}>
        <Header
          showIcon
          showBottomLine
          showBackButton
          headerText={name || ''}
          icon={require('@assets/images/planning.png')}
          onBackPressed={async () => {
            this.props.resetServices();
            await this.setState({ stateSet: false });
            Actions.pop();
          }}
          language={language}
        />

        <ScrollView style={{ height: '100%' }}>
          {!isFetching && featuredServices ? (
            <View>
              <SwiperItem
                removeOverlay
                headerStyle={{
                  marginTop: '10%',
                  letterSpacing: 1,
                  color: '#ffffff'
                }}
                textStyle={{
                  letterSpacing: 3,
                  fontSize: 16,
                  color: '#ffffff'
                }}
                showButton={false}
                icon={{
                  uri: featuredServices.attributes.featured_image_url
                }}
              />
              <CustomToolBar
                firstButtonText={I18n.t(`${mainPath}message`)}
                secondButtonText={I18n.t(`${mainPath}call`)}
                thirdButtonText={I18n.t(`${mainPath}book`)}
                numberOfButtons={3}
                onFirstButtonPress={() => {
                  Actions.chat({
                    service_id: featuredServices.id,
                    vendor: featuredServices.attributes
                  });
                }}
                onSecondButtonPress={() => {
                  call({
                    number: featuredServices.attributes.phone_number,
                    prompt: true
                  }).catch(console.error);
                }}
                onThirdButtonPress={() => {
                  Actions.vendor_profile({
                    service: featuredServices
                  });
                }}
              />
              <Info
                removeTopInfo
                removeBottomInfo
                middleInfoHeader={featuredServices.attributes.name}
                middleInfoText={featuredServices.attributes.address}
                facebookUrl={featuredServices.attributes.facebook_url}
                instagramUrl={featuredServices.attributes.instagram_url}
                onFacebookPress={() => {
                  Linking.openURL(featuredServices.attributes.facebook_url).catch(err =>
                    console.error('An error occurred', err)
                  );
                }}
                onInstagramPress={() => {
                  Linking.openURL(featuredServices.attributes.instagram_url).catch(err =>
                    console.error('An error occurred', err)
                  );
                }}
              />
            </View>
          ) : null}

          <View
            style={{
              flexDirection: 'row',
              marginTop: 10,
              marginLeft: 5,
              alignItems: 'center'
            }}
          >
            <Search
              placeholder={this.pickLanguage({ ar: 'بحث عن خدمات', en: 'SEARCH SERVICE HERE' })}
              style={{ width: '65%' }}
              onChangeText={text => {
                this.setState({
                  query: text,
                  modified: true
                });
              }}
              onSubmitEditing={() => {
                this.props.servicesSearch(this.state.query);
              }}
            />
            <FilterButton
              style={{ marginLeft: 15 }}
              isOpen={this.state.modalVisibile}
              onPress={() => {
                this.setState({
                  modalVisibile: true
                });
              }}
              disabled={!this.props.tags}
            />
          </View>
          <SectionHeader
            headerText={this.pickLanguage({ ar: 'القائمة المتاحة', en: 'Available List' })}
            style={{ marginTop: 2, marginLeft: '3%', height: 30 }}
          />
          <View style={{ height: '100%' }}>
            <FlatList
              contentContainerStyle={{ height: '100%' }}
              keyExtractor={(item, index) => `${index}`}
              data={
                notFeaturedServices &&
                notFeaturedServices.filter(item =>
                  item.attributes.tags.map(tag =>
                    `${tag.toLowerCase()}`.includes(`${query.toLowerCase()}`)
                  )
                )
              }
              extraData={services}
              ListEmptyComponent={
                <DataError
                  onPress={() => this.props.servicesFetch(this.props.category.item.id)}
                  noData={notFeaturedServices.services && notFeaturedServices.length === 0}
                  language={language}
                  isFetching={isFetching}
                />
              }
              refreshControl={
                <RefreshControl
                  refreshing={isFetching}
                  onRefresh={() => this.props.servicesFetch(this.props.category.item.id)}
                  tintColor="#fff"
                  titleColor="#fff"
                />
              }
              renderItem={item => (
                <ServiceListItem
                  image={{ uri: item.item.attributes.featured_image_url }}
                  title={item.item.attributes.name}
                  subtitle={item.item.attributes.address}
                  price_range={item.item.attributes.price_range}
                  onPress={() => {
                    Actions.vendor_profile({
                      service: item.item
                    });
                  }}
                />
              )}
            />
          </View>
        </ScrollView>
        <ServiceFilterScreen
          tags={this.props.tags}
          onClose={() => {
            this.setState({
              modalVisibile: false
            });
          }}
          modalVisibile={this.state.modalVisibile}
          applyFilter={() => {
            this.setState({
              modalVisibile: false
            });
            this.props.applyFilter();
          }}
          clearFilter={() => {
            this.setState({
              modalVisibile: false
            });
            this.props.clearFilter();
          }}
        />
      </View>
    );
  }
}
