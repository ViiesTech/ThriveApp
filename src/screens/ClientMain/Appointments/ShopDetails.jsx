/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { AppImages } from '../../../assets/images';
import {
  AppColors,
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
  shopDetail,
  ShowToast,
} from '../../../utils';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import LineBreak from '../../../components/LineBreak';
import AppointmentsCard from '../../../components/AppointmentsCard';
import AppText from '../../../components/AppTextComps/AppText';
import ShopDetailsCard from '../../../components/ShopDetailsCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLazyGetTherapistByIdQuery } from '../../../redux/services/MainIntegration';
import { useSelector } from 'react-redux';

const ShopDetails = ({ route }) => {
  const nav = useNavigation();
  const { data } = route?.params;
  const { therapist, serviceName, addOn } = data;
  const { _id } = useSelector(state => state?.persistedData?.user);
  const [getTherapistById, { data: therapistDetails, isLoading, isError }] =
    useLazyGetTherapistByIdQuery();
  console.log('route?.params', route?.params);
  console.log('therapist', therapist);
  const [isShowFullDetails, setIsShowFullDetails] = useState(false);
  console.log('isShowFullDetails', isShowFullDetails);

  useEffect(() => {
    getTherapistById({ userId: _id, therapistId: therapist })
      .unwrap()
      .then(res => {
        if (!res?.success) {
          ShowToast(res?.message);
        }
        console.log('ress', res);
      })
      .catch(error => {
        console.log('erorr', error);
        ShowToast(
          error?.response?.data?.message ||
            error?.message ||
            'Some Problem Occured',
        );
      });
  }, []);
  return (
    <ImageBackground source={AppImages.shop_bg} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <LineBreak space={2} />
        {isLoading ? (
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <ActivityIndicator size={'large'} color={AppColors.LIGHTESTGRAY} />
          </View>
        ) : (
          <View style={{ flex: 1 }}>
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

            {isShowFullDetails || isLoading ? null : (
              <View
                style={{
                  flex: 0.96,
                  justifyContent: 'flex-end',
                  paddingVertical: responsiveWidth(5),
                }}
              >
                <AppointmentsCard
                  isLoading={isLoading}
                  onBookNowPress={() =>
                    nav.navigate('LocationInformation', {
                      data: {
                        ...data,
                        therapistName: therapistDetails?.data?.fullName,
                      },
                    })
                  }
                  data={therapistDetails?.data}
                  addOns={addOn}
                  shopDetail={serviceName}
                />

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
                <ShopDetailsCard
                  onBookNowPress={() => {
                    nav.navigate('LocationInformation', {
                      data: {
                        ...data,
                        therapistName: therapistDetails?.data?.fullName,
                      },
                    });
                  }}
                  data={therapistDetails?.data}
                />
              </>
            )}
          </View>
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
