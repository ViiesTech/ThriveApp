/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { AppColors, responsiveWidth } from '../utils';
import AppText from './AppTextComps/AppText';

const DistanceRangeSlider = () => {
    const [range, setRange] = useState([0, 10]); // initial values

    return (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <MultiSlider
                values={range}
                sliderLength={330}
                onValuesChange={setRange}
                min={0}
                max={50}
                step={1}
                selectedStyle={{
                    backgroundColor: '#00a9c7',
                }}
                unselectedStyle={{
                    backgroundColor: '#d3d3d3',
                }}
                markerStyle={{
                    height: 20,
                    width: 20,
                    backgroundColor: '#00a9c7',
                }}
            />
            <View style={{ width: responsiveWidth(90), flexDirection: 'row', justifyContent: 'space-between' }}>
                <AppText
                    title={`${range[0]} km`}
                    textColor={AppColors.GRAY}
                    textSize={1.8}
                />
                <AppText
                    title={`${range[1]} km`}
                    textColor={AppColors.GRAY}
                    textSize={1.8}
                />
            </View>
        </View>
    );
};

export default DistanceRangeSlider;
