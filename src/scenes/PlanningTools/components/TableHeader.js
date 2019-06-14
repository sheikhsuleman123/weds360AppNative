import React from 'react';
import { TouchableOpacity, Image, ScrollView, Text, TextInput, View } from 'react-native';
import { TableHeaderStyles } from './StyleSheet';

export default class TableHeader extends React.Component {
  pickLanguage = json => (this.props.language === 'ar' ? json.ar : json.en);
  render() {
    const { language } = this.props;

    if (this.props.registry) {
      return (
        <View
          style={{
            padding: '1%',
            backgroundColor: '#ebebeb',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            ...this.props.style,
            height: 35
          }}
        >
          <Text style={[TableHeaderStyles.tableHeaderText, { width: '55%', alignSelf: 'center' }]}>
            {this.pickLanguage({ ar: 'قائمة التسجيل', en: 'REGISTRY LIST' })}
          </Text>

          <Text style={[TableHeaderStyles.tableHeaderText, { width: '35%', alignSelf: 'center' }]}>
            {this.pickLanguage({ ar: 'الحالة', en: 'STATUS' })}
          </Text>
        </View>
      );
    } else if (this.props.guestlist) {
      return (
        <View
          style={{
            backgroundColor: '#ebebeb',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1%',
            marginTop: 10,
            height: 35
          }}
        >
          <Text style={[TableHeaderStyles.tableHeaderText, { width: '30%', alignSelf: 'center' }]}>
            {this.pickLanguage({ ar: 'الاسم', en: 'NAME' })}
          </Text>
          <Text style={[TableHeaderStyles.tableHeaderText, { width: '35%', alignSelf: 'center' }]}>
            {this.pickLanguage({ ar: 'المدعوين', en: 'INVITES SENT' })}
          </Text>
          <Text style={TableHeaderStyles.tableHeaderText}>
            {this.pickLanguage({ ar: 'ردود', en: 'RSVP' })}
          </Text>
        </View>
      );
    }
    return (
      <View
        style={{
          backgroundColor: '#ebebeb',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1%',
          ...this.props.style,
          height: 35
        }}
      >
        <Text style={[TableHeaderStyles.tableHeaderText, { width: '55%', alignSelf: 'center' }]}>
          {this.pickLanguage({ ar: 'بائعين', en: 'VENDORS' })}
        </Text>
        <Text style={[TableHeaderStyles.tableHeaderText, { width: '25%', alignSelf: 'center' }]}>
          {this.pickLanguage({ ar: 'موصى به', en: 'RECOMMENDED' })}
        </Text>
        <Text style={[TableHeaderStyles.tableHeaderText, { width: '20%', alignSelf: 'center' }]}>
          {this.pickLanguage({ ar: 'أنفق', en: 'SPENT' })}
        </Text>
      </View>
    );
  }
}
