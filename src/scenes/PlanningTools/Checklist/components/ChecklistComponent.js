import React from 'react';
import {
  Image,
  Text,
  View,
  Switch,
  ActivityIndicator,
  FlatList,
  Dimensions,
  Platform
} from 'react-native';
import ChecklistRow from './ChecklistRow';
import { ChecklistComponentStyles } from './StyleSheet';
import I18n from '@i18n';

const checklistPath = 'planning_tools.checklist.text.';

export default class ChecklistComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      viewCompleted: false
    };
  }
  render() {
    const deviceWidth = Dimensions.get('window').width;
    const deviceHeight = Dimensions.get('window').height;

    return (
      <View
        style={{
          height: '80%',
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'center',
          ...this.props.style
        }}
      >
        <Image
          source={require('@assets/images/clip_checklist.png')}
          style={{
            width: deviceWidth > 500 ? 120 : 60,
            zIndex: 1,
            backgroundColor: '#ffffff',
            position: 'absolute',
            top:
              deviceHeight > 700 || deviceWidth > 500 || Platform.OS === 'android' ? '-5%' : '-5%'
          }}
          resizeMode={'contain'}
        />
        <View
          style={{
            marginTop: 25,
            flex: 1,
            width: '90%',
            borderWidth: this.props.selected ? 1 : 0.5,
            borderRadius: 5
          }}
        >
          {this.props.isFetching ? (
            <ActivityIndicator
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
              }}
              size="large"
              color="#003430"
            />
          ) : (
            <View style={{ marginTop: 35, marginBottom: 80, flex: 1 }}>
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  alignItems: 'center'
                }}
              >
                {this.props.selected ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 15,
                      marginLeft: '6%'
                    }}
                  >
                    <Text style={ChecklistComponentStyles.showCompletedStyle}>
                      {I18n.t(`${checklistPath}show_completed`)}
                    </Text>
                    <Switch
                      style={{ marginLeft: '2%' }}
                      onValueChange={() => {
                        this.setState({
                          viewCompleted: !this.state.viewCompleted
                        });
                      }}
                      value={this.state.viewCompleted}
                    />
                  </View>
                ) : null}
              </View>
              <FlatList
                ref={ref => {
                  this.list = ref;
                }}
                style={{ marginBottom: 50 }}
                data={
                  this.props.checklists !== undefined
                    ? this.props.checklists.filter(item => {
                        if (this.state.viewCompleted) {
                          if (item.attributes.done) return item;
                        } else return item;
                      })
                    : null
                }
                keyExtractor={(item, index) => `${index}`}
                renderItem={item => (
                  <ChecklistRow
                    checked={item.item.attributes.done}
                    item={item.item.attributes}
                    scroll={() => {
                      this.list.scrollToIndex({
                        index: item.index,
                        animated: true,
                        viewOffset: 1
                      });
                    }}
                    onIconPress={() => {
                      this.props.toggleDone(item.item.id);
                      // TODO Update UI on Success
                    }}
                    onDeletePress={() => {
                      this.props.onDeletePress(item.item.id);
                      // TODO Update UI on Success
                    }}
                    onSavePress={notes => {
                      this.props.checklistUpdate(item.item.id, notes);
                      this.setState({ isVisible: false });
                      // TODO Update UI on Success
                    }}
                  />
                )}
              />
            </View>
          )}
        </View>
      </View>
    );
  }
}
