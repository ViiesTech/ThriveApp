/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import {
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Linking,
  Text,
  ActivityIndicator,
} from 'react-native';
import Container from '../../../components/Container';
import AppHeader from '../../../components/AppHeader';
import { AppImages } from '../../../assets/images';
import {
  AppColors,
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
  ShowToast,
} from '../../../utils';
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
import {
  useLazyGetServiceByIdQuery,
  useLazySearchTherapistQuery,
} from '../../../redux/services/MainIntegration';
import { IMAGE_URL } from '../../../redux/constant';
import { flatten } from 'react-native/types_generated/Libraries/StyleSheet/StyleSheetExports';

const genderPreference = [
  { id: 1, title: 'Female' },
  { id: 2, title: 'Male' },
  { id: 3, title: 'No Preference' },
];

const followerData = [
  { id: 1, img: AppImages.follower1, name: 'Merry' },
  { id: 2, img: AppImages.follower2, name: 'Bella' },
  { id: 3, img: AppImages.follower3, name: 'Joseph' },
  { id: 4, img: AppImages.follower4, name: 'Bella' },
  { id: 5, img: AppImages.follower5, name: 'Merry' },
];

const MassageCategories = ({ route }) => {
  const { heading, id } = route?.params;
  const [getServiceById, { data, isLoading, isError }] =
    useLazyGetServiceByIdQuery();
  const [searchTherapist, { data: searchedData, searchLoading, searchError }] =
    useLazySearchTherapistQuery();
  console.log('searchedData', searchedData);
  const nav = useNavigation();
  const [selectedGender, setSelectedGender] = useState(0);
  const [isSelected, setIsSelected] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(moment());
  const [isCheckedProvider, setIsCheckedProvider] = useState(false);
  const groupServices = [
    'Group Yoga',
    'Corporate Chair Massage',
    'Sound Bath',
    'Spa Party',
  ];

  //data
  const [selectedTherapistId, setSelectedTherapistId] = useState([]);
  const [selectedDate, setSelectedDate] = useState(moment());
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedSession, setSelectedSession] = useState(0);
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [groupSize, setGroupSize] = useState(1);

  const [daysInMonth, setDaysInMonth] = useState([]);
  const serviceName = data?.data?.serviceName;
  // const startOfMonth = currentMonth.clone().startOf('month');
  // const endOfMonth = currentMonth.clone().endOf('month');
  console.log('selectedTherapistId', selectedTherapistId);
  console.log('selectedDate', moment(selectedDate));
  useEffect(() => {
    const startOfMonth = currentMonth.clone().startOf('month');
    const endOfMonth = currentMonth.clone().endOf('month');
    const days = [];

    for (
      let day = startOfMonth.clone();
      day.isSameOrBefore(endOfMonth, 'day');
      day.add(1, 'day')
    ) {
      days.push(day.clone());
    }

    setDaysInMonth(days);
  }, [currentMonth]);

  useEffect(() => {
    if (serviceName === 'Couple Massage') {
      console.log('f');
      setGroupSize(2);
    }
  }, [serviceName]);
  // const [serviceDetails, setServiceDetails] = useState();
  // console.log('serviceDetails', serviceDetails);

  // let day = startOfMonth.clone();
  // while (day.isBefore(endOfMonth, 'day')) {
  //   daysInMonth.push(day.clone());
  //   day.add(1, 'day');
  // }
  useEffect(() => {
    if (isCheckedProvider) {
      // store all therapist IDs from searchedData
      setSelectedTherapistId(searchedData?.data?.map(item => item._id) || []);
    }
  }, [selectedGender, searchedData, isCheckedProvider]);
  const toggleSelect = index => {
    if (isSelected.includes(index)) {
      setIsSelected(isSelected.filter(i => i !== index));
    } else {
      setIsSelected([...isSelected, index]);
    }
  };

  const handleSelectAddOn = addOnItem => {
    setSelectedAddOns(prev => {
      const isAlreadySelected = prev.some(i => i._id === addOnItem._id);
      if (isAlreadySelected) {
        // remove if already selected
        return prev.filter(i => i._id !== addOnItem._id);
      } else {
        // add if not selected
        return [...prev, addOnItem];
      }
    });
  };

  useEffect(() => {
    getServiceById(id)
      .unwrap()
      .then(res => {
        if (!res?.success) {
          ShowToast(res?.message);
        }
        console.log('ress', res);
      })
      .catch(error => {
        console.log('erorr', error);
        ShowToast(
          error?.response?.data?.message ||
            error?.message ||
            'Some Problem Occured',
        );
      });
  }, []);
  useEffect(() => {
    const addOnIds = selectedAddOns?.map(item => item._id); // extract IDs

    const payload = {
      serviceId: id,
    };
    if (addOnIds?.length > 0) {
      payload.addOn = JSON.stringify(addOnIds);
    }

    if (selectedGender && selectedGender !== 'No Preference') {
      payload.gender = selectedGender; // ✅ conditionally add gender
    }

    searchTherapist(payload)
      .unwrap()
      .then(res => {
        if (!res?.success) {
          ShowToast(res?.message);
        }
        console.log('ress', res);
      })
      .catch(error => {
        console.log('error', error);
        ShowToast(
          error?.response?.data?.message ||
            error?.message ||
            'Some Problem Occured',
        );
      });
  }, [selectedAddOns, selectedGender]);
  return (
    <Container>
      {isLoading ? (
        <View
          style={{
            // flex: 1,
            height: responsiveHeight(100),
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ActivityIndicator size={50} color={AppColors.BLACK} />
        </View>
      ) : (
        <View>
          <AppHeader onBackPress={true} heading={data?.data?.serviceName} />
          <Image
            source={{ uri: `${IMAGE_URL}${data?.data?.serviceImage}` }}
            style={{
              width: responsiveWidth(100),
              height: responsiveHeight(28),
              resizeMode: 'stretch',
            }}
          />
          <LineBreak space={2} />
          <View style={{ paddingHorizontal: responsiveWidth(4) }}>
            <AppText
              title={data?.data?.description}
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
            {data?.data?.sessionDuration && (
              <AppText
                title={'Without massage treatment'}
                textColor={AppColors.GRAY}
                textSize={1.8}
              />
            )}
            {data?.data?.sessionDuration && <LineBreak space={1} />}

            <FlatList
              data={data?.data?.sessionDuration}
              numColumns={2}
              columnWrapperStyle={{ justifyContent: 'space-between' }}
              ItemSeparatorComponent={<LineBreak space={2} />}
              renderItem={({ item, index }) => (
                <SessionDuration
                  title={`${item?.duration}\n($${item?.perPersonPrice} per person)-`}
                  index={index}
                  textwidth={34}
                  onPress={() => setSelectedSession(item)}
                  isSelected={selectedSession?._id == item?._id}
                />
              )}
            />

            {/* {sessionDurationSubtitleExtra[heading] && <LineBreak space={2} />}

        {sessionDurationSubtitleExtra[heading] && (
          <AppText
            title={sessionDurationSubtitleExtra[heading]}
            textColor={AppColors.GRAY}
            textSize={1.8}
          />
        )}

        {sessionDurationSubtitleExtra[heading] && <LineBreak space={2} />}

        <FlatList
          data={sessionDurationExtra[heading]}
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
        /> */}

            {groupServices.includes(serviceName) && (
              <>
                <LineBreak space={2} />

                <AppText
                  title="Group Size"
                  textColor={AppColors.BLACK}
                  textSize={2}
                  textFontWeight
                />

                <LineBreak space={1} />

                <FlatList
                  data={[2, 4, 6, 8]}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  ItemSeparatorComponent={<LineBreak space={2} />}
                  ListFooterComponent={<LineBreak space={2} />}
                  contentContainerStyle={{ gap: responsiveWidth(4) }}
                  renderItem={({ item, index }) => (
                    <SessionDuration
                      title={item}
                      index={index}
                      textSize={3}
                      containerWidth={20}
                      onPress={() => setGroupSize(item)}
                      isSelected={groupSize == item}
                    />
                  )}
                />
              </>
            )}

            {data?.data?.addOnServices?.length && <LineBreak space={2} />}

            {data?.data?.addOnServices?.length && (
              <AppText
                title={'Options and Add-ons'}
                textColor={AppColors.BLACK}
                textSize={2}
                textFontWeight
              />
            )}
            <LineBreak space={1} />

            {data?.data?.addOnServices?.length && (
              <FlatList
                data={data?.data?.addOnServices}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                ListFooterComponent={<LineBreak space={2} />}
                ItemSeparatorComponent={<LineBreak space={2} />}
                renderItem={({ item, index }) => (
                  <SessionDuration
                    title={`${item?.name}\n(+$${item?.perPersonPrice} per Person)`}
                    index={index}
                    textwidth={40}
                    onPress={() => handleSelectAddOn(item)}
                    isSelected={selectedAddOns.some(i => i._id === item._id)}
                  />
                )}
              />
            )}

            {/* {heading === 'Facial' && (
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
        )} */}

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
                  onPress={() => setSelectedGender(item?.title)}
                  isSelected={selectedGender == item?.title}
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
                  onPress={() => {
                    setIsCheckedProvider(prev => {
                      const newState = !prev;

                      if (newState) {
                        // ✅ Checkbox is now checked → store all therapist IDs
                        setSelectedTherapistId(
                          searchedData?.data?.map(item => item._id),
                        );
                      } else {
                        // ✅ Checkbox is now unchecked → clear the list first
                        setSelectedTherapistId([]);
                      }

                      return newState;
                    });
                  }}
                >
                  <SVGXml
                    icon={
                      isCheckedProvider ? AppIcons.check : AppIcons.un_check
                    }
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
                data={searchedData?.data}
                paddingHorizontal={-1}
                selectedTherapist={selectedTherapistId}
                disabledSelection={isCheckedProvider === false}
                onPress={therapistId => {
                  // Only store a single therapist when checkbox is unchecked
                  if (!isCheckedProvider) {
                    setSelectedTherapistId(therapistId);
                    if (!selectedSession) {
                      return ShowToast('Plz Choose Your Preferred Session!');
                    } else if (!selectedDate) {
                      return ShowToast('Plz Choose A Date!');
                    } else if (!selectedTime) {
                      return ShowToast('Plz Choose Appointment Time!');
                    }
                    nav.navigate('ShopDetails', {
                      data: {
                        serviceId: id,
                        serviceName: data?.data?.serviceName,
                        therapist: therapistId,
                        groupSize,
                        isDirectRequest: true,
                        date: moment(selectedDate).format('DD-MM-YYYY'),
                        time: selectedTime,
                        session: selectedSession,
                        addOn: selectedAddOns,
                      },
                    });
                  }
                }}
                // onPress={() => nav.navigate('ShopDetails')}
              />
            )}

            {!isCheckedProvider && <LineBreak space={3} />}

            {/* {heading === 'Corporate Chair Massage' && (
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
            )} */}

            {isCheckedProvider && (
              <AppButton
                title="Next"
                textColor={AppColors.WHITE}
                btnBackgroundColor={AppColors.appGreen}
                handlePress={() => {
                  if (!selectedSession) {
                    return ShowToast('Plz Choose Your Preferred Session!');
                  } else if (!selectedDate) {
                    return ShowToast('Plz Choose A Date!');
                  } else if (!selectedTime) {
                    return ShowToast('Plz Choose Appointment Time!');
                  }
                  nav.navigate('LocationInformation', {
                    data: {
                      serviceId: id,
                      serviceName: data?.data?.serviceName,
                      therapist: selectedTherapistId,
                      groupSize,
                      isDirectRequest: false,
                      date: moment(selectedDate).format('DD-MM-YYYY'),
                      time: selectedTime,
                      session: selectedSession,
                      addOn: selectedAddOns,
                    },
                  });
                }}
                textFontWeight={false}
              />
            )}
            <LineBreak space={4} />
          </View>
        </View>
      )}
    </Container>
  );
};

export default MassageCategories;
