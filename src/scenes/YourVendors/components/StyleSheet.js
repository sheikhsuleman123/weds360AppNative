import EStyleSheet from 'react-native-extended-stylesheet';

export const YourVendorsScreenStyles = EStyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 6
  },
  textHeader: {
    fontSize: 22,
    fontFamily: '$medium'
  },
  textDescription: {
    fontFamily: '$light',
    fontSize: 13
  },
  seeAll: {
    fontSize: 10,
    fontFamily: '$medium',
    textAlign: 'center'
  }
});

export const VendorsTabStyles = EStyleSheet.create({
  textHeader: {
    fontFamily: '$light',
    fontSize: 13,
    textAlign: 'right'
  },
  textDescription: {
    fontFamily: '$medium',
    fontSize: 15
  }
});
