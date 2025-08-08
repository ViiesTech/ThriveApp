/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Container from '../../../components/Container';
import AuthHeader from '../../../components/AuthHeader';
import {
  AppColors,
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../../utils';
import Feather from 'react-native-vector-icons/Feather';
import Banner from '../../../components/Banner';
import AppText from '../../../components/AppTextComps/AppText';

const Home = () => {
  return (
    <Container>
      <View
        style={{
          paddingHorizontal: responsiveWidth(4),
          paddingVertical: responsiveHeight(2),
        }}
      >
        <AuthHeader
          heading="Hi, Samantha"
          subHeading="Find your desired service and treat yourself"
          rightIcon={
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <TouchableOpacity
                style={{
                  width: responsiveHeight(4),
                  height: responsiveHeight(4),
                  borderRadius: 100,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: AppColors.ThemeBlue,
                }}
              >
                <Feather
                  size={responsiveFontSize(2.4)}
                  name={'search'}
                  color={AppColors.WHITE}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: responsiveHeight(4),
                  height: responsiveHeight(4),
                  borderRadius: 100,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: AppColors.ThemeBlue,
                }}
              >
                <Feather
                  size={responsiveFontSize(2.4)}
                  name={'plus'}
                  color={AppColors.WHITE}
                />
              </TouchableOpacity>
            </View>
          }
        />
      </View>

      <Banner />

      <View style={{paddingHorizontal: responsiveWidth(4)}}>
        <AppText
          title={'What do you want to do?'}
          textColor={AppColors.BLACK}
          textSize={2}
          textFontWeight
        />
      </View>
    </Container>
  );
};

export default Home;
