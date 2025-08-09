/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Image } from 'react-native';
import AppHeader from '../../../components/AppHeader';
import LineBreak from '../../../components/LineBreak';
import { AppImages } from '../../../assets/images';
import Container from '../../../components/Container';
import AppText from '../../../components/AppTextComps/AppText';
import {
  AppColors,
  mostSearchInterestSerivces,
  nearbyItems,
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
  SpecialistProfileServices,
} from '../../../utils';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MostSearchInterest from '../../../components/MostSearchInterest';
import NearbyOffers from '../../../components/NearbyOffers';

const SpecialistProfile = () => {
  return (
    <Container>
      <AppHeader onBackPress={true} />
      <View style={{ paddingHorizontal: responsiveWidth(5) }}>
        <View style={{ alignItems: 'center' }}>
          <Image
            source={AppImages.featured1}
            style={{
              width: 90,
              height: 90,
              borderRadius: 100,
            }}
          />
          <LineBreak space={1} />

          <AppText
            title={'Ronald'}
            textColor={AppColors.BLACK}
            textSize={2.5}
            textFontWeight
          />

          <LineBreak space={2} />

          <AppText
            title={'360 Stillwater Rd. Palm City, FL 34990'}
            textColor={AppColors.GRAY}
            textSize={1.9}
          />
          <LineBreak space={2} />
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: responsiveWidth(14),
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <AntDesign
              name="star"
              size={responsiveFontSize(2.5)}
              color={AppColors.Yellow}
            />
            <AppText
              title={'4.6'}
              textColor={AppColors.BLACK}
              textSize={1.9}
              textFontWeight
            >
              {' '}
              <AppText
                title={'(2.7k)'}
                textColor={AppColors.BLACK}
                textSize={1.9}
              />
            </AppText>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Fontisto
              name="eye"
              size={responsiveFontSize(2.5)}
              color={AppColors.GRAY}
            />
            <AppText
              title={'10k views'}
              textColor={AppColors.BLACK}
              textSize={1.9}
            />
          </View>
        </View>

        <View
          style={{
            height: responsiveHeight(0.2),
            backgroundColor: AppColors.LIGHTGRAY,
            marginTop: responsiveHeight(3),
            marginBottom: responsiveHeight(2),
          }}
        />

        <View>
          <AppText
            title={'About'}
            textColor={AppColors.BLACK}
            textSize={2.5}
            textFontWeight
          />
          <LineBreak space={3} />
          <AppText
            title={
              'At i-thriv we bring spa-quality experiences directly to you. Whether you are relaxing at home, celebrating a special occasion, or hosting a retreat at a vacation rental, our licensed providers deliver premium, personalized care wherever you are. Our services include massage therapy, facials, sound baths, yoga and vibroacoustic therapy—each thoughtfully designed to restore balance, promote relaxation, and support your wellness journey.'
            }
            textColor={AppColors.GRAY}
            textSize={2}
            lineHeight={2.5}
          />
          <LineBreak space={3} />
          <AppText
            title={'House of Operation'}
            textColor={AppColors.BLACK}
            textSize={2.5}
            textFontWeight
          />

          <LineBreak space={3} />

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15 }}>
            <View
              style={{
                width: 10,
                height: 10,
                backgroundColor: AppColors.ThemeBlue,
                borderRadius: 100,
              }}
            />
            <View>
              <AppText
                title={'Sunday - Monday'}
                textColor={AppColors.GRAY}
                textSize={2}
              />
              <LineBreak space={1} />
              <AppText
                title={'08:00 AM - 03:00 PM'}
                textColor={AppColors.BLACK}
                textSize={2}
                textFontWeight
              />
            </View>
          </View>
        </View>
      </View>

      <LineBreak space={3} />
      <View>
        <View style={{ paddingHorizontal: responsiveWidth(5) }}>
          <AppText
            title={'Services'}
            textColor={AppColors.BLACK}
            textSize={2.5}
            textFontWeight
          />
        </View>
        <LineBreak space={3} />

        <MostSearchInterest
          data={mostSearchInterestSerivces}
          services={'services'}
        />
      </View>
      <LineBreak space={2} />

      <View>
        <NearbyOffers data={SpecialistProfileServices} services={'services'} />
      </View>

      <LineBreak space={4} />
    </Container>
  );
};

export default SpecialistProfile;
