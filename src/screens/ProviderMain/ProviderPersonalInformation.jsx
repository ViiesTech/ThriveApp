/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Image, FlatList, TouchableOpacity } from 'react-native';
import Container from '../../components/Container';
import AppHeader from '../../components/AppHeader';
import { AppImages } from '../../assets/images';
import LineBreak from '../../components/LineBreak';
import AppText from '../../components/AppTextComps/AppText';
import {
  AppColors,
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
  services,
  SpecialistProfileServices,
} from '../../utils';
import AppButton from '../../components/AppButton';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { mostSearchInterestSerivces } from './../../utils/index';
import MostSearchInterest from './../../components/MostSearchInterest';
import NearbyOffers from '../../components/NearbyOffers';
import { useNavigation } from '@react-navigation/native';
import SVGXml from '../../components/SVGXML';
import Services from '../../components/Services';

const ProviderPersonalInformation = () => {
  const nav = useNavigation();
  return (
    <Container>
      <AppHeader onBackPress={true} heading={'Personal Information'} />

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

          <LineBreak space={4} />

          <View style={{ alignItems: 'center' }}>
            <AppButton
              title="Edit Profile"
              textColor={AppColors.WHITE}
              btnBackgroundColor={AppColors.ThemeBlue}
              handlePress={() => nav.navigate('ProviderEditProfile')}
              btnWidth={75}
              textSize={2}
              btnPadding={7}
              textFontWeight={false}
            />
          </View>

          <LineBreak space={2} />
        </View>

        <AppText
          title={'Full Name'}
          textColor={AppColors.GRAY}
          textSize={2}
          textFontWeight
        />

        <LineBreak space={1} />

        <AppText
          title={'Ronald Edward McDonald'}
          textColor={AppColors.GRAY}
          textSize={1.9}
        />

        <LineBreak space={1} />

        <AppText
          title={'Address'}
          textColor={AppColors.GRAY}
          textSize={2}
          textFontWeight
        />

        <LineBreak space={1} />

        <AppText
          title={
            '112233 Broadway Los Angeles, California 92000 Unites States of America'
          }
          textColor={AppColors.GRAY}
          textSize={1.9}
          textwidth={45}
          lineHeight={2.5}
        />

        <LineBreak space={1} />

        <AppText
          title={'Payout Information'}
          textColor={AppColors.GRAY}
          textSize={2}
          textFontWeight
        />

        <LineBreak space={1} />

        <AppText
          title={'On file'}
          textColor={AppColors.ThemeBlue}
          textSize={1.9}
          textwidth={45}
          lineHeight={2.5}
        />

        <LineBreak space={1} />

        <AppText
          title={'Travel Distance'}
          textColor={AppColors.GRAY}
          textSize={2}
          textFontWeight
        />

        <LineBreak space={1} />

        <AppText
          title={'20 miles'}
          textColor={AppColors.GRAY}
          textSize={1.9}
          textwidth={45}
          lineHeight={2.5}
        />

        <LineBreak space={2} />

        {/* <AppText
          title={'360 Stillwater Rd. Palm City, FL 34990'}
          textColor={AppColors.GRAY}
          textSize={1.9}
        />
        <LineBreak space={2} />

        <View
          style={{
            flexDirection: 'row',
            gap: 40,
            alignItems: 'center',
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
        </View> */}

        <View>
          <AppText
            title={'Hours of availability'}
            textColor={AppColors.BLACK}
            textSize={2.5}
            textFontWeight
          />

          <LineBreak space={3} />

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <View
              style={{ flexDirection: 'row', alignItems: 'center', gap: 15 }}
            >
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
                  textSize={1.8}
                />
                <LineBreak space={1} />
                <AppText
                  title={'08:00 AM - 03:00 PM'}
                  textColor={AppColors.BLACK}
                  textSize={1.8}
                  textFontWeight
                />
              </View>
            </View>

            <View
              style={{ flexDirection: 'row', alignItems: 'center', gap: 15 }}
            >
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
                  textSize={1.8}
                />
                <LineBreak space={1} />
                <AppText
                  title={'08:00 AM - 03:00 PM'}
                  textColor={AppColors.BLACK}
                  textSize={1.8}
                  textFontWeight
                />
              </View>
            </View>
          </View>
        </View>
        <LineBreak space={3} />

        <AppText
          title={'Service Offered'}
          textColor={AppColors.BLACK}
          textSize={2.5}
          textFontWeight
        />

        <LineBreak space={2} />
      </View>

      <View style={{ alignItems: 'center' }}>
        <FlatList
          data={services}
          ItemSeparatorComponent={<LineBreak space={2} />}
          ListFooterComponent={<LineBreak space={2} />}
          columnWrapperStyle={{
            gap: responsiveWidth(4),
          }}
          numColumns={3}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: AppColors.lightestBlue,
                borderWidth: 1,
                borderColor: AppColors.ThemeBlue,
                borderRadius: 30,
                paddingBottom: responsiveHeight(1),
              }}
            >
              <SVGXml icon={item.icon} width={105} height={85} />
              <AppText
                title={item.title}
                textColor={AppColors.ThemeBlue}
                textSize={1.6}
                textwidth={25}
                textFontWeight
                textAlignment={'center'}
              />
            </TouchableOpacity>
          )}
        />
      </View>

      {/* <View style={{alignItems: 'center'}}>
        <Services />
      </View> */}

      {/* <View>
        <View style={{ paddingHorizontal: responsiveWidth(5) }}>
          <AppText
            title={'Services'}
            textColor={AppColors.BLACK}
            textSize={2.5}
            textFontWeight
          />
        </View>
        <LineBreak space={2} />

        <MostSearchInterest
          data={mostSearchInterestSerivces}
          services={'services'}
        />
      </View>
      <LineBreak space={2} />

      <View>
        <NearbyOffers data={SpecialistProfileServices} services={'services'} />
      </View>

      <LineBreak space={4} /> */}
    </Container>
  );
};

export default ProviderPersonalInformation;
