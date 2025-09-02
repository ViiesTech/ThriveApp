/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, ImageBackground, TouchableOpacity } from 'react-native';
import { AppImages } from '../../assets/images';
import AppText from '../../components/AppTextComps/AppText';
import {
  AppColors,
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../utils';
import { useNavigation } from '@react-navigation/native';
import LineBreak from '../../components/LineBreak';
import AppButton from '../../components/AppButton';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SVGXml from '../../components/SVGXML';
import { AppIcons } from '../../assets/icons';

const GetStarted = () => {
  const nav = useNavigation();

  return (
    <ImageBackground
      source={AppImages.on_boarding4}
      style={{
        flex: 1,
        justifyContent: 'flex-end',
      }}
    >
      <View style={{ paddingVertical: responsiveHeight(5) }}>
        <AppText
          title={'Join i-thriv'}
          textColor={AppColors.WHITE}
          textSize={2.5}
          textFontWeight
          textAlignment={'center'}
        />
        <LineBreak space={2} />
        <AppText
          title={'Book massage, yoga & spa services anytime, anywhere.'}
          textColor={AppColors.WHITE}
          textAlignment={'center'}
          textwidth={70}
          lineHeight={2.5}
          textSize={2}
        />
        <LineBreak space={5} />

        <View style={{ paddingHorizontal: responsiveWidth(4) }}>
          <AppButton
            title="Login with Google"
            textColor={AppColors.BLACK}
            btnBackgroundColor={AppColors.WHITE}
            handlePress={() => {}}
            leftIcon={
              <View style={{ paddingHorizontal: responsiveWidth(4) }}>
                <SVGXml icon={AppIcons.google} width={20} height={20} />
              </View>
            }
          />

          <LineBreak space={2} />

          <AppButton
            title="Login with Email"
            textColor={AppColors.WHITE}
            btnBackgroundColor={AppColors.ThemeBlue}
            handlePress={() => nav.navigate('Login')}
            leftIcon={
              <View style={{ paddingHorizontal: responsiveWidth(4) }}>
                <MaterialIcons
                  name={'email'}
                  size={responsiveFontSize(2.5)}
                  color={AppColors.WHITE}
                />
              </View>
            }
            textFontWeight={false}
          />
        </View>

        <LineBreak space={3} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 5,
          }}
        >
          <AppText
            title={`Don't have an account?`}
            textColor={AppColors.WHITE}
            textSize={2}
          />
          <TouchableOpacity onPress={() => nav.navigate('SelectType')}>
            <AppText
              title={'Sign Up'}
              textColor={AppColors.WHITE}
              textSize={2}
            />
          </TouchableOpacity>
        </View>
      </View>
      <LineBreak space={3} />
    </ImageBackground>
  );
};

export default GetStarted;
