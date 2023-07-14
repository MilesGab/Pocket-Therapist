import { Stack } from 'expo-router';
import { useCallback, useEffect } from 'react';
import { useFonts } from 'expo-font';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

const Layout = () => {
  const loadFonts = async () => {
    await Font.loadAsync({
      DMBold: require('../assets/fonts/DMSans-Bold.ttf'),
      DMMedium: require('../assets/fonts/DMSans-Medium.ttf'),
      DMRegular: require('../assets/fonts/DMSans-Regular.ttf'),
    });
    await SplashScreen.hideAsync();
  };

  useEffect(() => {
    loadFonts();
  }, []);

  return <Stack />;
};

export default Layout;