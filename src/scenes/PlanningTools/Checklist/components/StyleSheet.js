import EStyleSheet from 'react-native-extended-stylesheet';

export const ChecklistScreenStyles = EStyleSheet.create({
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

export const TDLIStyles = EStyleSheet.create({
  textHeader: {
    fontSize: 12,
    fontFamily: '$black',
    color: 'rgb(65, 10, 2)',
    textAlign: 'center'
  },
  textDescription: {
    fontSize: 10,
    fontFamily: '$light',
    textAlign: 'center'
  }
});

export const ChecklistRowStyles = EStyleSheet.create({
  checkBoxTextStyle: {
    maxWidth: '65%',
    fontFamily: '$light',
    fontSize: 12
  },
  checkBoxTitleStyle: {
    fontFamily: '$light',
    fontSize: 12
  },
  descriptionTextStyle: {
    fontSize: 13,
    fontFamily: '$light',
    margin: 5
  },
  textInputStyle: {
    alignSelf: 'center',
    backgroundColor: '#ffffff',
    width: '90%',
    fontFamily: '$light',
    fontSize: 13,
    borderRadius: 2,
    padding: 3
  },
  checkBoxStyle: {
    backgroundColor: '#ffffff',
    margin: 0
  }
});

export const ChecklistComponentStyles = EStyleSheet.create({
  showCompletedStyle: {
    fontFamily: '$light',
    fontSize: 12,
    color: '#004d45'
  }
});
