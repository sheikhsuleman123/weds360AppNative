import EStyleSheet from 'react-native-extended-stylesheet';

export const InspirationScreenStyles = EStyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 6
  },
  text: {
    fontSize: 15
  }
});

export const CASStyles = EStyleSheet.create({
  textStyle: {
    fontFamily: '$medium',
    fontSize: 12,
    flexWrap: 'wrap'
  }
});

export const CardArticleStyles = EStyleSheet.create({
  headerStyle: {
    fontSize: 14,
    fontFamily: '$medium'
  },
  descriptionStyle: {
    fontSize: 12,
    fontFamily: '$light'
  }
});
