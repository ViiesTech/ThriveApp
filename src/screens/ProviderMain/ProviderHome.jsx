/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Image, FlatList, TouchableOpacity } from 'react-native';
import Container from '../../components/Container';
import LineBreak from '../../components/LineBreak';
import {
  AppColors,
  homeStats,
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
  todaysAppointments,
} from '../../utils';
import AppText from '../../components/AppTextComps/AppText';
import { AppImages } from '../../assets/images';
import Feather from 'react-native-vector-icons/Feather';
import AppointmentsCard from '../../components/AppointmentsCard';
import { useNavigation } from '@react-navigation/native';

const ProviderHome = () => {
  const nav = useNavigation();
  return (
    <Container style={{marginBottom: responsiveHeight(-6)}}>
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
              source={AppImages.on_boarding4}
              style={{ width: 50, height: 50, borderRadius: 100 }}
            />
            <AppText
              title={'Hello, Ronald'}
              textColor={AppColors.BLACK}
              textSize={3}
              textFontWeight
            />
          </View>
          <TouchableOpacity 
           onPress={() => nav.navigate('Main', {screen: 'Inbox', params: { isNotification: true },})}>
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
                  title={item.num}
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
        <AppointmentsCard data={todaysAppointments} providerHome={'providerHome'} />
      </View>
    </Container>
  );
};

export default ProviderHome;
