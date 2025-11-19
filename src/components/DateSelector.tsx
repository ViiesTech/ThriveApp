/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useRef, useState } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import moment from 'moment';
import { AppColors, responsiveHeight, responsiveWidth } from '../utils';
import AppText from './AppTextComps/AppText';
import LineBreak from './LineBreak';

type Props = {
  data?: any;
  isSelected?: any;
  setSelectedDate?: any;
};

const DateSelector = ({ data, isSelected, setSelectedDate }: Props) => {
  const flatListRef = useRef<FlatList>(null);
  const [hasScrolled, setHasScrolled] = useState(false);

  const scrollToCurrentDate = () => {
    const today = moment();
    const index = data?.findIndex(item => item.isSame(today, 'day'));
    if (index !== -1 && flatListRef.current) {
      flatListRef.current.scrollToIndex({ index, animated: true });
      setHasScrolled(true);
    }
  };

  // Scroll when data changes (month changes)
  useEffect(() => {
    if (data?.length) {
      setHasScrolled(false);
    }
  }, [data]);

  // Scroll after FlatList fully renders
  const handleContentChange = () => {
    if (!hasScrolled) {
      scrollToCurrentDate();
    }
  };

  return (
    <View>
      <FlatList
        ref={flatListRef}
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.format('YYYY-MM-DD')}
        contentContainerStyle={{ gap: 10 }}
        onContentSizeChange={handleContentChange}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setSelectedDate(item)}
            style={{
              backgroundColor: item.isSame(isSelected, 'day')
                ? AppColors.ThemeBlue
                : AppColors.inputGrayBg,
              justifyContent: 'center',
              alignItems: 'center',
              width: responsiveWidth(14),
              height: responsiveHeight(9),
              borderRadius: 40,
            }}>
            <AppText
              title={item.format('ddd')}
              textColor={
                item.isSame(isSelected, 'day')
                  ? AppColors.WHITE
                  : AppColors.BLACK
              }
              textSize={1.6}
            />
            <LineBreak space={0.5} />
            <AppText
              title={item.format('D')}
              textColor={
                item.isSame(isSelected, 'day')
                  ? AppColors.WHITE
                  : AppColors.BLACK
              }
              textSize={2.5}
              textFontWeight
            />
          </TouchableOpacity>
        )}
        onScrollToIndexFailed={() => {}}
      />
    </View>
  );
};

export default DateSelector;
