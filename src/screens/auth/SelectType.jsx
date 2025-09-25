/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import AppText from '../../components/AppTextComps/AppText';
import {
  AppColors,
  responsiveHeight,
  responsiveWidth,
  typeItems,
} from '../../utils';
import LineBreak from '../../components/LineBreak';
import AppButton from '../../components/AppButton';
import SVGXml from '../../components/SVGXML';
import { AppIcons } from '../../assets/icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SelectType = () => {
  const [type, setType] = useState('Client');
  const nav = useNavigation();
  return (
    <View style={{ flex: 1, backgroundColor: AppColors.WHITE }}>
      <LineBreak space={4} />
      <AppText
        title={'Sign up as...'}
        textColor={AppColors.BLACK}
        textSize={3}
        textFontWeight
        textAlignment={'center'}
      />

      <View
        style={{
          flex: 1,
          paddingHorizontal: responsiveWidth(4),
        }}
      >
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <View>
            <FlatList
              data={typeItems}
              horizontal
              contentContainerStyle={{
                flex: 1,
                justifyContent: 'space-between',
                paddingHorizontal: responsiveWidth(5),
              }}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={{ alignItems: 'center', paddingHorizontal: responsiveWidth(5) }}
                  onPress={() => setType(item.title)}
                >
                  <SVGXml icon={item.svg} width={130} height={130} />
                  <LineBreak space={1} />
                  <SVGXml
                    icon={
                      type === item.title ? AppIcons.check : AppIcons.un_check
                    }
                    width={55}
                    height={55}
                  />
                  <LineBreak space={1} />
                  <AppText
                    title={item.title}
                    textColor={AppColors.BLACK}
                    textSize={2.5}
                    textFontWeight
                  />
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <AppButton
            title="Continue"
            textColor={AppColors.WHITE}
            btnBackgroundColor={AppColors.appGreen}
            handlePress={async () => {
              AsyncStorage.setItem('type', type);
              nav.navigate('Login', { type: type });
            }}
            textFontWeight={false}
          />
          <LineBreak space={7} />
        </View>
      </View>
    </View>
  );
};

export default SelectType;
