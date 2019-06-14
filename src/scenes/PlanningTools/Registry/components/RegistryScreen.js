import React from 'react';
import {
  Animated,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  KeyboardAvoidingView
} from 'react-native';
import ColoredButton from '@components/ColoredButton';
import I18n from '@i18n';
import CustomHeader from '../../components/CustomHeader';
import TableHeader from '../../components/TableHeader';
import SwiperRow from '../../components/SwiperRow';
import RegistryModal from './RegistryModal';
import { RegistryScreenStyles } from './StyleSheet';

const mainPath = 'planning_tools.registry.text.';

class RegistryScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedEditView: -1,
      isVisible: false
    };
    this._width = new Animated.Value(0);
  }

  calculateNumeral = number => {
    let string = '';
    let numeral = number;
    while (numeral >= 1000) {
      if (numeral >= 1000000) {
        string += 'm';
        numeral /= 1000000;
      }
      if (numeral >= 1000) {
        string = `K${string}`;
        numeral /= 1000;
      }
    }
    return `${Math.round(numeral * 10) / 10}${string}`;
  };

  pickLanguage = json => (this.props.language === 'ar' ? json.ar : json.en);
  render() {
    const { language } = this.props;
    return (
      <View
        style={{
          flex: 1,
          width: '100%'
        }}
      >
        <View style={{ height: '30%' }}>
          <CustomHeader
            header={I18n.t(`${mainPath}header`)}
            percentage={this.props.percentage}
            belowProgress={`${this.props.percentage}% ${I18n.t(`${mainPath}completed`)}`}
            description={I18n.t(`${mainPath}description`)}
            child={<Text style={RegistryScreenStyles.text}>{`${this.props.percentage}%`}</Text>}
            actionButton={
              <ColoredButton
                text={I18n.t(`${mainPath}add_item`)}
                onPress={() => {
                  this.setState({
                    isVisible: true
                  });
                }}
                containerStyle={{
                  backgroundColor: '#004d45',
                  justifyContent: 'center',
                  width: 70,
                  borderWidth: 0,
                  borderRadius: 2,
                  padding: 0,

                  margin: 5
                }}
                textStyle={{
                  fontSize: 12
                }}
              />
            }
          />
        </View>
        <Text style={RegistryScreenStyles.guideStyle}>{I18n.t(`${mainPath}swipe_guide`)}</Text>
        <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }} keyboardVerticalOffset={65}>
          <TableHeader language={language} registry style={{ marginTop: 7, height: 25 }} />
          {this.props.isFetching ? (
            <ActivityIndicator
              style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
              size="large"
              color="#003430"
            />
          ) : (
            <FlatList
              data={this.props.registries}
              keyExtractor={(item, index) => `${index}`}
              extraData={this.state.selectedEditView}
              renderItem={item => (
                <SwiperRow
                  registry
                  editView={this.state.selectedEditView === item.index}
                  rowData={item.item.attributes}
                  openView={() => {
                    this.setState({
                      selectedEditView: item.index
                    });
                  }}
                  calculateNumeral={number => this.calculateNumeral(number)}
                  closeView={() => {
                    this.setState({ selectedEditView: -1 });
                  }}
                  onSavePress={(title, address, note, price, image) => {
                    this.setState({ selectedEditView: -1 });
                    this.props.onEditPress(item.item.id, title, address, note, price, image);
                  }}
                  onDeletePress={() => {
                    this.props.onDeletePress(item.item.id);
                  }}
                />
              )}
            />
          )}
        </KeyboardAvoidingView>

        <RegistryModal
          isVisible={this.state.isVisible}
          onClosePress={() => {
            this.setState({
              isVisible: false
            });
          }}
          onSavePress={(title, address, note, price, image) => {
            this.props.registriesCreate(title, address, note, price, image);
            this.setState({ isVisible: false });
          }}
        />
      </View>
    );
  }
}

export default RegistryScreen;
