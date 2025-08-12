/* eslint-disable react-native/no-inline-styles */
import React, { useRef } from 'react';
import {
  View,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Container from '../../../components/Container';
import { AppImages } from '../../../assets/images';
import {
  AppColors,
  categories,
  nearbyItems,
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../../utils';
import AppTextInput from '../../../components/AppTextInput';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import LineBreak from '../../../components/LineBreak';
import Categories from '../../../components/Categories';
import NearbyOffers from '../../../components/NearbyOffers';
import NearByListModal from '../../../components/NearByListModal';
import { useNavigation } from '@react-navigation/native';

const Nearby = () => {
  const refRBSheet = useRef();
  const nav = useNavigation();

  return (
    <Container>
      <ImageBackground
        source={AppImages.map}
        style={{ width: responsiveWidth(100), height: responsiveHeight(85) }}
      >
        <LineBreak space={2} />
        <View style={{ paddingHorizontal: responsiveWidth(4) }}>
          <View style={{ flexDirection: 'row', gap: 15, alignItems: 'center' }}>
            <AppTextInput
              inputPlaceHolder={'Search location...'}
              elevation={5}
              logo={
                <Ionicons
                  name="location-sharp"
                  size={responsiveFontSize(2.5)}
                  color={AppColors.ThemeBlue}
                />
              }
              rightIcon={
                <TouchableOpacity>
                  <Ionicons
                    name="close"
                    size={responsiveFontSize(2.5)}
                    color={AppColors.DARKGRAY}
                  />
                </TouchableOpacity>
              }
              inputWidth={52}
            />
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={() => nav.navigate('Search')}
            >
              <Ionicons
                name="filter"
                size={responsiveFontSize(2.5)}
                color={AppColors.ThemeBlue}
              />
            </TouchableOpacity>
          </View>
        </View>

        <LineBreak space={2} />

        <NearByListModal refRBSheet={refRBSheet} />

        <View>
          <Categories data={categories} />
        </View>

        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: responsiveWidth(4),
              alignItems: 'flex-end',
            }}
          >
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={() => refRBSheet.current.open()}
            >
              <Feather
                name="list"
                size={responsiveFontSize(2.5)}
                color={AppColors.BLUE}
              />
            </TouchableOpacity>
            <View>
              <TouchableOpacity
                style={[
                  styles.iconContainer,
                  { backgroundColor: AppColors.lightGreen },
                ]}
              >
                <FontAwesome
                  name="send"
                  size={responsiveFontSize(2)}
                  color={AppColors.WHITE}
                />
              </TouchableOpacity>
              <LineBreak space={2} />
              <TouchableOpacity style={styles.iconContainer}>
                <MaterialIcons
                  name="gps-fixed"
                  size={responsiveFontSize(2.5)}
                  color={AppColors.lightGreen}
                />
              </TouchableOpacity>
            </View>
          </View>

          <LineBreak space={1} />

          <View>
            <NearbyOffers data={nearbyItems} />
          </View>
        </View>

        <LineBreak space={2} />
      </ImageBackground>
    </Container>
  );
};

export default Nearby;

const styles = StyleSheet.create({
  iconContainer: {
    width: responsiveHeight(5),
    height: responsiveHeight(5),
    backgroundColor: AppColors.WHITE,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
});
