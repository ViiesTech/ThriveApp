/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import { View, Image } from 'react-native'
import { AppImages } from '../assets/images'
import AppText from './AppTextComps/AppText'
import { AppColors, responsiveWidth } from '../utils'

const Reviews = ({ paddingHorizontal }: any) => {
    return (
        <View
            style={{
                flexDirection: 'row',
                gap: 10,
                paddingHorizontal: paddingHorizontal ? paddingHorizontal : responsiveWidth(4),
            }}
        >
            <View>
                <Image
                    source={AppImages.follower1}
                    style={{ width: 45, height: 45, borderRadius: 100 }}
                />
            </View>
            <View style={{ gap: 10, width: responsiveWidth(76) }}>
                <View
                    style={{ flexDirection: 'row', justifyContent: 'space-between' }}
                >
                    <AppText
                        title={'Zhang ha'}
                        textColor={AppColors.BLACK}
                        textSize={2}
                    />
                    <AppText
                        title={'2 days ago'}
                        textColor={AppColors.GRAY}
                        textSize={1.5}
                    />
                </View>
                <Image source={AppImages.rating} style={{ width: responsiveWidth(20) }} />
                <AppText
                    title={'The place was clean, great serivce, stall are friendly. I will certainly recommend to my friends and visit again! ;)'}
                    textColor={AppColors.GRAY}
                    textSize={1.8}
                    lineHeight={2.5}
                />
            </View>
        </View>
    )
}

export default Reviews