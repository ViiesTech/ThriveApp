/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import LineBreak from './LineBreak';
import { AppColors, categories, datesItem, responsiveFontSize, responsiveHeight, responsiveWidth } from '../utils';
import RBSheet from 'react-native-raw-bottom-sheet';
import AppText from './AppTextComps/AppText';
import Feather from 'react-native-vector-icons/Feather';
import Categories from './Categories';
import AppButton from './AppButton';
import DistanceRangeSlider from './DistanceRangeSlider';
import DateSelector from './DateSelector';

const FilterModal = ({ refRBSheet }: any) => {
    return (
        <RBSheet
            ref={refRBSheet}
            openDuration={300}
            height={responsiveHeight(75)}
            useNativeDriver={false} // 🚀 must be false if draggable = true
            draggable={true}
            closeOnPressMask
            // dragOnContent={true} // optional: allow dragging anywhere in content
            customStyles={{
                wrapper: {
                    backgroundColor: 'rgba(0,0,0,0.4)',
                },
                container: {
                    borderTopLeftRadius: 30,
                    borderTopRightRadius: 30,
                    backgroundColor: AppColors.WHITE,
                },
            }}
            customModalProps={{
                animationType: 'slide',
                statusBarTranslucent: true,
            }}
        >
            <LineBreak space={1} />

            <View style={{ paddingHorizontal: responsiveWidth(4) }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity onPress={() => refRBSheet.current?.close()}>
                        <AppText
                            title={'Cancel'}
                            textColor={AppColors.ThemeBlue}
                            textSize={1.8}
                            textFontWeight
                        />
                    </TouchableOpacity>

                    <AppText
                        title={'Filter'}
                        textColor={AppColors.BLACK}
                        textSize={1.8}
                        textFontWeight
                    />

                    <TouchableOpacity onPress={() => refRBSheet.current?.close()}>
                        <AppText
                            title={'Reset'}
                            textColor={AppColors.RED_COLOR}
                            textSize={1.8}
                            textFontWeight
                        />
                    </TouchableOpacity>
                </View>

                <LineBreak space={3} />
                <AppText
                    title={'Available on'}
                    textColor={AppColors.BLACK}
                    textSize={1.8}
                    textFontWeight
                />
                <LineBreak space={2} />

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <TouchableOpacity>
                        <Feather
                            name="chevron-left"
                            size={responsiveFontSize(3)}
                            color={AppColors.ThemeBlue}
                        />
                    </TouchableOpacity>

                    <AppText
                        title={'March, 2021'}
                        textColor={AppColors.BLACK}
                        textSize={1.8}
                        textFontWeight
                    />

                    <TouchableOpacity>
                        <Feather
                            name="chevron-right"
                            size={responsiveFontSize(3)}
                            color={AppColors.ThemeBlue}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            <LineBreak space={3} />

            <DateSelector />
            <LineBreak space={3} />

            <View style={{ paddingHorizontal: responsiveWidth(4) }}>
                <AppText
                    title={'Service'}
                    textColor={AppColors.BLACK}
                    textSize={1.8}
                    textFontWeight
                />
                <LineBreak space={2} />

                <View>
                    <Categories data={categories} search={'search'} />
                </View>
                <LineBreak space={2} />

                <DistanceRangeSlider />

                <LineBreak space={10} />

                <AppButton
                    title="Show Result"
                    textColor={AppColors.WHITE}
                    btnBackgroundColor={AppColors.ThemeBlue}
                    handlePress={() => { }}
                    textFontWeight={false}
                />
            </View>
        </RBSheet>
    )
}

export default FilterModal;