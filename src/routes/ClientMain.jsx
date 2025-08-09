/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { AppColors, responsiveHeight } from '../utils';
import Home from '../screens/ClientMain/Home/Home';
import NearBy from '../screens/ClientMain/Nearby/Nearby';
import Icon from 'react-native-vector-icons/Entypo';
import { View } from 'react-native';
import LineBreak from '../components/LineBreak';
import SpecialistProfile from '../screens/ClientMain/Home/SpecialistProfile';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const ClientMain = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Main"
    >
      <Stack.Screen name="Main" component={MyTabs} />
      <Stack.Screen name="SpecialistProfile" component={SpecialistProfile} />
    </Stack.Navigator>
  );
};

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: AppColors.ThemeBlue,
        tabBarInactiveTintColor: AppColors.textColor,
        tabBarLabelStyle: {
          display: 'none',
        },
        tabBarStyle: {
          height: responsiveHeight(10),
          paddingTop: responsiveHeight(1.8),
        },
      }}
    >
      <Tab.Screen
        name={'Home'}
        component={Home}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <View style={{ alignItems: 'center' }}>
                <Icon size={25} name={'home'} color={AppColors.ThemeBlue} />
                <LineBreak space={0.5} />
                <View
                  style={{
                    width: responsiveHeight(0.7),
                    height: responsiveHeight(0.7),
                    borderRadius: 100,
                    backgroundColor: AppColors.lightGreen,
                  }}
                />
              </View>
            ) : (
              <Icon size={25} name={'home'} color={AppColors.GRAY} />
            ),
        }}
      />
      <Tab.Screen
        name={'Nearby'}
        component={NearBy}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <View style={{ alignItems: 'center' }}>
                <Icon size={25} name={'book'} color={AppColors.ThemeBlue} />
                <LineBreak space={0.5} />
                <View
                  style={{
                    width: responsiveHeight(0.7),
                    height: responsiveHeight(0.7),
                    borderRadius: 100,
                    backgroundColor: AppColors.lightGreen,
                  }}
                />
              </View>
            ) : (
              <Icon size={25} name={'book'} color={AppColors.GRAY} />
            ),
        }}
      />
      {/* <Tab.Screen
        name={ROUTES.MESSAGE}
        component={Message}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Icon size={25} name={'message1'} color={colors.primary} />
            ) : (
              <Icon size={25} name={'message1'} color={colors.textColor} />
            ),
        }}
      />
      <Tab.Screen
        name={ROUTES.ACCOUNT}
        component={Account}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Icon size={25} name={'user'} color={colors.primary} />
            ) : (
              <Icon size={25} name={'user'} color={colors.textColor} />
            ),
        }}
      /> */}
    </Tab.Navigator>
  );
}
export default ClientMain;
