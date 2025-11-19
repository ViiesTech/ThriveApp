/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import {
  AppColors,
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
  ShowToast,
} from '../../utils';
import AuthHeader from '../../components/AuthHeader';
import AppButton from '../../components/AppButton';
import { useNavigation } from '@react-navigation/native';
import LineBreak from '../../components/LineBreak';
import AppText from '../../components/AppTextComps/AppText';
import AppTextInput from '../../components/AppTextInput';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForgotPasswordMutation } from '../../redux/services';
import { useSelector } from 'react-redux';

const ForgotPassword = () => {
  const nav = useNavigation();
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [email, setEmail] = useState('');
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const { type } = useSelector(state => state.persistedData);

  const forgotPasswordHandler = async () => {
    if (!email) {
      ShowToast('Please enter your email');
      return;
    }

    let data = {
      email: email,
    };
    await forgotPassword(data)
      .unwrap()
      .then(res => {
        console.log('response of forgot password ===>', res);
        ShowToast(res.message);
        if (res.success) {
          nav.navigate('EmailVerification', {
            data: { ...res.data, token: null, type: type,screenType:'ForgotPass' },
          });
        }
      })
      .catch(error => {
        console.log('error while registering the account ===>', error);
        ShowToast(error?.message || 'Some problem occured');
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
          justifyContent: 'center',
        }}
      >
        <AuthHeader
          heading="Forgot password,"
          subHeading="Please enter  your email below. We will send you a passcode."
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
            onChangeText={val => setEmail(val)}
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
            title={
              isLoading ? (
                <ActivityIndicator size={'large'} color={AppColors.WHITE} />
              ) : (
                'Send Code'
              )
            }
            textColor={AppColors.WHITE}
            btnBackgroundColor={AppColors.appGreen}
            handlePress={forgotPasswordHandler}
            textFontWeight={false}
          />
        </View>
        <LineBreak space={2} />
      </View>
    </SafeAreaView>
  );
};

export default ForgotPassword;
