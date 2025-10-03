/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Container from '../../../components/Container';
import AppHeader from '../../../components/AppHeader';
import PaymentMethodTextInput from '../../../components/PaymentMethodTextInput';
import {
  AppColors,
  responsiveWidth,
} from '../../../utils';
import CardList from '../../../components/CardList';
import LineBreak from '../../../components/LineBreak';
import AppText from '../../../components/AppTextComps/AppText';
import AppButton from '../../../components/AppButton';
import { useNavigation } from '@react-navigation/native';
import CheckBox from '@react-native-community/checkbox';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const PaymentMethod = () => {
  const nav = useNavigation();
  const [toggleButton, setToggleButton] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [expiryDate, setExpiryDate] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    console.warn('A date has been picked: ', date);
    const formatted = date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    setExpiryDate(formatted);
    hideDatePicker();
  };

  return (
    <Container>
      <AppHeader onBackPress={true} heading={'Payment Method'} />

      <CardList />
      <LineBreak space={2} />
      <View style={{ paddingHorizontal: responsiveWidth(4) }}>
        <PaymentMethodTextInput
          label="Name"
          value="Jordan Delgado"
          editable={false}
        />

        <PaymentMethodTextInput
          label="Card number"
          value="**** **** **** 789"
          editable={false}
        />

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />

        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1, marginRight: 8 }}>
            <TouchableOpacity onPress={() => showDatePicker()}>
              <PaymentMethodTextInput
                label="Expiry Date"
                value={"10-27-2025" || expiryDate}
                editable={false}
              />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }}>
            <PaymentMethodTextInput
              label="CVV"
              value="******"
              editable={false}
            />
          </View>
        </View>
        <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
          {/* <TouchableOpacity>
            <Ionicons
              name="checkbox"
              size={responsiveFontSize(4)}
              color={AppColors.ThemeBlue}
            />
          </TouchableOpacity> */}
          <CheckBox
            value={toggleButton}
            onValueChange={value => setToggleButton(value)}
            style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
          />
          <AppText
            title={'Save Detail Information'}
            textColor={AppColors.GRAY}
            textSize={1.8}
          />
        </View>

        <LineBreak space={10} />

        <AppButton
          title={'Pay Now'}
          textColor={AppColors.WHITE}
          btnBackgroundColor={AppColors.appGreen}
          handlePress={() => nav.navigate('Main')}
          textFontWeight={false}
        />
      </View>
    </Container>
  );
};

export default PaymentMethod;
