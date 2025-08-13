/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import Container from '../../../components/Container';
import { AppImages } from '../../../assets/images';
import {
  AppColors,
  galleryImages,
  ourSpecialists,
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../../utils';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import LineBreak from '../../../components/LineBreak';
import AppText from '../../../components/AppTextComps/AppText';
import YouFollow from '../../../components/YouFollow';
import Reviews from '../../../components/Reviews';
import ServiceGalleryFooter from '../../../components/ServiceGalleryFooter';

const ServiceGallery = () => {
  const nav = useNavigation();
  return (
    <>
      <Container>
        <ImageBackground
          source={AppImages.service_bg}
          style={{
            width: responsiveWidth(100),
            height: responsiveHeight(20),
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: responsiveWidth(4),
            flexDirection: 'row',
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
        </ImageBackground>

        <LineBreak space={2} />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: responsiveWidth(4),
          }}
        >
          <AppText
            title={'Gallery'}
            textColor={AppColors.BLACK}
            textSize={1.8}
            textFontWeight
          />

          <TouchableOpacity>
            <AppText
              title={'View all'}
              textColor={AppColors.ThemeBlue}
              textSize={1.8}
            />
          </TouchableOpacity>
        </View>

        <FlatList
          data={galleryImages}
          horizontal
          contentContainerStyle={{
            paddingTop: responsiveHeight(1),
            gap: 10,
            paddingHorizontal: responsiveWidth(4),
          }}
          renderItem={({ item }) => (
            <Image
              source={item.image}
              style={{ width: 80, height: 80, borderRadius: 10 }}
            />
          )}
        />

        <LineBreak space={3} />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: responsiveWidth(4),
          }}
        >
          <AppText
            title={'Our Specialist'}
            textColor={AppColors.BLACK}
            textSize={1.8}
            textFontWeight
          />

          <TouchableOpacity>
            <AppText
              title={'View all'}
              textColor={AppColors.ThemeBlue}
              textSize={1.8}
            />
          </TouchableOpacity>
        </View>

        <LineBreak space={2} />

        <YouFollow data={ourSpecialists} />

        <LineBreak space={3} />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: responsiveWidth(4),
          }}
        >
          <AppText
            title={'Reviews'}
            textColor={AppColors.BLACK}
            textSize={1.8}
            textFontWeight
          />

          <TouchableOpacity>
            <AppText
              title={'View all'}
              textColor={AppColors.ThemeBlue}
              textSize={1.8}
            />
          </TouchableOpacity>
        </View>

        <LineBreak space={2} />

        <Reviews />
      </Container>
      <ServiceGalleryFooter bookNowOnPress={() => nav.navigate('BookService')} />
    </>
  );
};

export default ServiceGallery;

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
