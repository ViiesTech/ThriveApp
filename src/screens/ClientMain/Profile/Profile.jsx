/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { View, Image, FlatList, TouchableOpacity, Switch } from 'react-native';
import Container from '../../../components/Container';
import AppHeader from '../../../components/AppHeader';
import {
  AppColors,
  moreItem,
  moreItemClient,
  moreItemProvider,
  myAccount,
  notifications,
  responsiveHeight,
  responsiveWidth,
  specialistMyAccount,
  userMyAccount,
} from '../../../utils';
import { AppImages } from '../../../assets/images';
import AppText from '../../../components/AppTextComps/AppText';
import LineBreak from '../../../components/LineBreak';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SVGXml from '../../../components/SVGXML';

const Profile = () => {
  const nav = useNavigation();
  const [type, setType] = useState('');
  const [switchStates, setSwitchStates] = useState({
    1: true, // id: initialValue
    2: false,
    3: true,
  });

  const toggleSwitch = (id, newValue) => {
    setSwitchStates(prev => ({ ...prev, [id]: newValue }));
  };

  const getType = async () => {
    const userType = await AsyncStorage.getItem('type');
    setType(userType);
  };

  useEffect(() => {
    getType();
  }, []);

  return (
    <Container style={{ marginBottom: responsiveHeight(-6) }}>
      <AppHeader heading={'Profile'} />
      <View style={{ paddingHorizontal: responsiveWidth(4) }}>
        <View style={{ alignItems: 'center' }}>
          <Image
            source={AppImages.profile}
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
          data={type === 'Client' ? userMyAccount : specialistMyAccount}
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
                } else if (type === 'Client' && item.id == 3) {
                  nav.navigate('Appointments');
                } else if (type === 'Provider' && item.id == 4) {
                  nav.navigate('Appointments');
                }
              }}
            >
              {/* {item.icon && item.icon} */}
              <SVGXml icon={item.icon} width={25} height={25} />
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
                {/* {item.icon && item.icon} */}
                <SVGXml icon={item.icon} width={25} height={25} />
                <AppText
                  title={item.title}
                  textColor={AppColors.BLACK}
                  textSize={1.8}
                  textFontWeight={item.id == 1}
                />
              </View>
              {item.rightIcon && (
                <Switch
                  value={switchStates[item.id] ?? false}
                  onValueChange={val => toggleSwitch(item.id, val)}
                />
              )}
            </TouchableOpacity>
          )}
        />

        <LineBreak space={3} />

        <FlatList
          data={type === 'Client' ? moreItemClient : moreItemProvider}
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
                } else if (item.id == 4 && type === 'Client') {
                  nav.navigate('Auth');
                  AsyncStorage.clear();
                }else if (item.id == 3 && type === 'Provider') {
                  nav.navigate('Auth');
                  AsyncStorage.clear();
                }
              }}
            >
              {/* {item.icon && item.icon} */}
              <SVGXml icon={item.icon} width={25} height={25} />
              <AppText
                title={item.title}
                textColor={item.id == 4 && type === 'Client' || item.id == 3 && type === 'Provider' ? AppColors.RED_COLOR : AppColors.BLACK}
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
