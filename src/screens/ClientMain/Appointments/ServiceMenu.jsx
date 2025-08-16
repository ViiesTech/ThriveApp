import React from 'react';
import { View } from 'react-native';
import Container from '../../../components/Container';
import AppHeader from '../../../components/AppHeader';
import LineBreak from '../../../components/LineBreak';
import MostSearchInterest from '../../../components/MostSearchInterest';
import {
  mostSearchInterestSerivces,
  SpecialistProfileServices,
} from '../../../utils';
import NearbyOffers from '../../../components/NearbyOffers';
import { useNavigation } from '@react-navigation/native';
import ServiceGalleryFooter from '../../../components/ServiceGalleryFooter';

const ServiceMenu = () => {
  const nav = useNavigation();
  return (
    <>
      <Container>
        <AppHeader onBackPress={true} heading={'Service Menu'} />
        <LineBreak space={2} />

        <MostSearchInterest data={mostSearchInterestSerivces} />

        <LineBreak space={2} />

        <View>
          <NearbyOffers
            data={SpecialistProfileServices}
            services={'services'}
          />
        </View>
      </Container>
      <ServiceGalleryFooter
        bookNowOnPress={() => nav.navigate('Booking')}
      />
    </>
  );
};

export default ServiceMenu;
