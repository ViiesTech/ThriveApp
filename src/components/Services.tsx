/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import { View, ScrollView, FlatList, TouchableOpacity } from 'react-native'
import { AppColors, services } from '../utils'
import LineBreak from './LineBreak'
import AppText from './AppTextComps/AppText'
import SVGXml from './SVGXML'

const Services = () => {
    return (
        <ScrollView
            style={{ flex: 1 }}
            horizontal
            showsHorizontalScrollIndicator={false}
        >
            <FlatList
                data={services}
                ItemSeparatorComponent={<LineBreak space={2} />}
                numColumns={4}
                renderItem={({ item }) => (
                    <TouchableOpacity style={{ alignItems: 'center' }}>
                        <View
                            style={{
                                backgroundColor: AppColors.lightestBlue,
                                width: 60,
                                height: 60,
                                borderRadius: 100,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <SVGXml icon={item.icon} width={35} height={35} />
                        </View>
                        <LineBreak space={1} />
                        <AppText
                            title={item.title}
                            textColor={AppColors.ThemeBlue}
                            textSize={1.6}
                            textwidth={23}
                            textFontWeight
                            textAlignment={'center'}
                        />
                    </TouchableOpacity>
                )}
            />
        </ScrollView>
    )
}

export default Services;