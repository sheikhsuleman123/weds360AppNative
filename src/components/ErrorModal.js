import React from 'react';
import { Text, View, FlatList } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';
import ColoredButton from '../components/ColoredButton';

export default class ErrorModal extends React.Component {
  constructor(props) {
    super();
    this.state = { errors: '' };
  }

  componentWillReceiveProps(nextProps) {
    const { errors } = nextProps;
    const { errors: oldErrors } = this.props;
    if (errors !== oldErrors && errors) {
      const keys = Object.keys(errors);
      let array = [];
      for (let i = 0; i < keys.length; i++) {
        array = array.concat(errors[keys[i]]);
      }
      this.setState({ errors: array });
    }
  }

  render() {
    if (this.props.isVisible) {
      return (
        <View
          style={{
            position: 'absolute',
            height: '100%',
            width: '100%',
            justifyContent: 'center',alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.7)'
          }}
        >

            <View
              style={{
                backgroundColor: 'rgb(142, 137, 137)',
                width: '90%',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  fontFamily: 'Lato-Black',
                  color: 'rgb(161, 47, 47)',
                  marginLeft: '5%',
                  width: '60%',
                  fontSize: 14,
                }}
              >
                Error
              </Text>

              <Icon
                onPress={this.props.hideModal}
                style={{ fontSize: 30 }}
                name="ios-close-outline"
              />
            </View>

            <View
              style={{
                backgroundColor: '#ebebeb',
                height: '30%',
                alignItems: 'center',
                width: '90%'
              }}
            >
              <View
                style={{
                  height: '80%'
                }}
              >
                <FlatList
                  data={this.state.errors}
                  keyExtractor={(item, index) => `${index}`}
                  extraData={this.state.errors}
                  style={{ height: '100%' }}
                  renderItem={item => (
                    <Text
                      style={{
                        fontFamily: 'Lato-Light',
                        color: '#000000',
                        fontSize: 14,
                        marginTop: 5
                      }}
                    >
                      {item && item.item}
                    </Text>
                  )}
                />
              </View>
              <ColoredButton
                text="OK"
                containerStyle={{
                  backgroundColor: 'rgb(142, 137, 137)',
                  justifyContent: 'center',
                  alignSelf: 'center',
                  width: '17%',
                  margin: 8,
                  borderRadius: 5,
                  height: 25,
                  padding: 0
                }}
                textStyle={{ fontSize: 14, fontFamily: 'Lato-Light' }}
                onPress={this.props.hideModal}
              />
            </View>

        </View>
      );
    }
    return <View />;
  }
}
