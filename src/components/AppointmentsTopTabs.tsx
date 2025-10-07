/* eslint-disable react-native/no-inline-styles */
import React, { useRef, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, Animated } from 'react-native';
import { AppColors, appointmentsTab, responsiveHeight } from '../utils';
import AppText from './AppTextComps/AppText';
import LineBreak from './LineBreak';

type Prop = {
    selectedTab?: any;
    setSelectedTab?: any;
    data?: any;
    textwidth?: any;
};

const AppointmentsTopTabs = ({ selectedTab, setSelectedTab, data, textwidth }: Prop) => {
    // Animated value for the indicator movement
    const indicatorAnim = useRef(new Animated.Value(selectedTab?.id || 0)).current;

    useEffect(() => {
        Animated.spring(indicatorAnim, {
            toValue: selectedTab?.id,
            useNativeDriver: false,
        }).start();
    }, [selectedTab]);

    return (
        <View
            style={{
                borderBottomWidth: 1,
                borderBottomColor: AppColors.LIGHTGRAY,
                paddingVertical: responsiveHeight(1),
            }}
        >
            <FlatList
                data={data}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                renderItem={({ item, index }) => {
                    const isSelected = selectedTab?.id === item.id;

                    return (
                        <TouchableOpacity
                            style={{ alignItems: 'center', }}
                            onPress={() => setSelectedTab({ id: item.id })}
                            activeOpacity={0.8}
                        >
                            {/* Text */}
                            <AppText
                                title={item.title}
                                textColor={isSelected ? AppColors.ThemeBlue : AppColors.DARKGRAY}
                                textSize={1.8}
                                textFontWeight
                                textwidth={textwidth ? textwidth : 40}
                                textAlignment={'center'}
                            />
                            <LineBreak space={0.5} />

                            {/* Animated circle indicator */}
                            <Animated.View
                                style={{
                                    width: responsiveHeight(0.7),
                                    height: responsiveHeight(0.7),
                                    borderRadius: 100,
                                    backgroundColor: isSelected
                                        ? AppColors.lightGreen
                                        : AppColors.WHITE,
                                    transform: [
                                        {
                                            scale: indicatorAnim.interpolate({
                                                inputRange: [
                                                    index - 1,
                                                    index,
                                                    index + 1,
                                                ],
                                                outputRange: [0.8, 1.3, 0.8],
                                                extrapolate: 'clamp',
                                            }),
                                        },
                                    ],
                                }}
                            />
                        </TouchableOpacity>
                    );
                }}
            />
        </View>
    );
};

export default AppointmentsTopTabs;
