import React from 'react';
import { TouchableOpacity, View, Image, Text } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from 'react-native-vector-icons/Ionicons';
import { HeaderStyles } from './StyleSheet';
/*
Header needs the following props:
showBackButton - boolean
onBackPressed - function
showIcon - boolean
icon - require with string - actual icon rendered path
showCustomIcon - boolean - right icon
customIconSelected - boolean - right icon selected like heart
iconNameSelected - string - icon name if it is selected
iconName - string - icon name if not selected
headerText - string - header middle text
showBottomLine - boolean
rightHeaderText - string - right header text
rightHeaderTextPressed - function
*/

export default class Header extends React.Component {
  static defaultProps = {
    showBackButton: false
  };
  render() {
    const { language } = this.props;
    return (
      <View style={{ marginTop: 11}}>
        <View
          style={{
            width: '100%',
            position: 'absolute',
            alignSelf: 'center',
            height: '100%',
            zIndex: 2,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          {this.props.showBackButton ? (
            <TouchableOpacity
              style={{
                width: '15%',
                alignItems: 'center'
              }}
              onPress={this.props.onBackPressed}
            >
              <Icon name={'ios-arrow-back'} size={25} />
            </TouchableOpacity>
          ) : null}
          {this.props.rightHeaderText ? (
            <TouchableOpacity
              style={{
                width: '20%',
                alignItems: 'center'
              }}
              onPress={this.props.rightHeaderTextPressed}
              touchable={!this.props.isEditing}
            >
              <Text style={HeaderStyles.rightTextHeader}>{this.props.rightHeaderText}</Text>
            </TouchableOpacity>
          ) : null}

          {this.props.showCustomIcon ? (
            <TouchableOpacity
              style={[
                {
                  position: 'absolute',
                  top: 10,
                  right: 0,
                  width: '10%',
                  alignSelf: 'center',
                  paddingTop: 10
                },
                language === 'ar' ? { left: 10 } : { right: 10 }
              ]}
              onPress={this.props.onCustomIconPress}
            >
              <Icon
                name={
                  this.props.customIconSelected ? this.props.iconNameSelected : this.props.iconName
                }
                style={{
                  fontSize: 15,
                  ...this.props.customIconStyle
                }}
              />
            </TouchableOpacity>
          ) : null}
        </View>
        <View
          style={{
            marginBottom: 10,
            paddingTop: 10,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: language === 'ar' ? 'row' : 'row-reverse',
            backgroundColor: 'white',
            height: 60
          }}
        >
          <Text style={[HeaderStyles.textHeader,{maxWidth:'70%',textAlign:'center', alignSelf :'center'}]}>{this.props.headerText}</Text>
          {this.props.showIcon ? (
            <Image
              source={this.props.icon}
              style={{ width: 20, height: 20, marginLeft: 3, marginRight: 3 }}
              resizeMode={'contain'}
            />
          ) : null}
        </View>
        {this.props.showBottomLine ? (
          <View
            style={{
              width: '100%',
              backgroundColor: 'rgb(181, 181, 181)',
              height: 1
            }}
          />
        ) : null}
      </View>
    );
  }
}
