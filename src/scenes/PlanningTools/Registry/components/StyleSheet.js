import EStyleSheet from 'react-native-extended-stylesheet';

export const RegistryScreenStyles = EStyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 6
  },
  text: {
    fontSize: 20,
    fontFamily: '$black',
    color: '#004d45'
  },
  guideStyle: {
    fontFamily: '$light',
    fontSize: 12,
    margin: 7
  }
});

export const RegistryInitialStyles = EStyleSheet.create({
  textStyle: {
    fontSize: 15,
    fontFamily: '$medium'
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
  }
});

export const RegistryFormStyles = EStyleSheet.create({
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
  },
  elementContainer: {
    backgroundColor: '#ebebeb',
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ffffff'
  },
  textInputStyle: {
    height: '80%',
    width: '50%',
    marginLeft: '8%',
    marginTop: '0%'
  }
});
