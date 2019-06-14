import EStyleSheet from 'react-native-extended-stylesheet';

export const ServicesScreenStyles = EStyleSheet.create({
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

export const SLIStyles = EStyleSheet.create({
  titleTextStyle: {
    fontFamily: '$black',
    fontSize: 17
  },
  subtitleTextStyle: {
    fontFamily: '$light',
    fontSize: 12,
    marginTop: '1%'
  }
});
