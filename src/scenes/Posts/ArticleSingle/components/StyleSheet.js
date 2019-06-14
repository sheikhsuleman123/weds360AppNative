import EStyleSheet from 'react-native-extended-stylesheet';

export const ArticleSingleScreenStyles = EStyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 6
  },
  textDate: {
    fontFamily: '$medium',
    fontSize: 12,
    color: '#006862'
  },
  readingTimeText: {
    fontFamily: '$light',
    fontSize: 8,
    color: '#006862',
    marginTop: 2
  },
  authorText: {
    fontFamily: '$medium',
    fontSize: 14,
    color: '#006862'
  }
});
