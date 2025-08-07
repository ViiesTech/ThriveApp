/* eslint-disable react-native/no-inline-styles */
import React, { useEffect } from 'react';
import { View, Image } from 'react-native';
import {
  AppColors,
  responsiveHeight,
  responsiveWidth,
} from '../../utils/index';
import { AppImages } from '../../assets/images';
import { useNavigation } from '@react-navigation/native';

const Splash = () => {
  const nav = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      nav.replace('OnBoarding');
    }, 2000);
  }, [nav]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: AppColors.WHITE,
      }}
    >
      <Image
        source={AppImages.app_logo}
        style={{ width: responsiveWidth(80), height: responsiveHeight(40) }}
        resizeMode="contain"
      />
    </View>
  );
};

export default Splash;
