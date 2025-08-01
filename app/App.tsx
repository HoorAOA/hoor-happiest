
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, StyleSheet, SafeAreaView, Platform, View } from 'react-native';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import React, { Component, useEffect, useCallback } from 'react';
import SplashScreen from './splash/splashScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackParamList } from '../constants/types';
import { useColorScheme } from '../hooks/colorHooks/useColorScheme';
import { connectToDatabase, dbInitializer } from '../db/db';
import 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import LoginScreen from './login/LoginScreen';
import DrawerNavigator from '../components/DrawerNavigator';
import EventDetailsScreen from './event/EventDetailsScreen';
import { getSingleUserPreference } from '../db/sharedPreferencesHandler';
import { I18nManager } from 'react-native';
import i18n from '../localization/i18n';

const Stack = createNativeStackNavigator<StackParamList>();



function App() {
  useEffect(() => {
    const loadLanguage = async () => {
      var storedLang = 'en';
      try {
        const db = await connectToDatabase()
        storedLang = await getSingleUserPreference(db, 'app_language') ?? 'en';
      } catch (error){}
       
      const langCode = storedLang;

      i18n.locale = langCode;
      I18nManager.forceRTL(langCode === 'ar');
    };

    loadLanguage();
  }, []);

  const colorScheme = useColorScheme() === 'dark';
  const loadData = useCallback(async () => {
    try {
      const db = await connectToDatabase()
      await dbInitializer(db)
      await db.close()
    } catch (error) {
      console.error(error)
    }
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer theme={colorScheme ? DarkTheme : DefaultTheme}>
        <SafeAreaView style={styles.safeAreaStyle}>
          <Stack.Navigator initialRouteName="Splash" screenOptions={{
            headerShown: false
          }}>
            <Stack.Screen name="Splash"
              component={SplashScreen}
              options={{ headerShown: false }} />

            <Stack.Screen name="Login"
              component={LoginScreen}
              options={{ headerShown: false }} />

            <Stack.Screen name="EventDetails"
              component={EventDetailsScreen}
              options={{ headerShown: false }} />

            <Stack.Screen name="MainDrawer"
              component={DrawerNavigator}
              options={{ headerShown: false }} />

          </Stack.Navigator>
        </SafeAreaView>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  flexFull: {
    flex: 1
  },
  safeAreaStyle: {
    flex: 1,
    backgroundColor: '#ffffff'
  }
});

export default App;
