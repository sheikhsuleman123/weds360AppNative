import EStyleSheet from 'react-native-extended-stylesheet';

export const CategoriesScreenStyles = EStyleSheet.create({
  horizontal_align: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  }
});

export const DARILStyles = EStyleSheet.create({
  elementNameStyle: {
    fontFamily: '$light',
    fontSize: 12
  },
  elementTypeStyle: {
    fontFamily: '$medium',
    fontSize: 10
  }
});

export const InfoStyles = EStyleSheet.create({
  keyStyle: {
    fontFamily: '$black',
    color: 'rgb(0, 105, 99)',
    fontSize: 15,
    width: '25%'
  },
  valueStyle: {
    fontFamily: '$medium',
    marginRight: 5,
    marginLeft: 5,
    fontSize: 13,
    width: '25%'
  },
  textStyle: {
    fontFamily: '$light',
    marginLeft: '5%',
    marginTop: 0,
    fontSize: 15,
    alignSelf: 'center'
  },
  subHeaderTextStyle: {
    fontFamily: '$black',
    marginLeft: 10,
    fontSize: 20,
    letterSpacing: 1,
    width: '70%'
  },
  tagsHeaderTextStyle: {
    fontFamily: '$black',
    marginLeft: '5%',
    marginTop: '3%',
    fontSize: 16
  },
  tagsTextStyle: {
    fontFamily: '$light',
    marginLeft: '5%',
    fontSize: 13
  }
});
