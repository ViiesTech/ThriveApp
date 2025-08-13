/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import {
  View,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { AppImages } from '../../../assets/images';
import {
  AppColors,
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
  shopDetail,
} from '../../../utils';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import LineBreak from '../../../components/LineBreak';
import AppointmentsCard from '../../../components/AppointmentsCard';
import AppText from '../../../components/AppTextComps/AppText';
import ShopDetailsCard from '../../../components/ShopDetailsCard';

const ShopDetails = () => {
  const nav = useNavigation();
  const [isShowFullDetails, setIsShowFullDetails] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={AppImages.shop_bg}
        style={{ width: responsiveWidth(100), height: responsiveHeight(100) }}
      >
        <LineBreak space={2} />
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: responsiveWidth(4),
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => nav.goBack()}
          >
            <FontAwesome
              name="angle-left"
              size={responsiveFontSize(3.5)}
              color={AppColors.ThemeBlue}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconContainer} onPress={() => {}}>
            <FontAwesome
              name="map"
              size={responsiveFontSize(2.5)}
              color={AppColors.ThemeBlue}
            />
          </TouchableOpacity>
        </View>

        {isShowFullDetails ? null : (
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              paddingVertical: responsiveWidth(30),
            }}
          >
            <AppointmentsCard data={shopDetail} shopDetail="shopDetail" />

            <LineBreak space={2} />

            <View
              style={{
                alignItems: 'center',
              }}
            >
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  gap: 10,
                }}
                onPress={() => setIsShowFullDetails(true)}
              >
                <AppText
                  title={'View More Details'}
                  textColor={AppColors.BLACK}
                  textSize={1.8}
                />
                <Entypo
                  name="chevron-down"
                  size={responsiveFontSize(2.5)}
                  color={AppColors.BLACK}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}

        {isShowFullDetails && (
          <>
            <LineBreak space={5} />
            <ShopDetailsCard />
          </>
        )}
      </ImageBackground>
    </View>
  );
};

export default ShopDetails;

const styles = StyleSheet.create({
  iconContainer: {
    width: responsiveHeight(5),
    height: responsiveHeight(5),
    backgroundColor: AppColors.LIGHTESTGRAY,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
});
