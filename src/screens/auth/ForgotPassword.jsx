/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import {
  AppColors,
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../utils';
import AuthHeader from '../../components/AuthHeader';
import AppButton from '../../components/AppButton';
import { useNavigation } from '@react-navigation/native';
import LineBreak from '../../components/LineBreak';
import AppText from '../../components/AppTextComps/AppText';
import AppTextInput from '../../components/AppTextInput';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const ForgotPassword = () => {
  const nav = useNavigation();
  const [isEmailFocused, setIsEmailFocused] = useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: AppColors.WHITE }}>
      <View
        style={{
          paddingHorizontal: responsiveWidth(4),
          paddingVertical: responsiveHeight(2),
          flex: 1,
        }}
      >
        <AuthHeader
          heading="Forgot password,"
          subHeading="Please type your email below and we will give you a OTP code"
        />

        <View style={{ flex: 1, justifyContent: 'center' }}>
          <AppTextInput
            inputPlaceHolder={'Email'}
            logo={
              <MaterialIcons
                name={'email'}
                size={responsiveFontSize(2.5)}
                color={AppColors.ThemeBlue}
              />
            }
            inputHeight={5}
            isFocused={isEmailFocused}
            onFocus={() => setIsEmailFocused(true)}
            onBlur={() => setIsEmailFocused(false)}
          />
          <LineBreak space={1} />
          <TouchableOpacity onPress={() => {}}>
            <AppText
              title={'Use phone number?'}
              textColor={AppColors.ThemeBlue}
              textSize={1.8}
              textAlignment={'right'}
            />
          </TouchableOpacity>
        </View>

        <View style={{ flex: 0.4, justifyContent: 'flex-end' }}>
          <AppButton
            title="Send Code"
            textColor={AppColors.WHITE}
            btnBackgroundColor={AppColors.appGreen}
            handlePress={() => nav.navigate('EmailVerification')}
            textFontWeight={false}
          />
        </View>
        <LineBreak space={2} />
      </View>
    </View>
  );
};

export default ForgotPassword;
