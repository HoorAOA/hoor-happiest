
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
});
