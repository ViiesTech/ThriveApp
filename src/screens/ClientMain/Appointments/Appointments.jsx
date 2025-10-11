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
  upcomingAppointments,
} from '../../../utils';
import AppointmentsCard from '../../../components/AppointmentsCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';

const Appointments = () => {
  const [selectedTab, setSelectedTab] = useState({ id: 1 });
  const { type } = useSelector(state => state.persistedData);

  return (
    <Container>
      <AppointmentsTopTabs
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        data={appointmentsTab}
        textwidth={30}
      />
      <LineBreak space={1} />
      {selectedTab.id == 1 && (
        <View>
          <AppointmentsCard data={completedAppointments} isSpecialist={type === 'Provider'} />
        </View>
      )}
      {selectedTab.id == 2 && (
        <View>
          <AppointmentsCard data={upcomingAppointments} isSpecialist={type === 'Provider'} />
        </View>
      )}
      {selectedTab.id == 3 && (
        <View>
          <AppointmentsCard data={ongoingAppointments} ongoingAppointments={'ongoingAppointments'} isSpecialist={type === 'Provider'} isUser={type === 'Client'} />
        </View>
      )}
    </Container>
  );
};

export default Appointments;
