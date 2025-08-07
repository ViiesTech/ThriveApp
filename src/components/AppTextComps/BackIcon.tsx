import React from 'react';
import {TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {responsiveFontSize} from '../../utils/Responsive_Dimensions';
import AppColors from '../../utils/AppColors';

const BackIcon = ({onBackPress, iconColor}: any) => {
  return (
    <TouchableOpacity onPress={onBackPress}>
      <Ionicons
        name={'arrow-back'}
        size={responsiveFontSize(3)}
        color={iconColor ? iconColor : AppColors.BLACK}
      />
    </TouchableOpacity>
  );
};

export default BackIcon;
