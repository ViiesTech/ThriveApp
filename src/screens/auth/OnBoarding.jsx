/* eslint-disable react-native/no-inline-styles */
import React, { useState, useRef } from 'react';
import { View, ImageBackground, TouchableOpacity } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { AppImages } from '../../assets/images/index';
import { responsiveHeight, responsiveWidth } from '../../utils/index';
import AppText from '../../components/AppTextComps/AppText';
import { AppColors } from '../../utils/index';
import AppButton from '../../components/AppButton';
import LineBreak from '../../components/LineBreak';
import { useNavigation } from '@react-navigation/native';

const OnBoarding = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);
  const nav = useNavigation();

  const slides = [
    {
      key: 1,
      title: 'We Bring Wellness to You',
      detail: 'i‑thriv: Wellness that fits your lifestyle, energy & schedule.',
      bg: AppImages.on_boarding1,
    },
    {
      key: 2,
      title: 'Meet Our Wellness Specialists',
      detail:
        'Top massage, yoga & healing pros—licensed, vetted, and ready to serve you.',
      bg: AppImages.on_boarding2,
    },
    {
      key: 3,
      title: 'Find Your Service Fast',
      detail: 'Top wellness pros. Anywhere you need them.',
      bg: AppImages.on_boarding3,
    },
  ];

  const renderDots = () => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: responsiveHeight(4),
      }}
    >
      {slides.map((_, index) => (
        <View
          key={index}
          style={{
            width: index === currentIndex ? responsiveWidth(7) : 8,
            height: 8,
            borderRadius: 100,
            backgroundColor:
              index === currentIndex ? AppColors.ThemeBlue : AppColors.WHITE,
            marginHorizontal: responsiveWidth(0.7),
          }}
        />
      ))}
    </View>
  );

  const renderItem = ({ item }) => (
    <ImageBackground
      source={item.bg}
      style={{
        width: responsiveWidth(100),
        height: responsiveHeight(100),
        justifyContent: 'flex-end',
      }}
    >
      <View
        style={{
          paddingHorizontal: responsiveWidth(5),
        }}
      >
        <AppText
          title={item.title}
          textColor={AppColors.WHITE}
          textSize={3.5}
          textFontWeight
          textAlignment={'center'}
          textTransform={'capitalize'}
        />
        <LineBreak space={2} />
        <AppText
          title={item.detail}
          textColor={AppColors.WHITE}
          textSize={2}
          lineHeight={3}
          textAlignment={'center'}
        />
        <View>{renderDots()}</View>
        <LineBreak space={5} />
        <View>{renderCustomButtons()}</View>
        <LineBreak space={4} />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 5,
          }}
        >
          <AppText
            title={'Already have an account?'}
            textColor={AppColors.WHITE}
            textSize={2}
            lineHeight={3}
            textAlignment={'center'}
          />
          <TouchableOpacity onPress={() => nav.navigate('Login')}>
            <AppText
              title={'Sign In'}
              textColor={AppColors.WHITE}
              textSize={2}
              textAlignment={'center'}
            />
          </TouchableOpacity>
        </View>
      </View>
      <LineBreak space={10} />
    </ImageBackground>
  );

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      sliderRef.current?.goToSlide(currentIndex + 1, true);
    }
  };

  const handleDone = () => {
    navigation.navigate('GetStarted');
  };

  const renderCustomButtons = () => {
    if (currentIndex === 0) {
      return (
        <AppButton
          title="Continue"
          textColor={AppColors.WHITE}
          btnBackgroundColor={AppColors.appGreen}
          handlePress={handleNext}
          textFontWeight={false}
        />
      );
    }

    if (currentIndex === 1) {
      return (
        <AppButton
          title="Continue"
          textColor={AppColors.WHITE}
          btnBackgroundColor={AppColors.appGreen}
          handlePress={handleNext}
          textFontWeight={false}
        />
      );
    }

    if (currentIndex === 2) {
      return (
        <AppButton
          title="Get Started"
          textColor={AppColors.WHITE}
          bgColor={AppColors.appGreen}
          handlePress={handleDone}
          textFontWeight={false}
        />
      );
    }

    return null;
  };

  return (
    <View style={{ flex: 1 }}>
      <AppIntroSlider
        ref={sliderRef}
        data={slides}
        renderItem={renderItem}
        onSlideChange={index => setCurrentIndex(index)}
        showNextButton={false}
        showSkipButton={false}
        showDoneButton={false}
        dotStyle={{ display: 'none' }}
        activeDotStyle={{ display: 'none' }}
      />
    </View>
  );
};

export default OnBoarding;
