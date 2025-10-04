/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, Image, FlatList, TouchableOpacity } from 'react-native';
import Container from '../../../components/Container';
import AppHeader from '../../../components/AppHeader';
import { AppImages } from '../../../assets/images';
import { AppColors, responsiveFontSize, responsiveWidth } from '../../../utils';
import LineBreak from '../../../components/LineBreak';
import AppText from '../../../components/AppTextComps/AppText';
import SessionDuration from '../../../components/SessionDuration';
import DateSelector from '../../../components/DateSelector';
import Feather from 'react-native-vector-icons/Feather';
import TimeSelector from '../../../components/TimeSelector';
import { AppIcons } from '../../../assets/icons';
import SVGXml from '../../../components/SVGXML';
import YouFollow from '../../../components/YouFollow';
import AppButton from '../../../components/AppButton';
import AppTextInput from '../../../components/AppTextInput';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';

const soloMassageSessionDuration = [
  { id: 1, title: '60 Minutes ($150 per Pers.)' },
  { id: 2, title: '75 Minutes ($165 per Pers.)' },
  { id: 3, title: '90 Minutes ($200 per Pers.)' },
  { id: 4, title: '120 Minutes ($290 per Pers.)' },
];

const vibroacousticTherapySessionDuration = [
  { id: 1, title: '60 Minutes ($150 per Pers.)' },
  { id: 2, title: '75 Minutes ($165 per Pers.)' },
  { id: 3, title: '90 Minutes ($200 per Pers.)' },
  { id: 4, title: '120 Minutes ($290 per Pers.)' },
];

const FacialessionDuration = [{ id: 1, title: '60 Minutes ($150 per Pers.)' }];

const groupYogaSessionDuration = [
  { id: 1, title: '60 Minutes ($150 per Pers.)' },
];

const spaPartySessionDuration = [
  { id: 1, title: '30 Minutes ($75 per Pers.)' },
  { id: 1, title: '60 Minutes ($145 per Pers.)' },
];

const corporateChairMassagePartySessionDuration = [
  { id: 1, title: '60 Minutes ($145 per hour)' },
];

const soloMassageOptionsAndAddOns = [
  { id: 1, title: 'Aromatherapy (+$25 per Person)' },
  { id: 2, title: 'Hot Stone (+$45 per Person)' },
];

const spaPartyOptionsAndAddOns = [
  { id: 1, title: '1  Provider (Back to back)' },
  { id: 2, title: '2  Providers (Side by side)' },
];

const vibroacousticTherapyOptionsAndAddOns = [
  { id: 1, title: 'Aromatherapy (+$25 per Pers.)' },
];

const facialOptionsAndAddOns = [
  { id: 1, title: 'Face Peel' },
  { id: 2, title: 'Dermaplaning' },
  { id: 3, title: 'Nano-needling' },
  { id: 4, title: 'Microdembrasion' },
];

const coupleMassageOptionsAndAddOns = [
  { id: 1, title: '1 Provider (Back to Back)' },
  { id: 2, title: '2 Providers (Side by side)' },
  { id: 3, title: 'Aromatherapy (+$25 per  Person)' },
  { id: 4, title: 'Hot Stone (+$45 per Person)' },
];

const genderPreference = [
  { id: 1, title: 'Female' },
  { id: 2, title: 'Male' },
  { id: 3, title: 'No Preference' },
];

const spaPartygroupSize = [
  { id: 1, title: '2' },
  { id: 2, title: '4' },
  { id: 3, title: '6' },
  { id: 4, title: '8' },
];

const corporateChairMassageGroupSize = [
  { id: 1, title: '2' },
  { id: 2, title: '4' },
  { id: 3, title: '6' },
  { id: 4, title: '8' },
];

const followerData = [
  { id: 1, img: AppImages.follower1, name: 'Merry' },
  { id: 2, img: AppImages.follower2, name: 'Bella' },
  { id: 3, img: AppImages.follower3, name: 'Joseph' },
  { id: 4, img: AppImages.follower4, name: 'Bella' },
  { id: 5, img: AppImages.follower5, name: 'Merry' },
];

const selectorData = [
  { id: 1, title: 'Brown Lamination (+$80)' },
  { id: 2, title: 'Lash Lift and Tint (+80)' },
  { id: 3, title: 'Lip or Underarm Wax (+$20)' },
  { id: 4, title: 'Jelly Mask (+ $20 )' },
  { id: 5, title: 'Pumpkin Peel 30%  ( + $20)' },
];

