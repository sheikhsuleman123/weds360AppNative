import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  Clipboard,
  Share,
  FlatList,
  Dimensions,
  ActivityIndicator
} from 'react-native';
import { Video } from 'expo';
import Image from 'react-native-image-progress';
import Icon from 'react-native-vector-icons/Ionicons';
import FIcon from 'react-native-vector-icons/Feather';
import EStyleSheet from 'react-native-extended-stylesheet';
import Moment from 'moment';
import momentAR from 'moment/src/locale/ar';
import HTMLView from 'react-native-htmlview';
import { Actions } from 'react-native-router-flux';
import { connectActionSheet } from '@expo/react-native-action-sheet';
import HTML from 'react-native-render-html';
import SingleArticle from '../../Articles/components/SingleArticle';
import { BASE_WEB_URL } from '../../../../constants';
import SectionHeader from '@components/SectionHeader';
import { ArticleSingleScreenStyles } from './StyleSheet';
import store from '../../../../../store';

@connectActionSheet
export default class ArticleSingleScreen extends React.Component {
  state = {
    displayAsset: 'image'
  };
  pickLanguage = json => (this.props.language === 'ar' ? json.ar : json.en);
  render() {
    const { width, height } = Dimensions.get('window');
    const { props, state } = this;
    const { language, singleArticle, fetchSingleArticle, relatedArticlesFetch } = props;
    const { params } = props.navigation.state;
    const article = params ? params.article : null;
    const publishedDate = article.attributes.updated_at;
    return (
      <View style={{ height: '100%' }}>
        <View
          style={[
            style.horizontal_align,
            {
              marginTop: 25,
              paddingRight: 10,
              marginBottom: 10,
              paddingLeft: 10,
              width: '100%'
            }
          ]}
        >
          <TouchableOpacity
            style={{ marginRight: 'auto', width: '40%' }}
            onPress={() => {
              props.navigation.goBack();
            }}
          >
            <Icon name={'ios-arrow-back'} size={25} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              props.showActionSheetWithOptions(
                {
                  options: ['Cancel', 'Copy Link', 'Share'],
                  destructiveButtonIndex: 1,
                  cancelButtonIndex: 0
                },
                buttonIndex => {
                  switch (buttonIndex) {
                    case 1:
                      Clipboard.setString(
                        `${BASE_WEB_URL}/${language}/posts/${article.attributes.slug}`
                      );
                      break;
                    case 2:
                      Share.share(
                        {
                          message: `${BASE_WEB_URL}/${language}/posts/${article.attributes.slug}`,
                          url: `${BASE_WEB_URL}/${language}/posts/${article.attributes.slug}`,
                          title: props.title
                        },
                        {
                          dialogTitle: props.title
                        }
                      );
                      break;
                    default:
                  }
                }
              );
            }}
          >
            <FIcon name={'more-horizontal'} size={25} />
          </TouchableOpacity>
        </View>
        <ScrollView
          ref={scroller => {
            this.scroller = scroller;
          }}
          style={{ backgroundColor: 'white' }}
          contentContainerStyle={{ alignItems: 'center' }}
        >
          {
            //   this.state.displayAsset === 'image' ? (
            //   <Image
            //     source={{ uri: article.attributes.featured_image_url }}
            //     style={{ width: '100%', height: 250, marginBottom: 10 }}
            //     imageStyle={{ width: '100%', height: 250, marginBottom: 10 }}
            //     resizeMode={'cover'}
            //   />
            // ) : (
            //   <Video
            //     source={{ uri: article.attributes.featured_video_url }}
            //     // source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
            //     shouldPlay
            //     useNativeControls
            //     resizeMode="cover"
            //     style={{ width: '100%', height: 250, marginBottom: 10 }}
            //   />
            // )
          }
          {article.attributes.featured_video_url ? (
            <Video
              source={{ uri: article.attributes.featured_video_url }}
              // source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
              shouldPlay
              useNativeControls
              resizeMode="cover"
              style={{ width: '100%', height: 200, marginBottom: 10 }}
            />
          ) : (
            <Image
              source={{ uri: article.attributes.featured_image_url }}
              style={{ width: '100%', height: 200, marginBottom: 10 }}
              imageStyle={{ width: '100%', height: 200, marginBottom: 10 }}
              resizeMode={'cover'}
            />
          )}
          <View
            style={{
              marginTop: 5,
              paddingRight: 10,
              paddingLeft: 10
            }}
          >
            <View style={[style.horizontal_align, {}]}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%'
                }}
              >
                <View>
                  <Text style={ArticleSingleScreenStyles.authorText}>
                    {article.attributes.author}
                  </Text>
                  <Text style={ArticleSingleScreenStyles.textDate}>
                    {Moment(publishedDate).format('dddd, MMMM Do YYYY')}
                  </Text>
                </View>
                <Text style={ArticleSingleScreenStyles.readingTimeText}>
                  {language === 'ar' ? 'وقت القرائة' : 'Reading Time'}:{' '}
                  {article.attributes.reading_time
                    ? `${article.attributes.reading_time} ${language === 'ar' ? 'دقائق' : 'mins'}`
                    : language === 'ar'
                    ? 'غير متوفر'
                    : 'not available'}
                </Text>
                {
                  //   article.attributes.featured_video_url ? (
                  //   <TouchableOpacity
                  //     onPress={() =>
                  //       this.setState(prevState => ({
                  //         displayAsset: prevState.displayAsset === 'video' ? 'image' : 'video'
                  //       }))
                  //     }
                  //   >
                  //     <Text
                  //       style={{
                  //         fontFamily: 'Lato-Regular',
                  //         fontSize: 14,
                  //         color: '#006862'
                  //       }}
                  //     >
                  //       {this.state.displayAsset === 'video' ? 'Display Image' : 'Watch Video'}
                  //     </Text>
                  //   </TouchableOpacity>
                  // ) : null
                }
              </View>
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 15
              }}
            >
              <View style={[style.horizontal_line, { width: '100%' }]} />
            </View>
            <Text style={{ marginTop: 12, fontFamily: 'Lato-Black', fontSize: 20 }}>
              {article.attributes.title}
            </Text>
            <Text style={{ fontSize: 12, marginTop: 5 }}>{article.attributes.subtitle}</Text>
          </View>
          {singleArticle ? (
            singleArticle.attributes.body_mobile !== null &&
            singleArticle.attributes.body_mobile !== '' ? (
              <View style={{ alignSelf: 'center', width: '95%' }}>
                <HTMLView
                  value={singleArticle.attributes.body_mobile}
                  lineBreak={null}
                  addLineBreaks={false}
                  paragraphBreak={null}
                  stylesheet={{ img: { margin: 0, padding: 0 } }}
                  // style={{ height: 5, width: '100%', marginTop: '2%', borderWidth: 0 }}
                />
              </View>
            ) : (
              <Text
                style={{
                  fontSize: 12,
                  marginTop: 20,
                  fontFamily: 'Tajawal-Light',
                  alignSelf: 'center'
                }}
              >
                {language === 'ar'
                  ? 'لم يتم تقديم محتوى هذا المقال لشاشة الجوال.'
                  : "This article's content has not been provided for mobile display."}
              </Text>
            )
          ) : (
            <ActivityIndicator size="large" color="#003430" style={{ margin: 15 }} />
          )}
          <View
            style={{ height: 1, backgroundColor: 'rgb(154, 154, 154)', width: '80%', marginTop: 7 }}
          />
          <SectionHeader
            style={{ marginTop: 7 }}
            headerText={this.pickLanguage({
              ar: 'أكثر مثل هذا',
              en: 'More like this'
            })}
            showButton={false}
            showIcon={false}
          />

          {!props.isFetching && !props.isFetchingSingleArticle ? (
            <FlatList
              data={props.relatedArticles}
              keyExtractor={(item, index) => `${index}`}
              scrollEnabled
              style={{ marginTop: 7 }}
              ListEmptyComponent={
                <Text
                  style={{
                    fontFamily: 'Lato-Light',
                    alignSelf: 'center',
                    marginTop: '10%',
                    fontSize: 15
                  }}
                >
                  No related articles found
                </Text>
              }
              renderItem={item => (
                <SingleArticle
                  language={language}
                  title={item.item.attributes.title}
                  description={item.item.attributes.body_truncated}
                  readingTime={item.item.attributes.reading_time}
                  onPress={async () => {
                    await Actions.refresh({
                      article: item.item
                    });

                    relatedArticlesFetch(item.item.id);
                    await fetchSingleArticle(item.item.id);
                    this.scroller.scrollTo({ x: 0, y: 0, animated: true });
                  }}
                  source={{
                    uri: item.item.attributes.featured_image_url
                  }}
                />
              )}
            />
          ) : (
            <ActivityIndicator size="large" color="#003430" style={{ margin: 15 }} />
          )}
        </ScrollView>
      </View>
    );
  }
}

const style = EStyleSheet.create({
  horizontal_align: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  horizontal_line_black: {
    width: '100%',
    backgroundColor: 'black',
    height: 1
  },
  horizontal_line: {
    width: '100%',
    backgroundColor: 'rgb(181,181,181)',
    height: 1
  },
  webpage: {
    height: 50
  }
});
