/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import { Image, ImageSourcePropType, StyleSheet, TouchableOpacity, View } from 'react-native'
import { AppColors, responsiveFontSize, responsiveHeight, responsiveWidth } from '../utils'
import LineBreak from './LineBreak'
import AppText from './AppTextComps/AppText'
import Feather from 'react-native-vector-icons/Feather';

type props = {
    image?: ImageSourcePropType,
    name?: string,
    message?: string,
    newMessage?: number,
    cardOnPress?: any,
    onLongPress?: any,
    selectedChat?: any,
}

const Thread = ({ image, name, message, newMessage, cardOnPress, onLongPress, selectedChat }: props) => {
    return (
        <TouchableOpacity
            style={[
                styles.container,
                {
                    backgroundColor: selectedChat
                        ? AppColors.lightestBlue
                        : AppColors.WHITE,
                },
            ]}
            onPress={cardOnPress}
            onLongPress={onLongPress}
            activeOpacity={0.8}
        >
            <View style={styles.row}>
                {/* Left side: profile */}
                <Image source={image} style={styles.imageStyle} />

                {/* Middle: name and message */}
                <View style={styles.textContainer}>
                    <AppText
                        title={name}
                        textColor={AppColors.BLACK}
                        textSize={2.2}
                        textFontWeight
                    />
                    <AppText
                        title={message}
                        textColor={AppColors.GRAY}
                        textSize={1.8}
                        numberOfLines={1}
                    />
                </View>

                {/* Right side: time + badge */}
                <View style={styles.rightContainer}>
                    <AppText
                        title={'11.32 PM'}
                        textColor={'#ADB3BC'}
                        textSize={1.5}
                    />
                    {newMessage && (
                        <View style={styles.messageCircle}>
                            <AppText
                                title={newMessage}
                                textColor={AppColors.WHITE}
                                textSize={1.6}
                            />
                        </View>
                    )}
                    {selectedChat &&
                        (<View style={styles.messageCircle}> <Feather name="check" size={responsiveFontSize(1.6)} color={AppColors.WHITE} /> </View>)}
                </View>
            </View>
        </TouchableOpacity>

    )
}

export default Thread

const styles = StyleSheet.create({
    container: {
        paddingVertical: responsiveHeight(1.8),
        paddingHorizontal: responsiveWidth(4),
        borderBottomWidth: 1,
        borderBottomColor: '#E8E8E8',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    imageStyle: {
        width: responsiveWidth(12),
        height: responsiveWidth(12),
        borderRadius: responsiveWidth(6),
    },
    textContainer: {
        flex: 1,
        marginLeft: responsiveWidth(5),
    },
    rightContainer: {
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        height: responsiveHeight(6),
    },
    messageCircle: {
        backgroundColor: '#34C759', // WhatsApp-like green
        borderRadius: responsiveWidth(3),
        minWidth: responsiveWidth(5.5),
        height: responsiveWidth(5.5),
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: responsiveHeight(0.5),
    },
});
