/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AppColors, responsiveFontSize, responsiveHeight, responsiveWidth } from '../utils';
import AppButton from './AppButton';
import LineBreak from './LineBreak';

type Prop = {
    visible?: boolean;
    onClose?: any;
    title?: any;
    children?: any;
    dismissable?: boolean;
    width?: any;
    height?: any;
    iconName?: any;
    subtitle?: any;
    buttonText?: any;
}

export default function CenterModal({ visible, onClose, iconName = 'gps-fixed', title, subtitle, }: Prop) {
    return (
        <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
            <View style={styles.backdrop}>
                <View style={styles.modalContent}>
                    <Icon name={iconName} size={48} color="#4a90e2" style={{ marginBottom: 12 }} />
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.subtitle}>{subtitle}</Text>
                    <View>
                        <LineBreak space={3} />
                        <AppButton
                            title="Enable My Location"
                            textColor={AppColors.WHITE}
                            btnBackgroundColor={AppColors.ThemeBlue}
                            handlePress={onClose}
                            textFontWeight={false}
                            btnWidth={70}
                            textSize={1.6}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 20,
        alignItems: 'center',
        width: '80%',
    },
    title: {
        fontSize: responsiveFontSize(3),
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 6,
    },
    subtitle: {
        fontSize: 14,
        color: '#555',
        textAlign: 'center',
        marginBottom: 16,
        paddingHorizontal: responsiveWidth(6)
    },
});
