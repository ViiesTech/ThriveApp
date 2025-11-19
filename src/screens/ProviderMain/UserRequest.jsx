/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import Container from '../../components/Container';
import AppointmentsTopTabs from '../../components/AppointmentsTopTabs';
import {
  AppColors,
  openRequest,
  responsiveHeight,
  ShowToast,
  userRequestTab,
} from '../../utils';
import LineBreak from '../../components/LineBreak';
import AppointmentsCard from '../../components/AppointmentsCard';
import { useLazyGetBookingByReqTypeQuery } from '../../redux/services/MainIntegration';
import BookingsCards from '../../components/BookingsCards';
import AppText from '../../components/AppTextComps/AppText';

const UserRequest = () => {
  const [selectedTab, setSelectedTab] = useState({
    id: 1,
    title: 'Open Request',
    value: 'Open',
  });
  console.log('selee', selectedTab);
  const [getBookingByReqType, { isLoading, isError, data }] =
    useLazyGetBookingByReqTypeQuery();
  console.log('selectedTab?.value', selectedTab?.value);

  const fetchBookings = () => {
    getBookingByReqType(selectedTab?.value)
      .unwrap()
      .then(res => {
        // if (!res?.success) {
        //   ShowToast(res?.message);
        // }
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
    fetchBookings();
  }, [selectedTab?.value]);

  return (
    <Container
      style={{
        marginBottom: responsiveHeight(-6),
        paddingBottom: responsiveHeight(7),
      }}
    >
      <LineBreak space={1} />
      <AppointmentsTopTabs
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        data={userRequestTab}
      />
      <LineBreak space={1} />

      <View style={{ flex: 1 }}>
        {isLoading ? (
          <View
            style={{
              height: responsiveHeight(70),
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <ActivityIndicator size={40} color={AppColors.BLACK} />
          </View>
        ) : data?.data?.length ? (
          <BookingsCards
            isOpen={selectedTab?.value === 'Open'}
            data={data?.data}
            isRequest={true}
            onRefresh={fetchBookings}
            userRequest={'userRequest'}
          />
        ) : (
          <View
            style={{ alignItems: 'center', marginTop: responsiveHeight(5) }}
          >
            <AppText
              textSize={2.5}
              textFontWeight
              title={'No Request Found!!'}
            />
          </View>
        )}
      </View>
    </Container>
  );
};

export default UserRequest;
