import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Auth from './Auth';
import ClientMain from './ClientMain';

const Stack = createStackNavigator();
const Routes = () => {
  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Auth" component={Auth} />
      <Stack.Screen name="Main" component={ClientMain} />
    </Stack.Navigator>
  );
};

export default Routes;
