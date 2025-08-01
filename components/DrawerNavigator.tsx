import * as React from 'react';
import { Modal, ScrollView, StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Ionicons from '@react-native-vector-icons/ionicons';
import HomeScreen from '../app/home/HomeScreen';
import ActionDialog from '../components/dialogs/ActionDialog';
import { useState, useEffect } from 'react';
import { connectToDatabase } from '../db/db';
import UserPreference from '../data/UserPreference';
import { addSharedPreferencesHandler } from '../db/sharedPreferencesHandler';
import ProfileScreen from '../app/profile/ProfileScreen';
import { getLanguages } from '../db/languagesHandler';
import Languages from '../data/Languages';
import { I18nManager } from 'react-native';
import I18n from '../localization/i18n';
import RNRestart from 'react-native-restart';

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

  //load languages
  const [languageDialogVisible, setLanguageDialogVisible] = useState(false);
  const [languages, setLanguages] = useState<Languages[]>([]);

  useEffect(() => {
    const loadLanguages = async () => {
      try {
        const db = await connectToDatabase();
        const langs = await getLanguages(db);
        setLanguages(langs);
      } catch (err) {
        console.error("Failed to load languages", err);
      }
    }
    loadLanguages()
  }, [])

  const handleLanguageSelect = async (lang: Languages) => {
    try {
      console.log("language:::", `${lang.language_id === 'ar'}`)
      I18nManager.forceRTL(lang.language_id === 'ar');
      I18n.locale = lang.language_id;

      const db = await connectToDatabase();
      await addSharedPreferencesHandler(db, [new UserPreference('app_language', lang.language_id)]);

      setLanguageDialogVisible(false);
      RNRestart.Restart(); 
    } catch (error) {
      console.error("Failed to set language", error);
    }
  };

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
          name="Select Language"
          component={HomeScreen}
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name="language" color={color} size={20} />
            ),
          }}
          listeners={() => ({
            drawerItemPress: (e) => {
              e.preventDefault();
              setLanguageDialogVisible(true);
            },
          })}
        />

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
      <Modal
        visible={languageDialogVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setLanguageDialogVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.languageModal}>
            <Text style={styles.languageTitle}>Select Language</Text>

            <ScrollView style={{ maxHeight: 300 }}>
              {languages.map((lang) => (
                <TouchableOpacity
                  key={lang.language_id}
                  style={styles.languageOption}
                  onPress={() => handleLanguageSelect(lang)}
                >
                  <Text style={styles.languageText}>{lang.language_name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: '#00000099',
    justifyContent: 'center',
    alignItems: 'center',
  },
  languageModal: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    elevation: 5,
  },
  languageTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  languageOption: {
    paddingVertical: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  languageText: {
    fontSize: 16,
  },
  cancelText: {
    color: '#0074BA',
    textAlign: 'center',
    marginTop: 15,
    fontSize: 16,
  },
});

export default DrawerNavigator;
