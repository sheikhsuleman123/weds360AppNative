import EStyleSheet from 'react-native-extended-stylesheet';

export const ConversationsScreenStyles = EStyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 6
  },
  inboxTextStyle: {
    fontSize: 20,
    marginRight: 5,
    fontFamily: '$medium'
  },
  notificationTextStyle: {
    fontSize: 12,
    marginLeft: 20,
    marginBottom: 20,
    marginTop: 5,
    fontFamily: '$medium',
    color: 'rgb(237, 20 , 91)',
    margin: 5
  }
});

export const CILStyles = EStyleSheet.create({
  conversationTitleTextStyle: {
    fontSize: 14,
    fontFamily: '$black'
  },
  conversationVendorTextStyle: {
    fontSize: 14,
    fontFamily: '$light',
    color: 'rgb(0, 105, 99)'
  },
  lightText: {
    fontFamily: '$light'
  },
  mediumText: {
    fontFamily: '$medium'
  },
  timeTextStyle: {
    position: 'absolute',
    right: 8,
    top: '30%',
    fontSize: 11,
    fontFamily: '$light',
    backgroundColor: '#ffffff'
  },
  badgeTextStyle: {
    fontFamily: '$black',
    fontSize: 7
  }
});

export const NMSStyles = EStyleSheet.create({
  wrapper: {
    width: '100%',
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  horizontal_wrapper: {
    marginTop: 30,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  headerTextStyle: {
    fontFamily: '$medium',
    fontSize: 20,
    marginTop: 25
  },
  descriptionTextStyle: {
    fontSize: 13,
    marginTop: 3,
    marginBottom: 30,
    fontFamily: '$light'
  }
});
