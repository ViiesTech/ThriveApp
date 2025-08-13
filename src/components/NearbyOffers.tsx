/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import { View, FlatList, ImageBackground, TouchableOpacity } from 'react-native'
import { AppColors, responsiveFontSize, responsiveHeight, responsiveWidth } from '../utils'
import LineBreak from './LineBreak'
import AppText from './AppTextComps/AppText'
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Octicons from 'react-native-vector-icons/Octicons';
import Feather from 'react-native-vector-icons/Feather';

type Prop = {
    data?: any;
    services?: any;
    showVertical?: any;
    paddingHorizontal?:any;
}

const NearbyOffers = ({ data, services, showVertical, paddingHorizontal }: Prop) => {

    const renderContent = (item: any) => {
        if (services) {
            return (
                <View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <AppText
                            title={item.serviceName}
                            textColor={AppColors.BLACK}
                            textSize={2}
                            textFontWeight
                        />

                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: AppColors.lightestBlue, paddingHorizontal: responsiveWidth(3), paddingVertical: responsiveHeight(0.5), borderRadius: 100, }}>
                            <FontAwesome5
                                name="tag"
                                size={responsiveFontSize(1.6)}
                                color={AppColors.ThemeBlue}
                            />
                            <AppText
                                title={item.offTag}
                                textColor={AppColors.ThemeBlue}
                                textSize={1.6}
                                textFontWeight
                            />
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                        <AppText
                            title={item.price}
                            textColor={AppColors.ThemeBlue}
                            textSize={1.6}
                            textFontWeight
                        />
                        <View style={{ width: responsiveHeight(0.5), height: responsiveHeight(0.5), borderRadius: 100, backgroundColor: AppColors.LIGHTGRAY }} />
                        <AppText
                            title={item.time}
                            textColor={AppColors.GRAY}
                            textSize={1.6}
                        />
                    </View>

                    <LineBreak space={1} />

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <AppText
                            title={item.desc}
                            textColor={AppColors.GRAY}
                            textSize={1.6}
                            numberOfLines={2}
                            textwidth={45}
                        />
                        <TouchableOpacity
                            style={{
                                width: responsiveHeight(4),
                                height: responsiveHeight(4),
                                borderRadius: 100,
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: item.id === 1 ? 'transparent' : AppColors.ThemeBlue,
                                borderWidth: item.id === 1 ? 2 : 0,
                                borderColor: AppColors.RED_COLOR
                            }}
                        >
                            <Feather
                                size={responsiveFontSize(2.4)}
                                name={item.id === 1 ? 'minus' : 'plus'}
                                color={item.id === 1 ? AppColors.RED_COLOR : AppColors.WHITE}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            )
        } else {
            return (
                <View>
                    <AppText
                        title={item.service}
                        textColor={AppColors.ThemeBlue}
                        textSize={1.8}
                    />

                    <LineBreak space={0.5} />

                    <AppText
                        title={item.name}
                        textColor={AppColors.BLACK}
                        textSize={2.5}
                        textFontWeight
                    />

                    <LineBreak space={0.5} />

                    <AppText
                        title={item.location}
                        textColor={AppColors.GRAY}
                        textSize={1.9}
                        numberOfLines={1}
                        textwidth={50}
                    />

                    <LineBreak space={3} />

                    <View
                        style={{ flexDirection: 'row', gap: responsiveWidth(5), alignItems: 'center', }}
                    >
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                            <AntDesign
                                name="star"
                                size={responsiveFontSize(2)}
                                color={AppColors.Yellow}
                            />
                            <AppText
                                title={item.rating}
                                textColor={AppColors.BLACK}
                                textSize={1.9}
                                textFontWeight
                            >
                                {' '}
                                <AppText
                                    title={item.num}
                                    textColor={AppColors.BLACK}
                                    textSize={1.9}
                                />
                            </AppText>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                            <FontAwesome5
                                name="tag"
                                size={responsiveFontSize(2)}
                                color={AppColors.ThemeBlue}
                            />
                            <AppText
                                title={item.offTag}
                                textColor={AppColors.BLACK}
                                textSize={1.9}
                            />
                        </View>
                    </View>
                </View>
            )
        }
    }

    return (
        <View>
            <FlatList
                data={data}
                horizontal={services || showVertical ? false : true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    gap: 10,
                    paddingHorizontal: paddingHorizontal ? paddingHorizontal : responsiveWidth(4),
                    marginBottom: services ? responsiveHeight(1) : 0
                }}
                renderItem={({ item }) => (
                    <View style={{
                        flexDirection: 'row',
                        backgroundColor: AppColors.WHITE,
                        borderTopLeftRadius: 10,
                        borderBottomLeftRadius: 10,
                        borderTopRightRadius: 10,
                        borderBottomRightRadius: 10,
                        elevation: 3,
                        marginVertical: services || showVertical ? 0 : responsiveHeight(2),
                        alignItems: 'center',
                        gap: 7
                    }}>
                        <ImageBackground
                            source={item.img}
                            style={{
                                width: services ? responsiveWidth(32) : responsiveWidth(38),
                                height: services ? responsiveHeight(15) : responsiveHeight(18),
                                justifyContent: 'space-around',
                            }}
                        >
                            {
                                services ? null : (
                                    <>
                                        <TouchableOpacity
                                            style={{
                                                backgroundColor: AppColors.WHITE,
                                                width: 35,
                                                height: 35,
                                                borderRadius: 100,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                marginHorizontal: responsiveWidth(4),
                                            }}
                                        >
                                            <Octicons
                                                name="heart-fill"
                                                size={responsiveFontSize(2.5)}
                                                color={AppColors.CRNBERRY}
                                            />
                                        </TouchableOpacity>

                                        <View style={{ backgroundColor: AppColors.lightestBlue, justifyContent: 'center', borderTopRightRadius: 100, borderBottomRightRadius: 100, alignItems: 'center', width: responsiveWidth(20), height: responsiveHeight(4) }}>
                                            <AppText
                                                title={item.labelText}
                                                textColor={AppColors.ThemeBlue}
                                                textSize={1.8}
                                                textFontWeight
                                            />
                                        </View>
                                    </>
                                )
                            }
                        </ImageBackground>

                        <LineBreak space={2} />

                        {renderContent(item)}
                    </View>
                )}
            />
        </View>
    )
}

export default NearbyOffers