/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { AppColors, responsiveWidth, ShowToast } from '../../../utils';
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
import { useCreateRatingsMutation } from '../../../redux/services/MainIntegration';

const ServiceFeedback = ({ route }) => {
  const nav = useNavigation();
  const [rating, setRating] = useState(1);
  const [feedBack, setFeedBack] = useState(null);
  const { type, user } = useSelector(state => state.persistedData);
  const [createRatings, { isLoading, isError }] = useCreateRatingsMutation();
  const { therapistId } = route?.params;
  const createRatingsHandler = async () => {
    if (!feedBack) {
      return ShowToast('Feedback Shouldnt Be Empty');
    }
    let data = {
      userId: user?._id,
      therapistId,
      comment: feedBack,
      rating: rating,
    };
    await createRatings(data)
      .unwrap()
      .then(res => {
        console.log('response of register ===>', res);
        ShowToast(res.message);
        if (res.success) {
          nav.navigate('Main');
        }
      })
      .catch(error => {
        console.log('error while registering the account ===>', error);
        ShowToast('Some problem occured');
      });
  };

  console.log('rating', rating);
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
          onChangeText={val => setFeedBack(val)}
          containerBg={AppColors.inputGrayBg}
          inputHeight={25}
          textAlignVertical={'top'}
          multiline={true}
        />
        <LineBreak space={2} />
        <AppButton
          title={
            isLoading ? (
              <ActivityIndicator size={'large'} color={AppColors.WHITE} />
            ) : (
              'Submit Now'
            )
          }
          textColor={AppColors.WHITE}
          btnBackgroundColor={AppColors.appGreen}
          handlePress={createRatingsHandler}
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
            <StarRating
              enableHalfStar={false}
              rating={rating}
              onChange={setRating}
            />
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
