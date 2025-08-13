/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import { View, FlatList, Image } from 'react-native'
import { AppColors, responsiveWidth } from '../utils'
import AppText from './AppTextComps/AppText'
import LineBreak from './LineBreak'

const YouFollow = ({ data }: any) => {
    return (
        <View>
            <FlatList
                data={data}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    gap: 10,
                    paddingHorizontal: responsiveWidth(4),
                }}
                renderItem={({ item }) => (
                    <View style={{flexDirection: 'column', alignItems: 'center'}}>
                        <Image
                            source={item.img}
                            resizeMode="contain"
                            style={{ width: responsiveWidth(19) }}
                        />
                        <LineBreak space={1} />
                        {item.name && <AppText
                            title={item.name}
                            textColor={AppColors.BLACK}
                            textSize={1.8}
                            textFontWeight
                        />}
                    </View>
                )}
            />
        </View>
    )
}

export default YouFollow