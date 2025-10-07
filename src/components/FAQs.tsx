import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, LayoutAnimation, Platform, UIManager } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo'; // Chevron icon
import { AppColors, responsiveFontSize, responsiveHeight, responsiveWidth } from '../utils';
import LineBreak from './LineBreak';

// Enable smooth animation for Android
if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const FAQs = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqData = [
    {
      question: 'What is i-thriv?',
      answer:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
      question: 'How to make a payment?',
      answer: 'You can make a payment via credit card, PayPal, or bank transfer.',
    },
    {
      question: 'How do I cancel booking?',
      answer: 'You can cancel bookings from the My Bookings section in the app.',
    },
    {
      question: 'How do I delete my account?',
      answer: 'Please contact support to permanently delete your account.',
    },
    {
      question: 'How do I exit the app?',
      answer: 'Simply close the app from the recent apps screen.',
    },
  ];

  const toggleFAQ = (index) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setActiveIndex(activeIndex === index ? null : index);
  };

  const renderItem = ({ item, index }) => {
    const isActive = activeIndex === index;

    return (
      <View style={styles.card}>
        <TouchableOpacity
          style={styles.row}
          onPress={() => toggleFAQ(index)}
          activeOpacity={0.8}
        >
          <Text style={styles.question}>{item.question}</Text>
          <Icon
            name="chevron-small-down"
            size={22}
            color="#0ea5e9"
            style={{
              transform: [{ rotate: isActive ? '180deg' : '0deg' }],
            }}
          />
        </TouchableOpacity>

        {isActive && (
          <>
            <View style={styles.separator} />
            <Text style={styles.answer}>{item.answer}</Text>
          </>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={faqData}
        renderItem={renderItem}
        ItemSeparatorComponent={<LineBreak space={2} />}
        keyExtractor={(_, i) => i.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default FAQs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingHorizontal: responsiveWidth(4),
    paddingVertical: responsiveHeight(2),
    borderWidth: 1,
    borderColor: AppColors.GRAY,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  question: {
    fontSize: responsiveFontSize(2),
    fontWeight: '600',
    color: '#000',
  },
  separator: {
    height: responsiveHeight(0.2),
    backgroundColor: '#0ea5e9',
    marginVertical: 8,
  },
  answer: {
    fontSize: responsiveFontSize(1.8),
    color: '#555',
    lineHeight: 20,
  },
});
