import EStyleSheet from 'react-native-extended-stylesheet';

export const PlanningItemStyles = EStyleSheet.create({
  contentText: {
    fontFamily: '$light',
    fontSize: 13,
    color: '#000000'
  },
  titleText: { fontFamily: '$black', fontSize: 17 },
  descriptionText: {
    color: 'rgb(198, 78, 78)',
    fontFamily: '$italic',
    fontSize: 10
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

export const PTSStyles = EStyleSheet.create({
  textHeader: {
    fontFamily: '$medium',
    fontSize: 22,
    color: 'rgb(65, 26, 26)'
  },
  textDescription: {
    fontFamily: '$light',
    fontSize: 13
  }
});

export const CustomHeaderStyles = EStyleSheet.create({
  belowProgress: {
    fontFamily: '$light',
    fontSize: 10,
    color: '#004d45',
    padding: '1%'
  },
  headerStyle: {
    fontFamily: '$medium',
    fontSize: 25
  },
  descriptionStyle: {
    fontFamily: '$light',
    fontSize: 14
  },
  budgetPreviewStyle: {
    fontFamily: '$black',
    fontSize: 14
  }
});

export const TableHeaderStyles = EStyleSheet.create({
  tableHeaderText: {
    color: '#006862',
    textAlign: 'center',
    fontFamily: '$medium',
    fontSize: 10,
    width: '35%'
  }
});

export const CustomRowStyles = EStyleSheet.create({
  editTextStyle: {
    fontFamily: '$light',
    color: '#006862',
    textAlign: 'center'
  },
  titleTextStyle: {
    fontFamily: '$medium',
    fontSize: 12
  },
  recommendedAmount: {
    color: '#006862',
    fontFamily: '$black',
    fontSize: 11
  },
  spentAmount: {
    color: '#006862',
    fontFamily: '$black',
    fontSize: 10
  },
  textStyle: {
    fontFamily: '$light',
    fontSize: 12
  },
  registryTextStyle: {
    fontFamily: '$light',
    fontSize: 10,
    margin: 5,
    color: '#006862'
  }
});

export const PlanningEditorStyles = EStyleSheet.create({
  headerTextStyle: {
    fontFamily: '$black',
    color: 'rgb(0, 105, 99)',
    paddingLeft: '5%',
    width: '90%',
    fontSize: 14
  },
  descriptionTextStyle: {
    fontFamily: '$light',
    padding: '10%',
    fontSize: 12
  },
  lightText: {
    fontFamily: '$light'
  }
});
