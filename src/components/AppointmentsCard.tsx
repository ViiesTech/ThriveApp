/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import { View, FlatList, Image } from 'react-native'
import { AppColors, responsiveFontSize, responsiveHeight, responsiveWidth } from '../utils'
import AppText from './AppTextComps/AppText'
import LineBreak from './LineBreak'
import AppButton from './AppButton'
import { useNavigation } from '@react-navigation/native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

type Prop = {
    data?: [];
    shopDetail?: any;
}

const AppointmentsCard = ({ data, shopDetail }: Prop) => {
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
                                    backgroundColor: item.status === 'Available' ? AppColors.lightestBlue : AppColors.lightGreen,
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
                            <Image source={item.image} style={{ width: 40, height: 40 }} />

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
                                    <AppText
                                        title={'Date: '}
                                        textColor={AppColors.ThemeBlue}
                                        textSize={1.5}
                                    >
                                        <AppText
                                            title={`(${item.date})`}
                                            textColor={AppColors.GRAY}
                                            textSize={1.5}
                                        />
                                    </AppText>
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

                  {shopDetail &&  <LineBreak space={2} />}
                    
                       {shopDetail && <AppButton
                            title="Book Now"
                            textColor={AppColors.WHITE}
                            btnBackgroundColor={AppColors.ThemeBlue}
                            handlePress={() => nav.navigate('ServiceFeedback')}
                            btnWidth={82}
                            textFontWeight={false}
                        />}

                        {item.appointmentStatus && <LineBreak space={2} />}

                        {item.appointmentStatus && <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <AppText
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
                                    textTransform={'uppercase'}
                                />
                            </AppText>

                            <View style={{ paddingRight: responsiveWidth(4) }}>
                                <AppButton
                                    title="COMPLETE"
                                    textColor={AppColors.WHITE}
                                    btnBackgroundColor={AppColors.ThemeBlue}
                                    handlePress={() => nav.navigate('ServiceFeedback')}
                                    btnWidth={32}
                                    btnPadding={5}
                                    textSize={1.6}
                                    textFontWeight={false}
                                />
                            </View>
                        </View>}
                    </View>
                )}
            />
        </View>
    )
}

export default AppointmentsCard