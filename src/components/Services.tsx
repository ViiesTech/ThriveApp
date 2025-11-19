/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { ScrollView, FlatList, TouchableOpacity, View, Image } from 'react-native';
import { AppColors, responsiveHeight, responsiveWidth, services } from '../utils'
import LineBreak from './LineBreak';
import AppText from './AppTextComps/AppText';
import SVGXml from './SVGXML';
import { useNavigation } from '@react-navigation/native';
import { IMAGE_URL } from '../redux/constant';

const Services = ({ data, isNavigate = true,disabled=false }) => {
    const nav = useNavigation();
    console.log('data', data)
    return (
        <ScrollView
            style={{ flex: 1 }}
            horizontal
            showsHorizontalScrollIndicator={false}
        >
            <FlatList
                data={data}
                ItemSeparatorComponent={<LineBreak space={2} />}
                columnWrapperStyle={{ justifyContent: 'center', alignSelf: 'center', gap: responsiveWidth(6) }}
                numColumns={3}
                renderItem={({ item }) => (
                    <TouchableOpacity disabled={disabled} style={{ alignItems: 'center', }} onPress={() => isNavigate ? nav.navigate('MassageCategories', { heading: item?.label, id: item?.id }) : null}>
                        {/* <SVGXml icon={item.icon} width={100} height={100} /> */}
                        <Image style={{ height: responsiveHeight(10), width: responsiveWidth(20), borderRadius: responsiveHeight(8) }} source={{ uri: `${IMAGE_URL}${item?.serviceImage}` }} />
                        <LineBreak space={1} />
                        <AppText
                            title={item?.label || item?.serviceName}
                            textColor={AppColors.darkBlue}
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