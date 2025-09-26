/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, ImageBackground, FlatList } from 'react-native';
import Container from '../../../components/Container';
import AppHeader from '../../../components/AppHeader';
import { AppImages } from '../../../assets/images';
import {
  AppColors,
  checkoutPart1,
  checkoutPart2,
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../../utils';
import AppText from '../../../components/AppTextComps/AppText';
import LineBreak from '../../../components/LineBreak';
import SVGXml from '../../../components/SVGXML';
import { AppIcons } from '../../../assets/icons';
import Feather from 'react-native-vector-icons/Feather';
import AppButton from '../../../components/AppButton';
import { useNavigation } from '@react-navigation/native';
import AppTextInput from '../../../components/AppTextInput';

const BookingCheckout = () => {
  const nav = useNavigation();
  return (
    <Container>
      <AppHeader onBackPress={true} heading={'Booking Checkout'} />
      <ImageBackground
        source={AppImages.checkout_bg}
        imageStyle={{ borderRadius: 15 }}
        style={{
          paddingHorizontal: responsiveWidth(6),
          paddingVertical: responsiveHeight(2),
          width: responsiveWidth(90),
          height: responsiveHeight(65),
          alignSelf: 'center',
        }}
      >
        <View>
          <FlatList
            data={checkoutPart1}
            numColumns={2}
            columnWrapperStyle={{ gap: 20 }}
            ItemSeparatorComponent={<LineBreak space={1} />}
            renderItem={({ item }) => (
              <View style={{ width: responsiveWidth(45) }}>
                <AppText
                  title={item.title}
                  textColor={AppColors.BLACK}
                  textSize={1.8}
                />
                <LineBreak space={1} />
                <AppText
                  title={item.subTitle}
                  textColor={AppColors.ThemeBlue}
                  textSize={1.8}
                  textFontWeight
                />
              </View>
            )}
          />
        </View>

        <View
          style={{
            width: responsiveWidth(78),
            height: responsiveHeight(0.2),
            backgroundColor: AppColors.LIGHTGRAY,
            marginVertical: responsiveHeight(2),
          }}
        />

        <AppText
          title={'Service'}
          textColor={AppColors.BLACK}
          textSize={1.8}
          textAlignment={'center'}
        />

        <LineBreak space={1} />

        <View>
          <FlatList
            data={checkoutPart2}
            renderItem={({ item }) => (
              <>
                {item.id !== 3 && <LineBreak space={1} />}
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <AppText
                    title={item.title}
                    textColor={AppColors.BLACK}
                    textSize={1.8}
                  />
                  <AppText
                    title={item.subTitle}
                    textColor={AppColors.ThemeBlue}
                    textSize={1.8}
                    textFontWeight
                  />
                </View>
                {item.id == 2 && (
                  <View
                    style={{
                      width: responsiveWidth(78),
                      height: responsiveHeight(0.2),
                      backgroundColor: AppColors.LIGHTGRAY,
                      marginVertical: responsiveHeight(2),
                    }}
                  />
                )}
              </>
            )}
          />
        </View>

        <LineBreak space={1} />

        <AppText
          title={'Promo Code'}
          textColor={AppColors.BLACK}
          textSize={1.8}
          textAlignment={'center'}
        />
        <LineBreak space={1} />

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View>
            <AppTextInput
              inputPlaceHolder={'A1B2C3'}
              isFocused={true}
              containerBg={'transparent'}
              inputHeight={4}
              fontSize={1.5}
              inputWidth={38}
            />
          </View>
          <AppButton
            title="Apply Now"
            textColor={AppColors.WHITE}
            btnBackgroundColor={AppColors.ThemeBlue}
            handlePress={() => {}}
            btnWidth={25}
            btnPadding={4}
            textSize={1.5}
            textFontWeight={false}
          />
        </View>

        <View
          style={{
            width: responsiveWidth(78),
            height: responsiveHeight(0.2),
            backgroundColor: AppColors.LIGHTGRAY,
            marginVertical: responsiveHeight(1),
          }}
        />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <AppText title={'Total'} textColor={AppColors.BLACK} textSize={1.8} />
          <AppText
            title={'$70'}
            textColor={AppColors.ThemeBlue}
            textSize={1.8}
            textFontWeight
          />
        </View>

        <LineBreak space={3} />

        <View
          style={{
            borderWidth: 1,
            borderColor: AppColors.ThemeBlue,
            paddingHorizontal: responsiveWidth(6),
            paddingVertical: responsiveHeight(1.5),
            borderRadius: 100,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 25 }}>
            <SVGXml icon={AppIcons.master_card} width={40} height={40} />
            <View>
              <AppText
                title={'Samantha Martin'}
                textColor={AppColors.BLACK}
                textSize={1.8}
                textFontWeight
              />
              <LineBreak space={0.5} />
              <AppText
                title={'3124325***'}
                textColor={AppColors.GRAY}
                textSize={1.8}
              />
            </View>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <Feather
                name="chevron-right"
                size={responsiveFontSize(3)}
                color={AppColors.ThemeBlue}
              />
            </View>
          </View>
        </View>
      </ImageBackground>
      <LineBreak space={3} />
      <View style={{ paddingHorizontal: responsiveWidth(4) }}>
        <AppButton
          title={'Pay Now'}
          textColor={AppColors.WHITE}
          btnBackgroundColor={AppColors.appGreen}
          handlePress={() => nav.navigate('PaymentMethod')}
          textFontWeight={false}
        />
      </View>
    </Container>
  );
};

export default BookingCheckout;
