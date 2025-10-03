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
import { SafeAreaView } from 'react-native-safe-area-context';

const ShopDetails = () => {
  const nav = useNavigation();
  const [isShowFullDetails, setIsShowFullDetails] = useState(false);

  return (
    <ImageBackground
      source={AppImages.shop_bg}
      style={{ width: responsiveWidth(100), height: responsiveHeight(100) }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <LineBreak space={2} />
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: responsiveWidth(4),
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity onPress={() => nav.goBack()}>
            <FontAwesome
              name="angle-left"
              size={responsiveFontSize(4)}
              color={AppColors.ThemeBlue}
            />
          </TouchableOpacity>

          <AppText
            title={'Provider'}
            textColor={AppColors.BLACK}
            textSize={2}
            textFontWeight
          />

          <View />

          {/* <TouchableOpacity style={styles.iconContainer} onPress={() => {}}>
            <FontAwesome
              name="map"
              size={responsiveFontSize(2.5)}
              color={AppColors.ThemeBlue}
            />
          </TouchableOpacity> */}
        </View>

        {isShowFullDetails ? null : (
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              paddingVertical: responsiveWidth(5),
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
      </SafeAreaView>
    </ImageBackground>
  );
};

export default ShopDetails;

const styles = StyleSheet.create({
  iconContainer: {
    width: responsiveHeight(5),
    height: responsiveHeight(5),
    // backgroundColor: AppColors.LIGHTESTGRAY,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    // elevation: 5,
  },
});
