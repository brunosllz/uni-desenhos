import React from 'react';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto'
import { NativeBaseProvider } from 'native-base';
import { THEME } from './src/styles/theme';
import { Home } from './src/screens/Home';
import { Loading } from './src/components/Loading';

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  })

  return (
    <NativeBaseProvider theme={THEME}>
      {fontsLoaded ? <Home /> : <Loading />}
    </NativeBaseProvider>
  );
}