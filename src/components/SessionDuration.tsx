/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { AppColors, responsiveHeight, responsiveWidth } from '../utils'
import AppText from './AppTextComps/AppText'

type Props = {
    title?: any;
    index?: any;
    isSelected?: any;
    onPress?: any;
    containerWidth?: any;
    textwidth?: any;
    textSize?: any;
}

const SessionDuration = ({ title, isSelected, onPress, containerWidth, textwidth, textSize }: Props) => {
    return (
        <TouchableOpacity
            style={{
                flexDirection: 'row',
                // gap: 15,
                backgroundColor: isSelected ? AppColors.ThemeBlue : AppColors.lightestBlue,
                width: containerWidth ? responsiveWidth(containerWidth) : responsiveWidth(45),
                // height: responsiveHeight(6.5),
                paddingVertical: responsiveHeight(0.5),
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 100,
            }}
            onPress={onPress}
        >
            <AppText
                title={title}
                textColor={isSelected ? AppColors.WHITE : AppColors.ThemeBlue}
                textSize={textSize ? textSize : 2}
                textwidth={textwidth ? textwidth : 28}
                textAlignment={'center'}
                textAlignVertical={'center'}
            />
        </TouchableOpacity>
    )
}

export default SessionDuration