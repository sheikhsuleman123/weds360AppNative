import React from 'react';
import { View, ScrollView, Dimensions, FlatList, ActivityIndicator, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import EStyleSheet from 'react-native-extended-stylesheet';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from '../../../components/Header';
import VendorCard from '../components/VendorCard';
import Search from '@components/SearchBar';

class YourVendorsList extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super();
    this.state = {
      original: props.userServices,
      services: props.userServices,
      query: ''
    };
  }
  getIcon = category_id =>
    this.props.categories.find(item => item.id == category_id).attributes.icon_url;

  getType = category_id =>
    this.props.categories.find(item => item.id == category_id).attributes.name;

  render() {
    const deviceWidth = Dimensions.get('window').width;
    const { params } = this.props.navigation.state;
    const title = params ? params.title : null;
    const categories = params ? params.categories : null;
    const {query}=this.state;
    return (
      <View>
        <Header
          showIcon
          showBottomLine={false}
          showBackButton
          onBackPressed={() => {
            this.props.navigation.goBack();
          }}
          headerText={title}
          icon={require('@assets/images/vendors.png')}
        />
        <Search
          placeholder="SEARCH VENDORS"
          style={{ marginLeft: 0 }}
          onChangeText={text => {
            this.setState({
              query: text
            });
          }}
          onSubmitEditing={() => {}}
        />
        {this.props.userServices ? (
          <ScrollView>
            <FlatList
              data={this.props.userServices.filter(item =>
                item.attributes.name.toLowerCase().includes(query.toLowerCase()))}
              keyExtractor={(item, index) => `${index}`}
              style={{ marginTop: '3%' }}
              numColumns={3}
              scrollEnabled
              extraData={this.props.userServices}
              ListEmptyComponent={
                <Text
                  style={{
                    fontFamily: 'Lato-Light',
                    alignSelf: 'center',
                    marginTop: '10%',
                    fontSize: 15
                  }}
                >
                  No favorites found
                </Text>
              }
              renderItem={item => (
                <View style={{ width: Dimensions.get('window').width / 3 }}>
                  <VendorCard
                    onPress={() => {
                      Actions.vendor_profile({ service: item.item });
                    }}
                    title={this.getType(item.item.attributes.category_id)}
                    text={item.item.attributes.name}
                    photo={{ uri: item.item.attributes.featured_image_url }}
                    logo={{ uri: this.getIcon(item.item.attributes.category_id) }}
                    style={{
                      height: 180
                    }}
                  />
                </View>
              )}
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
    userServices: state.servicesReducer.userServices,
    categories: state.homescreenReducer.categories,
    ...state.languageReducer
  };
}

export default connect(
  mapStateToProps
)(YourVendorsList);

const styles = EStyleSheet.create({
  horizontal_align: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  }
});
