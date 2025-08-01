import React, { useMemo, useRef, useState, useEffect, useCallback } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View, Image, Text } from 'react-native';
import { ThemedText } from '../../components/ThemedText';
import { ThemedView } from '../../components/ThemedView';
import Images from '../../constants/Images';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PropsHome } from '../../constants/types';
import { connectToDatabase } from '../../db/db';
import { getSingleUserPreference } from '../../db/sharedPreferencesHandler';
import { ThemedHeader } from '../../components/headers/ThemedHeader';
import Icons from '../../constants/Icons';

export default function ProfileScreen({ navigation }: PropsHome) {
    // profile
    const [profileDetails, setprofileDetails] = useState({
        username: '',
        email: '',
        mobile: ''
    });

    const fetchUserDetails = async () => {
        const db = await connectToDatabase()
        const usernameTmp = await getSingleUserPreference(db, 'userName')
        const emailTmp = await getSingleUserPreference(db, 'email')
        const mobileTmp = await getSingleUserPreference(db, 'mobile')

        setprofileDetails({ username: `${usernameTmp}`, email: `${emailTmp}`, mobile: `${mobileTmp}` })

    }

    useEffect(() => {
        fetchUserDetails()
    }, []);

    return (
        <GestureHandlerRootView style={styles.fullFlex}>
            <SafeAreaView style={styles.safeAreaStyle}>
                <ThemedHeader
                    firstButtonProps={{ iconUrl: Icons.ic_menu, dimension: 20, handlePress: () => navigation.toggleDrawer() }}
                    iconProps={{}}
                    textHeaderProps={{ text: 'Profile' }}
                />

                <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                    <ThemedView style={styles.container}>
                        <ThemedView style={styles.profileImageContainer}>
                            <Image source={Images.img_profile_default} style={[styles.profileImage, { position: 'relative' }]} />
                        </ThemedView>

                        <ThemedView style={[styles.mainContainer, { marginHorizontal: 16 }]} >
                            <ThemedView style={[styles.fullFlex, styles.rowContainer]}>
                                <ThemedView style={{ width: '35%', borderRadius: 4, paddingVertical: 5, paddingHorizontal: 5 }}>
                                    <ThemedText style={[styles.fullFlex, { fontSize: 14, color: "#60636A", fontWeight: 'bold' }]}>Name</ThemedText>
                                </ThemedView>
                                <View style={{ width: 8 }} />
                                <ThemedView style={{ flex: 1, backgroundColor: 'transparent', paddingVertical: 5, paddingHorizontal: 5 }}>
                                    <ThemedText style={[styles.fullFlex, { fontSize: 14 }]}>{profileDetails.username}</ThemedText>
                                </ThemedView>
                            </ThemedView>
                            <ThemedView style={[styles.fullFlex, styles.rowContainer]}>
                                <ThemedView style={{ width: '35%', borderRadius: 4, paddingVertical: 5, paddingHorizontal: 5 }}>
                                    <ThemedText style={[styles.fullFlex, { fontSize: 14, color: "#60636A", fontWeight: 'bold' }]}>Email</ThemedText>
                                </ThemedView>
                                <View style={{ width: 8 }} />
                                <ThemedView style={{ flex: 1, backgroundColor: 'transparent', paddingVertical: 5, paddingHorizontal: 5 }}>
                                    <ThemedText style={[styles.fullFlex, { fontSize: 14 }]}>{profileDetails.email}</ThemedText>
                                </ThemedView>
                            </ThemedView>
                            <ThemedView style={[styles.fullFlex, styles.rowContainer]}>
                                <ThemedView style={{ width: '35%', borderRadius: 4, paddingVertical: 5, paddingHorizontal: 5 }}>
                                    <ThemedText style={[styles.fullFlex, { fontSize: 14, color: "#60636A", fontWeight: 'bold' }]}>Mobile</ThemedText>
                                </ThemedView>
                                <View style={{ width: 8 }} />
                                <ThemedView style={{ flex: 1, backgroundColor: 'transparent', paddingVertical: 5, paddingHorizontal: 5 }}>
                                    <ThemedText style={[styles.fullFlex, { fontSize: 14 }]}>{profileDetails.mobile}</ThemedText>
                                </ThemedView>
                            </ThemedView>
                        </ThemedView>

                        <View style={{ height: 16 }} />

                    </ThemedView>
                </ScrollView>
            </SafeAreaView>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: '#D9D9D9',
        borderRadius: 4
    },
    tasksContainer: {
        paddingVertical: 8,
        backgroundColor: 'transparent'
    },
    safeAreaStyle: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    scrollViewContainer: {
        flexGrow: 1,
        alignItems: 'center',
        paddingBottom: 20
    },
    container: {
        marginHorizontal: 16,
        flex: 1,
        width: '100%'
    },
    profileImageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 120,
        width: 120,
        borderRadius: 70,
        alignSelf: 'center',
        marginTop: 15,
        marginBottom: 35,
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
    fullFlex: {
        flex: 1
    },

    contentContainer: {
        flex: 1,
        marginTop: 5,
        flexDirection: 'column'
    },
    updateInput: {
        flex: 1,
        paddingHorizontal: 12,
        height: 50
    },
    rowContainer: {
        flexDirection: 'row',
        backgroundColor: 'transparent',
        alignItems: 'center',
        borderColor: '#83829A',
        borderWidth: 1,
        borderRadius: 4
    },
});
