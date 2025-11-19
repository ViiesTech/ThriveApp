/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { TouchableOpacity } from 'react-native';
import AppText from './AppTextComps/AppText';
import { AppColors, responsiveWidth } from '../utils/index';
import Loader from './Loader';

type props = {
  title?: any;
  handlePress?: () => void;
  textColor?: any;
  textFontWeight?: boolean;
  disabled?: boolean;
  textSize?: any;
  btnWidth?: any;
  btnBackgroundColor?: any;
  btnPadding?: any;
  borderWidth?: any;
  borderColor?: any;
  borderRadius?: any;
  leftIcon?: any;
  activeOpacity?: any;
  indicator?: any;
};
const AppButton = ({
  title,
  handlePress,
  leftIcon,
  disabled,
  borderRadius,
  borderWidth,
  borderColor,
  btnPadding,
  btnBackgroundColor,
  btnWidth,
  textColor = AppColors.WHITE,
  textFontWeight = true,
  textSize = 2.2,
  activeOpacity,
  indicator
}: props) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={handlePress}
      activeOpacity={activeOpacity}
      style={{
        backgroundColor: btnBackgroundColor
          ? btnBackgroundColor
          : AppColors.appGreen,
        alignItems: 'center',
        justifyContent: 'center',
        padding: btnPadding ? btnPadding : 14,
        borderRadius: borderRadius ? borderRadius : 100,
        width: btnWidth ? responsiveWidth(btnWidth) : 'auto',
        borderWidth: borderWidth || 0,
        borderColor: borderColor ? borderColor : null,
        flexDirection: 'row',
      }}>
      {leftIcon}
      {indicator ?
        <Loader size={'small'} />
        :
        <AppText
          textColor={textColor}
          textSize={textSize}
          title={title}
          textFontWeight={textFontWeight}
        />
      }
    </TouchableOpacity>
  );
};

export default AppButton;
