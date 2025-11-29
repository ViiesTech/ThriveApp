/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import { View, Image } from 'react-native'
import { AppImages } from '../assets/images'
import AppText from './AppTextComps/AppText'
import { AppColors, responsiveWidth } from '../utils'
import { IMAGE_URL } from '../redux/constant'
import moment from 'moment'
import StarRating from 'react-native-star-rating-widget'

const Reviews = ({ paddingHorizontal, data }: any) => {
    console.log('dataaa', data)
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
                    source={data?.userId?.image ? { uri: `${IMAGE_URL}${data?.userId?.image}` } : AppImages.userDummy}
                    style={{ width: 45, height: 45, borderRadius: 100 }}
                />
            </View>
            <View style={{ gap: 10, width: responsiveWidth(76) }}>
                <View
                    style={{ flexDirection: 'row', justifyContent: 'space-between' }}
                >
                    <AppText
                        title={data?.userId?.fullName}
                        textColor={AppColors.BLACK}
                        textSize={2}
                    />
                    <AppText
                        title={moment(data?.createdAt).fromNow()}
                        textColor={AppColors.GRAY}
                        textSize={1.5}
                    />
                </View>
                <StarRating
                    emptyColor="#D1D5DB"
                    starSize={20}
                    enableHalfStar={false}
                    color='#F08603'
                    rating={data?.rating}
                //   onChange={setRating}
                />
                {/* <Image source={AppImages.rating} style={{ width: responsiveWidth(20) }} /> */}
                <AppText
                    title={data?.comment}
                    textColor={AppColors.GRAY}
                    textSize={1.8}
                    lineHeight={2.5}
                />
            </View>
        </View>
    )
}

export default Reviews