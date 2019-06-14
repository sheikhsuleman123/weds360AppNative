import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ReviewsActions from './actions';
import ReviewsModal from './components/ReviewsModal';

class Reviews extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    const props = this.props;
    return (
      <ReviewsModal
        {...props}
        onSavePress={(rating, body) => {
          this.props.onSavePress();
          if (body && body.length) {
            const requestBody = JSON.stringify({
              ...props.id,
              review: {
                body,
                rating
              }
            });
            this.props.reviewCreate(requestBody);
          }
        }}
      />
    );
  }
}

function mapStateToProps(state, props) {
  return {
    ...state.reviewsReducer
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ReviewsActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Reviews);
