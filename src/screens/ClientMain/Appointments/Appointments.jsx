/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import Container from '../../../components/Container';
import AppointmentsTopTabs from '../../../components/AppointmentsTopTabs';
import LineBreak from '../../../components/LineBreak';
import {
  appointmentsTab,
  completedAppointments,
  ongoingAppointments,
  ShowToast,
  upcomingAppointments,
} from '../../../utils';
import AppointmentsCard from '../../../components/AppointmentsCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
import BookingsCards from '../../../components/BookingsCards';
import {
  useLazyGetTherapistBookingsQuery,
  useLazyGetUserBookingsQuery,
} from '../../../redux/services/MainIntegration';

const Appointments = () => {
  const [selectedTab, setSelectedTab] = useState({
    id: 1,
    title: 'Completed Appointments',
    value: 'Completed',
  });
  const { type, user } = useSelector(state => state.persistedData);
  const [getTherapistBookings, { isLoading, isError, data }] =
    useLazyGetTherapistBookingsQuery();
  const [
    getUserBookings,
    { isLoading: userLoading, isError: userError, data: userBookingsData },
  ] = useLazyGetUserBookingsQuery();
  console.log('userBookingsData', userBookingsData);

  const getAppontmentsHandler = async data => {
    console.log('user?._id', user?._id);
    console.log('fdsfd', data);
    await getTherapistBookings({
      therapistId: user?._id,
      bookingStatus: data?.value,
      ...(data?.id !== 1 && data?.id !== 3
        ? { therapistStatus: 'Upcoming' }
        : null),
    })
      .unwrap()
      .then(res => {
        // if (!res?.success) {
        //   ShowToast(res?.message);
        // }
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
  const getUserAppointmentsHandler = async data => {
    console.log('fdsfd', data);

    const params = {
      userId: user?._id,
      bookingStatus: data?.value,
    };

    // Only pass therapistStatus for Upcoming tab
    if (data?.id === 2) {
      params.therapistStatus = 'Upcoming';
    }
    await getUserBookings(params)
      .unwrap()
      .then(res => {
        // if (!res?.success) {
        //   ShowToast(res?.message);
        // }
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
    if (type === 'Provider') {
      getAppontmentsHandler({
        id: 1,
        title: 'Completed Appointments',
        value: 'Completed',
      });
    } else {
      getUserAppointmentsHandler({
        id: 1,
        title: 'Completed Appointments',
        value: 'Completed',
      });
    }
  }, []);

  const onSelectTabs = async data => {
    if (type === 'Provider') {
      await getAppontmentsHandler(data);
    } else {
      await getUserAppointmentsHandler(data);
    }
    setSelectedTab({ id: data.id, value: data.value, title: data.title });
    //  console.log('returning from function',res)
  };

  return (
    <Container>
      <AppointmentsTopTabs
        selectedTab={selectedTab}
        setSelectedTab={data => onSelectTabs(data)}
        data={appointmentsTab}
        textwidth={30}
      />
      <LineBreak space={1} />
      {selectedTab.id === 1 && (
        <View>
          <BookingsCards
            isLoading={type === 'Provider' ? isLoading : userLoading}
            data={type === 'Provider' ? data?.data : userBookingsData?.data}
            isSpecialist={type === 'Provider'}
            isUser={type === 'Client'}
          />
        </View>
      )}
      {selectedTab.id === 2 && (
        <View>
          <BookingsCards
            isLoading={type === 'Provider' ? isLoading : userLoading}
            data={type === 'Provider' ? data?.data : userBookingsData?.data}
            isSpecialist={type === 'Provider'}
          />
        </View>
      )}
      {selectedTab.id === 3 && (
        <View>
          <BookingsCards
            // data={type === 'Provider' ? data?.data : userBookingsData?.data}
            data={
              type === 'Provider'
                ? data?.data
                : userBookingsData?.data?.filter(
                    item =>
                      item?.bookingStatus === 'Accepted' &&
                      item?.therapistStatus !== 'Upcoming',
                  )
            }
            isLoading={type === 'Provider' ? isLoading : userLoading}
            onRefresh={() => {
              getAppontmentsHandler({
                id: 3,
                value: 'Accepted',
                title: 'Ongoing Appointments',
              });
            }}
            ongoingAppointments={'ongoingAppointments'}
            isSpecialist={type === 'Provider'}
            isUser={type === 'Client'}
          />
        </View>
      )}
    </Container>
  );
};

export default Appointments;
