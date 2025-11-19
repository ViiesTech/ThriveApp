/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import AuthHeader from '../../components/AuthHeader';
import {
  AppColors,
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
  ShowToast,
} from '../../utils';
import { useNavigation } from '@react-navigation/native';
import LineBreak from '../../components/LineBreak';
import AppTextInput from '../../components/AppTextInput';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AppButton from '../../components/AppButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useResetPasswordMutation } from '../../redux/services';

const NewPassword = ({ route }) => {
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] =
    useState(false);
  const { email } = route?.params?.data;
  const [isConfirmPasswordShow, setIsConfirmPasswordShow] = useState(false);
  const [password, setPassword] = useState();
  const [confirmPass, setConfirmPass] = useState();
  const nav = useNavigation();
  console.log('route?.params?.data', route?.params?.data);
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const onResetPassword = async () => {
    if (!password) {
      return ShowToast('Password is Required!');
    }
    if (!confirmPass) {
      return ShowToast('Re-Enter Your Password!');
    }
    if (password !== confirmPass) {
      ShowToast('Passwords Must Be Same!');
      return;
    }
    let data = {
      email: email,
      newPassword: password,
      type: 'Forget',
    };

    await resetPassword(data)
      .unwrap()
      .then(res => {
        console.log('response of verify forgot pass ===>', res);
        console.log('response of verify forgot pass ===>', res.message);
        ShowToast(res.message);
        if (res.success) {
          nav.navigate('Login');
          ShowToast(res.message);
        }
      })
      .catch(error => {
        console.log('error while registering the account ===>', error);
        ShowToast(error?.response?.data?.message || 'Some problem occured');
      });
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingVertical: responsiveHeight(4),
        backgroundColor: AppColors.WHITE,
      }}
    >
      <View
        style={{
          paddingHorizontal: responsiveWidth(4),
          paddingVertical: responsiveHeight(2),
          flex: 1,
        }}
      >
        <AuthHeader
          heading="New password,"
          subHeading="Create and confirm your new secure password."
        />

        <View style={{ flex: 1, justifyContent: 'center' }}>
          <AppTextInput
            onChangeText={val => setPassword(val)}
            inputPlaceHolder={'New Password'}
            inputHeight={5}
            rightIcon={
              <TouchableOpacity onPress={() => setIsShow(!isShow)}>
                <Ionicons
                  name={isShow ? 'eye' : 'eye-off'}
                  size={responsiveFontSize(2.5)}
                  color={AppColors.ThemeBlue}
                />
              </TouchableOpacity>
            }
            logo={
              <Foundation
                name={'lock'}
                size={responsiveFontSize(2.5)}
                color={AppColors.ThemeBlue}
              />
            }
            isFocused={isPasswordFocused}
            onFocus={() => setIsPasswordFocused(true)}
            onBlur={() => setIsPasswordFocused(false)}
          />

          <LineBreak space={2} />

          <AppTextInput
            onChangeText={val => setConfirmPass(val)}
            inputPlaceHolder={'Confirm Password'}
            inputHeight={5}
            rightIcon={
              <TouchableOpacity
                onPress={() => setIsConfirmPasswordShow(!isConfirmPasswordShow)}
              >
                <Ionicons
                  name={isConfirmPasswordShow ? 'eye' : 'eye-off'}
                  size={responsiveFontSize(2.5)}
                  color={AppColors.ThemeBlue}
                />
              </TouchableOpacity>
            }
            logo={
              <Foundation
                name={'lock'}
                size={responsiveFontSize(2.5)}
                color={AppColors.ThemeBlue}
              />
            }
            isFocused={isConfirmPasswordFocused}
            onFocus={() => setIsConfirmPasswordFocused(true)}
            onBlur={() => setIsConfirmPasswordFocused(false)}
          />
        </View>

        <View style={{ flex: 0.4, justifyContent: 'flex-end' }}>
          <AppButton
            title={
              isLoading ? (
                <ActivityIndicator size={'large'} color={AppColors.WHITE} />
              ) : (
                'Confirm New Password'
              )
            }
            textColor={AppColors.WHITE}
            btnBackgroundColor={AppColors.appGreen}
            handlePress={onResetPassword}
            textFontWeight={false}
          />
        </View>
        <LineBreak space={2} />
      </View>
    </SafeAreaView>
  );
};

export default NewPassword;
