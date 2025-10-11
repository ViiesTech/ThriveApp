/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
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
import { setUserType } from '../../redux/slices';
import { useDispatch } from 'react-redux';

const SelectType = () => {
  const [typeIndex, setTypeIndex] = useState(0);
  const nav = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    onSelectType(true);
  }, []);

  const onSelectType = async (initial, title, index) => {
    if (initial) {
      await dispatch(setUserType('Client'));
    } else {
      setTypeIndex(index);
      await dispatch(setUserType(title));
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: AppColors.WHITE }}>
      <LineBreak space={4} />

      <View
        style={{
          flex: 1,
          paddingHorizontal: responsiveWidth(4),
        }}
      >
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <AppText
            title={'Sign up as...'}
            textColor={AppColors.BLACK}
            textSize={3}
            textFontWeight
            textAlignment={'center'}
          />
          <LineBreak space={10} />
          <View>
            <FlatList
              data={typeItems}
              horizontal
              contentContainerStyle={{
                flex: 1,
                justifyContent: 'space-between',
                paddingHorizontal: responsiveWidth(11),
              }}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  style={{
                    alignItems: 'center',
                    // paddingHorizontal: responsiveWidth(5),
                  }}
                  onPress={() => onSelectType(false, item.title, index)}
                >
                  <SVGXml
                    icon={item.svg}
                    width={index === 0 ? 135 : 130}
                    height={index === 0 ? 135 : 130}
                  />
                  <LineBreak space={index === 0 ? 1 : 1.5} />
                  <SVGXml
                    icon={
                      typeIndex === index ? AppIcons.check : AppIcons.un_check
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
        <View style={{ flex: 0.7, justifyContent: 'flex-end' }}>
          <AppButton
            title="Continue"
            textColor={AppColors.WHITE}
            btnBackgroundColor={AppColors.appGreen}
            handlePress={async () => {
              nav.navigate('Login');
            }}
            textFontWeight={false}
          />
          <LineBreak space={10} />
        </View>
      </View>
    </View>
  );
};

export default SelectType;
