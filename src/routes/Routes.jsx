import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Auth from './Auth';
import ClientMain from './ClientMain';
import { useSelector } from 'react-redux';
import FillTheDetails from '../screens/auth/FillTheDetails';

const Stack = createStackNavigator();
const Routes = () => {
  const { token, type, user } = useSelector(state => state?.persistedData);
  const { profileCreated } = user;
  console.log('user', user);
  return (
    // <Stack.Navigator screenOptions={{ headerShown: false }}>
    //   {token ? (
    //     <Stack.Screen name="Main" component={ClientMain} />
    //   ) : (
    //     <Stack.Screen name="Auth" component={Auth} />
    //   )}
    // </Stack.Navigator>

    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!token ? (
        // 🔐 Not logged in → Auth stack
        <Stack.Screen name="Auth" component={Auth} />
      ) : type === 'Provider' && !profileCreated ? (
        // 🧩 Provider without profile → go to FillTheDetails
        <Stack.Screen name="FillTheDetails" component={FillTheDetails} />
      ) : (
        // ✅ Either Client or Provider with profile → Main app
        <Stack.Screen name="Main" component={ClientMain} />
      )}
    </Stack.Navigator>
  );
};

export default Routes;
