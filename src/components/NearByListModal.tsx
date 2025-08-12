/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import { AppColors, categories, nearbyItems, responsiveFontSize, responsiveHeight, responsiveWidth } from '../utils';
import LineBreak from './LineBreak';
import Categories from './Categories';
import NearbyOffers from './NearbyOffers';

const NearByListModal = ({ refRBSheet, }: any) => {
    return (
        <RBSheet
            ref={refRBSheet}
            openDuration={300}
            height={responsiveHeight(90)}
            useNativeDriver={false} // 🚀 must be false if draggable = true
            draggable={true}
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
            <Text style={styles.title}>Nearby Specialists List</Text>

            <LineBreak space={2} />

            <View>
                <Categories data={categories} />
            </View>
            <LineBreak space={2} />

            <ScrollView style={{ flex: 1 }} nestedScrollEnabled={true}>
                <NearbyOffers data={nearbyItems} showVertical={true} />
                <LineBreak space={4} />
            </ScrollView>

        </RBSheet>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: responsiveFontSize(2.2),
        fontWeight: '700',
        color: '#222',
        paddingHorizontal: responsiveWidth(4),
    },
});

export default NearByListModal;
