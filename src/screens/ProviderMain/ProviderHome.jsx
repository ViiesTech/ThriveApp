/* eslint-disable react-native/no-inline-styles */
import React, { useEffect } from 'react';
import {
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Container from '../../components/Container';
import LineBreak from '../../components/LineBreak';
import {
  AppColors,
  homeStats,
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
  ShowToast,
  todaysAppointments,
} from '../../utils';
import AppText from '../../components/AppTextComps/AppText';
import { AppImages } from '../../assets/images';
import Feather from 'react-native-vector-icons/Feather';
import AppointmentsCard from '../../components/AppointmentsCard';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { useLazyGetTodaysBookingsQuery } from '../../redux/services/MainIntegration';
import BookingsCards from '../../components/BookingsCards';
import { IMAGE_URL } from '../../redux/constant';

const ProviderHome = () => {
  const nav = useNavigation();
  const { fullName, image } = useSelector(state => state?.persistedData?.user);
  const { token, type } = useSelector(state => state?.persistedData);
  const focus = useIsFocused();
  const [getTodaysBookings, { data, isLoading, isError }] =
    useLazyGetTodaysBookingsQuery();
  console.log('type', type);

  const getTodaysBookingsHandler = async () => {
    await getTodaysBookings()
      .unwrap()
      .then(res => {
        if (!res?.success) {
          ShowToast(res?.message);
        }
        //  return res
        console.log('ress', res);
      })
      .catch(error => {
        console.log('error', error);
        ShowToast(
          error?.response?.data?.message ||
            error?.message ||
            'Some Problem Occured',
        );
      });
  };
  useEffect(() => {
    getTodaysBookingsHandler();
  }, [focus]);
  return (
    <Container style={{ marginBottom: responsiveHeight(-6) }}>
      <LineBreak space={2} />
      <View style={{ paddingHorizontal: responsiveWidth(4) }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
            <Image
              source={{ uri: `${IMAGE_URL}${image}` }}
              style={{ width: 50, height: 50, borderRadius: 100 }}
            />
            <AppText
              title={`Hello, ${fullName}`}
              textColor={AppColors.BLACK}
              textSize={3}
              textFontWeight
            />
          </View>
          <TouchableOpacity
            onPress={() =>
              nav.navigate('Main', {
                screen: 'Inbox',
                params: { isNotification: true },
              })
            }
          >
            <Feather
              name="bell"
              size={responsiveFontSize(3)}
              color={AppColors.BLACK}
            />
          </TouchableOpacity>
        </View>

        <LineBreak space={4} />

        <FlatList
          data={homeStats}
          contentContainerStyle={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
          renderItem={({ item }) => (
            <View
              style={{
                backgroundColor: AppColors.ThemeBlue,
                width: responsiveWidth(29),
                // height: responsiveHeight(14),
                paddingHorizontal: responsiveWidth(1.5),
                paddingVertical: responsiveHeight(2),
                borderRadius: 10,
              }}
            >
              <AppText
                title={item.title}
                textColor={AppColors.WHITE}
                textSize={1.6}
                textwidth={item.id == 2 ? 20 : 24}
                lineHeight={2.2}
                textFontWeight
              />
              <LineBreak space={1.5} />
              <View
                style={{
                  alignItems: 'flex-end',
                  paddingHorizontal: responsiveWidth(2),
                }}
              >
                <AppText
                  title={item.id === 1 ? data?.CompletedBookings : item.num}
                  textColor={AppColors.WHITE}
                  textSize={3.5}
                  textFontWeight
                />
              </View>
            </View>
          )}
        />

        <LineBreak space={4} />

        <AppText
          title={'Todays Appointments'}
          textColor={AppColors.BLACK}
          textSize={2.5}
          textFontWeight
        />
      </View>
      <LineBreak space={1} />

      <View>
        {isLoading ? (
          <View
            style={{
              height: responsiveHeight(30),
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <ActivityIndicator size={40} color={AppColors.BLACK} />
          </View>
        ) : data?.TodayBookings?.length > 0 ? (
          <BookingsCards
            data={data?.TodayBookings}
            isSpecialist={type === 'Provider'}
            onRefresh={getTodaysBookingsHandler}
            providerHome={'providerHome'}
          />
        ) : (
          <View
            style={{ alignItems: 'center', marginTop: responsiveHeight(5) }}
          >
            <AppText
              textSize={2.5}
              textFontWeight
              title={'No Appointments Found!!'}
            />
          </View>
        )}
      </View>
    </Container>
  );
};

export default ProviderHome;
