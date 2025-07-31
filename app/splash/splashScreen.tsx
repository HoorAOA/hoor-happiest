import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, Platform, Linking, ActivityIndicator, ImageBackground, BackHandler } from 'react-native';
import APPCONSTANTS from '../../constants/AppConstants';
import { CustomStatusBar } from '../../components/headers/CustomStatusBar';
import { PropsSplash } from '../../constants/types';
import DeviceInfo from 'react-native-device-info';
import ActionDialog from '../../components/dialogs/ActionDialog';
import * as Keychain from 'react-native-keychain';
import NetInfo from '@react-native-community/netinfo';
import { ThemedText } from '../../components/ThemedText';
import { ThemedView } from '../../components/ThemedView';
import { fetchConfigurations } from '../../hooks/firebase/firebaseUtils';
import Languages from '../../data/Languages';
import { connectToDatabase } from '../../db/db';
import { addLanguages } from '../../db/languagesHandler';
import { addSharedPreferencesHandler, getSingleUserPreference } from '../../db/sharedPreferencesHandler';
import UserPreference from '../../data/UserPreference';
import Images from '../../constants/Images';


const version = DeviceInfo.getVersion();
const buildNumber = DeviceInfo.getBuildNumber();

export default function SplashScreen({ navigation }: PropsSplash) {
    const [defaultLanguageId, setDefaultLanguageId] = useState("");

    useEffect(() => {
        if (defaultLanguageId && defaultLanguageId != "") {
            redirectToNextScreen()
        }
    }, [defaultLanguageId]);

    const [dialogVisible, setDialogVisible] = useState(false);
    const [dialogConfig, setDialogConfig] = useState({
        title: '',
        message: '',
        positiveButtonText : '',
        NegativeButtonText: '',
        onPositive: () => { },
        onNegative: () => { }
    });

    const redirectToNextScreen = async () => {
        const db = await connectToDatabase()
        navigation.replace('Login')
    };

    const getAppLanguages = async () => {
        try {
            const isOnline = await NetInfo.fetch().then(state => state.isConnected);

            if (!isOnline) {
                setDialogConfig({
                    title: 'No internet connection',
                    message: `No internet connection, please check your internet connection and try again.`,
                    positiveButtonText: 'Retry',
                    NegativeButtonText: '',
                    onPositive: () => {
                        setDialogVisible(false);
                        getAppLanguages()
                    },
                    onNegative: () => { BackHandler.exitApp() }
                })
                setDialogVisible(true)
                return
            }

            const { languages } = await fetchConfigurations();

            const languageList: Languages[] = [];

            for (const [name, id] of Object.entries(languages)) {
                const lang = new Languages(Number(id), name); // or reverse if needed
                languageList.push(lang);
            }

            console.log("languageList::", languageList)

            const db = await connectToDatabase()
            const addLanguagesFunc = await addLanguages(db, languageList);

            var selectedLanguage = await getSingleUserPreference(db, 'selected_language') ?? ""
            if (selectedLanguage == "") {
                await addSharedPreferencesHandler(db, [new UserPreference('selected_language', '1')]);
                selectedLanguage = '1'
            }

            setDefaultLanguageId(selectedLanguage);

        } catch (err) {
            setDialogConfig({
                title: 'Server connection error',
                message: `Could not reach configuration server. Retry?`,
                positiveButtonText: 'Retry',
                NegativeButtonText: '',
                onPositive: () => {
                    setDialogVisible(false);
                    getAppLanguages()
                },
                onNegative: () => { BackHandler.exitApp() }
            })
            setDialogVisible(true)
        }
    }

    useEffect(() => {
        getAppLanguages(); //using firebase storage
    }, []);

    return (
        <>
            <CustomStatusBar backgroundColor="#000000" barStyle="light-content" />
            <ImageBackground source={Images.ic_gradient_background} resizeMode="cover" style={styles.mainAreaStyle}>
                <ThemedView style={styles.container}>
                    <ActivityIndicator size="large" color="#ffffff" />
                    <ThemedText style={styles.centerText}>Fetching data ...</ThemedText>
                </ThemedView>
                <ThemedText style={styles.versionTextStyle}>Version {version}.{buildNumber}</ThemedText>
            </ImageBackground>
            <ActionDialog
                visible={dialogVisible}
                title={dialogConfig.title}
                message={dialogConfig.message}
                positiveText={dialogConfig.positiveButtonText}
                onPositive={() => {
                    dialogConfig.onPositive()
                }}
                negativeText={dialogConfig.NegativeButtonText}
                onNegative={() => {
                    dialogConfig.onNegative()
                }}
                onClose={() => {
                    dialogConfig.onNegative()
                }}
                dismissable={false}
            />
        </>
    );
}

const styles = StyleSheet.create({
    imageStyle: {
        resizeMode: 'contain',
        maxWidth: 250,
        minWidth: '80%',
        marginHorizontal: 25
    },
    mainAreaStyle: {
        flex: 1,
        alignItems: 'center',
        alignContent: 'center'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: 'transparent',
        marginBottom: 35
    },
    versionTextStyle: {
        fontSize: 14,
        fontWeight: 500,
        textAlign: 'center',
        color: '#ffffff',
        position: 'absolute',
        bottom: 25
    },
    centerText: {
        fontSize: 14,
        fontWeight: 500,
        textAlign: 'center',
        color: '#ffffff',
        marginTop: 10
    }
});
