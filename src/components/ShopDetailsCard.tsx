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

const ShopDetailsCard = () => {
    const nav = useNavigation();
    return (
        <ScrollView style={{ flex: 1, backgroundColor: AppColors.WHITE, paddingHorizontal: responsiveWidth(5) }}>
            <LineBreak space={2} />
            <View>
                <View>
                    <Image source={AppImages.service} style={{ width: 40, height: 40, borderRadius: 100 }} />

                    <View>
                        <LineBreak space={0.5} />
                        <AppText
                            title={'Ronald'}
                            textColor={AppColors.BLACK}
                            textSize={2.5}
                            textFontWeight
                        />
                        <LineBreak space={0.5} />
                        <AppText
                            title={'360 Stillwater Rd. Palm City, FL 34990'}
                            textColor={AppColors.GRAY}
                            textSize={1.6}
                        />

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
                                    title={'4.7'}
                                    textColor={AppColors.BLACK}
                                    textSize={1.5}
                                    textFontWeight
                                >{" "}
                                    <AppText
                                        title={'(2.7k)'}
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
                                    title={'10k views'}
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
                            title={'At i-thriv we bring spa-quality experiences directly to you. Whether you are relaxing at home, celebrating a special occasion, or hosting a retreat at a vacation rental, our licensed providers deliver premium, personalized care wherever you are. Our services include massage therapy, facials, sound baths, yoga and vibroacoustic therapy—each thoughtfully designed to restore balance, promote relaxation, and support your wellness journey.'}
                            textColor={AppColors.DARKGRAY}
                        textSize={1.8}
                        lineHeight={2.3}
                        />

                        <LineBreak space={2} />

                        <AppText
                            title={'Opening Hours'}
                            textColor={AppColors.BLACK}
                            textSize={2}
                            textFontWeight
                        />
                        <LineBreak space={2} />

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
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
                                        title={'Sunday - Monday'}
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
                                        title={'Sunday - Monday'}
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
                        </View>

                        <LineBreak space={3} />
                        <View>
                            <View>
                                <AppText
                                    title={'Services'}
                                    textColor={AppColors.BLACK}
                                    textSize={2.5}
                                    textFontWeight
                                />
                            </View>
                            <LineBreak space={3} />

                            <MostSearchInterest
                                data={mostSearchInterestSerivces}
                                services={'services'}
                                paddingHorizontal={-1}
                            />
                        </View>
                        <LineBreak space={2} />

                        <View>
                            <NearbyOffers paddingHorizontal={-1} data={SpecialistProfileServices} services={'services'} />
                        </View>

                        <LineBreak space={4} />

                        <AppButton
                            title="View All Services"
                            textColor={AppColors.ThemeBlue}
                            btnBackgroundColor={AppColors.WHITE}
                            borderWidth={1}
                            borderColor={AppColors.ThemeBlue}
                            handlePress={() => {}}
                            textFontWeight={false}
                        />
                        <LineBreak space={2} />

                        <View
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
                        </View>

                        <FlatList
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
                        />

                        <LineBreak space={3} />

                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                            }}
                        >
                            <AppText
                                title={'Reviews'}
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
                        </View>

                        <LineBreak space={2} />

                        <Reviews paddingHorizontal={-1} />
                        <LineBreak space={2} />

                        <ServiceGalleryFooter paddingHorizontal={-1} borderWidth={-1} bookNowOnPress={() => nav.navigate('ServiceDetails')} />

                        <LineBreak space={10} />

                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

export default ShopDetailsCard