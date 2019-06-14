import React from 'react';
import Modal from 'react-native-modal';
import RegistryForm from './RegistryForm';
import I18n from '@i18n';

const mainPath = 'planning_tools.registry.text.';

export default class RegistryModal extends React.Component {
  render() {
    return (
      <Modal isVisible={this.props.isVisible}>
        <RegistryForm
          headerText={I18n.t(`${mainPath}create_registry`)}
          isCreate
          onSavePress={this.props.onSavePress}
          style={{ flex: 1, marginBottom: 10 }}
          onClosePress={this.props.onClosePress}
          activeOpacity={1}
        />
      </Modal>
    );
  }
}
