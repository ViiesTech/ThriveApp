/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import { View, FlatList, TouchableOpacity } from 'react-native'
import { AppColors, responsiveHeight, responsiveWidth, timesItems } from '../utils'
import AppText from './AppTextComps/AppText'

type Prop = {
    isSelected?:any;
    setSelectedTime?:any;
}

const TimeSelector = ({isSelected, setSelectedTime}: Prop) => {
    return (
        <View>
            <FlatList
                data={timesItems}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 10 }}
                renderItem={({ item }) => (
                    <TouchableOpacity 
                  onPress={() => setSelectedTime(item.time)}
                    style={{
                        backgroundColor: isSelected === item.time ? AppColors.ThemeBlue : AppColors.inputGrayBg,
                        paddingHorizontal: responsiveWidth(4),
                        paddingVertical: responsiveHeight(3),
                        borderRadius: 25,
                    }}>
                        <AppText
                            title={item.time}
                            textColor={isSelected === item.time ? AppColors.WHITE : AppColors.ThemeBlue}
                            textSize={2}
                            textFontWeight
                        />
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}

export default TimeSelector