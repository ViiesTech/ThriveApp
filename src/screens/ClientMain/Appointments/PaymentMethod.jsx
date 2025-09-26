/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View } from 'react-native';
import Container from '../../../components/Container';
import AppHeader from '../../../components/AppHeader';
import PaymentMethodTextInput from '../../../components/PaymentMethodTextInput';
import { AppColors, responsiveFontSize, responsiveWidth } from '../../../utils';
import CardList from '../../../components/CardList';
import LineBreak from '../../../components/LineBreak';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AppText from '../../../components/AppTextComps/AppText';
import AppButton from '../../../components/AppButton';
import { useNavigation } from '@react-navigation/native';

const PaymentMethod = () => {
  const nav = useNavigation();
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

        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1, marginRight: 8 }}>
            <PaymentMethodTextInput
              label="Expiry Date"
              value="10-27-2025"
              editable={false}
            />
          </View>
          <View style={{ flex: 1 }}>
            <PaymentMethodTextInput
              label="CVV"
              value="******"
              editable={false}
            />
          </View>
        </View>
        <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
          <Ionicons
            name="checkbox"
            size={responsiveFontSize(4)}
            color={AppColors.ThemeBlue}
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
