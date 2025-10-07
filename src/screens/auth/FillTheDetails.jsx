/* eslint-disable react-native/no-inline-styles */
import React, { useRef, useState } from 'react';
import { View } from 'react-native';
import Container from '../../components/Container';
import AuthHeader from '../../components/AuthHeader';
import { AppColors, responsiveHeight, responsiveWidth } from '../../utils';
import LineBreak from '../../components/LineBreak';
import AppText from '../../components/AppTextComps/AppText';
import AppTextInput from '../../components/AppTextInput';
import AppButton from '../../components/AppButton';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import ImagePicker from 'react-native-image-crop-picker';
import PhoneInputScreen from '../../components/PhoneInput';

const FillTheDetails = () => {
  const nav = useNavigation();
  const [service, setService] = useState('Massage_Therapy');
  const [addOnOffer, setAddOnOffer] = useState('Foot_Scrub');
  const phoneRef = useRef();

  return (
    <Container>
      <LineBreak space={2} />
      <View style={{ paddingHorizontal: responsiveWidth(4) }}>
        <AuthHeader
          heading="Create your Profile"
          subHeading="Please enter your personal information below. i-thriv does not share any date with third parties."
        />
        <LineBreak space={4} />

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
          {/* <AppTextInput inputPlaceHolder={'Mobile number'} /> */}
          <PhoneInputScreen phoneRef={phoneRef} />
        </View>
        <LineBreak space={2} />
        <View>
          <AppText
            title={'City & Zip Code'}
            textColor={AppColors.GRAY}
            textSize={1.8}
          />
          <LineBreak space={0.5} />
          <AppTextInput inputPlaceHolder={''} />
        </View>
        <LineBreak space={2} />
        <View>
          <AppText
            title={'How many miles you willing to travel from your home?'}
            textColor={AppColors.GRAY}
            textSize={1.8}
          />
          <LineBreak space={0.5} />
          <AppTextInput inputPlaceHolder={'Up to 70 miles max'} />
        </View>
        <LineBreak space={2} />
        <View>
          <AppText
            title={'Select Your Core Services:'}
            textColor={AppColors.GRAY}
            textSize={1.8}
          />
          <LineBreak space={0.5} />
          <View
            style={{
              width: responsiveWidth(90),
              height: responsiveHeight(6),
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: AppColors.inputGrayBg,
              borderRadius: 100,
              alignSelf: 'center',
              paddingLeft: responsiveWidth(3.5),
            }}
          >
            <Picker
              selectedValue={service}
              mode="dropdown"
              dropdownIconColor={AppColors.ThemeBlue}
              style={{
                width: '100%',
                color: AppColors.ThemeBlue,
              }}
              onValueChange={itemValue => setService(itemValue)}
            >
              <Picker.Item label="Solo Massage" value="Solo Massage" />
               <Picker.Item label="Couples Massage" value="Couples Massage" />
              <Picker.Item label="Group Yoga" value="Group Yoga" />
              <Picker.Item label="Sound Bath" value="Sound Bath" />
              <Picker.Item label="Spa Party" value="Spa Party" />
              <Picker.Item label="Corporate Chair Massage" value="Corporate Chair Massage" />
              <Picker.Item label="Vibroacoustic Therapy" value="Vibroacoustic Therapy" />
              <Picker.Item label="Facial" value="Facial" />
            </Picker>
          </View>
        </View>

        <LineBreak space={2} />
        <View>
          <AppText
            title={'Add-On Services You Offer:'}
            textColor={AppColors.GRAY}
            textSize={1.8}
          />
          <LineBreak space={0.5} />
          <View
            style={{
              width: responsiveWidth(90),
              height: responsiveHeight(6),
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: AppColors.inputGrayBg,
              borderRadius: 100,
              alignSelf: 'center',
              paddingLeft: responsiveWidth(3.5),
            }}
          >
            <Picker
              selectedValue={addOnOffer}
              mode="dropdown"
              dropdownIconColor={AppColors.ThemeBlue}
              style={{
                width: '100%',
                color: AppColors.ThemeBlue,
              }}
              onValueChange={itemValue => setAddOnOffer(itemValue)}
            >
              <Picker.Item label="1 Provider (Back to Back)" value="1 Provider (Back to Back)" />
              <Picker.Item label="2 Providers (Side by side)" value="2 Providers (Side by side)" />
              <Picker.Item label="Aromatherapy (+$25 per  Person)" value="Aromatherapy (+$25 per  Person)" />
              <Picker.Item label="Hot Stone (+$45 per Person)" value="Hot Stone (+$45 per Person)" />
            </Picker>
          </View>
        </View>
        <LineBreak space={2} />
        <View>
          <AppText
            title={'Notes and additional information'}
            textColor={AppColors.GRAY}
            textSize={1.8}
          />
          <LineBreak space={0.5} />
          <AppTextInput
            inputPlaceHolder={''}
            inputHeight={10}
            borderRadius={5}
          />
        </View>
        <LineBreak space={2} />
        <AppButton
          title="Upload your ID or Certificate"
          textColor={AppColors.WHITE}
          btnBackgroundColor={AppColors.ThemeBlue}
          handlePress={() => {
            ImagePicker.openPicker({
              width: 300,
              height: 400,
              cropping: true,
            }).then(image => {
              alert(image.path);
            });
          }}
          textFontWeight={false}
        />
        <LineBreak space={2} />

        <AppButton
          title="Submit Now"
          textColor={AppColors.WHITE}
          btnBackgroundColor={AppColors.appGreen}
          handlePress={() => nav.navigate('Main')}
          textFontWeight={false}
        />
      </View>
      <LineBreak space={5} />
    </Container>
  );
};

export default FillTheDetails;
