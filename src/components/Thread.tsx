/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import { Image, ImageSourcePropType, StyleSheet, TouchableOpacity, View } from 'react-native'
import { AppColors, responsiveHeight } from '../utils'
import LineBreak from './LineBreak'
import AppText from './AppTextComps/AppText'

type props = {
    image?: ImageSourcePropType,
    name?: string,
    message?: string,
    newMessage?: number,
    cardOnPress?: any,
}

const Thread = ({ image, name, message, newMessage, cardOnPress }: props) => {
    return (
        <TouchableOpacity style={styles.container} onPress={cardOnPress}>
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
        </TouchableOpacity>
    )
}

export default Thread

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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