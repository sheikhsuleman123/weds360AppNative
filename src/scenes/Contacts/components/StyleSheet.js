import EStyleSheet from 'react-native-extended-stylesheet';

export const ContactsScreenStyles = EStyleSheet.create({
  container: {
    flex: 1,
    height: '100%'
  },
  text: {
    fontSize: 15
  },
  listItemContainer: {
    width: '100%',
    padding: 10,
    flexDirection: 'row'
  },
  listItemName: {
    fontFamily: 'Lato-Black',
    fontSize: 17
  },
  listItemText: {
    fontFamily: 'Lato-Light',
    fontSize: 12,
    marginTop: '1%'
  },
  separator: {
    width: '100%',
    backgroundColor: 'rgb(181, 181, 181)',
    height: 1,
    marginTop: 3,
    marginBottom: 3
  }
});
