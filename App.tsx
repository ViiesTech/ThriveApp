/* eslint-disable react-native/no-inline-styles */
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes/Routes';
import { SafeAreaView, StatusBar, useColorScheme } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './src/redux/store';
import Toast from './src/components/Toast';
import SystemNavigationBar from 'react-native-system-navigation-bar';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  useEffect(() => {
    // hide nav bar when app loads
    SystemNavigationBar.stickyImmersive();
  }, []);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaView style={{
          flex: 1,
        }}>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <NavigationContainer>
            <Routes />
            <Toast position='top' />
          </NavigationContainer>
        </SafeAreaView>
      </PersistGate>
    </Provider>
  );
};

export default App;
