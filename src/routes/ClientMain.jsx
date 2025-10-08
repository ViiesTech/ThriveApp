/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { AppColors, responsiveFontSize, responsiveHeight } from '../utils';
import Home from '../screens/ClientMain/Home/Home';
import NearBy from '../screens/ClientMain/Nearby/Nearby';
import Icon from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { View } from 'react-native';
import LineBreak from '../components/LineBreak';
import SpecialistProfile from '../screens/ClientMain/Home/SpecialistProfile';
import MassageCategories from '../screens/ClientMain/Home/MassageCategories';
import Search from '../screens/ClientMain/Nearby/Search';
import Appointments from '../screens/ClientMain/Appointments/Appointments';
import ServiceFeedback from '../screens/ClientMain/Appointments/ServiceFeedback';
import ServiceGallery from '../screens/ClientMain/Appointments/ServiceGallery';
import BookService from '../screens/ClientMain/Appointments/BookService';
import ShopDetails from '../screens/ClientMain/Appointments/ShopDetails';
import ServiceDetails from '../screens/ClientMain/Appointments/ServiceDetails';
import ServiceMenu from '../screens/ClientMain/Appointments/ServiceMenu';
import Booking from '../screens/ClientMain/Appointments/Booking';
import BookingCheckout from '../screens/ClientMain/Appointments/BookingCheckout';
import PaymentMethod from '../screens/ClientMain/Appointments/PaymentMethod';
import Profile from '../screens/ClientMain/Profile/Profile';
import PersonalInformation from '../screens/ClientMain/Profile/PersonalInformation';
import AskQuestions from '../screens/ClientMain/Profile/AskQuestions';
import Inbox from '../screens/ClientMain/Inbox/Inbox';
import PrivateInbox from '../screens/ClientMain/Inbox/PrivateInbox';
import OpenRequestForm from '../screens/OpenRequestFlow/OpenRequestForm';
import NearbySpecialists from '../screens/OpenRequestFlow/NearbySpecialists';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProviderHome from '../screens/ProviderMain/ProviderHome';
import UserRequest from '../screens/ProviderMain/UserRequest';
import ProviderPersonalInformation from '../screens/ProviderMain/ProviderPersonalInformation';
import ProviderEditProfile from '../screens/ProviderMain/ProviderEditProfile';
import InternalNotes from '../screens/ProviderMain/InternalNotes';
import AddNewNotes from '../screens/ProviderMain/AddNewNotes';
import PrivacyPolicy from '../screens/ProviderMain/PrivacyPolicy';
import LocationInformation from '../screens/ClientMain/Home/LocationInformation';
import ClientPersonalInformation from '../screens/ClientMain/Profile/ClientPersonalInformation';
import SVGXml from '../components/SVGXML';
import { AppIcons } from '../assets/icons';

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
      <Stack.Screen name="MassageCategories" component={MassageCategories} />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="ServiceFeedback" component={ServiceFeedback} />
      <Stack.Screen name="ServiceGallery" component={ServiceGallery} />
      <Stack.Screen name="BookService" component={BookService} />
      <Stack.Screen name="ShopDetails" component={ShopDetails} />
      <Stack.Screen name="ServiceDetails" component={ServiceDetails} />
      <Stack.Screen name="ServiceMenu" component={ServiceMenu} />
      <Stack.Screen name="Booking" component={Booking} />
      <Stack.Screen name="BookingCheckout" component={BookingCheckout} />
      <Stack.Screen name="PaymentMethod" component={PaymentMethod} />
      <Stack.Screen name="PersonalInformation" component={PersonalInformation} />
      <Stack.Screen name="AskQuestions" component={AskQuestions} />
      <Stack.Screen name="PrivateInbox" component={PrivateInbox} />
      <Stack.Screen name="ProviderPersonalInformation" component={ProviderPersonalInformation} />
      <Stack.Screen name="ProviderEditProfile" component={ProviderEditProfile} />
      <Stack.Screen name="InternalNotes" component={InternalNotes} />
      <Stack.Screen name="AddNewNotes" component={AddNewNotes} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <Stack.Screen name="OpenRequestForm" component={OpenRequestForm} />
      <Stack.Screen name="NearbySpecialists" component={NearbySpecialists} />
      <Stack.Screen name="LocationInformation" component={LocationInformation} />
      <Stack.Screen name="ClientPersonalInformation" component={ClientPersonalInformation} />
    </Stack.Navigator>
  );
};

function MyTabs() {
  const [type, setType] = useState('');

  const getType = async () => {
    const userType = await AsyncStorage.getItem('type');
    setType(userType);
  }

  useEffect(() => {
    getType();
  }, [])

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
          height: responsiveHeight(11),
          paddingTop: responsiveHeight(1.8),
        },
      }}
    >
      <Tab.Screen
        name={type === 'Client' ? "Home" : "ProviderHome"}
        component={type === 'Client' ? Home : ProviderHome}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <View style={{ alignItems: 'center' }}>
                {/* <Icon size={25} name={'home'} color={AppColors.ThemeBlue} /> */}
                <SVGXml icon={AppIcons.home_blue} width={30} height={30} />
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
              // <Icon size={25} name={'home'} color={AppColors.GRAY} />
                <SVGXml icon={AppIcons.home_gray} width={30} height={30} />
            ),
        }}
      />
     {type === 'Provider' && <Tab.Screen
        name={'UserRequest'}
        component={UserRequest}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <View style={{ alignItems: 'center' }}>
                <Ionicons
                  size={responsiveFontSize(4)}
                  name={'compass'}
                  color={AppColors.ThemeBlue}
                />
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
              <Ionicons size={responsiveFontSize(4)} name={'compass'} color={'#ADB3BC'} />
            ),
        }}
      />}
      <Tab.Screen
        name={'Appointments'}
        component={Appointments}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <View style={{ alignItems: 'center' }}>
                {/* <Ionicons
                  size={20}
                  name={'calendar'}
                  color={AppColors.ThemeBlue}
                /> */}
                <SVGXml icon={AppIcons.calendar_blue} width={30} height={30} />
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
              // <Ionicons size={20} name={'calendar'} color={AppColors.GRAY} />
                <SVGXml icon={AppIcons.calendar_gray} width={30} height={30} />
            ),
        }}
      />
       <Tab.Screen
        name={'Inbox'}
        component={Inbox}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <View style={{ alignItems: 'center' }}>
                {/* <MaterialIcons size={25} name={'chat'} color={AppColors.ThemeBlue} /> */}
                <SVGXml icon={AppIcons.chat_blue} width={30} height={30} />
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
              // <MaterialIcons size={25} name={'chat'} color={AppColors.GRAY} />
                <SVGXml icon={AppIcons.chat_gray} width={30} height={30} />
            ),
        }}
      />
      <Tab.Screen
        name={'Profile'}
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <View style={{ alignItems: 'center' }}>
                {/* <Icon size={25} name={'user'} color={AppColors.ThemeBlue} /> */}
                <SVGXml icon={AppIcons.profile_blue} width={30} height={30} />
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
              // <Icon size={25} name={'user'} color={AppColors.GRAY} />
                <SVGXml icon={AppIcons.profile_gray} width={30} height={30} />
            ),
        }}
      />
    </Tab.Navigator>
  );
}
export default ClientMain;
