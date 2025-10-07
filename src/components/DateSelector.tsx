/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import { View, FlatList, TouchableOpacity } from 'react-native'
import { AppColors, datesItem, responsiveHeight, responsiveWidth } from '../utils'
import AppText from './AppTextComps/AppText'
import LineBreak from './LineBreak'

type Props = {
    data?:any;
    isSelected?:any;
    setSelectedDate?:any;
}

const DateSelector = ({data, isSelected, setSelectedDate}: Props) => {
    return (
        <View>
            <FlatList
                data={data}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.format("YYYY-MM-DD")}
                contentContainerStyle={{ gap: 10, }}
                renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() => setSelectedDate(item)}
                        style={{
                            backgroundColor: item.isSame(isSelected, "day") ? AppColors.ThemeBlue : AppColors.inputGrayBg,
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: responsiveWidth(14),
                            height: responsiveHeight(9),
                            borderRadius: 40,
                        }}>
                        <AppText
                            title={item.format("ddd")}
                            textColor={item.isSame(isSelected, "day") ? AppColors.WHITE : AppColors.BLACK}
                            textSize={1.6}
                        />
                        <LineBreak space={0.5} />
                        <AppText
                            title={item.format("D")}
                            textColor={item.isSame(isSelected, "day") ? AppColors.WHITE : AppColors.BLACK}
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