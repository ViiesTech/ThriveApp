// AppInput.tsx
import React from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from '../utils';

type AppInputProps = TextInputProps & {
  label: string;
  value?: string;
};

const PaymentMethodTextInput: React.FC<AppInputProps> = ({ label, value, ...props }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        placeholderTextColor="#999"
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: responsiveWidth(3),
    paddingVertical: responsiveHeight(1),
    marginBottom: responsiveHeight(2),
  },
  label: {
    fontSize: responsiveFontSize(1.7),
    color: '#888',
    marginBottom: responsiveHeight(0.3),
  },
  input: {
    fontSize: responsiveFontSize(1.7),
    fontWeight: '500',
    color: '#000',
    padding: 0,
  },
});

export default PaymentMethodTextInput;
