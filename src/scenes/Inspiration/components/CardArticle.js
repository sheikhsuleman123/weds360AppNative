import React from 'react';
import { Text, TouchableOpacity, View, Clipboard, Share, Dimensions } from 'react-native';
import Image from 'react-native-image-progress';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connectActionSheet } from '@expo/react-native-action-sheet';
import { BASE_WEB_URL } from '../../../constants';
import store from '../../../../store';
import { CardArticleStyles } from './StyleSheet';

@connectActionSheet
export default class CardArticle extends React.Component {
  render() {
    const { width, height } = Dimensions.get('window');
    return (
      <TouchableOpacity
        style={{
          width: '95%',
          margin: 5,
          alignSelf: 'center'
        }}
        disabled={this.props.disabled}
        onPress={this.props.onCardPressed}
      >
        <Image
          source={this.props.source}
          resizeMode="cover"
          style={{
            height: this.props.cardSmall ? 100 : height / 2,
            width: this.props.cardSmall ? '100%' : width,
            alignSelf: 'center'
          }}
        />
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            alignSelf: 'center',
            alignItems: 'center',
            borderWidth: 0.4,
            borderRadius: 2,
            marginTop: 5,
            borderColor: 'rgba(rgba(0, 0, 0, 0.3))'
          }}
        >
          <View style={{ width: '95%', padding: 7 }}>
            <Text style={CardArticleStyles.headerStyle}>{this.props.text}</Text>
            <Text style={CardArticleStyles.descriptionStyle}>{this.props.desc}</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              this.props.showActionSheetWithOptions(
                {
                  options: ['Cancel', 'Copy Link', 'Share'],
                  destructiveButtonIndex: 1,
                  cancelButtonIndex: 0
                },
                buttonIndex => {
                  switch (buttonIndex) {
                    case 1:
                      Clipboard.setString(
                        `${BASE_WEB_URL}/${store.getState().languageReducer.language}/photos/${
                          this.props.id
                        }`
                      );
                      break;
                    case 2:
                      Share.share(
                        {
                          message: `${BASE_WEB_URL}/${
                            store.getState().languageReducer.language
                          }/photos/${this.props.id}`,
                          url: `${BASE_WEB_URL}/${
                            store.getState().languageReducer.language
                          }/photos/${this.props.id}`,
                          title: this.props.title
                        },
                        {
                          dialogTitle: this.props.title
                        }
                      );
                      break;
                    default:
                  }
                }
              );
            }}
            style={{ paddingRight: 15 }}
          >
            <Icon name={'ellipsis-v'} style={{ fontSize: 20 }} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  }
}
