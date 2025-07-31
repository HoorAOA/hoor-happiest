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
import Images from '../../constants/Images';
// import { fetchConfigurations } from '../../hooks/firebase/firebaseUtils';
// import Languages from '../../data/Languages';
// import { connectToDatabase } from '../../db/db';
// import { addLanguages } from '../../db/languagesHandler';
// import { addSharedPreferencesHandler, getSingleUserPreference } from '../../db/sharedPreferencesHandler';
// import UserPreference from '../../data/UserPreference';
// import Images from '../../constants/Images';


const version = DeviceInfo.getVersion();
const buildNumber = DeviceInfo.getBuildNumber();

export default function SplashScreen({ navigation }: PropsSplash) {
    // const [languageId, setLanguageId] = useState("");
    // const { labelsData, isLoadingLabels, errorLabels, refetchLabels } = labelsUseFetch({ languageId: languageId ?? "" });

    // useEffect(() => {
    //     refetchLabels()
    // }, [languageId]);

    // useEffect(() => {
    //     if (labelsData) {
    //         redirectToNextScreen()
    //     }
    // }, [labelsData]);

    // useEffect(() => {
    //     if (errorLabels) {
    //         setDialogConfig({
    //             title: 'Failure',
    //             message: `Failed to fetch labels`,
    //             positiveButtonText: 'Retry',
    //             NegativeButtonText: '',
    //             onPositive: () => {
    //                 setDialogVisible(false)
    //                 setLanguageId("")
    //                 setLanguageId(languageId)
    //             },
    //             onNegative: () => { BackHandler.exitApp() }
    //         })
    //         setDialogVisible(true)
    //     }
    // }, [errorLabels])

    const [dialogVisible, setDialogVisible] = useState(false);
    const [dialogConfig, setDialogConfig] = useState({
        title: '',
        message: '',
        positiveButtonText : '',
        NegativeButtonText: '',
        onPositive: () => { },
        onNegative: () => { }
    });

    // const isUpdateRequired = (firebaseVersion: string, firebaseBuild: string) => {
    //     const parsedFirebaseVersion = parseFloat(`${firebaseVersion}`);
    //     const parsedFirebaseBuild = parseInt(`${firebaseBuild}`);
    //     const parsedLocalVersion = parseFloat(`${version}`);
    //     const parsedLocalBuild = parseInt(`${buildNumber}`);

    //     return parsedFirebaseVersion > parsedLocalVersion
    //         || (parsedFirebaseVersion === parsedLocalVersion && parsedFirebaseBuild > parsedLocalBuild);
    // };

    // const redirectToNextScreen = async () => {
    //     const db = await connectToDatabase()
    //     var fetchIsLoggedIn = await getSingleUserPreference(db, 'is_logged_in')
      
    //     if (fetchIsLoggedIn == "true") {
    //         navigation.replace('Drawer')
    //     } else {
    //         navigation.replace('Login')
    //     }
    // };

    // const redirectToStore = () => {
    //     const url = Platform.select({
    //         ios: `https://apps.apple.com/app/id${DeviceInfo.getBundleId()}`,
    //         android: `https://play.google.com/store/apps/details?id=${DeviceInfo.getBundleId()}`,
    //     });

    //     if (url) {
    //         Linking.openURL(url).catch(err => {
    //             setDialogConfig({
    //                 title: 'Not found',
    //                 message: `Couldn't find the app in play/app store`,
    //                 positiveButtonText: 'Retry',
    //                 NegativeButtonText: 'Exit',
    //                 onPositive: () => { redirectToStore() },
    //                 onNegative: () => { BackHandler.exitApp() }
    //             })
    //             setDialogVisible(true)
    //             console.error("Couldn't open store URL:", err);
    //         });
    //     }
    // };

    // const getAppConfigs = async () => {
    //     try {
    //         const isOnline = await NetInfo.fetch().then(state => state.isConnected);

    //         if (!isOnline) {
    //             setDialogConfig({
    //                 title: 'No internet connection',
    //                 message: `No internet connection, please check your internet connection and try again.`,
    //                 positiveButtonText: 'Retry',
    //                 NegativeButtonText: '',
    //                 onPositive: () => {
    //                     setDialogVisible(false);
    //                     getAppConfigs()
    //                 },
    //                 onNegative: () => { BackHandler.exitApp() }
    //             })
    //             setDialogVisible(true)
    //             return
    //         }

    //         const { config, languages } = await fetchConfigurations();

    //         const isMandatory = config.is_mandatory_update === '1';
    //         const latestVersion = config.version;
    //         const build = config.build;
    //         const base_url = config.base_url;
    //         const base_url_2 = config.base_url_2;
    //         const update_message = config.update_message;
    //         await Keychain.setInternetCredentials('url_key', 'sge', base_url);
    //         await Keychain.setInternetCredentials('url_key_2', 'sge', base_url_2);
    //         await Keychain.setInternetCredentials('update_message', 'sge', update_message);

    //         const languageList: Languages[] = [];

    //         for (const [name, id] of Object.entries(languages)) {
    //             const lang = new Languages(Number(id), name); // or reverse if needed
    //             languageList.push(lang);
    //         }

    //         const db = await connectToDatabase()
    //         const addLanguagesFunc = await addLanguages(db, languageList);

    //         var selectedLanguage = await getSingleUserPreference(db, 'selected_language')
    //         if (selectedLanguage == "") {
    //             await addSharedPreferencesHandler(db, [new UserPreference('selected_language', '1')]);
    //             selectedLanguage = '1'
    //         }


    //         const needUpdate = isUpdateRequired(latestVersion, build);

    //         if (isMandatory && needUpdate) {
    //             setDialogConfig({
    //                 title: 'Version update required',
    //                 message: `A newer version ${latestVersion}.${build} is available, please update to continue.`,
    //                 positiveButtonText: 'Update',
    //                 NegativeButtonText: 'Exit',
    //                 onPositive: () => { redirectToStore() },
    //                 onNegative: () => { BackHandler.exitApp() }
    //             })
    //             setDialogVisible(true)
    //         } else if (!isMandatory && needUpdate) {
    //             setDialogConfig({
    //                 title: 'New update available',
    //                 message: `Version ${latestVersion}.${build} is available.`,
    //                 positiveButtonText: 'Update',
    //                 NegativeButtonText: 'Continue',
    //                 onPositive: () => { redirectToStore() },
    //                 onNegative: () => {
    //                     setDialogVisible(false);
    //                     getLabels(selectedLanguage ?? "1")
    //                 }
    //             })
    //             setDialogVisible(true)
    //         } else {
    //             getLabels(selectedLanguage ?? "1");
    //         }
    //     } catch (err) {
    //         setDialogConfig({
    //             title: 'Server connection error',
    //             message: `Could not reach configuration server. Retry?`,
    //             positiveButtonText: 'Retry',
    //             NegativeButtonText: '',
    //             onPositive: () => {
    //                 setDialogVisible(false);
    //                 getAppConfigs()
    //             },
    //             onNegative: () => { BackHandler.exitApp() }
    //         })
    //         setDialogVisible(true)
    //     }
    // }

    // const getLabels = async (languageId: string) => {
    //     try {
    //         const isOnline = await NetInfo.fetch().then(state => state.isConnected);

    //         if (!isOnline) {
    //             setDialogConfig({
    //                 title: 'No internet connection',
    //                 message: `No internet connection, please check your internet connection and try again.`,
    //                 positiveButtonText: 'Retry',
    //                 NegativeButtonText: '',
    //                 onPositive: () => {
    //                     setDialogVisible(false);
    //                     setLanguageId("")
    //                     setLanguageId(languageId)
    //                 },
    //                 onNegative: () => { BackHandler.exitApp() }
    //             })
    //             setDialogVisible(true)
    //             return
    //         }

    //         setLanguageId(languageId)

    //     } catch (err) {
    //         setDialogConfig({
    //             title: 'Failure',
    //             message: `Failed to fetch labels`,
    //             positiveButtonText: 'Retry',
    //             NegativeButtonText: '',
    //             onPositive: () => {
    //                 setDialogVisible(false)
    //                 setLanguageId("")
    //                 setLanguageId(languageId)
    //             },
    //             onNegative: () => { BackHandler.exitApp() }
    //         })
    //         setDialogVisible(true)
    //     }
    // }


    // useEffect(() => {
    //     getAppConfigs();
    // }, []);

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
