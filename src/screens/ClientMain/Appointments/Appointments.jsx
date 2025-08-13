/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View } from 'react-native';
import Container from '../../../components/Container';
import AppointmentsTopTabs from '../../../components/AppointmentsTopTabs';
import LineBreak from '../../../components/LineBreak';
import {
  completedAppointments,
  ongoingAppointments,
  upcomingAppointments,
} from '../../../utils';
import AppointmentsCard from '../../../components/AppointmentsCard';

const Appointments = () => {
  const [selectedTab, setSelectedTab] = useState({ id: 1 });
  return (
    <Container>
      <AppointmentsTopTabs
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      <LineBreak space={1} />
      {selectedTab.id == 1 && (
        <View>
          <AppointmentsCard data={completedAppointments} />
        </View>
      )}
      {selectedTab.id == 2 && (
        <View>
          <AppointmentsCard data={upcomingAppointments} />
        </View>
      )}
      {selectedTab.id == 3 && (
        <View>
          <AppointmentsCard data={ongoingAppointments} />
        </View>
      )}
    </Container>
  );
};

export default Appointments;
