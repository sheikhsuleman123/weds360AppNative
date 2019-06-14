import EStyleSheet from 'react-native-extended-stylesheet';

export const ArticlesScreenStyles = EStyleSheet.create({
  horizontal_align: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  horizontal_line_black: {
    width: '100%',
    backgroundColor: 'black',
    height: 0.5
  },
  horizontal_line: {
    width: '100%',
    backgroundColor: 'rgb(181,181,181)',
    height: 0.5
  }
});

export const PromotedArticleStyles = EStyleSheet.create({
  horizontal_align: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 200,
    backgroundColor: 'rgba(181,181,181, 0.4)'
  },
  textTitle: {
    fontFamily: '$black',
    fontSize: 12
  },
  textDescription: {
    marginTop: 5,
    fontSize: 10,
    fontFamily: '$light'
  },
  readMoreText: {
    fontSize: 9,
    color: 'red',
    fontFamily: '$light'
  },
  readingTimeText: {
    fontSize: 8,
    color: '#006862',
    marginTop: 2,
    fontFamily: '$light'
  }
});

export const SingleArticleStyles = EStyleSheet.create({
  horizontal_align: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 120
  },
  textTitle: {
    fontFamily: '$black',
    fontSize: 12
  },
  textDescription: {
    marginTop: 5,
    fontSize: 10,
    fontFamily: '$light'
  },
  readMoreText: {
    fontSize: 9,
    color: 'red',
    fontFamily: '$light'
  },
  readingTimeText: {
    fontSize: 8,
    color: '#006862',
    marginTop: 2,
    fontFamily: '$light'
  }
});
