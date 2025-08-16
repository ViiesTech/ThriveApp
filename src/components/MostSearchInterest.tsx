/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import { View, FlatList, TouchableOpacity } from 'react-native'
import { AppColors, responsiveHeight, responsiveWidth } from '../utils'
import SVGXml from './SVGXML'
import AppText from './AppTextComps/AppText'

type Prop = {
    data?: any;
    services?: any;
    paddingHorizontal?:any;
}

const MostSearchInterest = ({ data, services, paddingHorizontal }: Prop) => {
    return (
        <View>
            <FlatList
                data={data}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal: paddingHorizontal ? paddingHorizontal : responsiveWidth(4),
                    gap: 10,
                }}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                            gap: 15,
                            backgroundColor: services ? AppColors.WHITE : AppColors.lightestBlue,
                            borderWidth: services ? 1 : 0,
                            borderColor: AppColors.GRAY,
                            width: responsiveWidth(38),
                            height: responsiveHeight(7),
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 100,
                        }}
                    >
                        <SVGXml icon={item.icon} width={30} height={30} />
                        <AppText
                            title={item.title}
                            textColor={services ? AppColors.BLACK : AppColors.ThemeBlue}
                            textSize={2}
                            textFontWeight
                        />
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}

export default MostSearchInterest;