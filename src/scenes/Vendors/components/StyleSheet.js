import EStyleSheet from 'react-native-extended-stylesheet';

export const VendorsScreenStyles = EStyleSheet.create({});

export const SwiperItemStyles = EStyleSheet.create({
  headerTextStyle: {
    color: 'rgb(0,52,48)',
    fontSize: 23,
    fontFamily: '$medium'
  },
  textStyle: {
    color: 'rgb(0,52,48)',
    fontWeight: '500',
    textAlign: 'center',
    fontFamily: '$light',
    fontSize: 12,
    marginTop: 10
  },
  buttonTextStyle: {
    fontSize: 8,
    fontFamily: '$light'
  }
});

export const VendorsTabStyles = EStyleSheet.create({
  labelStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    fontFamily: '$medium',
    marginBottom: 5
  }
});
