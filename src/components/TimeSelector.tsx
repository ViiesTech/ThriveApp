/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import { View, FlatList } from 'react-native'
import { AppColors, responsiveHeight, responsiveWidth, timesItems } from '../utils'
import AppText from './AppTextComps/AppText'

const TimeSelector = () => {
    return (
        <View>
            <FlatList
                data={timesItems}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: responsiveWidth(4), gap: 10 }}
                renderItem={({ item }) => (
                    <View style={{
                        borderWidth: 1,
                        borderColor: item.id == 2 ? AppColors.ThemeBlue : AppColors.GRAY,
                        paddingHorizontal: responsiveWidth(4),
                        paddingVertical: responsiveHeight(1),
                        borderRadius: 100,
                    }}>
                        <AppText
                            title={item.time}
                            textColor={item.id == 2 ? AppColors.ThemeBlue : AppColors.BLACK}
                            textSize={1.8}
                        />
                    </View>
                )}
            />
        </View>
    )
}

export default TimeSelector