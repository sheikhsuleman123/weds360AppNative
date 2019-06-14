import React from 'react';
import { ActivityIndicator, Text, View, TextInput } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Header from '@components/Header';
import VendorsList from '@components/VendorsList';
import AdaptiveView from '@components/AdaptiveView';
import { NewConversationScreenStyles } from './StyleSheet';
import I18n from '@i18n';

const mainPath = 'messages.new_message.text.';

export default class NewConversationScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      filter: '',
      data: null
    };
  }

  render() {
    const { language } = this.props;
    return (
      <AdaptiveView style={{ flex: 1 }}>
        <Header
          onBackPressed={() => {
            Actions.pop();
          }}
          showIcon
          headerText={I18n.t(`${mainPath}new_message`)}
          showBottomLine
          showBackButton
        />
        <View
          style={{
            flexDirection: language === 'ar' ? 'row-reverse' : 'row',
            marginTop: 5,
            height: '5%',
            alignItems: 'center',
            padding: 6
          }}
        >
          <Text style={NewConversationScreenStyles.toTextStyle}>{I18n.t(`${mainPath}to`)}</Text>
          <TextInput
            style={{
              width: '80%',
              height: '100%'
            }}
            underlineColorAndroid="rgba(0,0,0,0)"
            placeholder="Name"
            onChangeText={async text =>
              this.setState({
                filterString: text
              })
            }
          />
        </View>
        <View
          style={{
            alignSelf: 'center',
            borderColor: '#b7b7b7',
            borderWidth: 0.5,
            width: '100%',
            marginBottom: 10
          }}
        />
        {this.props.isFetching ? (
          <ActivityIndicator
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
            size="large"
            color="#003430"
          />
        ) : (
          <VendorsList data={this.props.vendors} filterString={this.state.filterString} />
        )}
      </AdaptiveView>
    );
  }
}
