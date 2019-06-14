import EStyleSheet from 'react-native-extended-stylesheet';

export const HomescreenStyles = EStyleSheet.create({
  noteTextStyle: {
    color: 'rgb(128, 0, 93)',
    fontSize: 13,
    fontFamily: '$light',
    marginLeft: '3%'
  },
  nameTextStyle: {
    fontFamily: '$black',
    fontSize: 27
  },
  activityIndicatorContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  vertical_line: {
    width: 1,
    backgroundColor: 'rgb(181, 181, 181)',
    height: '100%',
    marginRight: 10,
    marginLeft: 10
  },
  horizontal_line: {
    width: '100%',
    backgroundColor: 'rgb(181, 181, 181)',
    height: 0.5
  },
  grid_wrapper: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  header_container: {
    paddingTop: 30,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 15,
    backgroundColor: 'rgba(249, 249, 249, 0.71)',
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgb(181, 181, 181)'
  },
  vendor_image: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 2,
    marginRight: 2,
    width: 130,
    height: 130
  },
  checklistStyle: { fontSize: 12, fontFamily: '$italic' }
});
