/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import { View, FlatList, Image } from 'react-native'
import { responsiveWidth, specialistsYouFollow } from '../utils'

const YouFollow = () => {
    return (
        <View>
            <FlatList
                data={specialistsYouFollow}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    gap: 10,
                    paddingHorizontal: responsiveWidth(4),
                }}
                renderItem={({ item }) => (
                    <Image
                        source={item.img}
                        resizeMode="contain"
                        style={{ width: responsiveWidth(19) }}
                    />
                )}
            />
        </View>
    )
}

export default YouFollow