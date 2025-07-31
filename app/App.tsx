
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, StyleSheet, SafeAreaView, Platform, View } from 'react-native';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import React, { Component, useEffect, useCallback } from 'react';
import SplashScreen from './splash/splashScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackParamList } from '../constants/types';
import { useColorScheme } from '../hooks/colorHooks/useColorScheme';
import { connectToDatabase, dbInitializer } from '../db/db';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import LoginScreen from './login/LoginScreen';

const Stack = createNativeStackNavigator<StackParamList>();

function App() {
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
