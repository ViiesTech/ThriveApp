/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import Container from '../../components/Container';
import AuthHeader from '../../components/AuthHeader';
import {
  AppColors,
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../utils';
import AppTextInput from '../../components/AppTextInput';
import LineBreak from '../../components/LineBreak';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AppText from '../../components/AppTextComps/AppText';
import AppButton from '../../components/AppButton';
import SVGXml from '../../components/SVGXML';
import { AppIcons } from '../../assets/icons';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
  const [email, setEmail] = useState();
  const [isShow, setIsShow] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const nav = useNavigation();

  return (
    <Container>
      <View
        style={{
          paddingHorizontal: responsiveWidth(4),
          paddingVertical: responsiveHeight(2),
        }}
      >
        <AuthHeader
          heading="Welcome back,"
          subHeading="Let’s get you back to wellness."
        />

        <LineBreak space={15} />

        <AppTextInput
          inputPlaceHolder={'Email'}
          logo={
            <MaterialIcons
              name={'email'}
              size={responsiveFontSize(2.5)}
              color={isEmailFocused ? AppColors.ThemeBlue : AppColors.LIGHTGRAY}
            />
          }
          inputHeight={5}
          value={email}
          onChangeText={text => setEmail(text)}
          isFocused={isEmailFocused}
          onFocus={() => setIsEmailFocused(true)}
          onBlur={() => setIsEmailFocused(false)}
        />

        <LineBreak space={2} />

        <AppTextInput
          inputPlaceHolder={'Password'}
          inputHeight={5}
          rightIcon={
            <TouchableOpacity onPress={() => setIsShow(!isShow)}>
              <Ionicons
                name={isShow ? 'eye' : 'eye-off'}
                size={responsiveFontSize(2.5)}
                color={
                  isPasswordFocused ? AppColors.ThemeBlue : AppColors.LIGHTGRAY
                }
              />
            </TouchableOpacity>
          }
          logo={
            <Foundation
              name={'lock'}
              size={responsiveFontSize(2.5)}
              color={
                isPasswordFocused ? AppColors.ThemeBlue : AppColors.LIGHTGRAY
              }
            />
          }
          isFocused={isPasswordFocused}
          onFocus={() => setIsPasswordFocused(true)}
          onBlur={() => setIsPasswordFocused(false)}
        />
        <LineBreak space={2} />

        <TouchableOpacity onPress={() => nav.navigate('ForgotPassword')}>
          <AppText
            title={'Forgot Password?'}
            textColor={AppColors.ThemeBlue}
            textSize={1.8}
            textAlignment={'right'}
          />
        </TouchableOpacity>

        <LineBreak space={15} />

        <AppButton
          title="Login"
          textColor={AppColors.WHITE}
          btnBackgroundColor={AppColors.ThemeBlue}
          handlePress={() => nav.navigate('Main')}
          textFontWeight={false}
        />

        <LineBreak space={2} />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            gap: responsiveWidth(5),
            alignItems: 'center',
          }}
        >
          <View
            style={{
              width: responsiveWidth(38),
              height: responsiveHeight(0.2),
              backgroundColor: AppColors.LIGHTGRAY,
            }}
          />
          <AppText
            title={'or'}
            textColor={AppColors.GRAY}
            textSize={1.8}
            textFontWeight
          />
          <View
            style={{
              width: responsiveWidth(38),
              height: responsiveHeight(0.2),
              backgroundColor: AppColors.LIGHTGRAY,
            }}
          />
        </View>
        <LineBreak space={2} />

        <AppButton
          title="Sign In with Google"
          textColor={AppColors.BLACK}
          borderWidth={2}
          borderColor={AppColors.ThemeBlue}
          btnBackgroundColor={AppColors.WHITE}
          handlePress={() => {}}
          leftIcon={
            <View style={{ paddingHorizontal: responsiveWidth(4) }}>
              <SVGXml icon={AppIcons.google} width={20} height={20} />
            </View>
          }
        />

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
            title={'Don"t have an account?'}
            textColor={AppColors.BLACK}
            textSize={2}
          />
          <TouchableOpacity onPress={() => nav.navigate('SignUp')}>
            <AppText
              title={'Join Now'}
              textColor={AppColors.ThemeBlue}
              textSize={2}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Container>
  );
};

export default Login;
