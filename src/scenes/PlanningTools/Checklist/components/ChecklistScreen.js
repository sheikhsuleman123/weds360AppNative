import React from 'react';
import { Image, View, Alert, KeyboardAvoidingView } from 'react-native';
import ChecklistComponent from './ChecklistComponent';
import CustomHeader from '../../components/CustomHeader';
import CustomModal from '../../components/CustomModal';
import ErrorModal from '@components/ErrorModal';
import ColoredButton from '@components/ColoredButton';

export default class ChecklistScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      budget: 0,
      selectedEditView: -1,
      isVisible: false,
      errors: []
    };
  }

  componentWillReceiveProps(nextProps) {
    const { refresh, checklists, error } = nextProps;
    if (refresh) {
      this.props.checklistFetch();
    }
    if (checklists !== this.props.checklists) {
      this.props.checklistPercentage(checklists);
    }
    if (error) {
      try {
        const keys = Object.keys(error.errors);
        const errors = [];
        keys.forEach(key => {
          errors.push(`${key}: ${error.errors[key].join(',')}`);
        });

        this.setState({ errors });
      } catch (e) {
        this.setState({ errors: ['An error has occured.'] });
      }
    }
  }

  pickLanguage = json => (this.props.language === 'ar' ? json.ar : json.en);
  render() {
    const { language } = this.props;
    return (
      <View style={{ height: '100%', width: '100%', ...this.props.style }}>
        <KeyboardAvoidingView behavior="position" style={{ height: '100%' }}>
          <CustomHeader
            header={this.pickLanguage({ ar: 'قائمة تدقيق', en: 'Checklist' })}
            percentage={this.props.percentage}
            belowProgress={this.pickLanguage({
              ar: `${this.props.percentage}% منتهي`,
              en: `${this.props.percentage}% Completed`
            })}
            description={this.pickLanguage({
              ar: 'الطريقة السهلة للبقاء منظّمة (وعقلانية) خلال رحلة التخطيط لحفل زفافك.',
              en: 'The easy way to stay organized (and sane) during your wedding planning journey.'
            })}
            child={
              <Image
                style={{ width: '65%' }}
                source={require('@assets/checklist.png')}
                resizeMode={'contain'}
              />
            }
          />
          <ColoredButton
            text={this.pickLanguage({ ar: 'اضافة عنصر', en: 'Add Item' })}
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
              height: 25,
              marginLeft: '3%'
            }}
            textStyle={{
              fontSize: 12,
              fontFamily: 'Lato-Bold'
            }}
          />
          <ChecklistComponent
            selected
            checklists={this.props.checklists}
            toggleDone={this.props.toggleDone}
            onDeletePress={this.props.checklistDelete}
            checklistCreate={this.props.checklistCreate}
            checklistUpdate={this.props.checklistUpdate}
            isFetching={this.props.isFetching}
          />
        </KeyboardAvoidingView>
        <CustomModal
          headerText={this.pickLanguage({
            ar: 'إضافة عنصر قائمة الاختيار',
            en: 'Add Checklist Item'
          })}
          isCreate
          checklist
          isVisible={this.state.isVisible}
          onBackdropPress={() => {
            this.setState({ isVisible: false });
          }}
          onClosePress={() => {
            this.setState({ isVisible: false });
          }}
          onSavePress={(title, description) => {
            this.props.checklistCreate(title, description);
            this.setState({ isVisible: false });
          }}
        />
        <ErrorModal
          isVisible={!!this.props.error}
          hideModal={this.props.resetChecklistStatus}
          errors={this.state.errors}
        />
      </View>
    );
  }
}
