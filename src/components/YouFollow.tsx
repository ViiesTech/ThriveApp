/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react'
import { View, FlatList, Image, TouchableOpacity } from 'react-native'
import { AppColors, responsiveWidth } from '../utils'
import AppText from './AppTextComps/AppText'
import LineBreak from './LineBreak'

type Props = {
    data?: any;
    paddingHorizontal?: any;
    disabledSelection?: any;
    onPress?: any;
}

const YouFollow = ({ data, paddingHorizontal, disabledSelection, onPress }: Props) => {
    const [isSelected, setIsSelected] = useState({ index: '' });

    useEffect(() => {
        if (disabledSelection) {
            setIsSelected({ index: null })
        }
    }, [disabledSelection])


    return (
        <View>
            <FlatList
                data={data}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    gap: 10,
                    paddingHorizontal: paddingHorizontal ? paddingHorizontal : responsiveWidth(4),
                }}
                renderItem={({ item, index }) => (
                    <TouchableOpacity style={{ flexDirection: 'column', alignItems: 'center' }} onPress={() => onPress()}>
                        <View style={{ borderWidth: 4, borderColor: isSelected.index == index ? AppColors.ThemeBlue : AppColors.WHITE, borderRadius: 100 }}>
                            <Image
                                source={item.img}
                                // resizeMode="contain"
                                style={{ width: responsiveWidth(19), height: responsiveWidth(19) }}
                            />
                        </View>
                        <LineBreak space={1} />
                        {item.name && <AppText
                            title={item.name}
                            textColor={AppColors.BLACK}
                            textSize={1.8}
                            textFontWeight
                        />}
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}

export default YouFollow