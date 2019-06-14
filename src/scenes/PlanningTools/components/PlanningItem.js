import React from 'react';
import { Image, Platform, Text, View, TouchableOpacity } from 'react-native';
import ProgressCircle from 'react-native-progress-circle';
import Icon from 'react-native-vector-icons/FontAwesome';
import { PlanningItemStyles } from './StyleSheet';

export default class PlanningItem extends React.Component {
  render() {
    const { language } = this.props;
    if (language === 'ar') {
      return (
        <TouchableOpacity style={{flexGrow:1}} onPress={this.props.onPress}>
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              flexDirection: 'row',
              paddingTop: 5,
              paddingBottom: 5,
              justifyContent: 'space-between'
            }}
          >
            <Icon name="chevron-left" style={{ fontSize: 20 }} />
            <View style={{ width: '60%', marginRight: '5%' }}>
              <Text style={PlanningItemStyles.titleText}>{this.props.title}</Text>
              <Text style={PlanningItemStyles.contentText}>
                {this.props.subtitle}
                <Text style={PlanningItemStyles.descriptionText}>{` ${
                  this.props.buttonText
                }`}</Text>
              </Text>
            </View>
            {this.props.showProgress ? (
              <ProgressCircle
                percent={this.props.percentage}
                radius={40}
                borderWidth={8}
                color="#004d45"
                shadowColor="#e1e1e1"
                bgColor="#fff"
              >
                <View
                  style={{
                    height: '70%',
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <Image
                    source={this.props.image}
                    style={{ height: 25, width: 30 }}
                    resizeMode={'contain'}
                  />
                  <Text style={PlanningItemStyles.belowText}>{`${this.props.percentage ||
                    '0'}%`}</Text>
                </View>
              </ProgressCircle>
            ) : (
              <View style={{ backgroundColor: '#006862', alignItems: 'center' }}>
                <Image
                  source={this.props.image}
                  style={{ height: 40, width: 40, margin: 5 }}
                  resizeMode={'contain'}
                />
              </View>
            )}
          </View>
          <View
            style={{
              width: '100%',
              backgroundColor: 'rgb(181, 181, 181)',
              height: 1,
              marginTop: 3,
              marginBottom: 3
            }}
          />
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity style={this.props.style} onPress={this.props.onPress}>
        <View
          style={
            Platform.OS === 'ios'
              ? {
                  width: '100%',
                  alignItems: 'center',
                  flexDirection: 'row',
                  margin: 5
                }
              : {
                  width: '100%',
                  alignItems: 'center',
                  flexDirection: 'row',
                  margin: 5
                }
          }
        >
          {this.props.showProgress ? (
            <ProgressCircle
              percent={this.props.percentage}
              radius={40}
              borderWidth={8}
              color="#004d45"
              shadowColor="#e1e1e1"
              bgColor="#fff"
            >
              <View
                style={{
                  height: '70%',
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Image
                  source={this.props.image}
                  style={{ height: 25, width: 30 }}
                  resizeMode={'contain'}
                />
                <Text style={PlanningItemStyles.belowText}>{`${this.props.percentage ||
                  '0'}%`}</Text>
              </View>
            </ProgressCircle>
          ) : (
            <View style={{ backgroundColor: '#006862', alignItems: 'center' }}>
              <Image
                source={this.props.image}
                style={{ height: 40, width: 40, margin: 5 }}
                resizeMode={'contain'}
              />
            </View>
          )}
          <View style={{ maxWidth: '60%', marginLeft: '5%' }}>
            <Text style={PlanningItemStyles.titleText}>{this.props.title}</Text>
            <Text style={PlanningItemStyles.contentText}>
              {this.props.subtitle}
              <Text style={PlanningItemStyles.descriptionText}>{` ${this.props.buttonText}`}</Text>
            </Text>
          </View>
          <Icon name="chevron-right" style={{ fontSize: 20, position: 'absolute', right: 3 }} />
        </View>
        <View
          style={{
            width: '100%',
            backgroundColor: 'rgb(181, 181, 181)',
            height: 1,
            marginTop: 3,
            marginBottom: 3
          }}
        />
      </TouchableOpacity>
    );
  }
}
