import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, usePathname } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Text } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RootSiblingParent } from 'react-native-root-siblings';
import { showToast } from '@/utils';


//Intercept all requests
const showErrorMessages = (queryClient: QueryClient) => {
  queryClient.setDefaultOptions({
    queries: {
      throwOnError(error: any) {
        let _error = error?.response?.data;
        let error_msg = `${Object.keys(_error || {})[0]?.toString()}: ${Object.values(_error || {})[0]?.toString()}`;
        showToast(error_msg || "An error occured.", "error");  
        return false;
      },
    },
    mutations: {
      onError(error: any) {
        let _error = error?.response?.data;
        console.log(error)
        let error_msg = `${Object.keys(_error)[0]?.toString()}: ${Object.values(_error)[0]?.toString()}`;
        showToast(error_msg || "An error occured.", "error");  
      },
    },
  });

  
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
   showErrorMessages(queryClient);
  }, [])
  

  if (!loaded) {
    return null;
  }


  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <QueryClientProvider client={queryClient}>
        <GestureHandlerRootView>
        <RootSiblingParent>
          <SafeAreaProvider>
            <Stack initialRouteName='index' screenOptions={{
              headerShown: false
            }}>
              <Stack.Screen name="index" options={{
                headerShown: false,
              }} />
              {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> */}
              <Stack.Screen name="+not-found" />
            </Stack>
          </SafeAreaProvider>
          </RootSiblingParent>
        </GestureHandlerRootView>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
