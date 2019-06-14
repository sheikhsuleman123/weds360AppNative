import React from 'react';
import { FlatList, View } from 'react-native';
import SectionHeader from '../components/SectionHeader';
import IconImage from '../components/IconImage';
import { Actions } from 'react-native-router-flux';

export default class ServiceCategory extends React.Component {
  render() {
    return (
      <View>
        <SectionHeader
          language={this.props.language}
          onPress={this.props.onSectionPress}
          headerText={this.props.headerText.toUpperCase()}
          icon={this.props.icon}
          showIcon={this.props.showIcon}
          buttonText={this.props.buttonText}
          showButton
          style={{ marginTop: 10, marginRight: 20, marginBottom: 10 }}
          buttonStyle={{ ...this.props.buttonStyle }}
        />
        <FlatList
          horizontal
          keyExtractor={(item, index) => `${index}`}
          data={this.props.data}
          showsHorizontalScrollIndicator={false}
          renderItem={item => (
            <IconImage
              background={{ uri: item.item.attributes.image_url }}
              text={item.item.attributes.name}
              icon={{ uri: item.item.attributes.icon_url }}
              backgroundWidth={150}
              backgroundHeight={130}
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
              imageStyle={{
                width: 130,
                height: 130
              }}
            />
          )}
        />
      </View>
    );
  }
}
