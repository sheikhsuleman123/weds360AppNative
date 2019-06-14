import React from 'react';
import { ScrollView, View, Dimensions, ActivityIndicator, FlatList } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import { bindActionCreators } from 'redux';
import CardArticle from './CardArticle';
import Header from '../../../components/Header';
import SectionHeader from '../../../components/SectionHeader';

import * as PhotosActions from '../actions';

class ImageSingle extends React.Component {
  componentDidMount() {
    this.props.relatedPhotosFetch(this.props.image.id);
  }
  pickLanguage = json => (this.props.language === 'ar' ? json.ar : json.en);
  render() {
    const image = this.props.image.attributes;
    const { language } = this.props;
    return (
      <ScrollView
        style={{
          backgroundColor: 'white',
          height: '100%'
        }}
      >
        <Header
          showIcon
          showBottomLine={false}
          showBackButton
          onBackPressed={() => {
            this.props.navigation.goBack();
          }}
          headerText={image.title}
          icon={require('../../../../assets/inspiration.png')}
        />

        <CardArticle
          desc={image.description}
          text={image.title}
          source={{ uri: image.image_url }}
          id={this.props.image.id}
          onCardPressed={() => Actions.full_screen_image({ image: image.image_url })}
          containerStyle={{
            margin: 0,
            marginTop: 5,
            marginBottom: 10
          }}
        />
        <SectionHeader
          marginTop={15}
          headerText={this.pickLanguage({ ar: 'أكثر مثل هذا', en: 'More like this' })}
          showButton={false}
          showIcon={false}
        />

        {!this.props.isFetching ? (
          <FlatList
            data={this.props.relatedPhotos}
            keyExtractor={(item, index) => `${index}`}
            numColumns={2}
            scrollEnabled
            renderItem={item => (
              <View
                style={{
                  maxWidth: Dimensions.get('window').width / 2
                }}
              >
                <CardArticle
                  cardSmall
                  onCardPressed={() => {
                    Actions.refresh({
                      image: item.item
                    });

                    this.props.relatedPhotosFetch(item.item.id);
                  }}
                  textHeight={40}
                  text={item.item.attributes.title}
                  source={{ uri: item.item.attributes.image_url }}
                  id={item.item.id}
                />
              </View>
            )}
          />
        ) : (
          <ActivityIndicator size="large" color="#003430" />
        )}
      </ScrollView>
    );
  }
}

// The function takes data from the app current state,
// and insert/links it into the props of our component.
// This function makes Redux know that this component needs to be passed a piece of the state
function mapStateToProps(state, props) {
  return {
    ...state.inspirationReducer,
    ...state.languageReducer
  };
}

// Doing this merges our actions into the component’s props,
// while wrapping them in dispatch() so that they immediately dispatch an Action.
// Just by doing this, we will have access to the actions defined in out actions file (action/home.js)
function mapDispatchToProps(dispatch) {
  return bindActionCreators(PhotosActions, dispatch);
}

//Connect everything

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ImageSingle);

const style = EStyleSheet.create({
  horizontal_align: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  }
});

// class VendorRecommend extends React.Component {
//   render() {
//     return (
//       <Card
//         containerStyle={{
//           maxWidth: 170,
//           marginTop: 0,
//           marginLeft: 0,
//           marginRight: 0,
//           marginBottom: 0,
//           paddingBottom: 0
//         }}
//         image={this.props.source}
//         imageStyle={{ height: 100 }}
//       >
//         <View>
//           <Text style={{ fontSize: 16, fontWeight: '600' }}>Conecceto studio</Text>
//           <Rating
//             imageSize={10}
//             type={'custom'}
//             ratingColor={'black'}
//             ratingBackgroundColor={'white'}
//             readonly
//           />
//           <Text style={{ marginTop: 5, fontSize: 10 }}>
//             Based on venues and couples reviews on venues and couples reviews
//           </Text>
//           <View style={[style.horizontal_align, { width: '100%' }]}>
//             <ColoredButton
//               text={'Book now'}
//               containerStyle={{
//                 width: '40%',
//                 marginTop: 10,
//                 backgroundColor: 'black'
//               }}
//               textStyle={{ fontSize: 8 }}
//             />
//             <View
//               style={{
//                 marginLeft: 'auto',
//                 flexDirection: 'row',
//                 alignItems: 'center',
//                 marginBottom: 0
//               }}
//             >
//               <Icon name={'envelope-open'} />
//               <Icon name={'phone'} style={{ marginLeft: 10 }} />
//             </View>
//           </View>
//         </View>
//       </Card>
//     );
//   }
// }
