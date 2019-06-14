import EStyleSheet from 'react-native-extended-stylesheet';

export const QuestionsFScreenStyles = EStyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 6
  },
  textInactive: {
    fontSize: 17,
    fontFamily: '$light',
    width: '30%',
    textAlign: 'center',
    paddingTop: 10,
    paddingBottom: 20
  },
  textActive: {
    fontSize: 17,
    fontFamily: '$medium',
    width: '30%',
    textAlign: 'center',
    paddingTop: 10,
    paddingBottom: 20
  }
});
