import React from 'react';
import { ActivityIndicator, View, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import RingFilterScreen from '../components/RingFilterScreen';
import DressesAndRingsList from '../../components/DressesAndRingsList';
import Search from '@components/SearchBar';
import Header from '@components/Header';
import FilterButton from '@components/FilterButton';
import DataError from '@components/DataError';
import { RingsScreenStyles } from './StyleSheet';

export default class RingsScreen extends React.Component {
  constructor(props) {
    super();
    this.state = {
      modalVisibile: false,
      query: '',
      modified: false,
      page: 1
    };
  }

  render() {
    const {
      language,
      isFetchingRings,
      ringsSearch,
      tags,
      category,
      stone_shape,
      moreData,
      ringsData,
      purity,
      clarity,
      tag,
      ringsFetch,
      clearFilter
    } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <Header
          language={language}
          showIcon
          headerText={language === 'ar' ? 'مجوهرات' : 'Rings'}
          showBottomLine
          showBackButton
          onBackPressed={() => {
            Actions.pop();
          }}
          icon={require('@assets/images/vendors.png')}
        />
        <View
          style={{
            flexDirection: 'row',
            marginTop: 10,
            alignItems: 'center'
          }}
        >
          <Search
            language={language}
            placeholder={language === 'ar' ? 'بحث عن مجوهرات' : 'SEARCH RING HERE'}
            style={{ width: '65%' }}
            onChangeText={text => {
              this.setState({
                query: text,
                modified: true
              });
            }}
            onSubmitEditing={() => {
              this.setState({
                page: 1
              });
              ringsSearch(1, this.state.query);
            }}
          />
          <FilterButton
            isOpen={this.state.modalVisibile}
            onPress={() => {
              this.setState({
                modalVisibile: true
              });
            }}
            disabled={!tags}
            style={{ marginLeft: 15 }}
          />
        </View>
        <DressesAndRingsList
          language={language}
          data={ringsData}
          modified={this.state.modified}
          rings
          cardStyle={{
            height: 250,
            width: Dimensions.get('window').width / 2 - 5
          }}
          isFetching={isFetchingRings}
          onRefresh={() => {
            ringsFetch(1, category.item.id);
          }}
          ListEmptyComponent={
            <DataError
              onPress={() => ringsFetch(1, category.item.id)}
              noData={ringsData && ringsData.length === 0}
              language={language}
            />
          }
          onEndReached={() => {
            if (moreData) {
              if (this.state.query === '') {
                ringsFetch(this.state.page + 1, category.item.id, this.state.tag);
              } else {
                ringsSearch(this.state.page + 1, this.state.query);
              }
              this.setState({
                page: this.state.page + 1
              });
            }
          }}
        />
        <RingFilterScreen
          tags={tags}
          onClose={() => {
            this.setState({
              modalVisibile: false
            });
          }}
          modalVisibile={this.state.modalVisibile}
          applyFilter={() => {
            this.setState({
              page: 1,
              modalVisibile: false
            });
            ringsFetch(1, category.item.id, stone_shape, clarity, purity, tag);
          }}
          clearFilter={() => {
            this.setState({
              page: 1,
              modalVisibile: false
            });
            clearFilter();
          }}
        />
      </View>
    );
  }
}
