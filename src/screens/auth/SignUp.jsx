/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
import React, { useRef, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Container from '../../components/Container';
import {
  AppColors,
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
  ShowToast,
} from '../../utils';
import { useNavigation } from '@react-navigation/native';
import AuthHeader from '../../components/AuthHeader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LineBreak from '../../components/LineBreak';
import AppTextInput from '../../components/AppTextInput';
import AppButton from '../../components/AppButton';
import Foundation from 'react-native-vector-icons/Foundation';
import AppText from '../../components/AppTextComps/AppText';
import SVGXml from '../../components/SVGXML';
import { AppIcons } from '../../assets/icons';
import { useRegisterMutation } from '../../redux/services';
import PhoneInputScreen from '../../components/PhoneInput';
import { useSelector } from 'react-redux';

const SignUp = ({ route }) => {
  const [isNameFocused, setIsNameFocused] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPhoneNumberFocused, setIsPhoneNumberFocused] = useState(false);
  const [isPhoneFocused, setIsPhoneFocused] = useState(false);
  const nav = useNavigation();
  const [isShow, setIsShow] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [state, setState] = useState({
    name: '',
    email: '',
    number: '',
    password: '',
  });
  console.log('state', state);
  const [register, { isLoading }] = useRegisterMutation();
  const phoneRef = useRef();
  console.log('phoneRef.current?.getValue()', phoneRef.current?.getValue());
  const { type } = useSelector(state => state.persistedData);

  // const { type } = route?.params;

  // console.log('type ===>', type);
  const handleGetPhone = () => {
    const phoneNumber = phoneRef.current?.getValue(); // 👈 gets full number with country code
    console.log('Phone number:', phoneNumber);
  };

  const onSignupPress = async () => {
    if (!state.name) {
      ShowToast('Please enter your name');
      return;
    }
    if (!state.email) {
      ShowToast('Please enter your email');
      return;
    }
    if (!state.number) {
      ShowToast('Please enter your mobile number');
      return;
    }
    if (!state.password) {
      ShowToast('Please enter your password');
      return;
    }
    if (state.password.length < 8) {
      ShowToast('Password is too weak');
      return;
    }
    let data = {
      fullName:state?.name,
      email: state.email,
      password: state.password,
      phoneNumber: state.number,
      type: type,
    };
    await register(data)
      .unwrap()
      .then(res => {
        console.log('response of register ===>', res);
        ShowToast(res.message);
        if (res.success) {
          nav.navigate('EmailVerification', {
            data: {
              ...res.data,
              token: res.accessToken,
              type: type,
              screenType: 'RegisterUser',
            },
          });
        }
      })
      .catch(error => {
        console.log('error while registering the account ===>', error);
        ShowToast('Some problem occured');
      });
  };

  const onChangeText = (state, value) => {
    setState(prevState => ({
      ...prevState,
      [state]: value,
    }));
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
        <AuthHeader
          heading="Create an account,"
          subHeading="Enter your full details below to get started."
        />

        <LineBreak space={7} />

        <AppTextInput
          inputPlaceHolder={'Name'}
          value={state.name}
          onChangeText={text => onChangeText('name', text)}
          logo={
            <Ionicons
              name={'person'}
              size={responsiveFontSize(2.5)}
              color={AppColors.ThemeBlue}
            />
          }
          inputHeight={5}
          isFocused={isNameFocused}
          onFocus={() => setIsNameFocused(true)}
          onBlur={() => setIsNameFocused(false)}
        />

        <LineBreak space={2} />

        <AppTextInput
          inputPlaceHolder={'Email address'}
          value={state.email}
          keyboardType={'email-address'}
          onChangeText={text => onChangeText('email', text)}
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

        <LineBreak space={2} />

        {/* <AppTextInput
          inputPlaceHolder={'Mobile Number'}
          value={state.number}
          keyboardType={'numeric'}
          onChangeText={text => onChangeText('number', text)}
          logo={
            <Octicons
              name={'number'}
              size={responsiveFontSize(2.5)}
              color={AppColors.ThemeBlue}
            />
          }
          inputHeight={5}
          isFocused={isPhoneNumberFocused}
          onFocus={() => setIsPhoneNumberFocused(true)}
          onBlur={() => setIsPhoneNumberFocused(false)}
        /> */}

        <PhoneInputScreen
          phoneRef={phoneRef}
          onChangePhoneNumber={number => {
            onChangeText('number', number);
          }}
        />

        <LineBreak space={2} />

        <AppTextInput
          inputPlaceHolder={'Password'}
          inputHeight={5}
          secureTextEntry={isShow}
          value={state.password}
          onChangeText={text => onChangeText('password', text)}
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

        <View>
          <AppText textColor={AppColors.GRAY} textSize={1.8}>
            By signing up you agree to our{' '}
            <AppText
              textColor={AppColors.ThemeBlue}
              textFontWeight
              textSize={1.8}
            >
              Term of use and privacy
            </AppText>{' '}
            <AppText textColor={AppColors.GRAY} textSize={1.8}>
              notice
            </AppText>
          </AppText>
        </View>

        <LineBreak space={2} />

        <AppButton
          title="Join Now"
          indicator={isLoading}
          textColor={AppColors.WHITE}
          btnBackgroundColor={AppColors.appGreen}
          handlePress={onSignupPress}
          // handlePress={async () => {
          //   if (type === 'Client') {
          //     nav.navigate('Main');
          //   } else {
          //     nav.navigate('FillTheDetails');
          //   }
          // }}
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
          title="Join with Google"
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
            title={'Already have an account?'}
            textColor={AppColors.BLACK}
            textSize={2}
          />
          <TouchableOpacity onPress={() => nav.navigate('Login')}>
            <AppText
              title={'Sign In'}
              textColor={AppColors.ThemeBlue}
              textSize={2}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Container>
  );
};

export default SignUp;
