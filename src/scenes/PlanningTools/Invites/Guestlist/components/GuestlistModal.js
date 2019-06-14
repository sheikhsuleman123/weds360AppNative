import React from 'react';
import Modal from 'react-native-modal';
import GuestlistForm from '../components/GuestlistForm';

export default class GuestlistModal extends React.Component {
  pickLanguage = json => (this.props.language === 'ar' ? json.ar : json.en);
  render() {
    const { eventEditingForm } = this.props;
    return (
      <Modal isVisible={this.props.isVisible}>
        <GuestlistForm
          headerText={
            eventEditingForm
              ? this.pickLanguage({ ar: 'تعديل حدث', en: 'Edit Event' })
              : this.pickLanguage({ ar: 'انشاء حدث', en: 'Create Event' })
          }
          isCreate
          edit={eventEditingForm}
          data={this.props.data}
          style={{ backgroundColor: '#ebebeb' }}
          onSavePress={this.props.onSavePress}
          onClosePress={this.props.onClosePress}
          activeOpacity={1}
        />
      </Modal>
    );
  }
}
