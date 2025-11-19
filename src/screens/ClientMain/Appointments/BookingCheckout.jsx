/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  ImageBackground,
  FlatList,
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
import AppText from '../../../components/AppTextComps/AppText';
import LineBreak from '../../../components/LineBreak';
import SVGXml from '../../../components/SVGXML';
import { AppIcons } from '../../../assets/icons';
import Feather from 'react-native-vector-icons/Feather';
import AppButton from '../../../components/AppButton';
import { useNavigation } from '@react-navigation/native';
import AppTextInput from '../../../components/AppTextInput';
import moment from 'moment';
import { useCreateBookingRequestMutation } from '../../../redux/services/MainIntegration';
import { useSelector } from 'react-redux';

const BookingCheckout = ({ route }) => {
  const nav = useNavigation();
  const {
    addOn,
    address,
    appartment,
    city,
    date,
    fullName,
    notes,
    number,
    serviceId,
    serviceName,
    session,
    state,
    therapist,
    therapistName,
    time,
    zipCode,
    groupSize,
    isDirectRequest,
  } = route?.params?.data;
  console.log('first', route?.params);
  const subtotal =
    Number(session?.perPersonPrice || 0) +
    addOn.reduce((sum, item) => sum + Number(item?.perPersonPrice || 0), 0);
  const groupSuffix = groupSize > 1 ? ` (${groupSize}x)` : '';
  const [createBookingRequest, { data, isLoading, isError }] =
    useCreateBookingRequestMutation();
  const { _id, phoneNumber } = useSelector(state => state?.persistedData?.user);
  console.log('phoneNumber', phoneNumber);
  const checkoutPart1 = [
    {
      id: 1,
      title: 'Date',
      subTitle: moment(date, 'DD-MM-YYYY').format('MMMM, Do YYYY'),
    },
    { id: 2, title: 'Start Time', subTitle: time },
    { id: 3, title: 'Specialist', subTitle: therapistName || 'Any' },
    { id: 4, title: 'Duration', subTitle: session?.duration },
    {
      id: 5,
      title: 'Per Person Price',
      subTitle: `$${session?.perPersonPrice}`,
    },
  ];
  const checkoutPart2 = [
    {
      id: 1,
      title: `${serviceName}${groupSuffix}`,
      subTitle: `$${session?.perPersonPrice * groupSize}`,
    },
    ...addOn?.map((item, index) => ({
      id: `addon-${index}`,
      title: `${item.name}${groupSuffix}`,
      subTitle: `$${item.perPersonPrice * groupSize}`,
    })),
    {
      id: 'subtotal',
      title: 'Sub Total',
      subTitle: `$${subtotal * groupSize}`,
    },
    {
      id: 'discount',
      title: 'Discount',
      subTitle: '0',
    },
  ];

  const createBookingHandler = async () => {
    const requestData = {};

    // Required
    if (fullName) requestData.fullName = fullName;
    if (_id) requestData.userId = _id;

    if (therapist) {
      // therapistKey = therapistId OR allTherapistId dynamically
      const therapistKey = isDirectRequest ? 'therapistId' : 'allTherapistId';
      requestData[therapistKey] = therapist;
    }

    if (serviceId) requestData.serviceId = serviceId;
    if (date) requestData.date = date;
    if (time) requestData.time = time;

    if (notes) requestData.notes = notes;

    // Session duration (always required?)
    if (session?.perPersonPrice && session?.duration) {
      requestData.sessionDuration = [
        {
          perPersonPrice: JSON.stringify(session.perPersonPrice),
          duration: session.duration,
        },
      ];
    }

    // AddOns only if selected
    if (addOn?.length > 0) {
      requestData.addOn = addOn.map(item => item._id);
    }

    // Address info only if user filled
    if (address) requestData.address = address;
    if (appartment) requestData.appartment = appartment;
    if (city) requestData.city = city;
    if (state) requestData.state = state;
    if (zipCode) requestData.zipCode = zipCode;

    // Phone number
    const finalNumber = number || phoneNumber;
    if (finalNumber) requestData.phoneNumber = finalNumber;

    // Location (static right now — remove if backend doesn’t need)
    requestData.latitude = 40.758;
    requestData.longitude = 73.9855;
    requestData.locationName = 'Times Square, NYC';

    // groupSize check
    if (subtotal && groupSize) {
      requestData.totalAmount = subtotal * groupSize;
    }

    console.log('Final Request Data:', requestData);

    try {
      const res = await createBookingRequest(requestData).unwrap();

      ShowToast(res.message);

      if (res.success) {
        nav.navigate('Main');
      }
    } catch (error) {
      console.log('Booking Error:', error);
      ShowToast('Some problem occurred');
    }
  };

  return (
    <Container>
      <AppHeader onBackPress={true} heading={'Booking Checkout'} />
      <ImageBackground
        source={AppImages.checkout_bg}
        imageStyle={{ borderRadius: 15 }}
        style={{
          paddingHorizontal: responsiveWidth(6),
          paddingVertical: responsiveHeight(2),
          width: responsiveWidth(90),
          height: responsiveHeight(60),
          alignSelf: 'center',
        }}
      >
        <View>
          <FlatList
            data={checkoutPart1}
            numColumns={2}
            columnWrapperStyle={{ gap: 20 }}
            ItemSeparatorComponent={<LineBreak space={1} />}
            renderItem={({ item }) => (
              <View style={{ width: responsiveWidth(45) }}>
                <AppText
                  title={item.title}
                  textColor={AppColors.BLACK}
                  textSize={1.8}
                />
                <LineBreak space={1} />
                <AppText
                  title={item.subTitle}
                  textColor={AppColors.ThemeBlue}
                  textSize={1.8}
                  textFontWeight
                />
              </View>
            )}
          />
        </View>

        <View
          style={{
            width: responsiveWidth(78),
            height: responsiveHeight(0.2),
            backgroundColor: AppColors.LIGHTGRAY,
            marginVertical: responsiveHeight(2),
          }}
        />

        <AppText
          title={'Service'}
          textColor={AppColors.BLACK}
          textSize={1.8}
          textAlignment={'center'}
        />

        <LineBreak space={1} />

        <View>
          <FlatList
            data={checkoutPart2}
            renderItem={({ item, index }) => {
              const addonCount = addOn?.length || 0;
              const isService = item.id === 1; // first item is service
              const isLastAddon = item.id === `addon-${addonCount - 1}`;
              const showSeparator =
                (isService && addonCount === 0) ||
                (addonCount > 0 && isLastAddon);
              return (
                <>
                  {item.id !== 3 && <LineBreak space={1} />}
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}
                  >
                    <AppText
                      title={item.title}
                      textColor={AppColors.BLACK}
                      textSize={1.8}
                    />
                    <AppText
                      title={item.subTitle}
                      textColor={AppColors.ThemeBlue}
                      textSize={1.8}
                      textFontWeight
                    />
                  </View>
                  {showSeparator && (
                    <View
                      style={{
                        width: responsiveWidth(78),
                        height: responsiveHeight(0.2),
                        backgroundColor: AppColors.LIGHTGRAY,
                        marginVertical: responsiveHeight(2),
                      }}
                    />
                  )}
                </>
              );
            }}
          />
        </View>

        <LineBreak space={1} />

        {/* <AppText
          title={'Promo Code'}
          textColor={AppColors.BLACK}
          textSize={1.8}
          textAlignment={'center'}
        />
        <LineBreak space={1} />

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View>
            <AppTextInput
              inputPlaceHolder={'A1B2C3'}
              isFocused={true}
              containerBg={'transparent'}
              inputHeight={4}
              fontSize={1.5}
              inputWidth={38}
            />
          </View>
          <AppButton
            title="Apply Now"
            textColor={AppColors.WHITE}
            btnBackgroundColor={AppColors.ThemeBlue}
            handlePress={() => {}}
            btnWidth={25}
            btnPadding={4}
            textSize={1.5}
            textFontWeight={false}
          />
        </View> */}

        <View
          style={{
            width: responsiveWidth(78),
            height: responsiveHeight(0.2),
            backgroundColor: AppColors.LIGHTGRAY,
            marginVertical: responsiveHeight(1),
          }}
        />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <AppText title={'Total'} textColor={AppColors.BLACK} textSize={1.8} />
          <AppText
            title={`$${subtotal * groupSize}`}
            textColor={AppColors.ThemeBlue}
            textSize={1.8}
            textFontWeight
          />
        </View>

        <LineBreak space={3} />

        {/* <View
          style={{
            borderWidth: 1,
            borderColor: AppColors.ThemeBlue,
            paddingHorizontal: responsiveWidth(6),
            paddingVertical: responsiveHeight(1.5),
            borderRadius: 100,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 25 }}>
            <SVGXml icon={AppIcons.master_card} width={40} height={40} />
            <View>
              <AppText
                title={'Samantha Martin'}
                textColor={AppColors.BLACK}
                textSize={1.8}
                textFontWeight
              />
              <LineBreak space={0.5} />
              <AppText
                title={'3124325***'}
                textColor={AppColors.GRAY}
                textSize={1.8}
              />
            </View>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <Feather
                name="chevron-right"
                size={responsiveFontSize(3)}
                color={AppColors.ThemeBlue}
              />
            </View>
          </View>
        </View> */}
      </ImageBackground>
      <LineBreak space={3} />
      <View style={{ paddingHorizontal: responsiveWidth(4) }}>
        <AppButton
          title={
            isLoading ? (
              <ActivityIndicator size={'large'} color={AppColors.WHITE} />
            ) : (
              'Pay Now'
            )
          }
          textColor={AppColors.WHITE}
          btnBackgroundColor={AppColors.appGreen}
          handlePress={createBookingHandler}
          textFontWeight={false}
        />
      </View>
    </Container>
  );
};

export default BookingCheckout;
