import React from 'react';
import Container from '../../components/Container';
import AppHeader from '../../components/AppHeader';
import AppointmentsCard from '../../components/AppointmentsCard';
import { nearbySpecialists } from '../../utils';

const NearbySpecialists = () => {
  return (
    <Container>
      <AppHeader onBackPress={true} heading={'Nearby Specialists'} />
      <AppointmentsCard data={nearbySpecialists} shopDetail="shopDetail" />
    </Container>
  );
};

export default NearbySpecialists;
