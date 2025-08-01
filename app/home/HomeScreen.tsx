
import { Dimensions, SafeAreaView, ScrollView, StyleSheet, View, ImageBackground, Keyboard, TouchableOpacity, FlatList, Platform, Text, Image, KeyboardAvoidingView, TextInput, Alert, ActivityIndicator, BackHandler } from 'react-native';
import { COLORS } from '../../constants/constants';
import { ThemedHeader } from '../../components/headers/ThemedHeader';
import { ThemedText } from '../../components/ThemedText';
import React, { useMemo, useRef, useState, useEffect, useCallback, useLayoutEffect } from 'react';
import { PropsHome } from '../../constants/types';
import { connectToDatabase } from '../../db/db';
import ActionDialog from '../../components/dialogs/ActionDialog';
import UserPreference from '../../data/UserPreference';
import { addSharedPreferencesHandler } from '../../db/sharedPreferencesHandler';
import Ionicons from '@react-native-vector-icons/ionicons';
import Icons from '../../constants/Icons';
import eventsListUseFetch from '../../hooks/eventsListUseFetch';
import { Events } from '../../data/Events';

export default function HomeScreen({ navigation }: PropsHome) {

    // // search
    const [passedSearchQuery, setPassedSearchQuery] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const searchQueryRef = useRef<TextInput>(null);
    const callSearchRequest = () => {
        setPassedSearchQuery(searchQuery)
    };

    const [allEvents, setAllEvents] = useState<Events[]>([]);
    const { eventsData, isLoadingEvents, errorEvents, refetchEvents } = eventsListUseFetch({ searchQuery })

    useEffect(() => {
        if (eventsData && Array.isArray(eventsData)) {
            setAllEvents(eventsData);
        }
    }, [eventsData]);

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

    useEffect(() => {
        if (errorEvents) {
            if (errorEvents.includes('Session expired')) {
                setDialogConfig({
                    title: 'Session expired',
                    message: `${errorEvents}`,
                    positiveButtonText: 'Logout',
                    NegativeButtonText: '',
                    onPositive: () => {
                        clearUserData()

                    },
                    onNegative: () => {
                        setDialogVisible(false)
                    }
                })
            } else {
                setDialogConfig({
                    title: 'Request Failed',
                    message: `${errorEvents}`,
                    positiveButtonText: 'Dismiss',
                    NegativeButtonText: '',
                    onPositive: () => {
                        setDialogVisible(false)
                    },
                    onNegative: () => {
                        setDialogVisible(false)
                    }
                })
            }

            setDialogVisible(true)
            return
        }
    }, [errorEvents]);

    return (
        <>
            <SafeAreaView style={styles.safeAreaStyle} >
                <ThemedHeader
                    firstButtonProps={{ iconUrl: Icons.ic_menu, dimension: 20, handlePress: () => navigation.toggleDrawer() }}
                    iconProps={{}}
                    textHeaderProps={{ text: 'Home' }}
                />

                <View style={[styles.inputContainer, { width: '90%', height: 50, direction: 'ltr' }]}>
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

                <View style={{ height: 20 }} />

                {isLoadingEvents && <ActivityIndicator size='small' color="#000000" />}

                {allEvents && allEvents.length > 0 &&
                    <FlatList
                    style={{width: '90%', backgroundColor: "#60636a30", padding: 15, borderRadius: 6}}
                        data={allEvents}
                        keyExtractor={(item, index) => item.id?.toString()}
                        renderItem={({ item }) => (

                            <View style={[styles.eventContainer]}>
                                <TouchableOpacity onPress={() => {
                                    // redirect to details
                                }}>
                                    <View style={styles.container}>
                                        <Image
                                            source={{ uri: item.images[0].url }}
                                            style={styles.image}
                                        />

                                        <View style={styles.textContainer}>
                                            <ThemedText type='mediumBold'>{item.name}</ThemedText>
                                            <ThemedText type='xsmallMedium'>{item.dates.start.localDate} {item.dates.start.localTime}</ThemedText>
                                        </View>

                                        <View style={{width: 7}} />

                                        <Ionicons name="chevron-forward" size={24} color="#000" style={styles.icon} />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        )}
                        ItemSeparatorComponent={() => (
                            <View style={{ height: 7, backgroundColor: 'transparent' }} />
                        )}
                    />
                }

                {/* no data */}
                {eventsData && eventsData.length == 0 &&
                    <View style={[styles.cardContainer, { justifyContent: 'center', height: '100%' }]}>
                        <Ionicons color={'#CFC3C3'} size={40} name='file-tray' />
                        <ThemedText type='mediumBold' lightColor={'#CFC3C3'}>No events found</ThemedText>
                    </View>
                }
            </SafeAreaView>
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
    safeAreaStyle: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center'
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon: {
        width: 24,
        height: 24,
        marginLeft: 10
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
    inputContainer: {
        borderRadius: 6,
        backgroundColor: "#FFFFFF",
        borderColor: '#CFC3C3',
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    input: {
        backgroundColor: 'transparent',
        justifyContent: "center",
        alignItems: "center",
        height: 50,
        flex: 1,
        fontSize: 12,
        paddingHorizontal: 12,
    },
    eventContainer: {
        borderRadius: 6,
        backgroundColor: '#ffffff',
        borderColor: '#CFC3C3',
        borderWidth: 1,
        padding: 15,
        direction: 'ltr',
        justifyContent: 'center'
    
    },
    cardContainer: {
        borderRadius: 6,
        backgroundColor: "#ffffff",
        borderColor: '#E5E5E5',
        borderWidth: 1,
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center'
    },
    image: {
        width: 45,
        height: 45,
        borderRadius: 6,
        marginRight: 10,
    },
    textContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
});
