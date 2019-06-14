import React, { PropTypes } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import * as ArticlesActions from '../actions';
import ArticlesScreen from './components/ArticlesScreen';

class Articles extends React.Component {
  constructor() {
    super();
    this.state = {
      page: 1,
      pageQueried: 1,
      query: ''
    };
  }
  componentWillMount() {
    this.props.articlesFetch(this.state.page);
    this.props.articleTagsFetch();
  }

  render() {
    const { props, state } = this;
    const { articles, resetMoreData, articlesSearch, articlesQueried, ...inheritedProps } = props;
    const { query, page, pageQueried, pendingActivity } = state;
    return (
      <ArticlesScreen
        {...inheritedProps}
        query={query}
        pendingActivity={pendingActivity}
        language={props.language}
        data={query.length ? articlesQueried : articles}
        tags={props.tags}
        onRefresh={() => {
          props.articlesFetch(1, this.state.tag);
          this.setState({
            query: '',
            page: 2
          });
        }}
        fetchSingleArticle={this.props.fetchSingleArticle}
        refreshing={pendingActivity || props.isFetchingSearch || props.isFetchingArticles}
        isFetchingArticles={props.isFetchingArticles}
        onEndReached={() => {
          clearTimeout(this.searchTimeout);
          if (query === '' && this.props.moreData) {
            this.props.articlesFetch(page, this.state.tag);
            this.setState(prevState => ({
              page: prevState.page + 1
            }));
          } else if (this.props.moreDataSearch) {
            if (query.length) {
              articlesSearch(pageQueried, query);
              this.setState(prevState => ({
                pageQueried: prevState.pageQueried + 1
              }));
            }
          }
        }}
        articlesSearch={() => {
          clearTimeout(this.searchTimeout);
          if (query.length) {
            articlesSearch(pageQueried, query);
            this.setState({
              pendingActivity: false
            });
          }
        }}
        onSearchTextChange={string => {
          try {
            clearTimeout(this.searchTimeout);
          } catch (e) {}
          this.setState({
            pendingActivity: true,
            query: string,
            pageQueried: 1
          });
          if (string === '') {
            resetMoreData();
            this.setState({
              pendingActivity: false
            });
          } else {
            this.searchTimeout = setTimeout(() => {
              if (string.length) {
                articlesSearch(pageQueried, string);
                this.setState({
                  pendingActivity: false
                });
              }
            }, 500);
          }
        }}
        clearFilter={async () => {
          await props.clearFilter();
          props.articlesRefresh(1);
          this.setState({
            page: 1
          });
        }}
        applyFilter={() => {
          props.articlesRefresh(1, props.tag);
          this.setState({
            page: 1
          });
        }}
      />
    );
  }
}

function mapStateToProps(state, props) {
  return {
    ...state.articlesReducer,
    ...state.languageReducer
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ArticlesActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Articles);
