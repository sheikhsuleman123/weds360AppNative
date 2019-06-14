import EStyleSheet from 'react-native-extended-stylesheet';

export const BudgeterScreenStyles = EStyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 6
  },

  guideStyle: {
    fontFamily: '$light',
    fontSize: 12,
    margin: 7
  }
});

export const BudgeterInitialStyles = EStyleSheet.create({
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
