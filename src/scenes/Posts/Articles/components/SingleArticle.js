import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import Image from 'react-native-image-progress';
import { SingleArticleStyles } from './StyleSheet';

export default class SingleArticle extends React.Component {
  render() {
    const { language, onPress, source, description, title, readingTime } = this.props;

    return (
      <TouchableOpacity onPress={onPress}>
        <View style={SingleArticleStyles.horizontal_align}>
          <Image
            source={source}
            style={{ width: '40%', height: '80%', marginBottom: 10 }}
            resizeMode={'cover'}
          />
          <View style={{ maxWidth: '60%', padding: 5, marginTop: 5 }}>
            <Text style={SingleArticleStyles.textTitle}>{title}</Text>
            <Text numberOfLines={2} style={SingleArticleStyles.textDescription}>
              {description}
            </Text>
            <Text style={SingleArticleStyles.readMoreText}>
              {language === 'ar' ? 'المزيد' : 'Read more'}
            </Text>
            <Text style={SingleArticleStyles.readingTimeText}>
              {readingTime
                ? `${language === 'ar' ? 'وقت القرائة: ' : 'Reading Time: '}${readingTime} ${
                    language === 'ar' ? 'دقائق' : 'mins'
                  }`
                : ' '}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
