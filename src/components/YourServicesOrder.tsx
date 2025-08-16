/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { AppImages } from '../assets/images'
import { AppColors, responsiveFontSize, responsiveHeight, responsiveWidth } from '../utils'
import AppText from './AppTextComps/AppText'
import Feather from 'react-native-vector-icons/Feather';

const YourServicesOrder = () => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: responsiveWidth(4) }}>
            <Image source={AppImages.banner2} style={{ width: 60, height: 60, borderRadius: 10 }} />
            <View style={{ flexDirection: 'row', width: responsiveWidth(75), justifyContent: 'space-between', alignItems: 'center' }}>
                <View>
                    <AppText
                        title={'Skin Care'}
                        textColor={AppColors.BLACK}
                        textSize={2.2}
                        textFontWeight
                    />
                    <View style={{ flexDirection: 'row', gap: 6, alignItems: 'center' }}>
                        <AppText
                            title={'$50'}
                            textColor={AppColors.ThemeBlue}
                            textSize={2}
                            textFontWeight
                        />
                        <View style={{ width: 4, height: 4, borderRadius: 100, backgroundColor: AppColors.GRAY }} />
                        <AppText
                            title={'Hair service'}
                            textColor={AppColors.GRAY}
                            textSize={2}
                        />
                    </View>
                </View>
                <TouchableOpacity
                    style={{
                        width: responsiveHeight(4),
                        height: responsiveHeight(4),
                        borderRadius: 100,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 1 === 1 ? 'transparent' : AppColors.ThemeBlue,
                        borderWidth: 1 === 1 ? 2 : 0,
                        borderColor: AppColors.RED_COLOR
                    }}
                >
                    <Feather
                        size={responsiveFontSize(2.4)}
                        name={1 === 1 ? 'minus' : 'plus'}
                        color={1 === 1 ? AppColors.RED_COLOR : AppColors.WHITE}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default YourServicesOrder