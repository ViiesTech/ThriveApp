/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, Image } from 'react-native';
import Container from '../../../components/Container';
import { AppImages } from '../../../assets/images';
import {
  AppColors,
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../../utils';
import LineBreak from '../../../components/LineBreak';
import AppText from '../../../components/AppTextComps/AppText';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AppButton from '../../../components/AppButton';
import { useNavigation } from '@react-navigation/native';

const ServiceDetails = () => {
  const nav = useNavigation();
  return (
    <Container>
      <Image
        source={AppImages.fashion}
        style={{ width: responsiveWidth(100), height: responsiveHeight(45) }}
      />
      <View style={{ paddingHorizontal: responsiveWidth(4) }}>
        <LineBreak space={2.5} />
        <AppText
          title={'Skin Care'}
          textColor={AppColors.BLACK}
          textSize={3}
          textFontWeight
        />

        <LineBreak space={1} />

        <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
          <Feather
            name="clock"
            size={responsiveFontSize(2.5)}
            color={AppColors.GRAY}
          />
          <AppText
            title={'2,5 hours service'}
            textColor={AppColors.GRAY}
            textSize={1.8}
          />
        </View>

        <LineBreak space={2} />

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <AppText
            title={'$40 '}
            textColor={AppColors.ThemeBlue}
            textSize={3}
            textFontWeight
          >
            <AppText
              title={'$10'}
              textColor={AppColors.GRAY}
              textSize={1.6}
              textDecorationLine="line-through"
            />
          </AppText>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
              backgroundColor: AppColors.lightestBlue,
              paddingHorizontal: responsiveWidth(3),
              paddingVertical: responsiveHeight(0.5),
              borderRadius: 100,
            }}
          >
            <FontAwesome5
              name="tag"
              size={responsiveFontSize(1.6)}
              color={AppColors.ThemeBlue}
            />
            <AppText
              title={'-45%'}
              textColor={AppColors.ThemeBlue}
              textSize={2}
              textFontWeight
            />
          </View>
        </View>
        <View
          style={{
            width: responsiveWidth(92),
            height: responsiveHeight(0.2),
            backgroundColor: AppColors.LIGHTGRAY,
            marginVertical: responsiveHeight(3),
          }}
        />

        <AppText
          title={'About Service'}
          textColor={AppColors.BLACK}
          textSize={2}
          textFontWeight
        />

        <LineBreak space={2} />

        <AppText
          title={
            'A blunt cut bob is a shorter hairstyle that"s cut into a straight line at the ends. Bobs have proven themselves to be transcending of time with its endless variations.'
          }
          textColor={AppColors.DARKGRAY}
          textSize={1.8}
          lineHeight={2.3}
        />

        <LineBreak space={2} />

        <AppButton
          title={'Add to Booking Chart'}
          textColor={AppColors.WHITE}
          btnBackgroundColor={AppColors.ThemeBlue}
          handlePress={() => nav.navigate('ServiceMenu')}
          textFontWeight={false}
        />
      </View>
      <LineBreak space={2} />
    </Container>
  );
};

export default ServiceDetails;
