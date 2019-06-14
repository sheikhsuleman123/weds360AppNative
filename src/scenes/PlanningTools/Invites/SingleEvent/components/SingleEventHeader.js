import React from 'react';
import { Alert,TouchableOpacity, Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import TableHeader from '../../../components/TableHeader';
import ColoredButton from '@components/ColoredButton';

export default class SingleEvent extends React.Component {
  constructor() {
    super();
    this.state = {
      month: 'JAN',
      day: '00',
      moreTools: false
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
  pickLanguage = json => (this.props.language === 'ar' ? json.ar : json.en);
  render() {
    const { language } = this.props;
    const { moreTools } = this.state;
    return (
      <View style={{ width: '100%' }}>
        <View
          style={{
            width: '90%',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
            marginBottom: '5%',
            marginTop: '2%',
            alignSelf: 'center'
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
              maxWidth: '30%',
              marginLeft: '5%'
            }}
          >
            <Text style={{ fontFamily: 'Lato-Black', fontSize: 15 }}>
              {this.props.data.attributes.name}
            </Text>
            <Text
              style={{
                fontFamily: 'Lato-Light',
                fontSize: 12,
                color: '#004d45'
              }}
            >
              {this.props.data.attributes.location}
            </Text>
          </View>
          <View
            style={{
              borderBottomWidth: 1,
              borderColor: '#ffffff',
              flexDirection: 'column'
            }}
          >
            <View style={{ flexDirection: 'row' }}>
              <ColoredButton
                text={'Invite'}
                containerStyle={{
                  backgroundColor: '#005555',
                  justifyContent: 'center',
                  width: 60,
                  borderRadius: 5,
                  borderWidth: 0,
                  height: 35,
                  margin: 5
                }}
                textStyle={{ fontSize: 14, fontFamily: 'Lato-Light' }}
                onPress={this.props.showModal}
              />
              <ColoredButton
                text={'Edit'}
                containerStyle={{
                  backgroundColor: '#005555',
                  justifyContent: 'center',
                  width: 60,
                  borderRadius: 5,
                  borderWidth: 0,
                  margin: 5,
                  height: 35
                }}
                textStyle={{ fontSize: 14, fontFamily: 'Lato-Light' }}
                onPress={this.props.showEditModal}
              />
            </View>
            <View style={{ flexDirection: 'row' }}>
              <ColoredButton
                text={'Contacts'}
                containerStyle={{
                  backgroundColor: '#005555',
                  justifyContent: 'center',
                  width: 60,
                  borderRadius: 5,
                  borderWidth: 0,
                  margin: 5,
                  height: 35
                }}
                textStyle={{ fontSize: 14, fontFamily: 'Lato-Light' }}
                onPress={async () => {
                  const permission = await Expo.Permissions.askAsync(Expo.Permissions.CONTACTS);
                  if (permission.status !== 'granted') {
                    return;
                  }
                  Actions.contacts({ event_id: this.props.data.id });
                }}
              />

              <ColoredButton
                text={'Delete'}
                containerStyle={{
                  backgroundColor: '#740505',
                  justifyContent: 'center',
                  width: 60,
                  borderRadius: 5,
                  borderWidth: 0,
                  margin: 5,
                  height: 35
                }}
                textStyle={{ fontSize: 14, fontFamily: 'Lato-Light' }}
                onPress={()=>{
                  Alert.alert('', 'Are you sure you want to delete this event?', [
                    {
                      text: 'Yes',
                      onPress: () => this.props.deleteEvent()
                    },
                    { text: 'Cancel', onPress: () => {} }
                  ]);

                }}
              />
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <TouchableOpacity onPress={this.props.onAccepted}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Text
                style={{
                  fontFamily: 'Lato-Bold',
                  fontSize: 12
                }}
              >
                {this.pickLanguage({ ar: 'موافق', en: 'ACCEPTED' })}
              </Text>
              <Text
                style={{
                  fontFamily: 'Lato-Bold',
                  fontSize: 25,
                  color: '#004d45'
                }}
              >
                {this.props.data.attributes.accepted}
              </Text>
            </View>
          </TouchableOpacity>
          <View
            style={{
              height: '100%',
              width: 1,
              alignSelf: 'center',
              backgroundColor: 'rgb(181, 181, 181)',
              marginLeft: 10,
              marginRight: 10
            }}
          />
          <TouchableOpacity onPress={this.props.onDeclined}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Text
                style={{
                  fontFamily: 'Lato-Bold',
                  fontSize: 12
                }}
              >
                {this.pickLanguage({ ar: 'رفض', en: 'DECLINED' })}
              </Text>
              <Text
                style={{
                  fontFamily: 'Lato-Bold',
                  fontSize: 25,
                  color: '#004d45'
                }}
              >
                {this.props.data.attributes.declined}
              </Text>
            </View>
          </TouchableOpacity>
          <View
            style={{
              height: '100%',
              width: 1,
              alignSelf: 'center',
              backgroundColor: 'rgb(181, 181, 181)',
              marginLeft: 10,
              marginRight: 10
            }}
          />
          <TouchableOpacity onPress={this.props.onNoResponse}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Text
                style={{
                  fontFamily: 'Lato-Bold',
                  fontSize: 12
                }}
              >
                {this.pickLanguage({ ar: 'لا يوجد رد', en: 'NO RESPONSE' })}
              </Text>
              <Text
                style={{
                  fontFamily: 'Lato-Bold',
                  fontSize: 25,
                  color: '#004d45'
                }}
              >
                {this.props.data.attributes.no_response}
              </Text>
            </View>
          </TouchableOpacity>
          <View
            style={{
              height: '100%',
              width: 1,
              alignSelf: 'center',
              backgroundColor: 'rgb(181, 181, 181)',
              marginLeft: 10,
              marginRight: 10
            }}
          />
          <TouchableOpacity onPress={this.props.onInvited}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Text
                style={{
                  fontFamily: 'Lato-Bold',
                  fontSize: 12
                }}
              >
                {this.pickLanguage({ ar: 'مدعو', en: 'INVITED' })}
              </Text>
              <Text
                style={{
                  fontFamily: 'Lato-Bold',
                  fontSize: 25,
                  color: '#004d45'
                }}
              >
                {this.props.data.attributes.invited}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <TableHeader guestlist language={language} />
      </View>
    );
  }
}
