/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import { View, FlatList, TouchableOpacity } from 'react-native'
import { AppColors, recentSearch, responsiveFontSize, responsiveHeight } from '../utils'
import AppText from './AppTextComps/AppText'
import Ionicons from 'react-native-vector-icons/Ionicons';

const RecentSearch = () => {
    return (
        <FlatList
            data={recentSearch}
            renderItem={({ item }) => (
                <View
                    style={{
                        flexDirection: 'row',
                        borderBottomWidth: 1,
                        borderBottomColor: AppColors.LIGHTGRAY,
                        paddingVertical: responsiveHeight(2),
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <AppText
                        title={item.title}
                        textColor={AppColors.BLACK}
                        textSize={1.8}
                    />
                    <TouchableOpacity>
                        <Ionicons
                            name="close"
                            size={responsiveFontSize(2.2)}
                            color={AppColors.GRAY}
                        />
                    </TouchableOpacity>
                </View>
            )}
        />
    )
}

export default RecentSearch