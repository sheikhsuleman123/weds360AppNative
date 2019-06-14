import React from 'react';
import CustomRow from './CustomRow';
import PlanningEditor from './PlanningEditor';
import RegistryForm from '../Registry/components/RegistryForm';

class SwiperRow extends React.Component {
  render() {
    if (this.props.editView) {
      if (this.props.registry) {
        return (
          <RegistryForm
            style={{
              flex: 1
            }}
            headerText={this.props.rowData.title}
            isCreate={false}
            onSavePress={this.props.onSavePress}
            onClosePress={this.props.onClosePress}
            activeOpacity={1}
            item={this.props.rowData}
            onClosePress={this.props.closeView}
          />
        );
      }
      return (
        <PlanningEditor
          servicesNames={this.props.servicesNames}
          allServices={this.props.allServices}
          headerText={this.props.rowData.title}
          headerStyle={{ backgroundColor: '#006862' }}
          headerTextStyle={{ color: '#ffffff' }}
          style={{ flex: 1, paddingBottom: 60 }}
          onClosePress={this.props.closeView}
          onSavePress={this.props.onSavePress}
          isCreate={false}
          item={this.props.rowData}
        />
      );
    }
    return (
      <CustomRow
        disabled={this.props.disabled}
        calculateNumeral={this.props.calculateNumeral}
        registry={this.props.registry}
        rowData={this.props.rowData}
        onPress={this.props.openView}
        onDeletePress={this.props.onDeletePress}
      />
    );
  }
}
export default SwiperRow;
