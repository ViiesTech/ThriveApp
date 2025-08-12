/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import { View, FlatList, TouchableOpacity } from 'react-native'
import { AppColors, responsiveHeight, responsiveWidth } from '../utils';
import AppText from './AppTextComps/AppText';

type Prop = {
    data?: any;
    search?: any;
}

const Categories = ({ data, search = false }: Prop) => {
    return (
        <View>
            <FlatList
                data={data}
                horizontal={search ? false : true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal: search ? 0 : responsiveWidth(4),
                    gap: 10,
                    flexDirection: search ? 'row' : 'row',
                    flexWrap: search ? 'wrap' : undefined
                }}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                            gap: 15,
                            backgroundColor: item.id === 2 && !search ? AppColors.WHITE : AppColors.lightestBlue,
                            borderWidth: 1,
                            borderColor: item.id === 2 && !search ? AppColors.GRAY : AppColors.ThemeBlue,
                            // width: responsiveWidth(38),
                            // height: responsiveHeight(7),
                            paddingHorizontal: search ? responsiveWidth(6) : responsiveWidth(8),
                            paddingVertical: responsiveHeight(0.8),
                            borderRadius: 100,
                        }}
                    >
                        <AppText
                            title={item.title}
                            textColor={item.id === 2 && !search ? AppColors.BLACK : AppColors.ThemeBlue}
                            textSize={1.5}
                        />
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}

export default Categories