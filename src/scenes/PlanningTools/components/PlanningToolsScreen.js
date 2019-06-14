import React from 'react';
import { ScrollView, Linking, View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Header from '@components/Header';
import PlanningItem from '../components/PlanningItem';
import { PTSStyles } from './StyleSheet';

export default class PlanningToolsScreen extends React.Component {
  pickLanguage = json => (this.props.language === 'ar' ? json.ar : json.en);

  render() {
    const { language } = this.props;
    return (
      <View style={{ marginBottom: 10 }}>
        <Header
          showBottomLine
          headerText={this.pickLanguage({
            ar: 'أدوات التخطيط',
            en: 'Planning Tools'
          })}
        />
        <ScrollView style={{ marginBottom: 75, padding: 10 }}>
          <View style={{ padding: '4%' }}>
            <Text style={PTSStyles.textHeader}>
              {this.pickLanguage({ ar: 'أدوات التخطيط', en: 'Planning Tools' })}
            </Text>
            <Text style={PTSStyles.textDescription}>
              {this.pickLanguage({
                ar: 'طريقة سهلة للبقاء منظمين خلال حفل الزفاف الخاص بك.',
                en: 'The easy way to stay organized during your wedding.'
              })}
            </Text>
          </View>
          <PlanningItem
            language={language}
            image={require('@assets/guestlist.png')}
            title={this.pickLanguage({ ar: 'قائمة الضيوف', en: 'Guest List' })}
            subtitle={this.pickLanguage({
              ar: 'إدارة قائمة المدعوين وتتبع الردود على الدعوات في مكان واحد.',
              en: 'Manage your guest list and track RSVPs in one place.'
            })}
            buttonText={this.pickLanguage({
              ar: 'إدارة الآن!',
              en: 'Manage Now!'
            })}
            percentage={this.props.eventsPercent}
            showProgress
            onPress={() => {
              Actions.guestlist();
            }}
          />

          <PlanningItem
            language={language}
            image={require('@assets/images/wedding-website.png')}
            title={this.pickLanguage({
              ar: 'موقع الزفاف',
              en: 'Wedding Website'
            })}
            subtitle={this.pickLanguage({
              ar: 'إدارة موقع الويب الخاص بك وتتبع الردود على الدعوات في مكان واحد.',
              en: 'Manage your website and track RSVPs in one place.'
            })}
            buttonText={this.pickLanguage({
              ar: 'إدارة الآن!',
              en: 'Manage Now!'
            })}
            percentage={this.props.profile.attributes.website !== null ? 100 : 0}
            showProgress
            onPress={() => {
              Linking.openURL(
                this.props.profile.attributes.website ||
                  'https://beta.weds360.com/en/build_your_website'
              ).catch(err => console.error('An error occurred', err));
            }}
          />
          <PlanningItem
            language={language}
            image={require('@assets/images/tools-budgeter.png')}
            title={this.pickLanguage({
              ar: 'مدير الميزانية',
              en: 'Budgeter'
            })}
            subtitle={this.pickLanguage({
              ar: 'إدارة المتسابق الخاص بك وتتبع الردود على الدعوات في مكان واحد.',
              en: 'Manage your budgeter and track RSVPs in one place.'
            })}
            buttonText={this.pickLanguage({
              ar: 'إدارة الآن!',
              en: 'Manage Now!'
            })}
            percentage={this.props.budgeterPercent}
            onPress={() => {
              Actions.budgeter();
            }}
            showProgress
          />
          <PlanningItem
            language={language}
            image={require('@assets/images/registry_logo.png')}
            title={this.pickLanguage({
              ar: 'سجل',
              en: 'Registry'
            })}
            subtitle={this.pickLanguage({
              ar: 'إدارة السجل الخاص بك والتحقق من الهدايا الخاصة بك.',
              en: 'Manage your registry and check your gifts.'
            })}
            buttonText={this.pickLanguage({
              ar: 'إدارة الآن!',
              en: 'Manage Now!'
            })}
            percentage={this.props.registriesPercent}
            onPress={() => {
              Actions.registry();
            }}
            showProgress
          />
          <PlanningItem
            language={language}
            image={require('@assets/checklist.png')}
            title={this.pickLanguage({
              ar: 'قائمة تدقيق',
              en: 'Checklist'
            })}
            subtitle={this.pickLanguage({
              ar: 'إدارة قائمة التحقق الخاصة بك.',
              en: 'Manage your checklist.'
            })}
            buttonText={this.pickLanguage({
              ar: 'إدارة الآن!',
              en: 'Manage Now!'
            })}
            percentage={this.props.checklistPercent ? this.props.checklistPercent : 0}
            onPress={() => {
              Actions.checklist();
            }}
            showProgress
          />
        </ScrollView>
      </View>
    );
  }
}
