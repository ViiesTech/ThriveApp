/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Container from '../../../components/Container';
import AuthHeader from '../../../components/AuthHeader';
import {
  AppColors,
  featuredSpecialists,
  mostSearchInterest,
  nearbyItems,
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
  specialistsYouFollow,
} from '../../../utils';
import Feather from 'react-native-vector-icons/Feather';
import Banner from '../../../components/Banner';
import AppText from '../../../components/AppTextComps/AppText';
import LineBreak from '../../../components/LineBreak';
import Services from '../../../components/Services';
import YouFollow from '../../../components/YouFollow';
import FeaturedSpecialists from '../../../components/FeaturedSpecialists';
import MostSearchInterest from '../../../components/MostSearchInterest';
import NearbyOffers from '../../../components/NearbyOffers';
import { useNavigation } from '@react-navigation/native';
import EnableLocationModal from '../../../components/EnableLocationModal';

const Home = () => {
  const nav = useNavigation();
  return (
    <Container>
      <View
        style={{
          paddingHorizontal: responsiveWidth(4),
          paddingVertical: responsiveHeight(2),
        }}
      >
        <AuthHeader
          heading="Hi, Samantha"
          subHeading="Find your desired service and treat yourself"
          rightIcon={
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <TouchableOpacity
                style={{
                  width: responsiveHeight(4),
                  height: responsiveHeight(4),
                  borderRadius: 100,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: AppColors.ThemeBlue,
                }}
              >
                <Feather
                  size={responsiveFontSize(2.4)}
                  name={'search'}
                  color={AppColors.WHITE}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: responsiveHeight(4),
                  height: responsiveHeight(4),
                  borderRadius: 100,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: AppColors.ThemeBlue,
                }}
              >
                <Feather
                  size={responsiveFontSize(2.4)}
                  name={'plus'}
                  color={AppColors.WHITE}
                />
              </TouchableOpacity>
            </View>
          }
        />
      </View>

      {/* <EnableLocationModal
        visible={true}
        title={'Enable Your Location'}
        subtitle={
          'Please enable to use your location to show nearby services on the map'
        }
      /> */}

      <Banner />

      <View style={{ paddingHorizontal: responsiveWidth(4) }}>
        <AppText
          title={'What do you want to do?'}
          textColor={AppColors.BLACK}
          textSize={2}
          textFontWeight
        />

        <LineBreak space={3} />

        <View>
          <Services />
        </View>
      </View>

      <LineBreak space={2} />

      <View>
        <View style={{ paddingHorizontal: responsiveWidth(4) }}>
          <AppText
            title={'Specialists you follow'}
            textColor={AppColors.BLACK}
            textSize={2}
            textFontWeight
          />
        </View>

        <LineBreak space={2} />

        <YouFollow data={specialistsYouFollow} />
      </View>
      <LineBreak space={2} />

      <View>
        <View
          style={{
            paddingHorizontal: responsiveWidth(4),
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <AppText
            title={'Featured Specialists'}
            textColor={AppColors.BLACK}
            textSize={2}
            textFontWeight
          />

          <TouchableOpacity>
            <AppText
              title={'View all'}
              textColor={AppColors.ThemeBlue}
              textSize={2}
              textFontWeight
            />
          </TouchableOpacity>
        </View>

        <LineBreak space={2} />

        <FeaturedSpecialists
          data={featuredSpecialists}
          onCardPress={() => nav.navigate('SpecialistProfile')}
        />
      </View>
      <LineBreak space={3} />

      <View>
        <View
          style={{
            paddingHorizontal: responsiveWidth(4),
          }}
        >
          <AppText
            title={'Most Search Interest'}
            textColor={AppColors.BLACK}
            textSize={2}
            textFontWeight
          />
        </View>

        <LineBreak space={3} />

        <MostSearchInterest data={mostSearchInterest} />
      </View>

      <LineBreak space={3} />

      <View>
        <View
          style={{
            paddingHorizontal: responsiveWidth(4),
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <AppText
            title={'Nearby Offers'}
            textColor={AppColors.BLACK}
            textSize={2}
            textFontWeight
          />

          <TouchableOpacity>
            <AppText
              title={'View all'}
              textColor={AppColors.ThemeBlue}
              textSize={2}
              textFontWeight
            />
          </TouchableOpacity>
        </View>

        <View>
          <NearbyOffers data={nearbyItems} />
        </View>
      </View>

      <LineBreak space={4} />
    </Container>
  );
};

export default Home;
