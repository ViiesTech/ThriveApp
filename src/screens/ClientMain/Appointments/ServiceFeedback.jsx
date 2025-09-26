/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { Image, View } from 'react-native';
import { AppColors, responsiveWidth } from '../../../utils';
import AppText from '../../../components/AppTextComps/AppText';
import SVGXml from '../../../components/SVGXML';
import { AppIcons } from '../../../assets/icons';
import LineBreak from '../../../components/LineBreak';
import AppTextInput from '../../../components/AppTextInput';
import AppButton from '../../../components/AppButton';
import { AppImages } from '../../../assets/images';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ServiceFeedback = () => {
  const nav = useNavigation();
  const [type, setType] = useState('');

  const getType = async () => {
    const userType = await AsyncStorage.getItem('type');
    setType(userType);
  };

  useEffect(() => {
    getType();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: AppColors.WHITE,
      }}
    >
      <View style={{ alignItems: 'center' }}>
        <SVGXml icon={AppIcons.done} width={90} height={90} />
      </View>
      <LineBreak space={3} />
      <AppText
        title={'Your Appointment Completed!'}
        textColor={AppColors.BLACK}
        textSize={2.8}
        textFontWeight
        textwidth={70}
        textAlignment={'center'}
      />
      <LineBreak space={5} />

      <View style={{ paddingHorizontal: responsiveWidth(4) }}>
        <AppText
          title={'Service Feedback'}
          textColor={AppColors.GRAY}
          textSize={1.6}
        />
        <LineBreak space={1} />
        <AppTextInput
          inputPlaceHolder={'write text here...'}
          containerBg={AppColors.LIGHTESTGRAY}
        />
        <LineBreak space={2} />
        <AppButton
          title="Submit Now"
          textColor={AppColors.WHITE}
          btnBackgroundColor={AppColors.appGreen}
          handlePress={() => {
            nav.navigate('Main');
          }}
          textFontWeight={false}
        />

        <LineBreak space={7} />
        {type === 'Provider' && (
          <AppText
            title={'Specialist Rating'}
            textColor={AppColors.BLACK}
            textSize={1.8}
            textFontWeight
            textAlignment={'center'}
          />
        )}

        {type === 'Provider' && <LineBreak space={2} />}

        {type === 'Provider' && (
          <View style={{ flexDirection: 'row', gap: 20, alignItems: 'center' }}>
            <Image
              source={AppImages.star}
              style={{ marginLeft: responsiveWidth(10) }}
            />
            <AppText
              title={'4 Star'}
              textColor={AppColors.ThemeBlue}
              textSize={1.8}
              textFontWeight
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default ServiceFeedback;
