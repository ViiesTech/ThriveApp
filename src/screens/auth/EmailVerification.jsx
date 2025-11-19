/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import AuthHeader from '../../components/AuthHeader';
import {
  AppColors,
  responsiveHeight,
  responsiveWidth,
  ShowToast,
} from '../../utils';
import { useNavigation } from '@react-navigation/native';
import LineBreak from '../../components/LineBreak';
import AppButton from '../../components/AppButton';
import AppText from '../../components/AppTextComps/AppText';
import FieldCode from '../../components/CodeField';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import {
  useVerifyForgotPassMutation,
  useVerifyOTPMutation,
} from '../../redux/services';

const EmailVerification = ({ navigation, route }) => {
  const nav = useNavigation();
  const [value, setValue] = useState('');
  const { type } = useSelector(state => state.persistedData);
  const { token, email, screenType } = route?.params?.data;
  console.log('route', route.params.data);
  const [verifyOTP, { isLoading }] = useVerifyOTPMutation();
  const [verifyForgotPass, { isLoading: forgotPassLoading }] =
    useVerifyForgotPassMutation();

  console.log('token', token);

  const onVerifyEmailPress = async () => {
    if (!value) {
      ShowToast('Otp Is Required');
      return;
    }
    let data = {
      Otp: value,
      addSignUpToken: token,
    };

    await verifyOTP(data)
      .unwrap()
      .then(res => {
        console.log('response of register ===>', res);
        ShowToast(res.message);
        if (res.success) {
          // nav.navigate('EmailVerification', {
          //   data: { ...res.data, type: type },
          // });
          ShowToast('success', res.message);
        }
      })
      .catch(error => {
        console.log('error while registering the account ===>', error);
        ShowToast(error?.response?.data?.message || 'Some problem occured');
      });
  };
  const onVerifyForgotPass = async () => {
    if (!value) {
      ShowToast('Otp Is Required');
      return;
    }
    let data = {
      email: email,
      Otp: value,
    };

    await verifyForgotPass(data)
      .unwrap()
      .then(res => {
        console.log('response of verify forgot pass ===>', res);
        console.log('response of verify forgot pass ===>', res.message);
        ShowToast(res.message);
        if (res.success) {
          nav.navigate('NewPassword', {
            data: { email },
          });
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
          heading="Email verification,"
          subHeading="Please enter the passcode we sent you."
        />

        <View style={{ flex: 1, justifyContent: 'center' }}>
          <View>
            <FieldCode value={value} setValue={setValue} />
          </View>
          <LineBreak space={1} />
          <TouchableOpacity onPress={() => {}}>
            <AppText
              title={'Resend on 02:39'}
              textColor={AppColors.ThemeBlue}
              textSize={1.8}
              textAlignment={'right'}
            />
          </TouchableOpacity>
        </View>

        <View style={{ flex: 0.4, justifyContent: 'flex-end' }}>
          <AppButton
            title={
              isLoading || forgotPassLoading ? (
                <ActivityIndicator size={'large'} color={AppColors.WHITE} />
              ) : (
                'Verify Email'
              )
            }
            textColor={AppColors.WHITE}
            btnBackgroundColor={AppColors.appGreen}
            handlePress={
              screenType === 'ForgotPass'
                ? onVerifyForgotPass
                : onVerifyEmailPress
            }
            textFontWeight={false}
          />
        </View>
        <LineBreak space={2} />
      </View>
    </SafeAreaView>
  );
};

export default EmailVerification;
