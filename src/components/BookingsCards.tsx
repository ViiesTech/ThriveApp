/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react'
import { View, FlatList, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import { AppColors, responsiveFontSize, responsiveHeight, responsiveWidth, ShowToast } from '../utils'
import AppText from './AppTextComps/AppText'
import LineBreak from './LineBreak'
import AppButton from './AppButton'
import { useNavigation } from '@react-navigation/native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { IMAGE_URL } from '../redux/constant'
import { useUpdateBookingStatusMutation } from '../redux/services/MainIntegration'
import { useSelector } from 'react-redux'

type Prop = {
  data?: [];
  shopDetail?: any;
  providerHome?: any;
  userRequest?: any;
  isSpecialist?: any;
  ongoingAppointments?: any;
  isUser?: any;
  onRefresh?: () => void;
  isLoading?: boolean;
  isOpen?: boolean;
  isRequest?: boolean;
  currentBookingStatus?: string;
}

const BookingsCards = ({ data, isRequest, currentBookingStatus, isLoading, shopDetail, onRefresh, providerHome, userRequest, isSpecialist, ongoingAppointments, isUser, isOpen }: Prop) => {
  const nav = useNavigation();
  const [buttonLoading, setButtonLoading] = useState(null);
  const [updateBookingStatus, { isError }] = useUpdateBookingStatusMutation();
  const { _id } = useSelector(state => state?.persistedData?.user);
  console.log('ongoingAppointments', ongoingAppointments)
  console.log('data', data)
  console.log('userRequest', userRequest)
  const AcceptRejectHandler = async ({ id, type }) => {
    // set which button is loading
    setButtonLoading(`${type}-${id}`);

    let updateData = {
      bookingId: id,
      bookingStatus: type,
    };
    if (isOpen) {
      updateData.therapistId = _id
    }

    await updateBookingStatus(updateData)
      .unwrap()
      .then(res => {
        console.log('res', res)
        ShowToast(res.message);

        // clear loading
        setButtonLoading(null);

        if (res.success) {
          if (onRefresh) onRefresh();
          // nav.navigate('Main', { screen: 'Appointments' });
        }
      })
      .catch(error => {
        console.log('err', error);
        ShowToast('Some problem occured');

        // clear loading
        setButtonLoading(null);
      });
  };
  // const UpdateBookingStatusHandler = async ({ id, type, therapistStatus }) => {
  //   // set which button is loading
  //   console.log('id', id)
  //   console.log('type', type);
  //   console.log('therapistStatus', therapistStatus);
  //   setButtonLoading(`${type}-${id}`);

  //   let updateData = {
  //     bookingId: id,
  //     // bookingStatus: type,
  //   };
  //   if (type === 'Completed') {
  //     updateData.bookingStatus = type
  //   }
  //   if (therapistStatus) {
  //     updateData.therapistStatus = therapistStatus;
  //   }

  //   await updateBookingStatus(updateData)
  //     .unwrap()
  //     .then(res => {
  //       console.log('ress', res);
  //       ShowToast(res.message);
  //       setButtonLoading(null);
  //       if (res.success) {
  //         if (onRefresh) onRefresh();
  //         // nav.navigate('Main', { screen: 'Appointments' });
  //       }
  //     })
  //     .catch(err => {
  //       ShowToast('Some problem occured');
  //       setButtonLoading(null);
  //     });
  // };


  const UpdateBookingStatusHandler = async ({ id, type, therapistStatus, buttonKey }) => {
    setButtonLoading(buttonKey || `${type}-${id}`);

    let updateData = { bookingId: id };
    if (type === 'Completed') updateData.bookingStatus = type;
    if (therapistStatus) updateData.therapistStatus = therapistStatus;
    console.log('updaaaa', updateData);

    try {
      const res = await updateBookingStatus(updateData).unwrap();
      ShowToast(res.message);
      setButtonLoading(null);
      console.log('ress', res)
      if (res.success && onRefresh) onRefresh();
    } catch (err) {
      ShowToast('Some problem occured');
      setButtonLoading(null);
    }
  };
  const getButtonTitle = (bookingStatus, therapistStatus) => {
    if (bookingStatus !== "Accepted") return null;

    switch (therapistStatus) {
      case "Upcoming": return "On My Way";
      case "EnRoute": return "Arrive";
      case "Arrive": return "Complete";
      default: return null;
    }
  };

  const getNextStatus = (therapistStatus) => {
    switch (therapistStatus) {
      case "Upcoming": return { therapistStatus: "EnRoute" };
      case "EnRoute": return { therapistStatus: "Arrive" };
      case "Arrive": return { bookingStatus: "Completed" };
      default: return {};
    }
  };

  return (
    <View>
      {isLoading ? (
        <View style={{ height: responsiveHeight(70), justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size={'large'} color={AppColors.BLACK} />
        </View>
      ) : data?.length > 0 ? (
        <View>
          <FlatList
            data={data}
            contentContainerStyle={{ paddingHorizontal: responsiveWidth(4) }}
            renderItem={({ item, index }) => (
              <View
                style={{
                  backgroundColor: AppColors.WHITE,
                  elevation: 5,
                  borderRadius: 15,
                  marginVertical: responsiveHeight(1),
                  paddingVertical: responsiveHeight(2.5),
                  paddingLeft: responsiveWidth(5),
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <AppText
                    title={`Appointment # ${index + 1}`}
                    textColor={AppColors.ThemeBlue}
                    textSize={1.6}
                    textFontWeight
                  />

                  <View
                    style={{
                      backgroundColor: item?.bookingStatus === 'Available' ? AppColors.lightestBlue : providerHome || isSpecialist || userRequest ? AppColors.ThemeBlue : AppColors.appGreen,
                      paddingHorizontal: responsiveWidth(4),
                      paddingVertical: responsiveHeight(0.7),
                      borderTopLeftRadius: 20,
                      borderBottomLeftRadius: 20,
                    }}
                  >
                    <AppText
                      title={
                        item?.bookingStatus === 'Completed'
                          ? 'Completed'
                          : item?.bookingStatus === 'Accepted' && item?.therapistStatus === 'Upcoming'
                            ? 'Upcoming' : item?.bookingStatus === 'Accepted' && item?.therapistStatus !== 'Upcoming' && providerHome ?
                              'In Progress' : 'Ongoing'
                      } textColor={item?.bookingStatus === 'Available' ? AppColors.ThemeBlue : AppColors.WHITE}
                      textSize={1.6}
                      textFontWeight={item?.bookingStatus === 'Available' ? true : false}
                    />
                  </View>
                </View>

                <LineBreak space={1} />

                <View style={{ flexDirection: 'row', gap: 10 }}>
                  <Image source={{ uri: `${IMAGE_URL}${isSpecialist || isRequest ? item?.userId?.image : item?.therapistId?.image}` }} style={{ width: 40, height: 40, borderRadius: 100 }} />

                  <View>
                    <AppText
                      title={isSpecialist || isRequest ? item?.userId?.fullName : item?.therapistId?.fullName}
                      textColor={AppColors.BLACK}
                      textSize={1.8}
                      textFontWeight
                    />
                    <AppText
                      title={isSpecialist || isRequest ? item?.address || item?.userId?.location?.locationName : item?.therapistId?.location?.locationName}
                      textColor={AppColors.GRAY}
                      textSize={1.5}
                    />

                    <LineBreak space={1.5} />

                    {!shopDetail && <View
                      style={{
                        flexDirection: 'row',
                        gap: 20,
                        alignItems: 'center',
                      }}
                    >
                      <AppText
                        title={'Service: '}
                        textColor={AppColors.ThemeBlue}
                        textSize={1.5}
                      >
                        <AppText
                          title={`(${item?.serviceId?.serviceName})`}
                          textColor={AppColors.GRAY}
                          textSize={1.5}
                        />
                      </AppText>
                      {item?.date && <AppText
                        title={'Date: '}
                        textColor={AppColors.ThemeBlue}
                        textSize={1.5}
                      >
                        <AppText
                          title={`(${item?.date})`}
                          textColor={AppColors.GRAY}
                          textSize={1.5}
                        />
                      </AppText>}
                    </View>}

                    {shopDetail && <View
                      style={{
                        flexDirection: 'row',
                        gap: 20,
                        alignItems: 'center',
                      }}
                    >
                      <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
                        <AntDesign
                          name="star"
                          size={responsiveFontSize(1.5)}
                          color={AppColors.Yellow}
                        />
                        <AppText
                          title={item.rating}
                          textColor={AppColors.BLACK}
                          textSize={1.5}
                          textFontWeight
                        >{" "}
                          <AppText
                            title={`(${item.number})`}
                            textColor={AppColors.GRAY}
                            textSize={1.5}
                          />
                        </AppText>
                      </View>
                      <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
                        <FontAwesome5
                          name="tag"
                          size={responsiveFontSize(1.5)}
                          color={AppColors.ThemeBlue}
                        />
                        <AppText
                          title={item.label}
                          textColor={AppColors.ThemeBlue}
                          textSize={1.5}
                          textFontWeight
                        >
                          <AppText
                            title={item.tex}
                            textColor={AppColors.BLACK}
                            textSize={1.5}
                          />
                        </AppText>
                      </View>
                    </View>}
                  </View>
                </View>

                {shopDetail && <LineBreak space={2} />}

                {shopDetail &&
                  <View style={{ flexDirection: 'row', paddingRight: responsiveWidth(4), justifyContent: 'space-between', alignItems: 'center' }}>
                    <TouchableOpacity style={styles.iconContainer} onPress={() => nav.navigate("PrivateInbox")}>
                      <Ionicons
                        name="chatbubble-ellipses-sharp"
                        size={responsiveFontSize(3)}
                        color={AppColors.ThemeBlue}
                      />
                    </TouchableOpacity>
                    <AppButton
                      title="Book Now"
                      textColor={AppColors.WHITE}
                      btnBackgroundColor={AppColors.ThemeBlue}
                      handlePress={() => nav.navigate('LocationInformation')}
                      btnWidth={65}
                      textFontWeight={false}
                    />
                  </View>
                }

                {item?.bookingStatus === 'Ongoing' || userRequest || item?.bookingStatus === 'In Progress' || providerHome ? <LineBreak space={2} /> : null}

                {/* {item?.therapistStatus && isUser || item?.bookingStatus === 'In Progress' || providerHome ? <View style={item?.bookingStatus === 'Ongoing' || item.status === 'In Progress' || providerHome ? { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' } : null}> */}
                {item?.therapistStatus && item?.bookingStatus === 'Accepted' && isUser &&
                  <View style={{ marginTop: responsiveHeight(1.5) }}>
                    <AppText
                      title={'Status: '}
                      textColor={AppColors.ThemeBlue}
                      textSize={1.6}
                      textFontWeight
                      textwidth={30}
                    >
                      <AppText
                        title={item?.therapistStatus}
                        textColor={AppColors.BLACK}
                        textSize={1.6}
                      />
                    </AppText>
                  </View>
                }
                {
                  item?.bookingStatus === 'Completed' && isUser ? (
                    <View style={{ flexDirection: 'row', paddingRight: responsiveWidth(4), marginTop: responsiveHeight(2), justifyContent: 'space-between', alignItems: 'center' }}>
                      <AppButton
                        title="Give Feedback"
                        textColor={AppColors.WHITE}
                        btnBackgroundColor={AppColors?.ThemeBlue}
                        handlePress={() => nav.navigate('ServiceFeedback', { therapistId: item?.therapistId?._id })}
                        btnWidth={82}
                        btnPadding={8}
                        textSize={1.6}
                        textFontWeight={false}
                      />
                    </View>
                  ) : null
                }
                {/* {item?.bookingStatus === 'Completed' && isUser &&
                  <View style={{ marginTop: responsiveHeight(1.5) }}>
                    <AppText
                      title={'Status: '}
                      textColor={AppColors.ThemeBlue}
                      textSize={1.6}
                      textFontWeight
                      textwidth={30}
                    >
                      <AppText
                        title={item?.therapistStatus}
                        textColor={AppColors.BLACK}
                        textSize={1.6}
                      />
                    </AppText>
                  </View>
                } */}
                {providerHome && item.bookingStatus === "Accepted" && (
                  <View style={{ paddingRight: responsiveWidth(4) }}>
                    <AppButton
                      title={
                        buttonLoading === `provider-${item._id}`
                          ? <ActivityIndicator size="small" color={AppColors.WHITE} />
                          : getButtonTitle(item.bookingStatus, item.therapistStatus)
                      }
                      textColor={AppColors.WHITE}
                      btnBackgroundColor={AppColors.appGreen}
                      handlePress={() => {
                        const next = getNextStatus(item.therapistStatus);
                        UpdateBookingStatusHandler({
                          id: item._id,
                          type: next.bookingStatus || null,
                          therapistStatus: next.therapistStatus || null,
                          buttonKey: `provider-${item._id}`, // UNIQUE key for this button
                        });
                      }}
                      btnWidth={82}
                      btnPadding={10}
                      textSize={1.6}
                    />
                  </View>
                )}

                {/* </View> : null} */}

                {
                  userRequest && (
                    <View style={{ flexDirection: 'row', paddingRight: responsiveWidth(4), justifyContent: 'space-between', alignItems: 'center' }}>
                      <AppButton
                        title={
                          buttonLoading === `Accepted-${item?._id}`
                            ? <ActivityIndicator size={'small'} color={AppColors.WHITE} />
                            : "ACCEPT"
                        } textColor={AppColors.WHITE}
                        btnBackgroundColor={AppColors.appGreen}
                        // handlePress={() => nav.navigate('Main', { screen: 'Appointments' })}
                        handlePress={() => AcceptRejectHandler({ id: item?._id, type: 'Accepted' })}
                        btnWidth={38}
                        btnPadding={7}
                        textSize={1.6}
                        textFontWeight={false}
                      />
                      <AppButton
                        title={
                          buttonLoading === `Rejected-${item?._id}`
                            ? <ActivityIndicator size={'small'} color={AppColors.WHITE} />
                            : "REJECT"
                        }
                        textColor={AppColors.WHITE}
                        btnBackgroundColor={AppColors.theme_red}
                        // handlePress={() => nav.navigate('Main', { screen: 'ProviderHome' })}
                        handlePress={() => AcceptRejectHandler({ id: item?._id, type: 'Rejected' })}
                        btnWidth={38}
                        btnPadding={7}
                        textSize={1.6}
                        textFontWeight={false}
                      />
                    </View>
                  )
                }

                {
                  isSpecialist && ongoingAppointments ? (
                    <View style={{ flexDirection: 'row', paddingRight: responsiveWidth(4), marginTop: responsiveHeight(2), justifyContent: 'space-between', alignItems: 'center' }}>
                      <AppButton
                        title={
                          buttonLoading === `Accepted-${item?._id}`
                            ? <ActivityIndicator size="small" color={AppColors.WHITE} />
                            : item?.therapistStatus === "Upcoming"
                              ? "ON MY WAY"
                              : item?.therapistStatus === "EnRoute"
                                ? "Arrived"
                                : null
                        } textColor={AppColors.WHITE}
                        btnBackgroundColor={AppColors.ThemeBlue}
                        // handlePress={() => nav.navigate('Main', { screen: 'ProviderHome' })}
                        handlePress={() => UpdateBookingStatusHandler({ id: item?._id, type: 'Accepted', therapistStatus: item?.therapistStatus === "Upcoming" ? "EnRoute" : item?.therapistStatus === "EnRoute" ? "Arrive" : null })}
                        btnWidth={38}
                        disabled={item?.therapistStatus === 'Arrive'}
                        btnPadding={7}
                        textSize={1.6}
                        textFontWeight={false}
                      />
                      <AppButton

                        title={
                          buttonLoading === `Completed-${item?._id}`
                            ? <ActivityIndicator size="small" color={AppColors.WHITE} />
                            : "COMPLETE"
                        } textColor={AppColors.WHITE}
                        btnBackgroundColor={AppColors.appGreen}
                        // handlePress={() => nav.navigate('ServiceFeedback')}
                        handlePress={() => UpdateBookingStatusHandler({ id: item?._id, type: 'Completed', therapistStatus: 'Arrive' })}
                        btnWidth={38}
                        btnPadding={7}
                        textSize={1.6}
                        textFontWeight={false}
                      />
                    </View>
                  ) : null
                }
              </View>
            )}
          />
        </View>
      ) : (
        <View style={{ alignItems: 'center', marginTop: responsiveHeight(5) }}>
          <AppText textSize={2.5} textFontWeight title={'No Bookings Found!!'} />
        </View>
      )}

    </View>
  )
}

export default BookingsCards;

const styles = StyleSheet.create({
  iconContainer: {
    width: responsiveHeight(6),
    height: responsiveHeight(6),
    borderWidth: 1,
    borderColor: AppColors.ThemeBlue,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

