/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import PhoneInput from 'react-native-phone-input';
import { AppColors, responsiveHeight, responsiveWidth } from '../utils';

const PhoneInputScreen = ({phoneRef, defaultVal}) => {
  const countryPickerRef = useRef(null);
  const [pickerData, setPickerData] = useState([]);

  useEffect(() => {
    if (phoneRef.current) {
      setPickerData(phoneRef.current.getPickerData());
    }
  }, []);

  const onPressFlag = () => {
    countryPickerRef.current?.open();
  };

  const selectCountry = country => {
    phoneRef.current?.selectCountry(country.iso2);
  };

  return (
    <View>
      <PhoneInput
        ref={phoneRef}
        onPressFlag={onPressFlag}
        initialCountry="uk"
        initialValue='1111111111'
        style={{
          paddingHorizontal: responsiveWidth(7),
          height: responsiveHeight(6.5),
          borderRadius: 200,
          backgroundColor: AppColors.inputGrayBg,
        }}
        textStyle={{color: AppColors.ThemeBlue, marginLeft: 10}}
        autoFormat
        textProps={{
          placeholder: '000 000 000',
        }}
      />

      {/* <CountryPicker
        ref={countryPickerRef}
        data={pickerData}
        onChange={(country) => selectCountry(country)}
        cancelText="Cancel"
      /> */}
    </View>
  );
};

export default PhoneInputScreen;
