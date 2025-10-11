/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { AppColors, responsiveWidth } from '../../../utils';
import AppText from '../../../components/AppTextComps/AppText';
import SVGXml from '../../../components/SVGXML';
import { AppIcons } from '../../../assets/icons';
import LineBreak from '../../../components/LineBreak';
import AppTextInput from '../../../components/AppTextInput';
import AppButton from '../../../components/AppButton';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StarRating from 'react-native-star-rating-widget';
import { useSelector } from 'react-redux';

const ServiceFeedback = () => {
  const nav = useNavigation();
  const [rating, setRating] = useState(0);
  const { type } = useSelector(state => state.persistedData);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: AppColors.WHITE,
      }}
    >
      <View style={{ alignItems: 'center' }}>
        <SVGXml icon={AppIcons.done} width={90} height={90} />
      </View>
      <LineBreak space={3} />
      <AppText
        title={'Your Appointment Completed!'}
        textColor={AppColors.BLACK}
        textSize={2.8}
        textFontWeight
        textwidth={70}
        textAlignment={'center'}
      />
      <LineBreak space={5} />

      <View style={{ paddingHorizontal: responsiveWidth(4) }}>
        <AppText
          title={'Service Feedback'}
          textColor={AppColors.GRAY}
          textSize={1.6}
        />
        <LineBreak space={1} />
        <AppTextInput
          inputPlaceHolder={'write text here...'}
          containerBg={AppColors.inputGrayBg}
          inputHeight={25}
          textAlignVertical={'top'}
          multiline={true}
        />
        <LineBreak space={2} />
        <AppButton
          title="Submit Now"
          textColor={AppColors.WHITE}
          btnBackgroundColor={AppColors.appGreen}
          handlePress={() => {
            nav.navigate('Main');
          }}
          textFontWeight={false}
        />

        <LineBreak space={7} />
        {type === 'Client' && (
          <AppText
            title={'Specialist Rating'}
            textColor={AppColors.BLACK}
            textSize={1.8}
            textFontWeight
            textAlignment={'center'}
          />
        )}

        {type === 'Client' && <LineBreak space={2} />}

        {type === 'Client' && (
          <View
            style={{
              flexDirection: 'row',
              gap: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <StarRating rating={rating} onChange={setRating} />
            <AppText
              title={`${rating} Star`}
              textColor={AppColors.ThemeBlue}
              textSize={1.8}
              textFontWeight
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default ServiceFeedback;
