/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import AppText from './AppTextComps/AppText'
import { AppColors, responsiveFontSize, responsiveHeight, responsiveWidth } from '../utils'
import Ionicons from 'react-native-vector-icons/Ionicons';
import AppButton from './AppButton';
import { useNavigation } from '@react-navigation/native';

type Prop = {
    bookNowOnPress?:any;
    borderWidth?:any;
    btnText?:any;
    paddingHorizontal?:any;
}

const ServiceGalleryFooter = ({bookNowOnPress, borderWidth, btnText, paddingHorizontal}: Prop) => {
    const nav = useNavigation();
    return (
        <View style={{ backgroundColor: AppColors.WHITE, borderWidth: borderWidth ? borderWidth : 1, borderColor: AppColors.LIGHTGRAY, paddingVertical: responsiveHeight(3), paddingHorizontal: paddingHorizontal ? paddingHorizontal : responsiveWidth(4) }}>
            <View 
            // style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
                {/* <View>
                    <View style={{ flexDirection: 'row' }}>
                        <AppText
                            title={'Total '}
                            textColor={AppColors.BLACK}
                            textSize={1.8}
                            textFontWeight
                        >
                            <AppText
                                title={'(1 Service)'}
                                textColor={AppColors.BLACK}
                                textSize={1.8}
                            />
                        </AppText>
                    </View>

                    <View>
                        <AppText
                            title={'$40 '}
                            textColor={AppColors.BLACK}
                            textSize={2}
                            textFontWeight
                        >
                            <AppText
                                title={'$10'}
                                textColor={AppColors.BLACK}
                                textSize={1.6}
                                textDecorationLine="line-through"
                            />
                        </AppText>
                    </View>
                </View> */}

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <TouchableOpacity style={styles.iconContainer} onPress={() => nav.navigate("PrivateInbox")}>
                        <Ionicons
                            name="chatbubble-ellipses-sharp"
                            size={responsiveFontSize(3)}
                            color={AppColors.ThemeBlue}
                        />
                    </TouchableOpacity>

                    <AppButton
                        title={btnText ? btnText : "Book Now"}
                        textColor={AppColors.WHITE}
                        btnBackgroundColor={AppColors.ThemeBlue}
                        handlePress={bookNowOnPress}
                        textSize={2}
                        btnWidth={72}
                        textFontWeight={false}
                    />
                </View>
            </View>
        </View>
    )
}

export default ServiceGalleryFooter;

const styles = StyleSheet.create({
    iconContainer: {
        width: responsiveHeight(6),
        height: responsiveHeight(6),
        // backgroundColor: AppColors.LIGHTESTGRAY,
        borderWidth: 1,
        borderColor: AppColors.ThemeBlue,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
});