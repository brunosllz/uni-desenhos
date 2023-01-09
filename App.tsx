import React from 'react';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto'
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider, StatusBar } from 'native-base';
import { THEME } from './src/styles/theme';

import { Loading } from './src/components/Loading';
import { Routes } from './src/routes';

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  })

  return (
    <NativeBaseProvider theme={THEME}>
      <NavigationContainer>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
        {fontsLoaded ? <Routes /> : <Loading />}

      </NavigationContainer>
    </NativeBaseProvider>
  );
}