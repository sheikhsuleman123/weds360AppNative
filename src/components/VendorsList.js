import React from 'react';
import { TouchableOpacity, Image, Text, View, Platform, FlatList } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { VendorsListStyles } from './StyleSheet';

export default class VendorsList extends React.Component {
  constructor(props) {
    super();
    this.state = {
      data: props.data
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      data: props.data.filter(elem =>
        elem.attributes.name
          .toLowerCase()
          .includes(props.filterString ? props.filterString.toLowerCase() : '')
      )
    });
  }

  render() {
    return (
      <FlatList
        data={this.state.data}
        keyExtractor={(item, index) => `${index}`}
        extraData={this.state.data}
        numColumns={1}
        scrollEnabled
        renderItem={item => (
          <TouchableOpacity
            onPress={() => {
              Actions.chat({
                service_id: item.item.id,
                vendor: item.item.attributes
              });
            }}
          >
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                flexDirection: 'row',
                padding: '2%'
              }}
            >
              <Image
                source={{ uri: item.item.attributes.featured_image_url }}
                style={
                  Platform.OS === 'ios'
                    ? {
                        width: 50,
                        height: 50,
                        borderRadius: 25
                      }
                    : {
                        width: 50,
                        height: 50,
                        borderRadius: 180
                      }
                }
                resizeMode={'cover'}
              />
              <View
                style={{
                  width: '80%',
                  marginLeft: 'auto'
                }}
              >
                <Text style={VendorsListStyles.nameTextStyle}>{item.item.attributes.name}</Text>
                <Text style={VendorsListStyles.descriptionTextStyle}>
                  {item.item.attributes.description}
                </Text>
              </View>
            </View>
            <View
              style={{
                alignSelf: 'flex-end',
                borderColor: '#b7b7b7',
                borderWidth: 0.5,
                width: '80%',
                marginBottom: 5,
                marginTop: 5
              }}
            />
          </TouchableOpacity>
        )}
      />
    );
  }
}
