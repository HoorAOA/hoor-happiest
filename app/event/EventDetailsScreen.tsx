
import { Dimensions, SafeAreaView, ScrollView, StyleSheet, View, ImageBackground, Keyboard, TouchableOpacity, FlatList, Platform, Text, Image, KeyboardAvoidingView, TextInput, Alert, ActivityIndicator, BackHandler } from 'react-native';
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
import FavouriteEvents from '../../data/FavouriteEvents';
import { addFavouriteEvents, getFavouriteEvents } from '../../db/favouriteEventsHandler';
import eventDetailsUseFetch from '../../hooks/eventDetailsUseFetch';
import { ThemedView } from '../../components/ThemedView';

export default function EventDetailsScreen({ navigation, route }: PropsHome) {
    const { passedValues } = route.params;

    return (
        <>
            <SafeAreaView style={styles.safeAreaStyle} >
                <ThemedHeader
                    firstButtonProps={{ iconUrl: Icons.ic_back, dimension: 20, handlePress: () => navigation.goBack() }}
                    iconProps={{}}
                    textHeaderProps={{ text: passedValues[0].name }}
                />

                <View style={{ height: 35 }} />

                <ScrollView style={{ width: '90%' }}>
                    <ThemedView style={{ backgroundColor: "#60636a30", padding: 15, borderRadius: 6, alignItems: 'center' }}>
                        <Image
                            source={{ uri: passedValues[0].images[0].url }}
                            style={styles.image}
                        />
                        <View style={{ height: 15 }} />
                        <ThemedView style={{ backgroundColor: "#ffffff", padding: 15, borderRadius: 6, width: '100%' }}>
                            <ThemedText type='mediumBold' >{passedValues[0].name}</ThemedText>
                            <View style={{ height: 5 }} />
                            <ThemedText type='xsmallMedium'>{passedValues[0].dates.start.localDate} {passedValues[0].dates.start.localTime}</ThemedText>
                            <View style={{ height: 15 }} />

                            <ThemedText type='xsmallMedium'>{passedValues[0].info}</ThemedText>
                        </ThemedView>

                    </ThemedView>
                </ScrollView>



            </SafeAreaView >
        </>
    );
}

const styles = StyleSheet.create({
    safeAreaStyle: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center'
    },
    image: {
        width: 120,
        height: 120,
        borderRadius: 6,
        marginRight: 10,
    },
});
