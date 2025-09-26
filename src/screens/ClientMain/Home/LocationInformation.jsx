/* eslint-disable react-native/no-inline-styles */
import React, { useRef, useState } from 'react';
import {
  View,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
} from 'react-native';
import Container from '../../../components/Container';
import AppHeader from '../../../components/AppHeader';
import { AppColors, responsiveWidth } from '../../../utils';
import AppText from '../../../components/AppTextComps/AppText';
import LineBreak from '../../../components/LineBreak';
import AppTextInput from '../../../components/AppTextInput';
import PhoneInputScreen from '../../../components/PhoneInput';
import { AppIcons } from '../../../assets/icons';
import SVGXml from '../../../components/SVGXML';
import AppButton from '../../../components/AppButton';
import { useNavigation } from '@react-navigation/native';

const selectorData = [
  {
    id: 1,
    title:
      'I confirm parking is available within 15 yards of my front door. Without it, providers cannot perform service.',
  },
  {
    id: 2,
    title:
      'I will secure my pets before the provider’s arrival time for the entire duration of the session.',
  },
  { id: 3, title: 'I don’t have any pets' },
];

const LocationInformation = () => {
  const phoneRef = useRef();
  const [isSelected, setIsSelected] = useState(0);
  const nav = useNavigation();

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <Container>
        <AppHeader onBackPress={true} heading={'Location Information'} />

        <View style={{ paddingHorizontal: responsiveWidth(4) }}>
          <View>
            <AppText
              title={'Full name of contact person'}
              textColor={AppColors.GRAY}
              textSize={1.8}
            />
            <LineBreak space={0.5} />
            <AppTextInput inputPlaceHolder={'Name'} />
          </View>

          <LineBreak space={1} />

          <View>
            <AppText
              title={'Phone number of the contact person'}
              textColor={AppColors.GRAY}
              textSize={1.8}
            />
            <LineBreak space={0.5} />
            <PhoneInputScreen phoneRef={phoneRef} />
          </View>

          <LineBreak space={2} />

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: responsiveWidth(4),
            }}
          >
            <TouchableOpacity>
              <SVGXml
                icon={true ? AppIcons.check : AppIcons.un_check}
                width={55}
                height={55}
              />
            </TouchableOpacity>
            <AppText
              title={'Uae address on file'}
              textColor={AppColors.BLACK}
              textSize={2}
              textwidth={60}
              textFontWeight
            />
          </View>
          <LineBreak space={1} />

          <View>
            <AppText
              title={'Address'}
              textColor={AppColors.GRAY}
              textSize={1.8}
            />
            <LineBreak space={0.5} />
            <AppTextInput inputPlaceHolder={''} />
          </View>
          <LineBreak space={1} />

          <View>
            <AppText
              title={'Apartment, suite, etc'}
              textColor={AppColors.GRAY}
              textSize={1.8}
            />
            <LineBreak space={0.5} />
            <AppTextInput inputPlaceHolder={''} />
          </View>
          <LineBreak space={1} />

          <View>
            <AppText title={'City'} textColor={AppColors.GRAY} textSize={1.8} />
            <LineBreak space={0.5} />
            <AppTextInput inputPlaceHolder={''} />
          </View>
          <LineBreak space={1} />

          <View>
            <AppText
              title={'State'}
              textColor={AppColors.GRAY}
              textSize={1.8}
            />
            <LineBreak space={0.5} />
            <AppTextInput inputPlaceHolder={''} />
          </View>
          <LineBreak space={1} />

          <View>
            <AppText
              title={'Zip Code'}
              textColor={AppColors.GRAY}
              textSize={1.8}
            />
            <LineBreak space={0.5} />
            <AppTextInput inputPlaceHolder={''} />
          </View>
          <LineBreak space={1} />

          <View>
            <AppText
              title={'Notes'}
              textColor={AppColors.BLACK}
              textSize={2}
              textFontWeight
            />

            <LineBreak space={1} />

            <AppText
              title={
                'Enter any additional information that may be relevant to your Provider'
              }
              textColor={AppColors.GRAY}
              textSize={1.8}
              textwidth={75}
            />
            <LineBreak space={1} />

            <AppTextInput
              inputPlaceHolder={'Enter text'}
              borderRadius={10}
              inputHeight={15}
              textAlignVertical={'top'}
              multiline={true}
            />
          </View>

          <LineBreak space={2} />

          <FlatList
            data={selectorData}
            ItemSeparatorComponent={<LineBreak space={2} />}
            ListFooterComponent={<LineBreak space={2} />}
            renderItem={({ item, index }) => (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: responsiveWidth(4),
                }}
              >
                <TouchableOpacity onPress={() => setIsSelected(index)}>
                  <SVGXml
                    icon={
                      isSelected === index ? AppIcons.check : AppIcons.un_check
                    }
                    width={55}
                    height={55}
                  />
                </TouchableOpacity>
                <AppText
                  title={item.title}
                  textColor={AppColors.BLACK}
                  textSize={1.8}
                  textwidth={70}
                  textFontWeight
                />
              </View>
            )}
          />

          <AppButton
            title="Next"
            textColor={AppColors.WHITE}
            btnBackgroundColor={AppColors.appGreen}
            handlePress={() => nav.navigate('BookingCheckout')}
            textFontWeight={false}
          />

          <LineBreak space={2} />
        </View>
      </Container>
    </KeyboardAvoidingView>
  );
};

export default LocationInformation;
