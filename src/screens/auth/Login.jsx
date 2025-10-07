/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Container from '../../components/Container';
import AuthHeader from '../../components/AuthHeader';
import {
  AppColors,
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
  ShowToast,
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
import { useLoginMutation } from '../../redux/services';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isShow, setIsShow] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [login, { isLoading }] = useLoginMutation();
  const nav = useNavigation();

  const onLoginPress = async () => {
    // if(!email) {
    //   ShowToast('Please enter your email')
    //   return
    // }
    // if(!password) {
    //   ShowToast('Please enter your password')
    //   return
    // }
    // let data = {
    //   email: email,
    //   password: password
    // }
    // await login(data).unwrap().then((res) => {
    //   console.log('response of login ===>',res)
    //   ShowToast(res.message)
    // }).catch((error) => {
    //   console.log('error while login ===>',error)
    //   ShowToast('Some problem occured')
    // })
    nav.navigate('Main');
  };

  return (
    <Container scrollEnabled={false}>
      <View
        style={{
          paddingHorizontal: responsiveWidth(4),
          paddingVertical: responsiveHeight(2),
          flex: 1,
          justifyContent: 'center',
        }}
      >
        <AuthHeader heading="Welcome back," subHeading="Time to recharge." />

        <LineBreak space={15} />

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
          keyboardType={'email-address'}
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
          value={password}
          secureTextEntry={isShow}
          onChangeText={text => setPassword(text)}
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
          indicator={isLoading}
          btnBackgroundColor={AppColors.appGreen}
          // handlePress={() => onLoginPress()}
          handlePress={async () => {
            const type = await AsyncStorage.getItem('type');
            if (type === 'Client') {
              nav.navigate('Main');
            } else {
              nav.navigate('FillTheDetails');
            }
          }}
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
