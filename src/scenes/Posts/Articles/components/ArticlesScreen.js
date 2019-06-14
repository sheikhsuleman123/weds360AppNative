import React from 'react';
import { ActivityIndicator, RefreshControl, FlatList, Text, View, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Actions } from 'react-native-router-flux';
import EStyleSheet from 'react-native-extended-stylesheet';
import Image from 'react-native-image-progress';
import Header from '@components/Header';
import Search from '@components/SearchBar';
import FilterButton from '@components/FilterButton';
import ArticlesFilterScreen from './ArticlesFilterScreen';
import PromotedArticle from './PromotedArticle';
import SingleArticle from './SingleArticle';
import { ArticlesScreenStyles } from './StyleSheet';
import { BASE_WEB_URL } from '../../../../constants';

export default class Articles extends React.Component {
  constructor() {
    super();
    this.state = {
      modified: false,
      searchString: ''
    };
  }
  getPostLink = link =>
    `${link
      .toLowerCase()
      .trim()
      .replace(/’/g, '-')
      .replace(/ /g, '-')}`;
  pickLanguage = json => (this.props.language === 'ar' ? json.ar : json.en);
  render() {
    const {
      language,
      isFetchingArticles,
      isFetchingSearch,
      tags,
      query,
      onSearchTextChange,
      articlesSearch,
      clearFilter,
      applyFilter,
      relatedArticlesFetch,
      onEndReached,
      onRefresh,
      data,
      articlesFetch,
      category,
      fetchSingleArticle
    } = this.props;
    return (
      <View style={{ backgroundColor: 'white', flex: 1 }}>
        <Header
          language={language}
          showIcon
          headerText={this.pickLanguage({ ar: 'مقالات', en: 'Articles' })}
          showBottomLine={false}
          icon={require('@assets/articles.png')}
        />

        <View
          style={{
            width: '100%',
            backgroundColor: 'rgb(181, 181, 181)',
            height: 1
          }}
        />
        <View
          style={{
            paddingLeft: 10,
            paddingRight: 10,
            backgroundColor: 'white',

            alignItems: 'center',
            height: '100%'
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              marginTop: 10,
              alignItems: 'center'
            }}
          >
            <Search
              placeholder={language === 'ar' ? 'ابحث عن المقالات هنا' : 'SEARCH ARTICLES HERE'}
              style={{ width: '65%' }}
              onChangeText={onSearchTextChange}
              onSubmitEditing={articlesSearch}
              language={language}
              value={query}
            />
            <FilterButton
              isOpen={this.state.modalVisibile}
              onPress={() => {
                this.setState({
                  modalVisibile: true
                });
              }}
              disabled={!tags}
              style={{ marginLeft: 15 }}
            />
          </View>

          <FlatList
            keyExtractor={(item, index) => `${index}`}
            data={data}
            refreshControl={
              <RefreshControl
                refreshing={isFetchingArticles || isFetchingSearch}
                onRefresh={onRefresh}
                tintColor="#000"
                titleColor="#000"
              />
            }
            onEndReachedThreshold={0.1}
            onEndReached={({ distanceFromEnd }) => {
              if (distanceFromEnd < 100) onEndReached();
            }}
            style={{ marginBottom: 80 }}
            ListEmptyComponent={
              <Text
                style={{
                  fontFamily: 'Lato-Light',
                  alignSelf: 'center',
                  marginTop: '10%',
                  fontSize: 15
                }}
              >
                No articles found
              </Text>
            }
            extraData={data}
            renderItem={item => {
              let featuredArticle = false;
              if (item.index === 0) {
                featuredArticle = true;
              }
              return (
                <View>
                  {featuredArticle && !query.length ? (
                    <View>
                      <View
                        style={[ArticlesScreenStyles.horizontal_line_black, { marginTop: 10 }]}
                      />
                      <PromotedArticle
                        language={language}
                        title={item.item.attributes.title}
                        description={item.item.attributes.body_truncated}
                        readingTime={item.item.attributes.reading_time}
                        onPress={() => {
                          fetchSingleArticle(item.item.id);
                          Actions.articles_single_screen({
                            article: item.item
                          });
                          relatedArticlesFetch(item.item.id);
                        }}
                        source={{
                          uri: item.item.attributes.featured_image_url
                        }}
                      />
                    </View>
                  ) : (
                    <View>
                      <View style={[ArticlesScreenStyles.horizontal_line, { marginTop: 15 }]} />
                      <SingleArticle
                        language={language}
                        title={item.item.attributes.title}
                        description={item.item.attributes.body_truncated}
                        readingTime={item.item.attributes.reading_time}
                        onPress={() => {
                          fetchSingleArticle(item.item.id);
                          Actions.articles_single_screen({
                            article: item.item
                          });
                          relatedArticlesFetch(item.item.id);
                        }}
                        source={{
                          uri: item.item.attributes.featured_image_url
                        }}
                      />
                    </View>
                  )}
                </View>
              );
            }}
          />
        </View>
        <ArticlesFilterScreen
          tags={tags}
          onClose={() => {
            this.setState({
              modalVisibile: false
            });
          }}
          modalVisibile={this.state.modalVisibile}
          clearFilter={clearFilter}
          applyFilter={() => {
            applyFilter();
            this.setState({
              modalVisibile: false
            });
          }}
        />
      </View>
    );
  }
}
