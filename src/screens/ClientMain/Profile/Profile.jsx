/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Image, FlatList, TouchableOpacity } from 'react-native';
import Container from '../../../components/Container';
import AppHeader from '../../../components/AppHeader';
import {
  AppColors,
  moreItem,
  myAccount,
  notifications,
  responsiveHeight,
  responsiveWidth,
} from '../../../utils';
import { AppImages } from '../../../assets/images';
import AppText from '../../../components/AppTextComps/AppText';
import LineBreak from '../../../components/LineBreak';
import { useNavigation } from '@react-navigation/native';

const Profile = () => {
  const nav = useNavigation();
  return (
    <Container>
      <AppHeader heading={'Profile'} />
      <View style={{ paddingHorizontal: responsiveWidth(4) }}>
        <View style={{ alignItems: 'center' }}>
          <Image
            source={AppImages.on_boarding1}
            style={{ width: 80, height: 80, borderRadius: 100 }}
          />
          <LineBreak space={1.2} />
          <AppText
            title={'Samantha Wilson'}
            textColor={AppColors.BLACK}
            textSize={1.8}
            textFontWeight
          />
          <AppText
            title={'samanthawilson@gmail.com'}
            textColor={AppColors.GRAY}
            textSize={1.8}
          />
        </View>

        <LineBreak space={2} />

        <FlatList
          data={myAccount}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingBottom: item.id == 1 ? responsiveHeight(1.5) : 0,
                gap: 10,
                marginVertical: item.id == 1 ? 0 : responsiveHeight(0.5),
              }}
              onPress={() => {
                if (item.navTo) {
                  nav.navigate(item.navTo);
                }
              }}
            >
              {item.icon && item.icon}
              <AppText
                title={item.title}
                textColor={AppColors.BLACK}
                textSize={1.8}
                textFontWeight={item.id == 1}
              />
            </TouchableOpacity>
          )}
        />

        <LineBreak space={3} />

        <FlatList
          data={notifications}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingBottom: item.id == 1 ? responsiveHeight(1.5) : 0,
                gap: 10,
                marginVertical: item.id == 1 ? 0 : responsiveHeight(0.5),
              }}
              onPress={() => {
                if (item.navTo) {
                  nav.navigate(item.navTo);
                }
              }}
            >
              <View
                style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}
              >
                {item.icon && item.icon}
                <AppText
                  title={item.title}
                  textColor={AppColors.BLACK}
                  textSize={1.8}
                  textFontWeight={item.id == 1}
                />
              </View>
              {item.rightIcon && item.rightIcon}
            </TouchableOpacity>
          )}
        />

        <LineBreak space={3} />

        <FlatList
          data={moreItem}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingBottom: item.id == 1 ? responsiveHeight(1.5) : 0,
                gap: 10,
                marginVertical: item.id == 1 ? 0 : responsiveHeight(0.5),
              }}
              onPress={() => {
                if (item.navTo) {
                  nav.navigate(item.navTo);
                }
              }}
            >
              {item.icon && item.icon}
              <AppText
                title={item.title}
                textColor={item.id == 3 ? AppColors.RED_COLOR : AppColors.BLACK}
                textSize={1.8}
                textFontWeight={item.id == 1}
              />
            </TouchableOpacity>
          )}
        />
      </View>
    </Container>
  );
};

export default Profile;
