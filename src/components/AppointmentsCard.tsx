/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import { View, FlatList, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import { AppColors, responsiveFontSize, responsiveHeight, responsiveWidth } from '../utils'
import AppText from './AppTextComps/AppText'
import LineBreak from './LineBreak'
import AppButton from './AppButton'
import { useNavigation } from '@react-navigation/native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { IMAGE_URL } from '../redux/constant'

type Prop = {
    data?: [];
    shopDetail?: any;
    providerHome?: any;
    userRequest?: any;
    isSpecialist?: any;
    ongoingAppointments?: any;
    onBookNowPress?: () => void;
    addOns?: any;
    isUser?: any
    isLoading?: boolean
}

const AppointmentsCard = ({ data, onBookNowPress, isLoading, addOns, shopDetail, providerHome, userRequest, isSpecialist, ongoingAppointments, isUser }: Prop) => {
    const nav = useNavigation();
    console.log('data', data)
    return (
        <View
            style={{
                backgroundColor: AppColors.WHITE,
                marginHorizontal: responsiveWidth(4),
                elevation: 5,
                borderRadius: 15,
                // height:responsiveHeight(26.2),
                minHeight: responsiveHeight(20),
                marginVertical: responsiveHeight(1),
                paddingVertical: responsiveHeight(2.5),
                paddingLeft: responsiveWidth(5),
            }}
        >
            {isLoading ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size={'large'} color={AppColors.BLACK} />
                </View>
            ) : (
                <View>


                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}
                    >

                        <View style={{ flexDirection: 'row', }}>
                            <AppText
                                title={`${shopDetail} `}
                                textColor={AppColors.ThemeBlue}
                                textSize={1.6}
                                textFontWeight
                            />
                            {/* {
                                <FlatList horizontal  showsHorizontalScrollIndicator={false} data={addOns} renderItem={({ item }) => {
                                    return (
                                        <>
                                            <AppText
                                                title={`- ${item?.name}`}
                                                textColor={AppColors.ThemeBlue}
                                                textSize={1.6}
                                                textFontWeight
                                            />
                                        </>
                                    )
                                }} />
                            } */}
                        </View>

                        <View
                            style={{
                                // backgroundColor: item.status === 'Available' ? AppColors.lightestBlue : providerHome || isSpecialist || userRequest ? AppColors.ThemeBlue : AppColors.appGreen,
                                backgroundColor: AppColors.lightestBlue,
                                paddingHorizontal: responsiveWidth(4),
                                paddingVertical: responsiveHeight(0.7),
                                borderTopLeftRadius: 20,
                                borderBottomLeftRadius: 20,
                            }}
                        >
                            <AppText
                                // title={item.status}
                                title="Available"
                                // textColor={item.status === 'Available' ? AppColors.ThemeBlue : AppColors.WHITE}
                                textColor={AppColors.ThemeBlue}
                                textSize={1.6}
                                textFontWeight={true}
                            />
                        </View>
                    </View>

                    <LineBreak space={1} />

                    <View style={{ flexDirection: 'row', gap: 10 }}>
                        <Image source={{ uri: `${IMAGE_URL}${data?.image}` }} style={{ width: 40, height: 40, borderRadius: 100 }} />

                        <View>
                            <AppText
                                title={data?.fullName}
                                textColor={AppColors.BLACK}
                                textSize={1.8}
                                textFontWeight
                            />
                            <AppText
                                title={data?.location?.locationName}
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
                                        title={`(${shopDetail})`}
                                        textColor={AppColors.GRAY}
                                        textSize={1.5}
                                    />
                                </AppText>
                                {/* {item.date && <AppText
                                        title={'Date: '}
                                        textColor={AppColors.ThemeBlue}
                                        textSize={1.5}
                                    >
                                        <AppText
                                            title={`(${item.date})`}
                                            textColor={AppColors.GRAY}
                                            textSize={1.5}
                                        />
                                    </AppText>} */}
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
                                        title={data?.avgRating}
                                        textColor={AppColors.BLACK}
                                        textSize={1.5}
                                        textFontWeight
                                    >{" "}
                                        <AppText
                                            title={`(${data?.totalReviews})`}
                                            textColor={AppColors.GRAY}
                                            textSize={1.5}
                                        />
                                    </AppText>
                                </View>
                                {/* <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
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
                                    </View> */}
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
                                handlePress={onBookNowPress}
                                btnWidth={65}
                                textFontWeight={false}
                            />
                        </View>
                    }

                </View>
            )}
        </View>
    )
}

export default AppointmentsCard;

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