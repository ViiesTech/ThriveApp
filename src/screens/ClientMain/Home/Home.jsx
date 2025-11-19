/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, ActivityIndicator } from 'react-native';
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
  ShowToast,
  specialistsYouFollow,
} from '../../../utils';
import Fontisto from 'react-native-vector-icons/Fontisto';
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
import { useSelector } from 'react-redux';
import { useGetServicesQuery } from '../../../redux/services/MainIntegration';

const Home = () => {
  const nav = useNavigation();
  const { fullName } = useSelector(state => state?.persistedData?.user);
  const { data, isLoading, isError } = useGetServicesQuery(undefined, {
    refetchOnMountOrArgChange: true, // automatically fetch fresh data
    refetchOnReconnect: true,
    refetchOnFocus: true,
  });
  const [serviceData, setServiceData] = useState([]);
  console.log('serviceData', serviceData);
  useEffect(() => {
    if (isError) {
      // error can be a string or an object depending on your API
      console.log('Error fetching services:', isError);

      // show toast for user
      ShowToast(
        isError?.respones?.data?.message ||
          isError?.isError ||
          'Failed to fetch services',
      );
    }
  }, [isError]);

  useEffect(() => {
    if (data?.success) {
      const formatted = data.data.map(item => ({
        label: item.serviceName,
        serviceImage: item?.serviceImage,
        id: item._id,
      }));
      setServiceData(formatted);
    }
  }, [data]);
  return (
    <Container style={{ flex: 1, marginBottom: responsiveHeight(-6) }}>
      <View
        style={{
          paddingHorizontal: responsiveWidth(4),
          paddingVertical: responsiveHeight(2),
        }}
      >
        <AuthHeader
          heading={`Hi, ${fullName}`}
          subHeading="Find your desired service and treat yourself"
          rightIcon={
            <TouchableOpacity
              style={{
                width: responsiveHeight(5),
                height: responsiveHeight(5),
                borderRadius: 100,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: AppColors.lightestBlue,
              }}
              onPress={() =>
                nav.navigate('Main', {
                  screen: 'Inbox',
                  params: { isNotification: true },
                })
              }
            >
              <Fontisto
                size={responsiveFontSize(2.6)}
                name={'bell'}
                color={AppColors.ThemeBlue}
              />
            </TouchableOpacity>
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
          title={'What Are You in the Mood For?'}
          textColor={AppColors.BLACK}
          textSize={2}
          textFontWeight
        />

        <LineBreak space={3} />
        {isLoading ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              height: responsiveHeight(40),
            }}
          >
            <ActivityIndicator size={45} color={AppColors.BLACK} />
          </View>
        ) : (
          <View>
            <Services data={serviceData} />
          </View>
        )}
      </View>

      <LineBreak space={2} />

      {/* <View>
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
      <LineBreak space={2} /> */}

      {/* <View>
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

      <LineBreak space={4} /> */}
    </Container>
  );
};

export default Home;
