/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import { View, FlatList, ImageBackground, TouchableOpacity } from 'react-native'
import { AppColors, responsiveFontSize, responsiveHeight, responsiveWidth } from '../utils'
import LineBreak from './LineBreak'
import AppText from './AppTextComps/AppText'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';

type Props = {
    data?: any;
    onCardPress?: any;
}

const FeaturedSpecialists = ({ data, onCardPress }: Props) => {
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
                    <TouchableOpacity onPress={onCardPress}>
                        <ImageBackground
                            source={item.img}
                            style={{
                                width: responsiveWidth(55),
                                height: responsiveHeight(25),
                                // alignItems: 'flex-end',
                                paddingHorizontal: responsiveWidth(4),
                            }}
                        >
                            {/* <LineBreak space={1} />
                            <TouchableOpacity
                                style={{
                                    backgroundColor: AppColors.WHITE,
                                    width: 35,
                                    height: 35,
                                    borderRadius: 100,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <Octicons
                                    name="heart"
                                    size={responsiveFontSize(2.5)}
                                    color={AppColors.CRNBERRY}
                                />
                            </TouchableOpacity> */}
                        </ImageBackground>

                        <LineBreak space={2} />

                        <AppText
                            title={item.service}
                            textColor={AppColors.ThemeBlue}
                            textSize={1.8}
                        />

                        <LineBreak space={0.5} />

                        <AppText
                            title={item.name}
                            textColor={AppColors.BLACK}
                            textSize={2.5}
                            textFontWeight
                        />

                        <LineBreak space={0.5} />

                        <AppText
                            title={item.location}
                            textColor={AppColors.GRAY}
                            textSize={1.9}
                            numberOfLines={1}
                            textwidth={50}
                        />

                        <LineBreak space={3} />

                        <View
                            style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}
                        >
                            <AntDesign
                                name="star"
                                size={responsiveFontSize(2)}
                                color={AppColors.Yellow}
                            />
                            <AppText
                                title={item.rating}
                                textColor={AppColors.BLACK}
                                textSize={1.9}
                                textFontWeight
                            >
                                {' '}
                                <AppText
                                    title={item.num}
                                    textColor={AppColors.BLACK}
                                    textSize={1.9}
                                />
                            </AppText>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}

export default FeaturedSpecialists