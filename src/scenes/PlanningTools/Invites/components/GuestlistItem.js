import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

export default class GuestlistItem extends React.Component {
  constructor() {
    super();
    this.state = {
      month: 'JAN',
      day: '00'
    };
  }

  componentWillMount() {
    this.setDate();
  }

  setDate() {
    const date = this.props.data.attributes.date.split('-');
    const month = date[1];

    this.setState({
      day: date[2]
    });

    switch (month) {
      case '01':
        this.setState({
          month: 'JAN'
        });
        break;
      case '02':
        this.setState({
          month: 'FEB'
        });
        break;
      case '03':
        this.setState({
          month: 'MAR'
        });
        break;
      case '04':
        this.setState({
          month: 'APR'
        });
        break;
      case '05':
        this.setState({
          month: 'MAY'
        });
        break;
      case '06':
        this.setState({
          month: 'JUN'
        });
        break;
      case '07':
        this.setState({
          month: 'JUL'
        });
        break;
      case '08':
        this.setState({
          month: 'AUG'
        });
        break;
      case '09':
        this.setState({
          month: 'SEP'
        });
        break;
      case '10':
        this.setState({
          month: 'OCT'
        });
        break;
      case '11':
        this.setState({
          month: 'NOV'
        });
        break;
      case '12':
        this.setState({
          month: 'DEC'
        });
        break;
    }
  }

  render() {
    return (
      <TouchableOpacity
        style={{ marginRight: '5%', marginLeft: '5%' }}
        onPress={this.props.onPress}
      >
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            flexDirection: 'row',
            marginBottom: '2%',
            marginTop: '2%'
          }}
        >
          <View
            style={{
              justifyContent: 'center',
              maxWidth: '20%',
              alignItems: 'center'
            }}
          >
            <Text
              style={{
                fontFamily: 'Lato-Light',
                fontSize: 15,
                color: '#004d45',
                marginBottom: -5
              }}
            >
              {this.state.month}
            </Text>
            <Text
              style={{
                fontFamily: 'Lato-Bold',
                fontSize: 25
              }}
            >
              {this.state.day}
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
              maxWidth: '60%',
              marginLeft: '5%'
            }}
          >
            <Text style={{ fontFamily: 'Lato-Black', fontSize: 17 }}>
              {this.props.data.attributes.name}
            </Text>
            <Text
              style={{
                fontFamily: 'Lato-Light',
                fontSize: 12
              }}
            >
              {this.props.data.attributes.location}
            </Text>
          </View>
        </View>
        {this.props.hideOwner ? null : (
          <Text
            style={{
              fontFamily: 'Lato-Bold',
              fontSize: 11,
              color: '#006862'
            }}
          >
            by {this.props.data.attributes.owner_name}
          </Text>
        )}

        <View
          style={{
            alignSelf: 'center',
            width: '80%',
            backgroundColor: 'rgb(181, 181, 181)',
            height: 1,
            marginTop: 10,
            marginBottom: 10
          }}
        />
      </TouchableOpacity>
    );
  }
}
