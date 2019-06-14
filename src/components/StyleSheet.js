import EStyleSheet from 'react-native-extended-stylesheet';

export const PlanningItemStyles = EStyleSheet.create({
  contentText: {
    fontFamily: '$light',
    fontSize: 13,
    color: '#000000'
  },
  titleText: { fontFamily: '$black', fontSize: 17 },
  descriptionText: {
    fontFamily: '$light',
    fontSize: 12
  },
  percentageText: {
    fontSize: 15,
    fontFamily: '$medium',
    color: '#004d45'
  },
  belowText: {
    fontSize: 10,
    fontFamily: '$medium',
    color: '#004d45'
  }
});

export const DataErrorStyles = EStyleSheet.create({
  textStyle: {
    fontFamily: '$light'
  }
});

export const VendorsListStyles = EStyleSheet.create({
  nameTextStyle: {
    fontFamily: '$medium',
    fontSize: 15
  },
  descriptionTextStyle: {
    fontFamily: '$light',
    fontSize: 12
  }
});

export const CTBStyles = EStyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 0.5,
    borderLeftWidth: 0,
    borderColor: 'rgba(0, 0, 0, 0.5)'
  },
  singleScene: {
    flexGrow: 1
  },
  singleSceneInner: {
    alignItems: 'center',
    padding: 10
  },
  singleSceneText: {
    fontSize: 10,
    fontFamily: '$light'
  },
  highlightSelected: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignSelf: 'center',
    height: 3
  }
});

export const SectionHeaderStyles = EStyleSheet.create({
  buttonTextStyle: {
    fontSize: 10,
    textAlign: 'center',
    fontFamily: '$medium'
  },
  headerTextStyle: {
    fontSize: 15,
    textAlign: 'center',
    fontFamily: '$medium',
    marginRight: 5,
    marginLeft: 5
  }
});

export const HeaderStyles = EStyleSheet.create({
  textHeader: {
    fontSize: 18,
    fontFamily: '$medium',
  },
  rightTextHeader: {
    fontSize: 15,
    fontFamily: '$light'
  }
});

export const SearchBarStyles = EStyleSheet.create({
  textInputStyle: {
    fontFamily: '$light',
    height: 30,
    width: '100%'
  }
});

export const ButtonStyles = EStyleSheet.create({
  textStyle: {
    fontSize: 15,
    fontFamily: '$medium',
    margin: 3
  }
});

export const FilterButtonStyles = EStyleSheet.create({
  textStyle: {
    fontFamily: '$light',
    color: 'white'
  }
});

export const ToolBarStyles = EStyleSheet.create({
  textStyle: {
    fontFamily: '$light',
    color: 'white'
  },
  conversationTitleTextStyle: {
    fontSize: 14,
    fontFamily: '$black'
  },
  conversationVendorTextStyle: {
    fontSize: 14,
    fontFamily: '$light',
    color: 'rgb(0, 105, 99)'
  }
});
