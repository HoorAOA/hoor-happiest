import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Ionicons from '@react-native-vector-icons/ionicons';
import HomeScreen from '../app/home/HomeScreen';
import ActionDialog from '../components/dialogs/ActionDialog';
import { useState } from 'react';
import { connectToDatabase } from '../db/db';
import * as Keychain from 'react-native-keychain';
import UserPreference from '../data/UserPreference';
import { addSharedPreferencesHandler } from '../db/sharedPreferencesHandler';
import { PropsHome } from '../constants/types';
import ProfileScreen from '../app/profile/ProfileScreen';

const Drawer = createDrawerNavigator();

function DrawerNavigator({ navigation }: any) {
  const [dialogVisible, setDialogVisible] = useState(false);

  const clearUserData = async () => {
    const db = await connectToDatabase()
    await addSharedPreferencesHandler(db,
      [new UserPreference('email', "")
        , new UserPreference('mobile', "")
        , new UserPreference('userName', "")
        , new UserPreference('is_logged_in', 'false')
      ]);

    setDialogVisible(false)
    navigation.replace('Login')
  }

  return (
    <>
      <Drawer.Navigator initialRouteName='Home' screenOptions={{
        headerShown: false,
        drawerContentStyle: { backgroundColor: '#ffffff' },
        drawerActiveBackgroundColor: 'transparent',
        drawerActiveTintColor: "#0074BA",
        drawerInactiveTintColor: "#60636A"
      }}>
        <Drawer.Screen name="Home" component={HomeScreen} options={{ drawerIcon: ({ focused, color, size }: { focused: any, color: any, size: any }) => <Ionicons color={color} size={20} name='home' /> }} />

        <Drawer.Screen name="Profile" component={ProfileScreen} options={{ drawerIcon: ({ focused, color, size }) => <Ionicons color={color} size={20} name='person' /> }} />

        <Drawer.Screen
          name="Logout"
          component={HomeScreen}
          options={{ drawerIcon: ({ focused, color, size }: { focused: any, color: any, size: any }) => <Ionicons color={color} size={20} name='log-out' /> }}
          listeners={() => ({
            drawerItemPress: (e: any) => {
              e.preventDefault();
              setDialogVisible(true);
            },
          })} />
      </Drawer.Navigator>
      <ActionDialog
        visible={dialogVisible}
        title='Logout'
        message='Are you sure you want to logout'
        positiveText='Yes'
        negativeText='No'
        onPositive={() => {
          clearUserData()
        }}
        onNegative={() => {
          setDialogVisible(false)
        }}
        onClose={() => {
          setDialogVisible(false)
        }}
        dismissable={false}
      />
    </>
  );
}

export default DrawerNavigator;
