import EStyleSheet from 'react-native-extended-stylesheet';

export const GuestlistScreenStyles = EStyleSheet.create({
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

export const GuestlistInitialStyles = EStyleSheet.create({
  descriptionTextStyle: {
    fontFamily: '$light',
    fontSize: 14.5,
    padding: '11%',
    textAlign: 'center'
  },
  headerTextStyle: {
    fontFamily: '$medium',
    fontSize: 18.5,
    marginTop: 28
  }
});

export const GuestlistFormStyles = EStyleSheet.create({
  headerTextStyle: {
    fontFamily: '$black',
    color: '#006862',
    marginLeft: '5%',
    width: '60%',
    fontSize: 14
  },
  descriptionStyle: {
    fontFamily: '$light',
    fontSize: 14,
    padding: '11%'
  },
  amountSpendStyle: {
    fontFamily: '$light',
    color: '#004d45',
    fontSize: 14.5
  },
  lightText: {
    fontFamily: '$light'
  },
  imageURIStyle: {
    fontFamily: '$light',
    fontSize: 10
  }
});
