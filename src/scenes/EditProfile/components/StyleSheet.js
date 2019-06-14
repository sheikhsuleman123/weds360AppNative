import EStyleSheet from 'react-native-extended-stylesheet';

export const EditProfileScreenStyles = EStyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 6
  },
  textStyle: {
    fontFamily: '$medium',
    fontSize: 17,
    color: '#003430'
  },
  placeholderText: {
    fontFamily: '$light',
    alignSelf: 'flex-start',
    fontSize: 13,
    paddingLeft: 5,
    color: '#b7b7b7',
    height: 20
  },
  dateInput: {
    backgroundColor: '#ffffff',
    height: '75%'
  },
  pictureChange: {
    fontFamily: '$medium',
    fontSize: 15,
    textAlign: 'center',
    color: '#003430',
    marginTop: 5
  }
});

export const EntryHandlerStyles = EStyleSheet.create({
  textStyle: {
    fontFamily: '$medium'
  },
  inputStyle: {
    fontFamily: '$light',
    width: '100%'
  }
});
