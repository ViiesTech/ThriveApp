/* eslint-disable react-native/no-inline-styles */
import React, { useRef, useState } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import Container from '../../../components/Container';
import AppHeader from '../../../components/AppHeader';
import { AppColors, responsiveFontSize, responsiveWidth } from '../../../utils';
import { AppImages } from '../../../assets/images';
import LineBreak from '../../../components/LineBreak';
import AppText from '../../../components/AppTextComps/AppText';
import AppTextInput from '../../../components/AppTextInput';
import AppButton from '../../../components/AppButton';
import { useNavigation } from '@react-navigation/native';
import PhoneInputScreen from '../../../components/PhoneInput';
import ImagePicker from 'react-native-image-crop-picker';
import Feather from 'react-native-vector-icons/Feather';

const PersonalInformation = () => {
  const nav = useNavigation();
  const phoneRef = useRef();
  const [image, setImage] = useState('');

  const pickImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      setImage(image.path);
      console.log(image);
    });
  };

  return (
    <Container>
      <AppHeader onBackPress={true} heading={'Personal Information'} />
      <View style={{ paddingHorizontal: responsiveWidth(4) }}>
        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity onPress={() => pickImage()}>
            <Image
              source={image ? { uri: image } : AppImages.profile}
              style={{ width: 80, height: 80, borderRadius: 100 }}
            />
            <View style={{ position: 'absolute', bottom: 0, right: 0 }}>
              <Feather
                name="edit"
                size={responsiveFontSize(2)}
                color={AppColors.BLACK}
              />
            </View>
          </TouchableOpacity>
          <LineBreak space={1.2} />
          <AppText
            title={'Samantha Wilson'}
            textColor={AppColors.BLACK}
            textSize={1.8}
            textFontWeight
          />
          <AppText
            title={'samanthawilson@gmail.com'}
            textColor={AppColors.GRAY}
            textSize={1.8}
          />
        </View>
        <LineBreak space={5} />

        <View>
          <AppText
            title={'Full Name'}
            textColor={AppColors.GRAY}
            textSize={1.8}
          />
          <LineBreak space={0.5} />
          <AppTextInput inputPlaceHolder={''} />
        </View>

        <LineBreak space={2} />

        <View>
          <AppText
            title={'Email Address'}
            textColor={AppColors.GRAY}
            textSize={1.8}
          />
          <LineBreak space={0.5} />
          <AppTextInput inputPlaceHolder={''} />
        </View>

        <LineBreak space={2} />

        <View>
          <AppText
            title={'Cell phone Number'}
            textColor={AppColors.GRAY}
            textSize={1.8}
          />
          <LineBreak space={0.5} />
          <PhoneInputScreen phoneRef={phoneRef} />
        </View>

        <LineBreak space={2} />

        <View>
          <AppText
            title={'Address'}
            textColor={AppColors.GRAY}
            textSize={1.8}
          />
          <LineBreak space={0.5} />
          <AppTextInput inputPlaceHolder={''} />
        </View>

        <LineBreak space={2} />

        <View>
          <AppText title={'City'} textColor={AppColors.GRAY} textSize={1.8} />
          <LineBreak space={0.5} />
          <AppTextInput inputPlaceHolder={''} />
        </View>

        <LineBreak space={2} />

        <View>
          <AppText title={'State'} textColor={AppColors.GRAY} textSize={1.8} />
          <LineBreak space={0.5} />
          <AppTextInput inputPlaceHolder={''} />
        </View>

        <LineBreak space={2} />

        <View>
          <AppText
            title={'Zip Code'}
            textColor={AppColors.GRAY}
            textSize={1.8}
          />
          <LineBreak space={0.5} />
          <AppTextInput inputPlaceHolder={''} />
        </View>

        <LineBreak space={2} />

        <View>
          <AppText
            title={'Password'}
            textColor={AppColors.GRAY}
            textSize={1.8}
          />
          <LineBreak space={0.5} />
          <AppTextInput inputPlaceHolder={''} />
        </View>

        <LineBreak space={7} />

        <AppButton
          title={'Save Information'}
          textColor={AppColors.WHITE}
          btnBackgroundColor={AppColors.appGreen}
          handlePress={() => nav.navigate('Main')}
          textFontWeight={false}
        />
      </View>
    </Container>
  );
};

export default PersonalInformation;
