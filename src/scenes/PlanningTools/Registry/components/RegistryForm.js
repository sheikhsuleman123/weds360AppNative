import React from 'react';
import { TouchableOpacity, Image, Animated, Text, View } from 'react-native';
import { ImagePicker } from 'expo';
import Icon from 'react-native-vector-icons/Ionicons';
import ColoredButton from '@components/ColoredButton';
import OutlineTextInput from '@components/OutlineTextInput';
import I18n from '@i18n';
import EStyleSheet from 'react-native-extended-stylesheet';

import { RegistryFormStyles } from './StyleSheet';

const mainPath = 'planning_tools.general.text.';
const registryCreatePath = 'planning_tools.registry.text.create.';

export default class RegistryForm extends React.Component {
  constructor() {
    super();
    this.state = {
      title: '',
      address: '',
      note: '',
      price: '',
      image: null
    };
    this._pickImage = this._pickImage.bind(this);
  }

  componentWillMount() {
    const { item } = this.props;
    if (item) {
      this.setState({
        title: item.title,
        address: item.address,
        note: item.note,
        price: `${item.price}`,
        image: item.image_uri
      });
    }
  }

  async _pickImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      mediaTypes: 'Images'
    });
    try {
      if (!result.cancelled) {
        this.setState({ image: result });
      }
    } catch (e) {
      //
    }
  }

  render() {
    return (
      <Animated.View>
        <TouchableOpacity
          onPress={this.props.onClosePress}
          activeOpacity={this.props.activeOpacity}
          style={{
            zIndex: 1,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <View
            style={[
              {
                backgroundColor: '#ffffff',
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center'
              },
              this.props.headerStyle
            ]}
          >
            <Text style={[RegistryFormStyles.headerTextStyle, this.props.headerTextStyle]}>
              {this.props.headerText}
            </Text>

            <Icon
              onPress={this.props.onClosePress}
              style={{ fontSize: 30 }}
              name="ios-close-outline"
            />
          </View>
        </TouchableOpacity>
        <View>
          <View style={RegistryFormStyles.elementContainer}>
            <View style={{ width: 30, marginLeft: '5%' }} />
            <OutlineTextInput
              style={RegistryFormStyles.textInputStyle}
              inputStyle={EStyleSheet.flatten(RegistryFormStyles.lightText)}
              placeholder={I18n.t(`${registryCreatePath}title`)}
              onChangeText={text => {
                this.setState({
                  title: text
                });
              }}
              value={this.state.title}
            />
          </View>
          <View style={RegistryFormStyles.elementContainer}>
            <Image
              source={require('@assets/images/venue_budg.png')}
              style={{ width: 30, marginLeft: '5%' }}
              resizeMode={'contain'}
            />
            <OutlineTextInput
              style={RegistryFormStyles.textInputStyle}
              inputStyle={EStyleSheet.flatten(RegistryFormStyles.lightText)}
              placeholder={I18n.t(`${registryCreatePath}address`)}
              onChangeText={text => {
                this.setState({
                  address: text
                });
              }}
              value={this.state.address}
            />
          </View>
          <View style={RegistryFormStyles.elementContainer}>
            <Image
              source={require('@assets/checklist.png')}
              style={{ width: 30, marginLeft: '5%' }}
              resizeMode={'contain'}
            />
            <OutlineTextInput
              style={RegistryFormStyles.textInputStyle}
              inputStyle={EStyleSheet.flatten(RegistryFormStyles.lightText)}
              placeholder={I18n.t(`${registryCreatePath}notes`)}
              onChangeText={text => {
                this.setState({
                  note: text
                });
              }}
              value={this.state.note}
            />
          </View>
          <View style={RegistryFormStyles.elementContainer}>
            <Image
              source={require('@assets/images/amount_spent.png')}
              style={{ width: 30, marginLeft: '5%' }}
              resizeMode={'contain'}
            />
            <OutlineTextInput
              style={RegistryFormStyles.textInputStyle}
              inputStyle={EStyleSheet.flatten(RegistryFormStyles.lightText)}
              placeholder={I18n.t(`${registryCreatePath}price`)}
              keyboardType={'numeric'}
              returnKeyType="done"
              onChangeText={text => {
                this.setState({
                  price: text
                });
              }}
              value={this.state.price}
            />
          </View>

          <View style={RegistryFormStyles.elementContainer}>
            <Image
              source={require('@assets/images/camera.png')}
              style={{ width: 30, marginLeft: '5%' }}
              resizeMode={'contain'}
            />
            <ColoredButton
              text={I18n.t(`${registryCreatePath}select_image`)}
              onPress={this._pickImage}
              containerStyle={{
                backgroundColor: '#005555',
                justifyContent: 'center',
                alignSelf: 'center',
                marginLeft: '8%',
                width: '28%',
                borderRadius: 5
              }}
            />
            <View style={{ width: '40%', alignItems: 'center', justifyContent: 'center' }}>
              <Icon
                name={'ios-checkmark-circle'}
                size={15}
                style={{ color: this.state.image !== null ? 'green' : 'grey' }}
              />
              {/* To display image name
                <Text style={RegistryFormStyles.imageURIStyle}>{this.state.image.uri}</Text>*/}
            </View>
          </View>
          <View style={RegistryFormStyles.elementContainer}>
            <ColoredButton
              text={
                this.props.isCreate
                  ? I18n.t(`${registryCreatePath}save`)
                  : I18n.t(`${registryCreatePath}save`)
              }
              containerStyle={{
                marginLeft: '20%',
                width: '17%',
                marginTop: 8,
                borderRadius: 5,
                backgroundColor: '#005555',
                justifyContent: 'center',
                alignSelf: 'center'
              }}
              onPress={() => {
                this.props.onSavePress(
                  this.state.title,
                  this.state.address,
                  this.state.note,
                  this.state.price,
                  this.state.image
                );
              }}
            />
          </View>
        </View>
      </Animated.View>
    );
  }
}
