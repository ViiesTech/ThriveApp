import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { AppColors, responsiveFontSize, responsiveWidth } from '../../utils';
import { AppImages } from '../../assets/images';
import LineBreak from '../../components/LineBreak';
import AppText from '../../components/AppTextComps/AppText';
import AppTextInput from '../../components/AppTextInput';
import AppButton from '../../components/AppButton';
import { useNavigation } from '@react-navigation/native';
import Container from '../../components/Container';
import AppHeader from '../../components/AppHeader';
import Entypo from 'react-native-vector-icons/Entypo';

const ProviderEditProfile = () => {
        const nav = useNavigation();

  return (
    <Container>
      <AppHeader onBackPress={true} heading={'Edit Profile'} />
      <View style={{ paddingHorizontal: responsiveWidth(4) }}>
        <View style={{ alignItems: 'center' }}>
          <Image
            source={AppImages.on_boarding1}
            style={{ width: 80, height: 80, borderRadius: 100 }}
          />
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
          <AppTextInput inputPlaceHolder={'Name'} />
        </View>

        <LineBreak space={2} />

        <View>
          <AppText
            title={'Email Address'}
            textColor={AppColors.GRAY}
            textSize={1.8}
          />
          <LineBreak space={0.5} />
          <AppTextInput inputPlaceHolder={'Email Address'} />
        </View>

        <LineBreak space={2} />

        <View>
          <AppText
            title={'Cell phone Number'}
            textColor={AppColors.GRAY}
            textSize={1.8}
          />
          <LineBreak space={0.5} />
          <AppTextInput inputPlaceHolder={'Mobile number'} />
        </View>

        <LineBreak space={2} />

        <View>
          <AppText
            title={'City & Zip Code'}
            textColor={AppColors.GRAY}
            textSize={1.8}
          />
          <LineBreak space={0.5} />
          <AppTextInput inputPlaceHolder={'City & Zip Code'} />
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
          <AppTextInput
            inputPlaceHolder={'Massage Therapy'}
            inputWidth={75}
            rightIcon={
              <TouchableOpacity>
                <Entypo
                  name="chevron-down"
                  size={responsiveFontSize(2.5)}
                  color={AppColors.ThemeBlue}
                />
              </TouchableOpacity>
            }
          />
        </View>
        <LineBreak space={2} />
        <View>
          <AppText
            title={'Add-On Services You Offer:'}
            textColor={AppColors.GRAY}
            textSize={1.8}
          />

          <LineBreak space={0.5} />
          <AppTextInput
            inputPlaceHolder={'Foot Scrub'}
            inputWidth={75}
            rightIcon={
              <TouchableOpacity>
                <Entypo
                  name="chevron-down"
                  size={responsiveFontSize(2.5)}
                  color={AppColors.ThemeBlue}
                />
              </TouchableOpacity>
            }
          />
        </View>

        <LineBreak space={2} />

         <AppButton
          title={'Save Information'}
          textColor={AppColors.WHITE}
          btnBackgroundColor={AppColors.ThemeBlue}
          handlePress={() => nav.navigate('Main')}
          textFontWeight={false}
        />
      </View>
      <LineBreak space={5} />
    </Container>
  );
};

export default ProviderEditProfile;
