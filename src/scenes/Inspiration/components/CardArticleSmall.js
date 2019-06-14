import React from 'react';
import { Image, Text, TouchableOpacity, View, Clipboard, Share } from 'react-native';
import { Card } from 'react-native-elements';
import { connectActionSheet } from '@expo/react-native-action-sheet';
import { BASE_WEB_URL } from '../../../constants';
import store from '../../../../store';
import { CASStyles } from './StyleSheet';

@connectActionSheet
export default class CardArticleSmall extends React.Component {
  render() {
    //
    return (
      <TouchableOpacity style={this.props.containerStyle} onPress={this.props.onCardPressed}>
        <Card
          containerStyle={[this.props.containerStyle, { width: '100%' }]}
          image={this.props.source}
          imageProps={{ resizeMode: 'cover' }}
          imageStyle={{
            height: this.props.containerStyle.height - this.props.textHeight
          }}
        >
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row'
            }}
          >
            <View style={{ marginRight: 'auto' }}>
              <Text style={CASStyles.textStyle}>
                {this.props.text.substring(0, 20)}
                {this.props.text.length > 20 ? '...' : ''}
              </Text>
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
              style={{ marginBottom: 'auto', backgroundColor: 'rgba(255,255,255,0.7)' }}
            >
              <Image
                source={require('@assets/images/vert_buttlets.png')}
                style={{ width: 20, height: 20 }}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
          </View>
        </Card>
      </TouchableOpacity>
    );
  }
}
