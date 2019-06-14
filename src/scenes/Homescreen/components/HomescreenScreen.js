import React, { Component } from 'react';
import { Linking, ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import ToDoListItem from '@scenes/PlanningTools/Checklist/components/ToDoListItem';
import I18n from '@i18n';

import Gallery from '../../Inspiration/components/Gallery';
import SectionHeader from '@components/SectionHeader';
import PlanningItem from '../../PlanningTools/components/PlanningItem';
import MainServiceCategory from '@components/MainServiceCategory';
import { HomescreenStyles } from './StyleSheet';
import Header from './Header';

export default class HomeScreen extends Component {
  constructor() {
    super();
    this.state = {
      daysLeft: 0
    };
  }

  pickLanguage = json => (this.props.language === 'ar' ? json.ar : json.en);
  render() {
    const { language, checklists } = this.props;
    const modifiedChecklists = checklists && checklists.filter(item => !item.attributes.done);
    return !this.props.profile ? (
      <ActivityIndicator
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        size="large"
        color="#003430"
      />
    ) : (
      <View style={{ marginBottom: 106.5 }}>
        <Header
          language={language}
          showIcon
          showBottomLine={false}
          headerText={'Home'}
          profile={this.props.profile}
          daysLeft={this.state.daysLeft}
          icon={require('@assets/images/vendors.png')}
          onDropDownPress={() => {
            Actions.edit_profile({
              profile: this.props.profile
            });
          }}
        />
        <ScrollView style={{ padding: 10 }}>
          <View style={{ marginBottom: 50 }}>
            <SectionHeader
              onPress={() => this.props.navigation.navigate(I18n.t('tabs.primary_tabs.categories_tab'), { index: 0})}
              showIcon
              language={language}
              icon={require('@assets/images/vendors.png')}
              headerText={I18n.t('homescreen.text.categories').toUpperCase()}
              buttonText={I18n.t('homescreen.text.see_all')}
              showButton
              style={{ marginTop: 3, marginBottom: 10 }}
            />
            {!this.props.categories ? (
              <ActivityIndicator size="large" color="#003430" />
            ) : (
              <MainServiceCategory data={this.props.categories} />
            )}

            <View style={[HomescreenStyles.horizontal_line, { marginTop: 10, marginBottom: 10 }]} />
            <SectionHeader
              onPress={() => {
                this.props.navigation.navigate(I18n.t('tabs.primary_tabs.inspirations_tab'));
              }}
              icon={require('@assets/images/inspiration.png')}
              language={language}
              headerText={I18n.t('homescreen.text.inspirations').toUpperCase()}
              buttonText={I18n.t('homescreen.text.see_all')}
              showButton
              showIcon
              style={{ marginTop: 3, marginBottom: 10 }}
            />
            {!this.props.inspirations ? (
              <ActivityIndicator size="large" color="#003430" />
            ) : (
              <Gallery
                inspirations={this.props.inspirations}
                onPress={() => {
                  Actions.image_single({
                    image
                  });
                }}
              />
            )}
            <View style={[HomescreenStyles.horizontal_line, { marginTop: 10, marginBottom: 10 }]} />
            {this.props.profile.attributes.role === 'user' ? null : (
              <View>
                <SectionHeader
                  onPress={() => {
                    Actions.checklist();
                  }}
                  icon={require('@assets/checklist.png')}
                  headerText={I18n.t('homescreen.text.todos')}
                  buttonText={I18n.t('homescreen.text.see_all')}
                  showButton
                  showIcon
                  language={language}
                />
                {modifiedChecklists && modifiedChecklists.length > 0 ? (
                  <View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignSelf: 'center',
                        marginTop: '1%'
                      }}
                    >
                      {modifiedChecklists[0] && <ToDoListItem item={modifiedChecklists[0]} />}
                      <View style={HomescreenStyles.vertical_line} />
                      {modifiedChecklists[1] ? (
                        <ToDoListItem item={modifiedChecklists[1]} />
                      ) : (
                        <View
                          style={{
                            flex: 1,
                            padding: '2%'
                          }}
                        />
                      )}
                    </View>
                    <View style={HomescreenStyles.horizontal_line} />
                    <View
                      style={{
                        flexDirection: 'row',
                        alignSelf: 'center'
                      }}
                    >
                      {modifiedChecklists[2] ? (
                        <ToDoListItem item={modifiedChecklists[2]} />
                      ) : (
                        <View
                          style={{
                            flex: 1,
                            padding: '2%'
                          }}
                        />
                      )}
                      <View style={HomescreenStyles.vertical_line} />
                      {modifiedChecklists[3] ? (
                        <ToDoListItem item={modifiedChecklists[3]} />
                      ) : (
                        <View
                          style={{
                            flex: 1,
                            padding: '2%'
                          }}
                        />
                      )}
                    </View>
                  </View>
                ) : (
                  <View
                    style={{
                      width: '100%',
                      height: '5%',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Text style={HomescreenStyles.checklistStyle}>
                      {language === 'ar' ? 'ليس لديك اي' : 'You do not have any'}
                      <Text style={[HomescreenStyles.checklistStyle, { color: '#003430' }]}>
                        {' '}
                        {language === 'ar' ? 'مهام' : 'TO-DOs'}
                      </Text>
                    </Text>
                    <Text style={HomescreenStyles.checklistStyle}>
                      {language === 'ar' ? 'كله تمام' : 'All set for now!'}
                    </Text>
                  </View>
                )}
                <View
                  style={[HomescreenStyles.horizontal_line, { marginTop: 10, marginBottom: 10 }]}
                />
                <SectionHeader
                  icon={require('@assets/images/planning.png')}
                  headerText={I18n.t('homescreen.text.planning')}
                  showIcon
                  style={{ marginTop: 3, marginBottom: 10 }}
                  language={language}
                />
                <PlanningItem
                  language={language}
                  image={require('@assets/guestlist.png')}
                  title={I18n.t('homescreen.text.guestlist')}
                  subtitle={I18n.t('homescreen.text.manage_guestlist')}
                  buttonText={I18n.t('homescreen.text.manage')}
                  percentage={this.props.eventsPercent}
                  showProgress
                  onPress={() => {
                    Actions.guestlist();
                  }}
                />

                <PlanningItem
                  language={language}
                  image={require('@assets/images/wedding-website.png')}
                  title={I18n.t('homescreen.text.website')}
                  subtitle={I18n.t('homescreen.text.manage_website')}
                  buttonText={I18n.t('homescreen.text.manage')}
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
                  title={I18n.t('homescreen.text.budgeter')}
                  subtitle={I18n.t('homescreen.text.manage_budgeter')}
                  buttonText={I18n.t('homescreen.text.manage')}
                  percentage={this.props.budgeterPercent}
                  onPress={() => {
                    Actions.budgeter();
                  }}
                  showProgress
                />
                <PlanningItem
                  language={language}
                  image={require('@assets/images/registry_logo.png')}
                  title={I18n.t('homescreen.text.registry')}
                  subtitle={I18n.t('homescreen.text.manage_registry')}
                  buttonText={I18n.t('homescreen.text.manage')}
                  percentage={this.props.registriesPercent}
                  onPress={() => {
                    Actions.registry();
                  }}
                  showProgress
                />
                <PlanningItem
                  language={language}
                  image={require('@assets/checklist.png')}
                  title={I18n.t('homescreen.text.checklist')}
                  subtitle={I18n.t('homescreen.text.manage_checklist')}
                  buttonText={I18n.t('homescreen.text.manage')}
                  percentage={this.props.checklistPercent ? this.props.checklistPercent : 0}
                  onPress={() => {
                    Actions.checklist();
                  }}
                  showProgress
                />
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    );
  }
}
