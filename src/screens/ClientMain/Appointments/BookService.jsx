/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Container from '../../../components/Container';
import AppHeader from '../../../components/AppHeader';
import {
  AppColors,
  ourSpecialists,
  responsiveFontSize,
  responsiveWidth,
} from '../../../utils';
import AppText from '../../../components/AppTextComps/AppText';
import LineBreak from '../../../components/LineBreak';
import YouFollow from '../../../components/YouFollow';
import Feather from 'react-native-vector-icons/Feather';
import DateSelector from '../../../components/DateSelector';
import TimeSelector from '../../../components/TimeSelector';
import AppTextInput from '../../../components/AppTextInput';
import { useNavigation } from '@react-navigation/native';
import ServiceGalleryFooter from '../../../components/ServiceGalleryFooter';

const BookService = () => {
  const nav = useNavigation();

  return (
    <Container>
      <AppHeader onBackPress={true} heading={'Book Service'} />
      <View>
        <AppText
          title={'Specialist'}
          textColor={AppColors.BLACK}
          textSize={1.8}
          textFontWeight
          paddingHorizontal={4}
        />

        <LineBreak space={2} />

        <YouFollow data={ourSpecialists} />

        <LineBreak space={2} />

        <AppText
          title={'Date'}
          textColor={AppColors.BLACK}
          textSize={1.8}
          textFontWeight
          paddingHorizontal={4}
        />

        <LineBreak space={2} />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: responsiveWidth(4),
          }}
        >
          <TouchableOpacity>
            <Feather
              name="chevron-left"
              size={responsiveFontSize(3)}
              color={AppColors.ThemeBlue}
            />
          </TouchableOpacity>

          <AppText
            title={'March, 2021'}
            textColor={AppColors.BLACK}
            textSize={1.8}
            textFontWeight
          />

          <TouchableOpacity>
            <Feather
              name="chevron-right"
              size={responsiveFontSize(3)}
              color={AppColors.ThemeBlue}
            />
          </TouchableOpacity>
        </View>
        <LineBreak space={2} />

        <DateSelector />

        <LineBreak space={2} />

        <AppText
          title={'Time'}
          textColor={AppColors.BLACK}
          textSize={1.8}
          textFontWeight
          paddingHorizontal={4}
        />

        <LineBreak space={2} />

        <TimeSelector />

        <LineBreak space={2} />

        <AppText
          title={'Notes'}
          textColor={AppColors.BLACK}
          textSize={1.8}
          textFontWeight
          paddingHorizontal={4}
        />

        <LineBreak space={2} />

        <View style={{ paddingHorizontal: responsiveWidth(4) }}>
          <AppTextInput
            inputPlaceHolder={'Type your notes here'}
            borderRadius={10}
            inputHeight={10}
            textAlignVertical={'top'}
          />
        </View>
        <ServiceGalleryFooter
          bookNowOnPress={() => nav.navigate('ShopDetails')}
          borderWidth={-1}
          btnText="Check Out"
        />
      </View>
    </Container>
  );
};

export default BookService;
