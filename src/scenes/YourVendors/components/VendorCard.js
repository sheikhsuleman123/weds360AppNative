import React from 'react';
import { TouchableOpacity, ImageBackground, Image, Text, View } from 'react-native';
import { VendorsTabStyles } from './StyleSheet';

export default class VendorCard extends React.Component {
  constructor() {
    super();
    this.state = {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      liked: false,
      isLoaded: false
    };
  }
  async componentWillMount() {
    this.find_dimesions = async layout => {
      const { x, y, width, height } = layout;
      await this.setState({
        x,
        y,
        width,
        height
      });
    };
  }
  render() {
    const { language } = this.props;
    if (language === 'ar') {
      return (
        <TouchableOpacity
          onLayout={event => {
            this.find_dimesions(event.nativeEvent.layout);
          }}
          style={{
            borderWidth: 0.3,
            borderRadius: 1,
            borderColor: '#rgb(204, 204, 204)',
            margin: 3,

            ...this.props.style
          }}
          onPress={this.props.onPress}
        >
          <ImageBackground
            source={this.props.photo}
            style={{
              height: 100,
              alignItems: 'center',
              ...this.props.imageStyle
            }}
            resizeMode={'cover'}
            onLoadEnd={() => {
              this.setState({ isLoaded: true });
            }}
          >
            <View
              style={{
                position: 'absolute',
                right: 5,
                width: '30%',
                height: '30%',
                backgroundColor: '#006862',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Image
                source={this.props.logo}
                style={{ height: '70%', width: '100%' }}
                resizeMode={'contain'}
              />
            </View>
          </ImageBackground>
          <View
            style={{
              padding: 5
            }}
          >
            <Text style={VendorsTabStyles.textHeader}>{this.props.title}</Text>
            <Text style={VendorsTabStyles.textDescription}>{this.props.text}</Text>
          </View>
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity
        onLayout={event => {
          this.find_dimesions(event.nativeEvent.layout);
        }}
        style={{
          borderWidth: 0.3,
          borderRadius: 1,
          borderColor: '#rgb(204, 204, 204)',
          margin: 3,
          ...this.props.style
        }}
        onPress={this.props.onPress}
      >
        <ImageBackground
          source={this.props.photo}
          style={{
            height: 100,
            alignItems: 'center',
            ...this.props.imageStyle
          }}
          resizeMode={'cover'}
          onLoadEnd={() => {
            this.setState({ isLoaded: true });
          }}
        >
          <View
            style={{
              position: 'absolute',
              right: 5,
              width: '30%',
              height: '30%',
              backgroundColor: '#006862',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Image
              source={this.props.logo}
              style={{ height: '70%', width: '100%' }}
              resizeMode={'contain'}
            />
          </View>
        </ImageBackground>
        <View
          style={{
            padding: 5
          }}
        >
          <Text style={VendorsTabStyles.textHeader}>{this.props.title}</Text>
          <Text style={VendorsTabStyles.textDescription}>{this.props.text}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}
