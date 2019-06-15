import React from 'react';
import { ActivityIndicator, ScrollView, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import ServiceCategory from  '../../../components/ServiceCategory'; 
import { VendorsScreenStyles } from './StyleSheet';

export default class VendorsScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  pickLanguage = json => (this.props.language === 'ar' ? json.ar : json.en);

  render() {
    const { categories, language } = this.props;
    if (categories) {
      const ForHim = categories.filter(category => {
        if (category.attributes.parent_menu === 'for_him') {
          return category;
        }
      });
      const ForHer = categories.filter(category => {
        if (category.attributes.parent_menu === 'for_her') {
          return category;
        }
      });
      const ForTheWedding = categories.filter(category => {
        if (category.attributes.parent_menu === 'for_the_wedding') {
          return category;
        }
      });
      return (
        <View>
          <ScrollView
            style={{ width: '100%', height: '100%'}}
            contentContainerStyle={{ flex: 0 }}
            showsVerticalScrollIndicator={false}
          >
            {this.props.isFetching ? (
              <ActivityIndicator
                style={{
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  marginTop: '40%',
                  marginBottom: 'auto',
                  ...this.props.style
                }}
                size="large"
                color="#003430"
              />
            ) : (
              <View>
                <ServiceCategory
                  language={language}
                  data={ForHer}
                  headerText={this.pickLanguage({ ar: 'من أجلِك', en: 'For Her' })}
                  buttonText={this.pickLanguage({ ar: 'المزيد', en: 'See All' })}
                  onSectionPress={() => {
                    Actions.categories_screens({
                      title: this.pickLanguage({ ar: 'من أجلِك', en: 'For Her' }),
                      categories: ForHer
                    });
                  }}
                />

                <ServiceCategory
                  language={language}
                  data={ForHim}
                  headerText={this.pickLanguage({ ar: 'من أجلَك', en: 'For Him' })}
                  buttonText={this.pickLanguage({ ar: 'المزيد', en: 'See All' })}
                  onSectionPress={() => {
                    Actions.categories_screens({
                      title: this.pickLanguage({ ar: 'من أجلَك', en: 'For Him' }),
                      categories: ForHim
                    });
                  }}
                />

                <ServiceCategory
                  language={language}
                  data={ForTheWedding}
                  headerText={this.pickLanguage({ ar: 'من أجل العرس', en: 'For The Wedding' })}
                  buttonText={this.pickLanguage({ ar: 'المزيد', en: 'See All' })}
                  onSectionPress={() => {
                    Actions.categories_screens({
                      title: this.pickLanguage({ ar: 'من أجل العرس', en: 'For The Wedding' }),
                      categories: ForTheWedding
                    });
                  }}
                />
              </View>
            )}
          </ScrollView>
        </View>
      );
    }
    return (
      <ActivityIndicator
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        size="large"
        color="#003430"
      />
    );
  }
}
