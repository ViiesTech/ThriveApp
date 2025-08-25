import React from 'react';
import { View, Text } from 'react-native';
import Container from '../../components/Container';
import AppHeader from '../../components/AppHeader';
import AppText from '../../components/AppTextComps/AppText';
import { AppColors, responsiveFontSize, responsiveWidth } from '../../utils';
import LineBreak from '../../components/LineBreak';
import AppTextInput from '../../components/AppTextInput';
import Entypo from 'react-native-vector-icons/Entypo';
import AppButton from '../../components/AppButton';
import { useNavigation } from '@react-navigation/native';

const OpenRequestForm = () => {
  const nav = useNavigation();
  return (
    <Container>
      <AppHeader onBackPress={true} heading={'Open Request Form'} />
      <LineBreak space={2} />
      <View style={{ paddingHorizontal: responsiveWidth(4) }}>
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
            title={'Address'}
            textColor={AppColors.GRAY}
            textSize={1.8}
          />
          <LineBreak space={0.5} />
          <AppTextInput inputPlaceHolder={'Address'} />
        </View>

        <LineBreak space={2} />

        <View>
          <AppText
            title={'Select Service you need'}
            textColor={AppColors.GRAY}
            textSize={1.8}
          />
          <LineBreak space={0.5} />
          <AppTextInput
            inputPlaceHolder={'Message Therapy'}
            inputWidth={75}
            rightIcon={
              <Entypo
                name="chevron-down"
                size={responsiveFontSize(2.5)}
                color={AppColors.ThemeBlue}
              />
            }
          />
        </View>

        <LineBreak space={2} />

        <View>
          <AppText
            title={'Select Time'}
            textColor={AppColors.GRAY}
            textSize={1.8}
          />
          <LineBreak space={0.5} />
          <AppTextInput inputPlaceHolder={'10:00 AM'} />
        </View>

        <LineBreak space={2} />

        <View>
          <AppText
            title={'Select Date'}
            textColor={AppColors.GRAY}
            textSize={1.8}
          />
          <LineBreak space={0.5} />
          <AppTextInput inputPlaceHolder={'01 Aug 2025'} />
        </View>

        <LineBreak space={2} />

        <View>
          <AppText title={'Notes'} textColor={AppColors.GRAY} textSize={1.8} />
          <LineBreak space={0.5} />
          <AppTextInput inputPlaceHolder={'Notes'} />
        </View>

        <LineBreak space={2} />

        <AppButton
          title={'Submit Form'}
          textColor={AppColors.WHITE}
          btnBackgroundColor={AppColors.ThemeBlue}
          handlePress={() => nav.navigate('NearbySpecialists')}
          textFontWeight={false}
        />
      </View>
    </Container>
  );
};

export default OpenRequestForm;
