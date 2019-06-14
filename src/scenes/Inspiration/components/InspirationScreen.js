import React from 'react';
import { ActivityIndicator, Text, View, FlatList } from 'react-native';
import { Actions } from 'react-native-router-flux';
import EStyleSheet from 'react-native-extended-stylesheet';
import Header from '@components/Header';
import Search from '@components/SearchBar';
import CardArticleSmall from './CardArticleSmall';
import { InspirationScreenStyles } from './StyleSheet';

class Component1 extends React.Component {
  render() {
    const { item1, item2, item3 } = this.props;
    return (
      <View style={[style.horizontal_align, { marginTop: 7 }]}>
        <View style={{ width: '50%' }}>
          <CustomCard
            item={item1}
            containerStyle={{
              height: 350,
              margin: 0
            }}
          />
        </View>
        <View style={{ width: '49%', marginLeft: 3 }}>
          <CustomCard
            item={item2}
            containerStyle={{
              height: 175,
              margin: 0
            }}
          />
          <CustomCard
            item={item3}
            containerStyle={{
              height: 175,
              margin: 0
            }}
          />
        </View>
      </View>
    );
  }
}

class Component2 extends React.Component {
  render() {
    const { item4, item5, item6 } = this.props;
    return (
      <View style={[style.horizontal_align, { marginTop: 7 }]}>
        <View style={{ width: '49%', marginLeft: 3 }}>
          <CustomCard
            item={item4}
            containerStyle={{
              height: 175,
              margin: 0
            }}
          />
          <CustomCard
            item={item5}
            containerStyle={{
              height: 175,
              margin: 0
            }}
          />
        </View>
        <View style={{ width: '49%', marginLeft: 3 }}>
          <CustomCard
            item={item6}
            containerStyle={{
              height: 350,
              margin: 0
            }}
          />
        </View>
      </View>
    );
  }
}

class Component3 extends React.Component {
  render() {
    const { item7, item8, item9, item10 } = this.props;
    return (
      <View style={[style.horizontal_align, { marginTop: 10 }]}>
        {item7 ? (
          <View style={{ width: '49%', marginLeft: 3 }}>
            {item7 ? (
              <CustomCard
                item={item7}
                containerStyle={{
                  height: 175,
                  margin: 0
                }}
              />
            ) : null}
            {item8 ? (
              <CustomCard
                item={item8}
                containerStyle={{
                  height: 175,
                  margin: 0,
                  marginTop: '1%'
                }}
              />
            ) : null}
          </View>
        ) : null}
        {item9 ? (
          <View style={{ width: '49%', marginLeft: 3 }}>
            {item9 ? (
              <CustomCard
                item={item9}
                containerStyle={{
                  height: 175,
                  margin: 0
                }}
              />
            ) : null}
            {item10 ? (
              <CustomCard
                item={item10}
                containerStyle={{
                  height: 175,
                  margin: 0,
                  marginTop: '1%'
                }}
              />
            ) : null}
          </View>
        ) : null}
      </View>
    );
  }
}

export class CustomCard extends React.Component {
  render() {
    const image = this.props.item.item;
    return (
      <CardArticleSmall
        textHeight={40}
        onCardPressed={() => {
          Actions.image_single({
            image
          });
        }}
        text={image.attributes.title}
        source={{ uri: image.attributes.image_url }}
        id={image.id}
        containerStyle={{
          ...this.props.containerStyle
        }}
      />
    );
  }
}

const style = EStyleSheet.create({
  horizontal_align: {
    flex: 1,
    flexDirection: 'row'
  }
});

export default class InspirationScreen extends React.Component {
  constructor(props) {
    super();
  }
  pickLanguage = json => (this.props.language === 'ar' ? json.ar : json.en);
  render() {
    const { state, props } = this;
    const {
      language,
      query,
      photos,
      photosSearch,
      onSearchTextChange,
      photosQueried,
      pendingActivity
    } = props;
    let item1 = (item2 = item3 = item4 = item5 = item6 = item7 = item8 = item9 = item10 = null);
    return (
      <View
        style={{
          alignSelf: 'center'
        }}
      >
        <Header
          showIcon
          language={language}
          showBottomLine={false}
          headerText={this.pickLanguage({ ar: 'الهامات', en: 'Inspiration' })}
          icon={require('@assets/inspiration.png')}
        />
        <View
          style={{
            width: '100%',
            backgroundColor: 'rgb(181, 181, 181)',
            height: 1
          }}
        />
        <Search
          placeholder={this.pickLanguage({ ar: 'ابحث عن صورة هنا', en: 'SEARCH PHOTO HERE' })}
          onChangeText={onSearchTextChange}
          onSubmitEditing={photosSearch}
          language={language}
        />
        {query.length ? (
          <FlatList
            keyExtractor={(item, index) => `${index}`}
            data={photosQueried}
            style={{ margin: 5 }}
            contentContainerStyle={{}}
            refreshing={pendingActivity || this.props.isFetchingSearch}
            onRefresh={this.props.onRefresh}
            onEndReached={this.props.onEndReached}
            extraData={photosQueried}
            ListEmptyComponent={
              !pendingActivity && (
                <Text
                  style={{
                    fontFamily: 'Lato-Light',
                    alignSelf: 'center',
                    marginTop: '10%',
                    fontSize: 15
                  }}
                >
                  No photos found
                </Text>
              )
            }
            numColumns={2}
            renderItem={item => (
              <CustomCard
                item={item}
                containerStyle={{
                  height: 175,
                  marginLeft: 0,
                  marginRight: '1%',
                  marginBottom: 0,
                  marginTop: 0,
                  width: '50%'
                }}
              />
            )}
          />
        ) : (
          <FlatList
            keyExtractor={(item, index) => `${index}`}
            data={photos}
            style={{ margin: 5 }}
            refreshing={this.props.isFetching}
            onRefresh={this.props.onRefresh}
            onEndReached={this.props.onEndReached}
            extraData={photos}
            numColumns={2}
            renderItem={item => {
              const count = item.index + 1;
              let firstComponent = false;
              let secondComponent = false;
              let thirdComponent = false;
              if (count % 10 === 1) {
                item1 = item;
              } else if (count % 10 === 2) {
                item2 = item;
              } else if (count % 10 === 3) {
                item3 = item;
              } else if (count % 10 === 4) {
                item4 = item;
              } else if (count % 10 === 5) {
                item5 = item;
              } else if (count % 10 === 6) {
                item6 = item;
              } else if (count % 10 === 7) {
                item7 = item;
              } else if (count % 10 === 8) {
                item8 = item;
              } else if (count % 10 === 9) {
                item9 = item;
              } else if (count % 10 === 0) {
                item10 = item;
              }
              if (count % 10 === 4) {
                firstComponent = true;
              }
              if (count % 10 === 7) {
                secondComponent = true;
              }
              if (count % 10 === 0 && count > 9) {
                thirdComponent = true;
              }

              return (
                <View>
                  {firstComponent ? (
                    <Component1 item1={item1} item2={item2} item3={item3} />
                  ) : (
                    <View />
                  )}
                  {secondComponent ? (
                    <Component2 item4={item4} item5={item5} item6={item6} />
                  ) : (
                    <View />
                  )}
                  {thirdComponent ? (
                    <Component3 item7={item7} item8={item8} item9={item9} item10={item10} />
                  ) : (
                    <View />
                  )}
                </View>
              );
            }}
          />
        )}
      </View>
    );
  }
}
