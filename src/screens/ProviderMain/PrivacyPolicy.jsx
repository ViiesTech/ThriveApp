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

const ListItem = ({ text }) => (
  <View style={styles.listItemRow}>
    <Text style={styles.bullet}>•</Text>
    <Text style={styles.listItemText}>{text}</Text>
  </View>
);

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
        <Text style={[styles.listItemText, { paddingHorizontal: 0 }]}>
          We collect the following types of personal data:
        </Text>

        <Text style={styles.subHeading}>For Clients:</Text>
        <ListItem text="Name, email address, phone number" />
        <ListItem text="Booking details (services selected, location, date/time)" />
        <ListItem text="Payment information (processed through third-party providers like Stripe)" />
        <ListItem text="Optional health or wellness preferences (e.g., massage type, pressure level)" />

        <Text style={styles.subHeading}>For Providers:</Text>
        <ListItem text="Full name, contact information" />
        <ListItem text="Professional credentials, insurance, licensing documents" />
        <ListItem text="Bank details for payouts" />
        <ListItem text="Availability and service offerings" />

        <Text style={styles.heading}>2. How We Use Your Information</Text>
        <ListItem text="Facilitate service bookings and manage appointments" />
        <ListItem text="Communicate updates or changes to your booking" />
        <ListItem text="Process payments and issue provider payouts" />
        <ListItem text="Improve user experience and personalize services" />
        <ListItem text="Comply with legal obligations" />
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
  listItemRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: responsiveHeight(0.5),
    paddingHorizontal: responsiveWidth(2),
  },
  bullet: {
    fontSize: responsiveFontSize(2),
    marginRight: responsiveWidth(2),
    color: '#444',
    lineHeight: responsiveHeight(2.5),
  },
  listItemText: {
    fontSize: responsiveFontSize(1.8),
    color: '#444',
    lineHeight: responsiveHeight(2.5),
  },
});
