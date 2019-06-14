import EStyleSheet from 'react-native-extended-stylesheet';

export const VenueRejectedScreenStyles = EStyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  container_answer: {
    width: '100%',
    height: '100%',
    paddingLeft: 20,
    paddingRight: 20
  },
  headerTextStyle: {
    marginBottom: 20,
    fontFamily: '$black',
    fontSize: 18,
    marginTop: 20
  },
  descriptionTextStyle: {
    fontFamily: '$light',
    fontSize: 16
  },
  inputStyle: {
    height: 30,
    borderColor: 'rgb(111, 111, 111)',
    borderWidth: 1,
    fontFamily: '$light',
    padding: 6
  },
  inputTextStyle: {
    fontSize: 16,
    marginBottom: 15,
    fontFamily: '$medium'
  }
});
