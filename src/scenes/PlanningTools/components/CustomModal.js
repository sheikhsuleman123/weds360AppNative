import React from 'react';
import Modal from 'react-native-modal';
import PlanningEditor from './PlanningEditor';

export default class CustomModal extends React.Component {
  render() {
    return (
      <Modal isVisible={this.props.isVisible} onBackdropPress={this.props.onBackdropPress}>
        <PlanningEditor
          checklist={this.props.checklist}
          headerText={this.props.headerText}
          isCreate={this.props.isCreate}
          onSavePress={this.props.onSavePress}
          style={{ flex: 1, marginBottom: 10 }}
          onClosePress={this.props.onBackdropPress}
          activeOpacity={1}
        />
      </Modal>
    );
  }
}
