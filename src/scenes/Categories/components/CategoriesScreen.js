import React from 'react';
import { View, Dimensions, FlatList, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Header from '../../../components/Header';
import IconImage from '../../../components/IconImage';
import { CategoriesScreenStyles } from './StyleSheet';

export default class CategoriesScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  render() {
    const deviceWidth = Dimensions.get('window').width;
    const { params } = this.props.navigation.state;
    const title = params ? params.title : null;
    const categories = params ? params.categories : null;
    return (
      <View style={{ flex: 1 }}>
        <Header
          showIcon
          showBottomLine={false}
          showBackButton
          onBackPressed={() => {
            this.props.navigation.goBack();
          }}
          headerText={title}
          icon={require('../../../../assets/images/vendors.png')}
        />
        <FlatList
          data={categories}
          keyExtractor={(item, index) => `${index}`}
          numColumns={2}
          scrollEnabled
          renderItem={item => (
            <IconImage
              background={{ uri: item.item.attributes.image_url }}
              text={item.item.attributes.name}
              icon={{ uri: item.item.attributes.icon_url }}
              imageStyle={{
                height: 220,
                width: deviceWidth * 0.5,
                marginBottom: 5
              }}
              backgroundHeight={150}
              onPress={() => {
                item.item.attributes.layout === 'dresses'
                  ? Actions.dresses({
                      category: item
                    })
                  : Actions.services({
                      category: item
                    });
              }}
            />
          )}
        />
      </View>
    );
  }
}
