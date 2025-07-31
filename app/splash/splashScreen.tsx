import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, Platform, Linking, ActivityIndicator, ImageBackground, BackHandler } from 'react-native';
import { CustomStatusBar } from '../../components/headers/CustomStatusBar';
import { PropsSplash } from '../../constants/types';
import DeviceInfo from 'react-native-device-info';
import { ThemedText } from '../../components/ThemedText';
import { ThemedView } from '../../components/ThemedView';
import Images from '../../constants/Images';


const version = DeviceInfo.getVersion();
const buildNumber = DeviceInfo.getBuildNumber();

export default function SplashScreen({ navigation }: PropsSplash) {

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
        </>
    );
}

const styles = StyleSheet.create({
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
