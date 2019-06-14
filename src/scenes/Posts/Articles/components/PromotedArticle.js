import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import Image from 'react-native-image-progress';
import { PromotedArticleStyles } from './StyleSheet';

export default class PromotedArticle extends React.Component {
  render() {
    const { language, onPress, source, description, title, readingTime } = this.props;
    return (
      <TouchableOpacity onPress={onPress} style={PromotedArticleStyles.horizontal_align}>
        <Image source={source} style={{ width: '55%', height: 200 }} resizeMode={'contain'} />
        <View style={{ maxWidth: '40%', padding: 20 }}>
          <Text style={PromotedArticleStyles.textTitle}>{title}</Text>
          <Text numberOfLines={3} style={PromotedArticleStyles.textDescription}>
            {description}
          </Text>
          <Text style={PromotedArticleStyles.readMoreText}>
            {language === 'ar' ? 'المزيد' : 'Read more'}
          </Text>
          <Text style={PromotedArticleStyles.readingTimeText}>
            {readingTime
              ? `${language === 'ar' ? 'وقت القرائة: ' : 'Reading Time: '}${readingTime} ${
                  language === 'ar' ? 'دقائق' : 'mins'
                }`
              : ' '}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}
