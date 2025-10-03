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
        <TouchableOpacity style={[styles.container, {backgroundColor: selectedChat ? AppColors.lightestBlue : AppColors.WHITE}]} onPress={cardOnPress} onLongPress={onLongPress}>
            <View style={{ flexDirection: 'row', gap: 14, alignItems: 'center' }}>
                <Image source={image} style={styles.imageStyle} />
                <View>
                    <AppText
                        title={name}
                        textColor={AppColors.BLACK}
                        textSize={2.4}
                        textFontWeight
                    />
                    <LineBreak space={0.5} />
                    <AppText
                        title={message}
                        textColor={AppColors.GRAY}
                        textSize={1.8}
                        textwidth={59}
                        numberOfLines={1}
                    />
                </View>
            </View>
            {newMessage &&
                <View style={styles.messageCircle}>
                    <AppText
                        title={newMessage}
                        textColor={AppColors.WHITE}
                        textSize={2.2}
                    />
                </View>
            }

            {
                selectedChat &&
                <View style={styles.messageCircle}>
                    <Feather
                        name="check"
                        size={responsiveFontSize(2)}
                        color={AppColors.WHITE}
                    />
                </View>
            }
        </TouchableOpacity>
    )
}

export default Thread

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: responsiveWidth(4),
        paddingVertical: responsiveHeight(1),
    },
    imageStyle: {
        height: responsiveHeight(8),
        width: responsiveHeight(8),
        borderRadius: 100
    },
    messageCircle: {
        backgroundColor: AppColors.lightGreen,
        height: responsiveHeight(3),
        alignItems: 'center',
        justifyContent: 'center',
        width: responsiveHeight(3),
        borderRadius: 100
    }
})