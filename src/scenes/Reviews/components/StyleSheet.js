import EStyleSheet from 'react-native-extended-stylesheet';

export const ReviewsComponentStyle = EStyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 6
  },
  noContentTextStyle: {
    fontSize: 15,
    fontFamily: '$light'
  },
  writeReviewTextStyle: {
    fontFamily: '$black'
  }
});

export const ReviewStyles = EStyleSheet.create({
  bodyTextStyle: {
    fontFamily: '$light',
    marginLeft: '5%',
    marginTop: '2%',
    fontSize: 12,
    width: '90%'
  },
  titleDateTextStyle: {
    fontFamily: '$light',
    fontSize: 11,
    marginLeft: '4%',
    color: '#rgb(23, 106, 76)'
  }
});

export const ReviewsModalStyles = EStyleSheet.create({
  headerTextStyle: {
    fontFamily: '$black',
    color: '#006862',
    marginLeft: '5%',
    width: '60%',
    fontSize: 14
  },
  titleDateTextStyle: {
    fontFamily: '$light',
    fontSize: 11,
    marginLeft: '4%',
    color: '#rgb(23, 106, 76)'
  }
});
