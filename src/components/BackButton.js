import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';

import Icon from 'react-native-vector-icons/Ionicons';

export default () => (
  <TouchableOpacity onPress={() => Actions.pop()} style={{ marginTop: 20, marginLeft: 20 }}>
    <Icon name={'ios-arrow-back'} size={25} />
  </TouchableOpacity>
);
