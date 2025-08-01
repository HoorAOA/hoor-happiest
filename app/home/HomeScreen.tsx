
import { Dimensions, SafeAreaView, ScrollView, StyleSheet, View, ImageBackground, Keyboard, TouchableOpacity, FlatList, Platform, Text, Image, KeyboardAvoidingView, TextInput, Alert, ActivityIndicator, BackHandler } from 'react-native';
import { COLORS } from '../../constants/constants';
import { ThemedHeader } from '../../components/headers/ThemedHeader';
import React, { useMemo, useRef, useState, useEffect, useCallback, useLayoutEffect } from 'react';
import { PropsHome } from '../../constants/types';
import { connectToDatabase } from '../../db/db';
import ActionDialog from '../../components/dialogs/ActionDialog';
import * as Keychain from 'react-native-keychain';
import UserPreference from '../../data/UserPreference';
import { addSharedPreferencesHandler } from '../../db/sharedPreferencesHandler';
// import Icon from 'react-native-vector-icons/Ionicons';
import Icons from '../../constants/Icons';

export default function HomeScreen({ navigation }: PropsHome) {

    // dialog
    const [dialogVisible, setDialogVisible] = useState(false);
    const [dialogConfig, setDialogConfig] = useState({
        title: '',
        message: '',
        positiveButtonText: '',
        NegativeButtonText: '',
        onPositive: () => { },
        onNegative: () => { }
    });

    // // search
    // const [passedSearchQuery, setPassedSearchQuery] = useState('');
    // const [searchQuery, setSearchQuery] = useState('');
    // const searchQueryRef = useRef<TextInput>(null);
    // const callSearchRequest = () => {
    //    setPassedSearchQuery(searchQuery)
    // };

    // // clear user data
    // const clearUserData = async () => {
    //     const db = await connectToDatabase()
    //     await Keychain.setInternetCredentials('token', 'sge', "");
    //     await addSharedPreferencesHandler(db,
    //        [new UserPreference('email', "")
    //                , new UserPreference('mobile', "")
    //                , new UserPreference('userName', "")
    //                , new UserPreference('is_logged_in', 'false')
    //              ]);
            
    //         setDialogVisible(false)

    //         navigation.replace('Login')
    // }

    // useEffect(() => {
    //     if (errorStores) {
    //         if (errorStores.includes('Session expired')) {
    //             setDialogConfig({
    //                 title: 'Session expired',
    //                 message: `${errorStores}`,
    //                 positiveButtonText: 'Logout',
    //                 NegativeButtonText: '',
    //                 onPositive: () => {
    //                     clearUserData()
                        
    //                 },
    //                 onNegative: () => {
    //                     setDialogVisible(false)
    //                 }
    //             })
    //         } else {
    //             setDialogConfig({
    //                 title: 'Request Failed',
    //                 message: `${errorStores}`,
    //                 positiveButtonText: 'Dismiss',
    //                 NegativeButtonText: '',
    //                 onPositive: () => {
    //                     setDialogVisible(false)
    //                 },
    //                 onNegative: () => {
    //                     setDialogVisible(false)
    //                 }
    //             })
    //         }

    //         setDialogVisible(true)
    //         return
    //     }
    // }, [errorStores]);

    return (
        <>
            <SafeAreaView style={styles.safeAreaStyle} >
                <ThemedHeader
                    firstButtonProps={{ iconUrl: Icons.ic_menu, dimension: 20, handlePress: () => navigation.toggleDrawer() }}
                    iconProps={{}}
                    textHeaderProps={{ text: 'Home'}}
                />
{/* 
<View style={[styles.inputContainer, { width: '90%', height: 50 }]}>
                        <TextInput
                            style={styles.input}
                            value={searchQuery}
                            placeholder='Search by event or city'
                            placeholderTextColor="#888"
                            keyboardType='default'
                            returnKeyType="done"
                            onChangeText={(text) => setSearchQuery(text)}
                            onSubmitEditing={() => searchQueryRef.current?.focus()}
                        />
                        <TouchableOpacity onPress={() => callSearchRequest()}>
                            <Ionicons name="search" size={20} color={'#000000'} style={{ marginEnd: 12 }} />
                        </TouchableOpacity>
                    </View>

                    <View style={{ height: 12 }} />

                <ScrollView showsVerticalScrollIndicator={true} style={{ backgroundColor: '#F2F2F2' }}>
                    <View style={{
                        flex: 1,
                        flexDirection: 'column',
                        paddingBottom: 85,
                        alignItems: 'center',

                    }}>
                        <View style={{ height: 15 }} />

{/* todo:: add the list here  */}

{/* <View style={{ height: 15 }} />
                    </View>
                </ScrollView> */}
            </SafeAreaView>
            {/* <ActionDialog
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
            /> */}
        </>
    );
}

const styles = StyleSheet.create({
    iconProps: {
        width: '80%',
        maxWidth: 200,
        marginHorizontal: 35,
        resizeMode: 'contain',
        justifyContent: 'center'
    },
    safeAreaStyle: {
        flex: 1,
        backgroundColor: COLORS.light.background
    },
    container: {
        width: "80%",
        alignSelf: 'center',
        flex: 1
    },
    btnImg: {
        width: 16,
        height: 16,
        resizeMode: 'contain'
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#000',
    },
    icon: {
        width: 24,
        height: 30,
        position: 'absolute',
        right: 10,
        top: 20,
    },
    textInput: {
        marginTop: 10,
        paddingLeft: 10,
        flex: 1,
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
    },
    profileImageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 90,
        width: 90,
        borderRadius: 70,
        alignSelf: 'center',
        backgroundColor: "#60636A"
    },
    profileImage: {
        height: '100%',
        width: '100%',
        alignContent: 'center',
        alignItems: 'center',
        borderRadius: 70,
        borderWidth: 5,
        borderColor: '#D9D9D9'
    },
    editImgButton: {
        backgroundColor: "#0074BA",
        height: 30,
        width: 30,
        borderRadius: 20,
        position: 'absolute',
        left: -3,
        bottom: -3,
        alignItems: 'center',
        justifyContent: 'center'
    },
    contentSeperator: {
        height: 1,
        backgroundColor: '#AAAAAA',
        flex: 1,
        opacity: 0.2,
        marginVertical: 15
    },
    contentContainer: {
        flex: 1,
        marginTop: 20,
        flexDirection: 'column'
    },
    bottomSheetContainer: {
        marginHorizontal: 25,
        paddingBottom: 5,
        backgroundColor: 'transparent'
    },
    sheetContainer: {
        backgroundColor: 'white',
        borderTopStartRadius: 24,
        borderTopEndRadius: 24,
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.75,
        shadowRadius: 16.0,
        elevation: 24,
    },
    inputContainer: {
        borderRadius: 6,
        backgroundColor: "#FFFFFF",
        borderColor: '#CFC3C3',
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    input: {
    backgroundColor: '#ffffff',
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: '#AAAAAA',
    borderRadius: 12,
    height: 50,
    fontSize: 12,
    paddingHorizontal: 12,
  },
});
