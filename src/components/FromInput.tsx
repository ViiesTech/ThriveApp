import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { AppColors, responsiveHeight, responsiveWidth } from "../utils";
import AppText from "./AppTextComps/AppText";
import LineBreak from "./LineBreak";

export default function FromInput({label, editable, value}: any) {

    return (
        <View style={styles.input}>
            <LineBreak space={1} />
            <AppText
                title={label}
                textColor={AppColors.ThemeBlue}
                textSize={1.8}
            />
            <TextInput
                placeholder=""
                editable={editable}
                placeholderTextColor="#0097A7" // cyan/blue like in your image
                value={value}
                style={{ paddingTop: responsiveHeight(0.2), paddingLeft: responsiveWidth(-1) }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    input: {
        backgroundColor: "#E0E0E0", // grey background
        borderRadius: 100,           // pill shape
        paddingHorizontal: responsiveWidth(4),
        width: responsiveWidth(32),
        height: responsiveHeight(7),                 // same height as your screenshot
    },
});
