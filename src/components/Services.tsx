/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { ScrollView, FlatList, TouchableOpacity, View, Image } from 'react-native';
import { AppColors, responsiveHeight, responsiveWidth, serviceIconsMap, services } from '../utils'
import LineBreak from './LineBreak';
import AppText from './AppTextComps/AppText';
import SVGXml from './SVGXML';
import { useNavigation } from '@react-navigation/native';
import { IMAGE_URL } from '../redux/constant';
import { AppIcons } from '../assets/icons';

const Services = ({ data, providerProfile, isNavigate = true, disabled = false }) => {
    const nav = useNavigation();
    console.log('data', data)

    // export const services = [
    //     { id: 1, icon: AppIcons.service1, title: 'Solo Massage' },
    //     { id: 2, icon: AppIcons.service2, title: 'Couples Massage' },
    //     { id: 3, icon: AppIcons.service4, title: 'Corporate Chair Massage' },
    //     { id: 5, icon: AppIcons.service5, title: 'Group Yoga' },
    //     { id: 6, icon: AppIcons.service6, title: 'Sound Bath' },
    //     { id: 8, icon: AppIcons.service8, title: 'Facial' },
    //     { id: 7, icon: AppIcons.service7, title: 'Vibroacoustic Therapy' },
    //     { id: 4, icon: AppIcons.service3, title: 'Spa Party' },
    // ]
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
                renderItem={({ item }) => {
                    // const serviceIcon = item?.label === 'Solo Massage' ? AppIcons.service1 : item.label === 'Couple Massage' ? AppIcons.service2 : item.label === 'Group Yoga' ? AppIcons.service5 : item.label === 'Sound Bath' ? AppIcons.service6 : item.label === 'Corporate Chair Massage' ? AppIcons.service4 : item.label === 'Vibroacoustic Therapy' ? AppIcons.service7 : item.label === 'Facial' ? AppIcons.service8 : item.label === 'Spa Party' ? AppIcons.service3 : null
                    const serviceIcon = serviceIconsMap[providerProfile ? item?.serviceName : item?.label] || null;

                    return (
                        <TouchableOpacity disabled={disabled} style={{ alignItems: 'center', }} onPress={() => isNavigate ? nav.navigate('MassageCategories', { heading: item?.label, id: item?.id }) : null}>
                            <SVGXml icon={serviceIcon} width={100} height={100} />
                            {/* <Image style={{ height: responsiveHeight(10), width: responsiveWidth(20), borderRadius: responsiveHeight(8) }} source={{ uri: `${IMAGE_URL}${item?.serviceImage}` }} /> */}
                            <LineBreak space={1} />
                            <AppText
                                title={item?.label || item?.serviceName}
                                textColor={AppColors.darkBlue}
                                textSize={1.8}
                                textwidth={25}
                                textAlignment={'center'}
                            />
                        </TouchableOpacity>
                    )
                }}
            />
        </ScrollView>
    )
}

export default Services;