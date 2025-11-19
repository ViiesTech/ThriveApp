/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity, FlatList } from 'react-native'
import { AppColors, galleryImages, mostSearchInterestSerivces, responsiveFontSize, responsiveHeight, responsiveWidth, SpecialistProfileServices } from '../utils'
import AntDesign from 'react-native-vector-icons/AntDesign';
import AppText from './AppTextComps/AppText';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { AppImages } from '../assets/images';
import LineBreak from './LineBreak';
import MostSearchInterest from './MostSearchInterest';
import NearbyOffers from './NearbyOffers';
import AppButton from './AppButton';
import Reviews from './Reviews';
import ServiceGalleryFooter from './ServiceGalleryFooter';
import { useNavigation } from '@react-navigation/native';
import Services from './Services';
import { IMAGE_URL } from '../redux/constant';

const ShopDetailsCard = ({ data, onBookNowPress }) => {
    const nav = useNavigation();
    const { about, location, totalViews, totalReviews, avgRating, fullName, workingDays, serviceId, providerReviews, image } = data;
    console.log('datadfds', data)
    return (
        <>
            <View style={{ backgroundColor: AppColors.WHITE, paddingHorizontal: responsiveWidth(5) }}>
                <View style={{ position: 'relative', top: responsiveHeight(-2.5) }}>
                    <Image source={{ uri: `${IMAGE_URL}${image}` }} style={{ width: 50, height: 50, borderRadius: 100 }} />
                </View>
            </View>
            <ScrollView style={{ flex: 1, backgroundColor: AppColors.WHITE, paddingHorizontal: responsiveWidth(5), marginTop: responsiveHeight(-2) }}>
                <View>
                    <View>
                        <AppText
                            title={fullName}
                            textColor={AppColors.BLACK}
                            textSize={2.8}
                            textFontWeight
                        />
                        <LineBreak space={0.5} />
                        <AppText
                            title={location?.locationName}
                            textColor={AppColors.GRAY}
                            textSize={1.6}
                        />
                        <View>

                            <LineBreak space={1.5} />

                            <View
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
                                        title={avgRating}
                                        textColor={AppColors.BLACK}
                                        textSize={1.5}
                                        textFontWeight
                                    >{" "}
                                        <AppText
                                            title={`(${totalReviews})`}
                                            textColor={AppColors.BLACK}
                                            textSize={1.5}
                                        />
                                    </AppText>
                                </View>
                                <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
                                    <Fontisto
                                        name="eye"
                                        size={responsiveFontSize(1.5)}
                                        color={AppColors.GRAY}
                                    />
                                    <AppText
                                        title={`${totalViews} views`}
                                        textColor={AppColors.BLACK}
                                        textSize={1.5}
                                    />
                                </View>
                            </View>
                            <LineBreak space={2} />

                            <View style={{ width: responsiveWidth(92), height: responsiveHeight(0.2), backgroundColor: AppColors.LIGHTGRAY }} />
                            <LineBreak space={2} />

                            <AppText
                                title={'About'}
                                textColor={AppColors.BLACK}
                                textSize={2}
                                textFontWeight
                            />

                            <LineBreak space={2} />

                            <AppText
                                title={about}
                                textColor={AppColors.DARKGRAY}
                                textSize={1.8}
                                lineHeight={2.3}
                            />

                            {workingDays?.length ? (
                                <View>
                                    <LineBreak space={2} />
                                    <AppText
                                        title={'Opening Hours'}
                                        textColor={AppColors.BLACK}
                                        textSize={2}
                                        textFontWeight
                                    />
                                    <LineBreak space={2} />
                                    <View>
                                        <FlatList contentContainerStyle={{ gap: responsiveHeight(3) }} horizontal showsHorizontalScrollIndicator={false} data={workingDays} renderItem={({ item }) => {
                                            return (
                                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15 }}>
                                                    <View
                                                        style={{
                                                            width: 10,
                                                            height: 10,
                                                            backgroundColor: AppColors.ThemeBlue,
                                                            borderRadius: 100,
                                                        }}
                                                    />
                                                    <View>
                                                        <AppText
                                                            title={item?.day}
                                                            textColor={AppColors.GRAY}
                                                            textSize={1.8}
                                                        />
                                                        <LineBreak space={1} />
                                                        <AppText
                                                            title={`${item?.startTime} - ${item?.endTime}`}
                                                            textColor={AppColors.BLACK}
                                                            textSize={1.8}
                                                            textFontWeight
                                                        />
                                                    </View>
                                                </View>
                                            )
                                        }} />
                                    </View>
                                </View>
                            ) : null}


                            {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                              

                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15 }}>
                                    <View
                                        style={{
                                            width: 10,
                                            height: 10,
                                            backgroundColor: AppColors.ThemeBlue,
                                            borderRadius: 100,
                                        }}
                                    />
                                    <View>
                                        <AppText
                                            title={'Saturday - Sunday'}
                                            textColor={AppColors.GRAY}
                                            textSize={1.8}
                                        />
                                        <LineBreak space={1} />
                                        <AppText
                                            title={'08:00 AM - 03:00 PM'}
                                            textColor={AppColors.BLACK}
                                            textSize={1.8}
                                            textFontWeight
                                        />
                                    </View>
                                </View>
                            </View> */}

                            <LineBreak space={3} />
                            <View>
                                <View>
                                    <AppText
                                        title={'Services Offered'}
                                        textColor={AppColors.BLACK}
                                        textSize={2.2}
                                        textFontWeight
                                    />
                                </View>
                                <LineBreak space={2} />
                                <Services disabled data={serviceId} isNavigate={false} />
                                {/* <MostSearchInterest
                                    data={mostSearchInterestSerivces}
                                    services={'services'}
                                    paddingHorizontal={-1}
                                /> */}
                            </View>


                            {/* <View>
                                <NearbyOffers paddingHorizontal={-1} data={SpecialistProfileServices} services={'services'} />
                            </View> */}

                            {/* <LineBreak space={4} /> */}

                            {/* <AppButton
                                title="View All Services"
                                textColor={AppColors.ThemeBlue}
                                btnBackgroundColor={AppColors.WHITE}
                                borderWidth={1}
                                borderColor={AppColors.ThemeBlue}
                                handlePress={() => { }}
                                textFontWeight={false}
                            />
                            <LineBreak space={2} /> */}

                            {/* <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <AppText
                                    title={'Gallery'}
                                    textColor={AppColors.BLACK}
                                    textSize={1.8}
                                    textFontWeight
                                />

                                <TouchableOpacity>
                                    <AppText
                                        title={'View all'}
                                        textColor={AppColors.ThemeBlue}
                                        textSize={1.8}
                                    />
                                </TouchableOpacity>
                            </View> */}

                            {/* <FlatList
                                data={galleryImages}
                                horizontal
                                contentContainerStyle={{
                                    paddingTop: responsiveHeight(1),
                                    gap: 10,
                                }}
                                renderItem={({ item }) => (
                                    <Image
                                        source={item.image}
                                        style={{ width: 80, height: 80, borderRadius: 10 }}
                                    />
                                )}
                            /> */}

                            <LineBreak space={2} />
                            {data?.providerReviews?.length ? (
                                <View>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <AppText
                                            title={'Reviews'}
                                            textColor={AppColors.BLACK}
                                            textSize={2}
                                            textFontWeight
                                        />

                                        {/* <TouchableOpacity>
                                    <AppText
                                        title={'View all'}
                                        textColor={AppColors.ThemeBlue}
                                        textSize={1.8}
                                    />
                                </TouchableOpacity> */}
                                    </View>
                                    <View style={{ marginTop: responsiveHeight(2) }}>
                                        <FlatList contentContainerStyle={{gap:responsiveHeight(2)}} data={data?.providerReviews} renderItem={({ item, index }) => {
                                            return (
                                                <Reviews data={item} paddingHorizontal={-1} />
                                            )

                                        }} />
                                    </View>
                                </View>
                            ) : null}

                            {/* <LineBreak space={2} />

                            <Reviews paddingHorizontal={-1} />
                            <LineBreak space={1} /> */}
                            {/* <Reviews paddingHorizontal={-1} /> */}
                            <LineBreak space={2} />

                            <ServiceGalleryFooter paddingHorizontal={-1} borderWidth={-1} bookNowOnPress={onBookNowPress} />

                            <LineBreak space={3} />

                        </View>
                    </View>
                </View>
            </ScrollView>
        </>
    )
}

export default ShopDetailsCard