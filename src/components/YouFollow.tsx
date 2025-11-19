/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react'
import { View, FlatList, Image, TouchableOpacity } from 'react-native'
import { AppColors, responsiveWidth } from '../utils'
import AppText from './AppTextComps/AppText'
import LineBreak from './LineBreak'
import { IMAGE_URL } from '../redux/constant'

type Props = {
    data?: any;
    paddingHorizontal?: any;
    disabledSelection?: any;
    selectedTherapist?: string;
    onPress?: any;
}

const YouFollow = ({ data, paddingHorizontal, disabledSelection, selectedTherapist, onPress }: Props) => {
    // const [isSelected, setIsSelected] = useState({ id: '' });
    // console.log('isSelected', isSelected)

    // useEffect(() => {
    //     if (disabledSelection) {
    //         setIsSelected({ id: null })
    //     }
    // }, [disabledSelection])


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
                    <TouchableOpacity style={{ flexDirection: 'column', alignItems: 'center' }} onPress={() => {
                        // setIsSelected(item._id);
                        onPress && onPress(item._id); // 🔥 send selected ID back to parent
                    }}>
                        <View
                            style={{
                                borderWidth: selectedTherapist === item?._id ? 6 : 2,
                                borderColor: AppColors.ThemeBlue,
                                borderRadius: responsiveWidth(19) / 2,
                                width: responsiveWidth(19),
                                height: responsiveWidth(19),
                                justifyContent: 'center',
                                alignItems: 'center',
                                overflow: 'hidden', // ✅ ensures image stays inside the circle
                            }}
                        >
                            <Image
                                source={{ uri: `${IMAGE_URL}${item.image}` }}
                                resizeMode="cover" // ✅ fills the circle better
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    borderRadius: responsiveWidth(19) / 2, // ✅ keeps image circular
                                }}
                            />
                        </View>
                        <LineBreak space={1} />
                        {item?.fullName && <AppText
                            title={item?.fullName}
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