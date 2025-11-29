/* eslint-disable react-native/no-inline-styles */
import React, { useRef, useState } from 'react';
import { View, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import Container from '../../../components/Container';
import AppHeader from '../../../components/AppHeader';
import {
  AppColors,
  responsiveFontSize,
  responsiveWidth,
  ShowToast,
} from '../../../utils';
import { AppImages } from '../../../assets/images';
import LineBreak from '../../../components/LineBreak';
import AppText from '../../../components/AppTextComps/AppText';
import AppTextInput from '../../../components/AppTextInput';
import AppButton from '../../../components/AppButton';
import { useNavigation } from '@react-navigation/native';
import PhoneInputScreen from '../../../components/PhoneInput';
import ImagePicker from 'react-native-image-crop-picker';
import Feather from 'react-native-vector-icons/Feather';
import { useSelector } from 'react-redux';
import { IMAGE_URL } from '../../../redux/constant';
import { useUpdateProfileMutation } from '../../../redux/services';

const PersonalInformation = () => {
  const nav = useNavigation();
  const phoneRef = useRef();
  console.log('phone');
  const [image, setImage] = useState('');
  const {
    fullName,
    email,
    _id,
    type,
    location,
    travel,
    serviceId,
    workingDays,
    image: savedImage,
  } = useSelector(state => state.persistedData?.user);
  const [updateProfile, { isLoading: updateLoading }] =
    useUpdateProfileMutation();
  const [state, setState] = useState({
    fullName: '',
    number: '',
    address: '',
    appartment: '',
    city: '',
    state: '',
    zipCode: '',
  });
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
  const onChangeText = (state, value) => {
    setState(prevState => ({
      ...prevState,
      [state]: value,
    }));
  };

  const onUpdatePress = async () => {
    try {
      const formData = new FormData();

      formData.append('id', _id);
      formData.append('type', type);

      // ✅ Append only if image exists
      if (image) {
        formData.append('image', {
          uri: image,
          name: 'userImage.jpg',
          type: 'image/jpeg',
        });
      }

      // ✅ Append only if provided
      if (state?.fullName) {
        formData.append('fullName', state.fullName);
      }

      if (state?.city) {
        formData.append('city', state.city);
      }
      if (state?.state) {
        formData.append('state', state.state);
      }
      if (state?.zipCode) {
        formData.append('zipCode', state.zipCode);
      }

      if (state?.number) {
        formData.append('phoneNumber', state.number);
      }
      if (state?.appartment) {
        formData.append('appartment', state.appartment);
      }
      if (state?.address) {
        formData.append('address', state.address);
      }
      // ✅ Append fixed location fields (since they’re required)
      formData.append('latitude', 40.758);
      formData.append('longitude', 73.9855);
      formData.append('locationName', 'Times Square,NYC');
      // ✅ Finally call the API
      const res = await updateProfile(formData).unwrap();
      console.log('response of update ===>', res);
      ShowToast(res.message);
    } catch (error) {
      console.log('error while update ===>', error);
      ShowToast(error?.data?.message || 'Something went wrong');
    }
  };
  console.log('state', state);
  return (
    <Container>
      <AppHeader onBackPress={true} heading={'Personal Information'} />
      <View style={{ paddingHorizontal: responsiveWidth(4) }}>
        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity onPress={() => pickImage()}>
            <Image
              source={
                image
                  ? { uri: image }
                  : savedImage
                  ? { uri: `${IMAGE_URL}${savedImage}` }
                  : AppImages.profile
              }
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
            title={fullName}
            textColor={AppColors.BLACK}
            textSize={1.8}
            textFontWeight
          />
          <AppText title={email} textColor={AppColors.GRAY} textSize={1.8} />
        </View>
        <LineBreak space={5} />

        <View>
          <AppText
            title={'Full Name'}
            textColor={AppColors.GRAY}
            textSize={1.8}
          />
          <LineBreak space={0.5} />
          <AppTextInput
            inputHeight={5}
            onChangeText={val => onChangeText('fullName', val)}
            inputPlaceHolder={''}
          />
        </View>

        <LineBreak space={2} />

        <View>
          <AppText
            title={'Cell phone Number'}
            textColor={AppColors.GRAY}
            textSize={1.8}
          />
          <LineBreak space={0.5} />
          <PhoneInputScreen
            onChangePhoneNumber={number => {
              onChangeText('number', number);
            }}
            phoneRef={phoneRef}
          />
        </View>

        <LineBreak space={2} />

        <View>
          <AppText
            title={'Address'}
            textColor={AppColors.GRAY}
            textSize={1.8}
          />
          <LineBreak space={0.5} />

          <AppTextInput
            inputHeight={5}
            onChangeText={val => onChangeText('address', val)}
            inputPlaceHolder={''}
          />
        </View>
        <LineBreak space={2} />
        <View>
          <AppText
            title={'Appartment'}
            textColor={AppColors.GRAY}
            textSize={1.8}
          />
          <LineBreak space={0.5} />
          <AppTextInput
            inputHeight={5}
            onChangeText={val => onChangeText('appartment', val)}
            inputPlaceHolder={''}
          />
        </View>

        <LineBreak space={2} />

        <View>
          <AppText title={'City'} textColor={AppColors.GRAY} textSize={1.8} />
          <LineBreak space={0.5} />

          <AppTextInput
            inputHeight={5}
            onChangeText={val => onChangeText('city', val)}
            inputPlaceHolder={''}
          />
        </View>

        <LineBreak space={2} />

        <View>
          <AppText title={'State'} textColor={AppColors.GRAY} textSize={1.8} />
          <LineBreak space={0.5} />

          <AppTextInput
            inputHeight={5}
            onChangeText={val => onChangeText('state', val)}
            inputPlaceHolder={''}
          />
        </View>

        <LineBreak space={2} />

        <View>
          <AppText
            title={'Zip Code'}
            textColor={AppColors.GRAY}
            textSize={1.8}
          />
          <LineBreak space={0.5} />

          <AppTextInput
            inputHeight={5}
            onChangeText={val => onChangeText('zipCode', val)}
            inputPlaceHolder={''}
          />
        </View>

        <LineBreak space={2} />

        {/* <View>
          <AppText
            title={'Password'}
            textColor={AppColors.GRAY}
            textSize={1.8}
          />
          <LineBreak space={0.5} />
          <AppTextInput inputPlaceHolder={''} />
        </View> */}

        <LineBreak space={5} />

        <AppButton
          title={
            updateLoading ? (
              <ActivityIndicator size={'large'} color={AppColors.WHITE} />
            ) : (
              'Save Information'
            )
          }
          textColor={AppColors.WHITE}
          btnBackgroundColor={AppColors.appGreen}
          handlePress={onUpdatePress}
          textFontWeight={false}
        />
        <LineBreak space={2} />
      </View>
    </Container>
  );
};

export default PersonalInformation;
