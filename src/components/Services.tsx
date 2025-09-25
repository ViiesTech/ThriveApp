/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { AppColors, responsiveWidth, services } from '../utils'
import LineBreak from './LineBreak';
import AppText from './AppTextComps/AppText';
import SVGXml from './SVGXML';
import { useNavigation } from '@react-navigation/native';

const Services = () => {
    const nav = useNavigation();
    return (
        <ScrollView
            style={{ flex: 1 }}
            horizontal
            showsHorizontalScrollIndicator={false}
        >
            <FlatList
                data={services}
                ItemSeparatorComponent={<LineBreak space={2} />}
                columnWrapperStyle={{ justifyContent: 'center', alignSelf: 'center', gap: responsiveWidth(7.5) }}
                numColumns={3}
                renderItem={({ item }) => (
                    <TouchableOpacity style={{ alignItems: 'center', }} onPress={() => nav.navigate('MassageCategories', { heading: item.title })}>
                        <SVGXml icon={item.icon} width={100} height={100} />
                        <LineBreak space={1} />
                        <AppText
                            title={item.title}
                            textColor={AppColors.ThemeBlue}
                            textSize={1.8}
                            textwidth={25}
                            textAlignment={'center'}
                        />
                    </TouchableOpacity>
                )}
            />
        </ScrollView>
    )
}

export default Services;