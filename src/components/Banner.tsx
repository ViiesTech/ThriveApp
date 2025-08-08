/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import { View, FlatList, Image } from 'react-native'
import { banner, responsiveHeight, responsiveWidth } from '../utils'

const Banner = () => {
    return (
        <View>
            <FlatList
                data={banner}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal: responsiveWidth(4),
                    gap: 6,
                }}
                renderItem={({ item }) => (
                    <View>
                        <Image
                            resizeMode="contain"
                            source={item.img}
                            style={{
                                width: responsiveWidth(92),
                                height: responsiveHeight(19),
                                marginTop: item.id == 1 ? responsiveHeight(0.5) : 0,
                            }}
                        />
                    </View>
                )}
            />
        </View>
    )
}

export default Banner