/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import { View, FlatList, TouchableOpacity } from 'react-native'
import { AppColors, datesItem, responsiveHeight, responsiveWidth } from '../utils'
import AppText from './AppTextComps/AppText'
import LineBreak from './LineBreak'

const DateSelector = () => {
    return (
        <View>
            <FlatList
                data={datesItem}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 10, paddingHorizontal: responsiveWidth(5) }}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={{
                            backgroundColor: item.id === 2 ? AppColors.ThemeBlue : AppColors.LIGHTGRAY,
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: responsiveWidth(14),
                            height: responsiveHeight(9),
                            borderRadius: 40,
                        }}>
                        <AppText
                            title={item.day}
                            textColor={item.id === 2 ? AppColors.WHITE : AppColors.BLACK}
                            textSize={1.6}
                        />
                        <LineBreak space={0.5} />
                        <AppText
                            title={item.date}
                            textColor={item.id === 2 ? AppColors.WHITE : AppColors.BLACK}
                            textSize={2.5}
                            textFontWeight
                        />
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}

export default DateSelector