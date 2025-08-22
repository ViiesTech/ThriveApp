/* eslint-disable react-native/no-inline-styles */
import React, { useEffect } from 'react';
import { View, Image } from 'react-native';
import {
  AppColors,
  responsiveHeight,
  responsiveWidth,
} from '../../utils/index';
import { useNavigation } from '@react-navigation/native';
import { FasterImageView } from '@rraut/react-native-faster-image';

const Splash = () => {
  const nav = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      nav.replace('OnBoarding');
    }, 3000);
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
      <FasterImageView
        source={{
          uri: Image.resolveAssetSource(
            require('../../assets/images/attachment.gif'),
          ).uri,
          isGIF: true,
        }}
        style={{ width: responsiveWidth(80), height: responsiveHeight(40) }}
      />
    </View>
  );
};

export default Splash;
