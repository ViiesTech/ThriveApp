/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import { View, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { AppColors, responsiveFontSize, responsiveHeight, responsiveWidth } from '../utils'
import AppText from './AppTextComps/AppText'
import LineBreak from './LineBreak'
import AppButton from './AppButton'
import { useNavigation } from '@react-navigation/native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';

type Prop = {
    data?: [];
    shopDetail?: any;
    providerHome?: any;
    userRequest?: any;
    isSpecialist?: any;
    ongoingAppointments?: any;
    isUser?: any
}

const AppointmentsCard = ({ data, shopDetail, providerHome, userRequest, isSpecialist, ongoingAppointments, isUser }: Prop) => {
    const nav = useNavigation();
    return (
        <View>
            <FlatList
                data={data}
                contentContainerStyle={{ paddingHorizontal: responsiveWidth(4) }}
                renderItem={({ item }) => (
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
                                title={item.title}
                                textColor={AppColors.ThemeBlue}
                                textSize={1.6}
                                textFontWeight
                            />

                            <View
                                style={{
                                    backgroundColor: item.status === 'Available' ? AppColors.lightestBlue : providerHome || isSpecialist ? AppColors.ThemeBlue : AppColors.appGreen,
                                    paddingHorizontal: responsiveWidth(4),
                                    paddingVertical: responsiveHeight(0.7),
                                    borderTopLeftRadius: 20,
                                    borderBottomLeftRadius: 20,
                                }}
                            >
                                <AppText
                                    title={item.status}
                                    textColor={item.status === 'Available' ? AppColors.ThemeBlue : AppColors.WHITE}
                                    textSize={1.6}
                                    textFontWeight={item.status === 'Available' ? true : false}
                                />
                            </View>
                        </View>

                        <LineBreak space={1} />

                        <View style={{ flexDirection: 'row', gap: 10 }}>
                            <Image source={item.image} style={{ width: 40, height: 40, borderRadius: 100 }} />

                            <View>
                                <AppText
                                    title={item.name}
                                    textColor={AppColors.BLACK}
                                    textSize={1.8}
                                    textFontWeight
                                />
                                <AppText
                                    title={item.location}
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
                                            title={`(${item.service})`}
                                            textColor={AppColors.GRAY}
                                            textSize={1.5}
                                        />
                                    </AppText>
                                    {item.date && <AppText
                                        title={'Date: '}
                                        textColor={AppColors.ThemeBlue}
                                        textSize={1.5}
                                    >
                                        <AppText
                                            title={`(${item.date})`}
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

                        {item.status === 'Ongoing' || userRequest || item.status === 'In Progress' || providerHome ? <LineBreak space={2} /> : null}

                        {item.status === 'Ongoing' && isUser || item.status === 'In Progress' || providerHome ? <View style={item.status === 'Ongoing' || item.status === 'In Progress' || providerHome ? { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' } : null}>
                            {item.appointmentStatus && <AppText
                                title={'Status: '}
                                textColor={AppColors.ThemeBlue}
                                textSize={1.6}
                                textFontWeight
                                textwidth={30}
                            >
                                <AppText
                                    title={item.appointmentStatus}
                                    textColor={AppColors.BLACK}
                                    textSize={1.6}
                                />
                            </AppText>}

                            <View style={{ paddingRight: responsiveWidth(4) }}>
                                <AppButton
                                    title={item.status !== 'In Progress' && providerHome ? "Start Appointment" : "Complete"}
                                    textColor={AppColors.WHITE}
                                    btnBackgroundColor={AppColors.appGreen}
                                    handlePress={() => nav.navigate('ServiceFeedback')}
                                    btnWidth={item.status === 'In Progress' || providerHome ? 82 : 32}
                                    btnPadding={item.status === 'In Progress' || providerHome ? 10 : 5}
                                    textSize={1.6}
                                    textFontWeight={false}
                                />
                            </View>
                        </View> : null}

                        {
                            userRequest && (
                                <View style={{ flexDirection: 'row', paddingRight: responsiveWidth(4), justifyContent: 'space-between', alignItems: 'center' }}>
                                    <AppButton
                                        title={"ACCEPT"}
                                        textColor={AppColors.WHITE}
                                        btnBackgroundColor={AppColors.appGreen}
                                        handlePress={() => { }}
                                        btnWidth={38}
                                        btnPadding={7}
                                        textSize={1.6}
                                        textFontWeight={false}
                                    />
                                    <AppButton
                                        title={"REJECT"}
                                        textColor={AppColors.WHITE}
                                        btnBackgroundColor={AppColors.DARK_RED}
                                        handlePress={() => { }}
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
                                <View style={{ flexDirection: 'row', paddingRight: responsiveWidth(4), justifyContent: 'space-between', alignItems: 'center' }}>
                                    <AppButton
                                        title={"ON MY WAY"}
                                        textColor={AppColors.WHITE}
                                        btnBackgroundColor={AppColors.ThemeBlue}
                                        handlePress={() => { }}
                                        btnWidth={38}
                                        btnPadding={7}
                                        textSize={1.6}
                                        textFontWeight={false}
                                    />
                                    <AppButton
                                        title={"COMPLETE"}
                                        textColor={AppColors.WHITE}
                                        btnBackgroundColor={AppColors.appGreen}
                                        handlePress={() => nav.navigate('ServiceFeedback')}
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