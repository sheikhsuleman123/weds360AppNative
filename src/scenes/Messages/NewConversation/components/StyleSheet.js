import EStyleSheet from 'react-native-extended-stylesheet';

export const NewConversationScreenStyles = EStyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 6
  },
  text: {
    fontSize: 15
  },
  toTextStyle: {
    width: '5%',
    marginLeft: '5%',
    fontSize: 15,
    fontFamily: '$light',
    alignSelf: 'center'
  }
});
