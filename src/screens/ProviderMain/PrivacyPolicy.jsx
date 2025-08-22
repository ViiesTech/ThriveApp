import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Container from '../../components/Container';
import AppHeader from '../../components/AppHeader';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../utils';
import LineBreak from '../../components/LineBreak';

const PrivacyPolicy = () => {
  return (
    <Container>
      <AppHeader onBackPress={true} heading={'Privacy Policy'} />

      <View style={{ paddingHorizontal: responsiveWidth(4) }}>
        <Text style={styles.paragraph}>
          This Privacy Policy explains how i-thriv ("we," "our," or "us")
          collects, uses, discloses, and protects your information when you use
          our mobile app and services as a client or independent provider.
        </Text>

        <Text style={styles.heading}>1. Information We Collect</Text>
        <Text style={styles.subHeading}>For Clients:</Text>
        <Text style={styles.listItem}>• Name, email address, phone number</Text>
        <Text style={styles.listItem}>
          • Booking details (services selected, location, date/time)
        </Text>
        <Text style={styles.listItem}>
          • Payment information (processed through third-party providers like
          Stripe)
        </Text>
        <Text style={styles.listItem}>
          • Optional health or wellness preferences (e.g., massage type,
          pressure level)
        </Text>

        <Text style={styles.subHeading}>For Providers:</Text>
        <Text style={styles.listItem}>• Full name, contact information</Text>
        <Text style={styles.listItem}>
          • Professional credentials, insurance, licensing documents
        </Text>
        <Text style={styles.listItem}>• Bank details for payouts</Text>
        <Text style={styles.listItem}>
          • Availability and service offerings
        </Text>

        <Text style={styles.heading}>2. How We Use Your Information</Text>
        <Text style={styles.listItem}>
          • Facilitate service bookings and manage appointments
        </Text>
        <Text style={styles.listItem}>
          • Communicate updates or changes to your booking
        </Text>
        <Text style={styles.listItem}>
          • Process payments and issue provider payouts
        </Text>
        <Text style={styles.listItem}>
          • Improve user experience and personalize services
        </Text>
        <Text style={styles.listItem}>• Comply with legal obligations</Text>
      </View>
      <LineBreak space={4} />
    </Container>
  );
};

export default PrivacyPolicy;

const styles = StyleSheet.create({
  heading: {
    fontSize: responsiveFontSize(2.4),
    fontWeight: 'bold',
    marginTop: responsiveHeight(1),
    marginBottom: responsiveHeight(0.5),
    color: '#333',
  },
  subHeading: {
    fontSize: responsiveFontSize(2),
    fontWeight: '600',
    marginTop: responsiveHeight(1),
    marginBottom: responsiveHeight(0.5),
    color: '#444',
  },
  paragraph: {
    fontSize: responsiveFontSize(1.8),
    color: '#555',
    marginBottom: responsiveHeight(1),
    lineHeight: responsiveHeight(2.5),
  },
  listItem: {
    fontSize: responsiveFontSize(1.8),
    color: '#444',
    marginBottom: responsiveHeight(0.5),
    lineHeight: responsiveHeight(2.5),
  },
});