const MassageCategories = ({ route }) => {
  const heading = route?.params?.heading;
  const nav = useNavigation();
  const [selectedSession, setSelectedSession] = useState(0);
  const [selectedAddOn, setSelectedAddOn] = useState(0);
  const [selectedGender, setSelectedGender] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);
  const [isSelected, setIsSelected] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(moment());
  const [selectedDate, setSelectedDate] = useState(moment());
  const [selectedTime, setSelectedTime] = useState(null);
  const [isCheckedProvider, setIsCheckedProvider] = useState(false);

  const daysInMonth = [];
  const startOfMonth = currentMonth.clone().startOf('month').startOf('week');
  const endOfMonth = currentMonth.clone().endOf('month').endOf('week');

  let day = startOfMonth.clone();
  while (day.isBefore(endOfMonth, 'day')) {
    daysInMonth.push(day.clone());
    day.add(1, 'day');
  }

  const toggleSelect = index => {
    if (isSelected.includes(index)) {
      setIsSelected(isSelected.filter(i => i !== index));
    } else {
      setIsSelected([...isSelected, index]);
    }
  };

  const optionsAndAddOns = {
    'Solo Massage': soloMassageOptionsAndAddOns,
    'Couples Massage': coupleMassageOptionsAndAddOns,
    'Spa Party': spaPartyOptionsAndAddOns,
    'Vibroacoustic Therapy': vibroacousticTherapyOptionsAndAddOns,
    Facial: facialOptionsAndAddOns,
  };

  const sessionDuration = {
    'Solo Massage': soloMassageSessionDuration,
    'Couples Massage': soloMassageSessionDuration,
    'Group Yoga': groupYogaSessionDuration,
    'Sound Bath': groupYogaSessionDuration,
    'Spa Party': spaPartySessionDuration,
    'Corporate Chair Massage': corporateChairMassagePartySessionDuration,
    'Vibroacoustic Therapy': vibroacousticTherapySessionDuration,
    Facial: FacialessionDuration,
  };

  const sessionDurationSubtitle = {
    'Spa Party': 'For 60 Minutes sessions there is a minimum group size of 8.',
    'Corporate Chair Massage': 'The minimum booking duration is 2 hours.',
    'Vibroacoustic Therapy': 'With massage treatment',
  };

  const groupSize = {
    'Spa Party': spaPartygroupSize,
    'Corporate Chair Massage': corporateChairMassageGroupSize,
  };

  const title = {
    'Spa Party': 'Group Size',
    'Corporate Chair Massage': 'Session Duration (hours)',
  };

  return (
    <Container>
      <AppHeader onBackPress={true} heading={heading} />
      <Image
        source={AppImages.massage}
        style={{ width: responsiveWidth(100) }}
      />

      <LineBreak space={2} />

      <View style={{ paddingHorizontal: responsiveWidth(4) }}>
        <AppText
          title={
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
          }
          textColor={AppColors.GRAY}
          textSize={1.6}
          lineHeight={2.5}
        />
        <LineBreak space={2} />
        <AppText
          title={'Session Duration'}
          textColor={AppColors.BLACK}
          textSize={2}
          textFontWeight
        />
        <LineBreak space={1} />
        {sessionDurationSubtitle[heading] && (
          <AppText
            title={sessionDurationSubtitle[heading]}
            textColor={AppColors.GRAY}
            textSize={1.8}
          />
        )}
        {sessionDurationSubtitle[heading] && <LineBreak space={1} />}

        <FlatList
          data={sessionDuration[heading]}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          ItemSeparatorComponent={<LineBreak space={2} />}
          renderItem={({ item, index }) => (
            <SessionDuration
              title={item.title}
              index={index}
              onPress={() => setSelectedSession(index)}
              isSelected={selectedSession == index}
            />
          )}
        />

        {groupSize[heading] && <LineBreak space={2} />}
        {groupSize[heading] && (
          <AppText
            title={title[heading]}
            textColor={AppColors.BLACK}
            textSize={2}
            textFontWeight
          />
        )}

        {groupSize[heading] && <LineBreak space={1} />}

        {groupSize[heading] && (
          <FlatList
            data={groupSize[heading]}
            horizontal
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={<LineBreak space={2} />}
            ListFooterComponent={<LineBreak space={2} />}
            contentContainerStyle={{ gap: responsiveWidth(4) }}
            renderItem={({ item, index }) => (
              <SessionDuration
                title={item.title}
                index={index}
                textSize={3}
                containerWidth={20}
                onPress={() => setSelectedSize(index)}
                isSelected={selectedSize == index}
              />
            )}
          />
        )}

        <LineBreak space={2} />

        {optionsAndAddOns[heading] && (
          <AppText
            title={'Options and Add-ons'}
            textColor={AppColors.BLACK}
            textSize={2}
            textFontWeight
          />
        )}
        {optionsAndAddOns[heading] && <LineBreak space={1} />}

        {optionsAndAddOns[heading] && (
          <FlatList
            data={optionsAndAddOns[heading]}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: 'space-between' }}
            ListFooterComponent={<LineBreak space={2} />}
            ItemSeparatorComponent={<LineBreak space={2} />}
            renderItem={({ item, index }) => (
              <SessionDuration
                title={item.title}
                index={index}
                onPress={() => setSelectedAddOn(index)}
                isSelected={selectedAddOn == index}
              />
            )}
          />
        )}

        {heading === 'Facial' && (
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
                <TouchableOpacity onPress={() => toggleSelect(index)}>
                  <SVGXml
                    icon={
                      isSelected.includes(index)
                        ? AppIcons.check
                        : AppIcons.un_check
                    }
                    width={55}
                    height={55}
                  />
                </TouchableOpacity>
                <AppText
                  title={item.title}
                  textColor={AppColors.BLACK}
                  textSize={2}
                  textwidth={60}
                  textFontWeight
                />
              </View>
            )}
          />
        )}

        <AppText
          title={'Appointment Date and Time'}
          textColor={AppColors.BLACK}
          textSize={2}
          textFontWeight
        />
        <LineBreak space={2} />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity
            onPress={() =>
              setCurrentMonth(currentMonth.clone().subtract(1, 'month'))
            }
          >
            <Feather
              name="chevron-left"
              size={responsiveFontSize(3)}
              color={AppColors.ThemeBlue}
            />
          </TouchableOpacity>

          <AppText
            title={currentMonth.format('MMMM, YYYY')}
            textColor={AppColors.BLACK}
            textSize={1.8}
            textFontWeight
          />

          <TouchableOpacity
            onPress={() =>
              setCurrentMonth(currentMonth.clone().add(1, 'month'))
            }
          >
            <Feather
              name="chevron-right"
              size={responsiveFontSize(3)}
              color={AppColors.ThemeBlue}
            />
          </TouchableOpacity>
        </View>

        <LineBreak space={2} />

        <DateSelector
          data={daysInMonth}
          setSelectedDate={setSelectedDate}
          isSelected={selectedDate}
        />

        <LineBreak space={2} />

        <TimeSelector
          isSelected={selectedTime}
          setSelectedTime={setSelectedTime}
        />

        <LineBreak space={2} />

        <AppText
          title={'Gender Preferences'}
          textColor={AppColors.BLACK}
          textSize={2}
          textFontWeight
        />
        <LineBreak space={1} />

        <FlatList
          data={genderPreference}
          horizontal
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={<LineBreak space={2} />}
          contentContainerStyle={{ gap: responsiveWidth(4) }}
          renderItem={({ item, index }) => (
            <SessionDuration
              title={item.title}
              index={index}
              containerWidth={32}
              onPress={() => setSelectedGender(index)}
              isSelected={selectedGender == index}
              textwidth={25}
            />
          )}
        />

        <LineBreak space={4} />

        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: responsiveWidth(4),
            }}
          >
            <TouchableOpacity
              onPress={() => setIsCheckedProvider(!isCheckedProvider)}
            >
              <SVGXml
                icon={isCheckedProvider ? AppIcons.check : AppIcons.un_check}
                width={55}
                height={55}
              />
            </TouchableOpacity>
            <AppText
              title={'I would like i-thriv to pick an available provider'}
              textColor={AppColors.BLACK}
              textSize={2}
              textwidth={60}
              textFontWeight
            />
          </View>
        </View>

        <LineBreak space={3} />

        {!isCheckedProvider && (
          <YouFollow
            data={followerData}
            paddingHorizontal={-1}
            disabledSelection={isCheckedProvider === false}
            onPress={() => nav.navigate('ShopDetails')}
          />
        )}

        {!isCheckedProvider && <LineBreak space={3} />}

        {heading === 'Corporate Chair Massage' && (
          <>
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

            <LineBreak space={1} />
          </>
        )}

      {isCheckedProvider &&  <AppButton
          title="Next"
          textColor={AppColors.WHITE}
          btnBackgroundColor={AppColors.appGreen}
          handlePress={() => nav.navigate('LocationInformation')}
          textFontWeight={false}
        />}
        <LineBreak space={4} />
      </View>
    </Container>
  );
};

export default MassageCategories;
