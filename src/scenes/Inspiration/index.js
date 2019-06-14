import React, { PropTypes } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import * as InspirationActions from './actions';
import InspirationScreen from './components/InspirationScreen';

class Inspiration extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor() {
    super();
    this.state = {
      page: 1,
      pageQueried: 1,
      query: ''
    };
  }
  componentWillMount() {
    if (!this.props.isFetching) this.props.photosFetch(this.state.page);
  }
  render() {
    const { props, state } = this;
    const { photos, resetMoreData, photosSearch, photosQueried, ...inheritedProps } = props;
    const { query, page, pageQueried, pendingActivity } = state;
    return (
      <InspirationScreen
        {...inheritedProps}
        query={query}
        pendingActivity={pendingActivity}
        photos={photos}
        photosQueried={photosQueried}
        onEndReached={() => {
          clearTimeout(this.searchTimeout);
          if (query === '' && this.props.moreData) {
            this.props.photosFetch(page);
            this.setState(prevState => ({
              page: prevState.page + 1
            }));
          } else if (this.props.moreDataSearch) {
            if (query.length) {
              photosSearch(pageQueried, query);
              this.setState(prevState => ({
                pageQueried: prevState.pageQueried + 1
              }));
            }
          }
        }}
        photosSearch={() => {
          clearTimeout(this.searchTimeout);
          if (query.length) {
            photosSearch(pageQueried, query);
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
          } else {
            this.searchTimeout = setTimeout(() => {
              if (string.length) {
                photosSearch(pageQueried, string);
                this.setState({
                  pendingActivity: false
                });
              }
            }, 500);
          }
        }}
        onRefresh={() => {
          this.props.photosFetch(1);
          this.setState({
            page: 2,
            pendingActivity: false
          });
        }}
      />
    );
  }
}

function mapStateToProps(state, props) {
  return {
    ...state.inspirationReducer,
    ...state.languageReducer
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(InspirationActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Inspiration);
