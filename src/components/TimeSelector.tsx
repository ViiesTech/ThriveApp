/* eslint-disable react-native/no-inline-styles */
import React, { useMemo } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import moment from 'moment';
import { AppColors, responsiveHeight, responsiveWidth } from '../utils';
import AppText from './AppTextComps/AppText';

type Prop = {
  isSelected?: any;
  setSelectedTime?: any;
};

const TimeSelector = ({ isSelected, setSelectedTime }: Prop) => {
  // useMemo so we only generate once
  const timeSlots = useMemo(() => {
    const start = moment('09:00 AM', 'hh:mm A');
    const end = moment('05:00 PM', 'hh:mm A');
    const times = [];

    while (start.isSameOrBefore(end)) {
      times.push({ time: start.format('hh:mm A') });
      start.add(30, 'minutes'); // change to 60 if you want hourly slots
    }

    return times;
  }, []);

  return (
    <View>
      <FlatList
        data={timeSlots}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 10 }}
        keyExtractor={item => item.time}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setSelectedTime(item.time)}
            style={{
              backgroundColor:
                isSelected === item.time
                  ? AppColors.ThemeBlue
                  : AppColors.inputGrayBg,
              paddingHorizontal: responsiveWidth(4),
              paddingVertical: responsiveHeight(3),
              borderRadius: 25,
            }}>
            <AppText
              title={item.time}
              textColor={
                isSelected === item.time
                  ? AppColors.WHITE
                  : AppColors.ThemeBlue
              }
              textSize={2}
              textFontWeight
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default TimeSelector;
