import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Container from '../../components/Container';
import AuthHeader from '../../components/AuthHeader';
import { AppColors, responsiveFontSize, responsiveWidth } from '../../utils';
import LineBreak from '../../components/LineBreak';
import AppText from '../../components/AppTextComps/AppText';
import AppTextInput from '../../components/AppTextInput';
import Entypo from 'react-native-vector-icons/Entypo';
import AppButton from '../../components/AppButton';
import { useNavigation } from '@react-navigation/native';

const FillTheDetails = () => {
  const nav = useNavigation();
  return (
    <Container>
      <LineBreak space={2} />
      <View style={{ paddingHorizontal: responsiveWidth(4) }}>
        <AuthHeader
          heading="Fill Details"
          subHeading="Please type full information bellow and we can create your account"
        />
        <LineBreak space={4} />

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
        <View>
          <AppText
            title={'If you have any questions'}
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
          btnBackgroundColor={AppColors.lightGreen}
          handlePress={() => {}}
          textFontWeight={false}
        />
        <LineBreak space={2} />

        <AppButton
          title="Submit Now"
          textColor={AppColors.WHITE}
          btnBackgroundColor={AppColors.ThemeBlue}
          handlePress={() => nav.navigate("Main")}
          textFontWeight={false}
        />
      </View>
      <LineBreak space={5} />
    </Container>
  );
};

export default FillTheDetails;
