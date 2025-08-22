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
  const [type, setType] = useState('User');
  const nav = useNavigation();
  return (
    <View style={{ flex: 1, backgroundColor: AppColors.WHITE }}>
      <LineBreak space={4} />
      <AppText
        title={'Select Type'}
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
                  style={{ alignItems: 'center' }}
                  onPress={() => setType(item.title)}
                >
                  <View
                    style={{
                      borderWidth: 1,
                      borderColor: AppColors.LIGHTGRAY,
                      borderRadius: 10,
                      width: responsiveWidth(35),
                      height: responsiveHeight(18),
                      justifyContent: 'center',
                      alignItems: 'center',
                      position: 'relative',
                    }}
                  >
                    <SVGXml icon={item.svg} width={100} height={100} />
                    <SVGXml
                      icon={
                        type === item.title ? AppIcons.check : AppIcons.un_check
                      }
                      width={55}
                      height={55}
                      style={{
                        position: 'absolute',
                        bottom: responsiveHeight(-2.5),
                      }}
                    />
                  </View>
                  <LineBreak space={4} />
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
            btnBackgroundColor={AppColors.ThemeBlue}
            handlePress={async () => {
              nav.navigate('Login');
              AsyncStorage.setItem('type', type);
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
