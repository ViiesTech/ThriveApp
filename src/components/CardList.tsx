/* eslint-disable react-native/no-inline-styles */
// CardList.tsx
import React from 'react';
import { View, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AppImages } from '../assets/images';
import { AppColors, responsiveFontSize, responsiveHeight, responsiveWidth } from '../utils';

const cards = [
    { id: 1, type: 'add' },
    { id: 2, type: 'image', source: AppImages.visa },
    { id: 3, type: 'image', source: AppImages.master_big },
];

const CardList = () => {
    return (
        <FlatList
            data={cards}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => {
                if (item.type === 'add') {
                    return (
                        <TouchableOpacity style={styles.card}>
                            <Ionicons name="add" size={responsiveFontSize(4)} color="#fff" />
                        </TouchableOpacity>
                    );
                }
                return (
                    <View>
                        <Image
                            source={item.source}
                            style={{ width: responsiveWidth(60), height: responsiveHeight(17), borderRadius: 15 }}
                        />
                    </View>
                );
            }}
            contentContainerStyle={{ paddingHorizontal: responsiveWidth(4), gap: 10 }}
        />
    );
}

export default CardList;

const styles = StyleSheet.create({
    card: {
        width: responsiveWidth(13),
        height: responsiveHeight(17),
        borderRadius: 10,
        backgroundColor: AppColors.ThemeBlue,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
});
