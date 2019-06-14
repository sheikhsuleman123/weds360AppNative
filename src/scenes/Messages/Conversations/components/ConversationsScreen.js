import React from 'react';
import { FlatList, View, Image, Text, RefreshControl } from 'react-native';
import { Actions } from 'react-native-router-flux';
import OutlinedButton from '@components/OutlinedButton';
import Search from '@components/SearchBar';
import ConversationItemList from './ConversationItemList';
import NoMessageScreen from './NoMessageScreen';
import { ConversationsScreenStyles } from './StyleSheet';
import I18n from '@i18n';

const mainPath = 'messages.general.text.';

export default class ConversationsScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  state = { query: '' };

  pickLanguage = json => (this.props.language === 'ar' ? json.ar : json.en);
  render() {
    const { language, isFetching, unread, conversations, conversationsFetch } = this.props;
    const { query } = this.state;
    return (
      <View style={{ height: '100%', backgroundColor: 'white' }}>
        <View
          style={{
            width: '100%',
            borderBottomWidth: 0.5,
            borderBottomColor: 'black',
            height: '20%'
          }}
        >
          <View
            style={{
              marginTop: 20,
              justifyContent: 'space-between',
              flexDirection: language === 'ar' ? 'row' : 'row-reverse',
              marginLeft: 20, marginRight: 20
            }}
          >
            <Search
              language={language}
              placeholder={I18n.t(`${mainPath}search_messages`)}
              style={{ width: '55%' }}
              onChangeText={text => {
                this.setState({ query: text });
              }}
            />
            <View
              style={{
                alignItems: 'center',
                flexDirection: language === 'ar' ? 'row' : 'row-reverse'
              }}
            >
              <Text style={ConversationsScreenStyles.inboxTextStyle}>
                {this.pickLanguage({ ar: 'الوارد', en: 'INBOX' })}
              </Text>
              <Image
                source={require('@assets/openMessage.png')}
                style={{ width: 30, height: 30, marginRight: 5 }}
                resizeMode={'contain'}
              />
            </View>
          </View>

          {unread ? (
            <Text style={ConversationsScreenStyles.notificationTextStyle}>
              {this.pickLanguage({
                ar: 'لديك رسائل غير مقروءة',
                en: 'You have unread messages'
              })}
            </Text>
          ) : (
            <View
              style={{
                marginLeft: 20,
                marginBottom: 20,
                marginTop: 5
              }}
            />
          )}
        </View>
        <View style={{ height: '80%' }}>
          <FlatList
            keyExtractor={(item, index) => `${index}`}
            data={
              conversations &&
              conversations.filter(
                x =>
                  x.attributes.recipient_name.toLowerCase().includes(query.toLowerCase()) ||
                  x.attributes.subject.toLowerCase().includes(query.toLowerCase())
              )
            }
            extraData={isFetching}
            style={{ height: '80%' }}
            refreshControl={
              <RefreshControl
                refreshing={isFetching}
                onRefresh={() => {
                  conversationsFetch();
                }}
                tintColor="#000"
                titleColor="#000"
              />
            }
            ListEmptyComponent={<NoMessageScreen />}
            renderItem={item => (
              <ConversationItemList
                recipient_name={item.item.attributes.recipient_name}
                language={language}
                recipient_image={item.item.attributes.recipient_image}
                subject={item.item.attributes.subject}
                text={item.item.attributes.message_truncated}
                updated_at={item.item.attributes.updated_at}
                onMessagePressed={() => {
                  Actions.chat({
                    chat_data: item.item.content || item.item
                  });
                }}
                isBold={item.item.attributes.unread !== 0}
                showBadge={item.item.attributes.unread !== 0}
                badgeText={`${item.item.attributes.unread} new message`}
              />
            )}
          />
          <View
            style={{
              height: '20%',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              borderTopWidth: 0.5
            }}
          >
            <OutlinedButton
              text={this.pickLanguage({
                ar: 'ارسل رسالة',
                en: 'Send a message'
              })}
              onPress={() => Actions.new_message()}
            />
          </View>
        </View>
      </View>
    );
  }
}
