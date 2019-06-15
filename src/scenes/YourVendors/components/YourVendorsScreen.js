import React, { Component } from 'react';
import {
  Image,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Dimensions
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import PlanningItem from  '../../../scenes/PlanningTools/components/PlanningItem';  
import VendorCard from './VendorCard';
import { YourVendorsScreenStyles } from './StyleSheet';

export default class YourVendorsScreen extends React.Component {
  constructor() {
    super();
    this.getIcon = this.getIcon.bind(this);
    this.getType = this.getType.bind(this);
  }

  getIcon(category_id, categories) {
    return categories.find(item => `${item.id}` === `${category_id}`).attributes.icon_url;
  }

  getType(category_id, categories) {
    return categories.find(item => `${item.id}` === `${category_id}`).attributes.name;
  }

  render() {
    const { language, userServices, categories } = this.props;
    return (
      <ScrollView style={{ width: '100%' }}>
        <View style={{ padding: 5 }}>
          <Text style={YourVendorsScreenStyles.textHeader}>
            {language === 'ar' ? 'البائعين الخاصة بك' : 'YOUR VENDORS'}
          </Text>
          {language === 'ar' ? (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
              <TouchableOpacity
                style={{
                  marginRight: 'auto',
                  paddingLeft: 10,
                  paddingRight: 10,
                  borderColor: 'black',
                  borderWidth: 1,
                  width: 75,
                  height: 21,
                  justifyContent: 'center',
                  ...this.props.buttonStyle
                }}
                onPress={() => {
                  Actions.your_vendors_list({
                    title: 'Your Vendors',
                    userServices,
                    categories
                  });
                }}
              >
                <Text style={YourVendorsScreenStyles.seeAll}>المزيد</Text>
              </TouchableOpacity>
              <Text style={YourVendorsScreenStyles.textDescription}>
                جميع البائعين محفوظة في مكان واحد.
              </Text>
            </View>
          ) : (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
              <Text style={YourVendorsScreenStyles.textDescription}>
                All your saved vendors in one place.
              </Text>
              <TouchableOpacity
                style={{
                  marginLeft: 'auto',
                  paddingLeft: 10,
                  paddingRight: 10,
                  borderColor: 'black',
                  borderWidth: 1,
                  width: 75,
                  height: 21,
                  justifyContent: 'center',
                  ...this.props.buttonStyle
                }}
                onPress={() => {
                  Actions.your_vendors_list({
                    title: 'Your Vendors',
                  });
                }}
              >
                <Text style={YourVendorsScreenStyles.seeAll}>See All</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View style={{ flex: 1 }}>
          {userServices && categories ? (
            <FlatList
              data={userServices}
              keyExtractor={(item, index) => `${index}`}
              scrollEnabled
              horizontal
              renderItem={item => (
                <View style={{ width: Dimensions.get('window').width / 3 }}>
                  <VendorCard
                    onPress={() => {
                      Actions.vendor_profile({ service: item.item });
                    }}
                    title={this.getType(item.item.attributes.category_id, categories)}
                    text={item.item.attributes.name}
                    photo={{ uri: item.item.attributes.featured_image_url }}
                    logo={{ uri: this.getIcon(item.item.attributes.category_id, categories) }}
                    style={{
                      height: 180
                    }}
                    language={language}
                  />
                </View>
              )}
            />
          ) : (
            <ActivityIndicator
              style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
              size="large"
              color="#003430"
            />
          )}
        </View>

        <View
          style={{
            width: '100%',
            height: 1,
            backgroundColor: '#e1e1e1',
            marginTop: '5%',
            marginBottom: '2%',
            alignSelf: 'center'
          }}
        />

        {!categories ? (
          <ActivityIndicator
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
            size="large"
            color="#003430"
          />
        ) : (
          <View style={{ flex: 1 }}>
            <FlatList
              data={categories}
              keyExtractor={(item, index) => `${index}`}
              scrollEnabled
              numColumns={1}
              renderItem={item => (
                <PlanningItem
                  image={{ uri: item.item.attributes.icon_url }}
                  title={item.item.attributes.name}
                  style={{ margin: '1%', flex: 1 }}
                  subtitle={`${item.item.attributes.name}`}
                  buttonText={language === 'ar' ? 'اختر واحدة' : 'Pick one now!'}
                  onPress={() => {
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
                        });
                  }}
                  language={language}
                />
              )}
            />
          </View>
        )}
      </ScrollView>
    );
  }
}
