import EStyleSheet from 'react-native-extended-stylesheet';

export const RingsScreenStyles = EStyleSheet.create({
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

export const RSSStyles = EStyleSheet.create({
  silhouetteTextStyle: {
    fontFamily: '$medium',
    fontSize: 11,
    marginLeft: '5%',
    letterSpacing: 1
  },
  nameTextStyle: {
    fontFamily: '$light',
    fontSize: 24,
    margin: 5, textAlign: 'center'
  }
});
