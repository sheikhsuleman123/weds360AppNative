import React from 'react';
import { ActivityIndicator, View, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Search from '../../../../components/SearchBar';
import Header from '../../../../components/Header';
import FilterButton from '../../../../components/FilterButton';
import DataError from '../../../../components/DataError';
import DressesAndRingsList from '../../components/DressesAndRingsList';
import DressFilterScreen from './DressFilterScreen';
import { DressesScreenStyles } from './StyleSheet';

export default class DressesScreen extends React.Component {
  constructor(props) {
    super();
    // props.dressesFetch();
    this.state = {
      modalVisibile: false,
      query: '',
      modified: false,
      page: 1
    };
  }
  componentWillMount() {
    this.props.dressesFetch(1, this.props.category.item.id);
    this.props.tagsFetch(this.props.category.item.id);
  }
  pickLanguage = json => (this.props.language === 'ar' ? json.ar : json.en);
  render() {
    const { language, isFetching, dressesData } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <Header
          language={language}
          showIcon
          headerText={language === 'ar' ? 'فساتين' : 'Dresses'}
          showBottomLine
          showBackButton
          onBackPressed={() => {
            Actions.pop();
          }}
          icon={require('../../../../../assets/images/vendors.png')}
        />
        <View
          style={{
            flexDirection: 'row',
            marginTop: 10,
            marginLeft: 5,
            alignItems: 'center'
          }}
        >
          <Search
            language={language}
            placeholder={this.pickLanguage({ ar: 'بحث عن الفساتين هنا', en: 'SEARCH DRESS HERE' })}
            style={{ width: '65%' }}
            onChangeText={text => {
              this.setState({
                query: text,
                modified: true
              });
            }}
            onSubmitEditing={() => {
              this.props.dressesSearch(1, this.state.query);
            }}
          />
          <FilterButton
            isOpen={this.state.modalVisibile}
            onPress={() => {
              this.setState({
                modalVisibile: true
              });
            }}
            disabled={!this.props.tags}
            style={{ marginLeft: 15 }}
          />

        </View>

        <DressesAndRingsList
          language={this.props.language}
          modified={this.state.modified}
          data={dressesData}
          extraData={dressesData}
          cardStyle={{
            height: 360,
            width: Dimensions.get('window').width / 2 - 5
          }}
          isFetching={isFetching}
          onRefresh={() => {
            this.props.dressesFetch(1, this.props.category.item.id);
          }}
          ListEmptyComponent={
            <DataError
              onPress={() => this.props.dressesFetch(1, this.props.category.item.id)}
              noData={dressesData && dressesData.length === 0}
              language={language}
            />
          }
          onEndReached={() => {
            if (this.props.moreData) {
              if (this.state.query === '') {
                this.props.dressesFetch(
                  this.state.page + 1,
                  this.props.category.item.id,
                  this.props.dress_cut,
                  this.state.tag
                );
              } else {
                this.props.dressesSearch(this.state.page + 1, this.state.query);
              }
              this.setState({
                page: this.state.page + 1
              });
            }
          }}
        />
        <DressFilterScreen
          tags={this.props.tags}
          onClose={() => {
            this.setState({
              modalVisibile: false
            });
          }}
          modalVisibile={this.state.modalVisibile}
          clearFilter={async () => {
            this.setState({
              modalVisibile: false
            });
            await this.props.clearFilter();
            this.props.dressesFetch(1, this.props.category.item.id);
          }}
          applyFilter={() => {
            this.setState({
              modalVisibile: false
            });
            this.props.dressesFetch(
              1,
              this.props.category.item.id,
              this.props.dress_cut,
              this.props.tag
            );
          }}
        />
      </View>
    );
  }
}
