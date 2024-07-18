// RideRequestScreen.js

import React from 'react';
import { Animated, Image, Linking, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Import icons for RIDE, FERES, and YANGO with correct relative paths
const rideIcon = require('./assets/icons/ride-icon.png');
const feresIcon = require('./assets/icons/feres-icon.png');
const yangoIcon = require('./assets/icons/yango-icon.png'); // Import Yango icon

const RideRequestScreen = () => {
    const backgroundColors = {
        ride: React.useRef(new Animated.Value(0)).current,
        feres: React.useRef(new Animated.Value(0)).current,
        yango: React.useRef(new Animated.Value(0)).current,
    };

    const handleBackgroundColorAnimation = (service) => {
        Animated.timing(backgroundColors[service], {
            toValue: 100,
            duration: 100,
            useNativeDriver: false,
        }).start();
        setTimeout(() => {
            Animated.timing(backgroundColors[service], {
                toValue: 0,
                duration: 100,
                useNativeDriver: false,
            }).start();
        }, 200);
    };

    const handleRideRequest = (serviceName) => {
        // Logic to handle ride request for the selected service
        console.log(`Requesting ride for ${serviceName}`);

        // Implement deep linking to open the specific app
        switch (serviceName) {
            case 'RIDE':
                openRideApp();
                break;
            case 'FERES':
                openFeresApp();
                break;
            case 'YANGO':
                openYangoApp();
                break;
            default:
                // Handle other services or default behavior
                break;
        }
    };

    const openRideApp = () => {
        // Example deep link URL for the RIDE app
        const deepLinkUrl = 'https://play.google.com/store/apps/details?id=com.multibrains.taxi.passenger.ridepassengeret&hl=en';

        Linking.canOpenURL(deepLinkUrl).then(supported => {
            if (supported) {
                Linking.openURL(deepLinkUrl);
            } else {
                console.error(`Cannot open ${deepLinkUrl}`);
                // Handle error or provide user feedback
            }
        });
    };

    const openFeresApp = () => {
        // Example deep link URL for the FERES app
        const deepLinkUrl = 'https://play.google.com/store/search?q=feres&c=apps&hl=en';

        Linking.canOpenURL(deepLinkUrl).then(supported => {
            if (supported) {
                Linking.openURL(deepLinkUrl);
            } else {
                console.error(`Cannot open ${deepLinkUrl}`);
                // Handle error or provide user feedback
            }
        });
    };

    const openYangoApp = () => {
        // Example deep link URL for the YANGO app
        const deepLinkUrl = 'https://play.google.com/store/apps/details?id=com.yandex.yango&hl=en';

        Linking.canOpenURL(deepLinkUrl).then(supported => {
            if (supported) {
                Linking.openURL(deepLinkUrl);
            } else {
                console.error(`Cannot open ${deepLinkUrl}`);
                // Handle error or provide user feedback
            }
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerText}>Select a Service</Text>
            </View>

            {/* Ride Buttons */}
            <View style={styles.buttonContainer}>
                {/* Request RIDE Button */}
                <TouchableOpacity
                    style={[styles.button, styles.rideButton, {
                        backgroundColor: backgroundColors.ride.interpolate({
                            inputRange: [0, 100],
                            outputRange: ['#ff5e00', '#ff9000']
                        })
                    }]}
                    onPress={() => {
                        handleRideRequest('RIDE');
                        handleBackgroundColorAnimation('ride');
                    }}
                    accessible={true}
                    accessibilityRole="button"
                    accessibilityLabel="Request RIDE"
                    accessibilityHint="Press to request a ride using the RIDE service"
                >
                    <Image source={rideIcon} style={styles.icon} />
                    <Text style={styles.buttonText}>Request RIDE</Text>
                </TouchableOpacity>

                {/* Request FERES Button */}
                <TouchableOpacity
                    style={[styles.button, styles.feresButton, {
                        backgroundColor: backgroundColors.feres.interpolate({
                            inputRange: [0, 100],
                            outputRange: ['#1b9e77', '#23cc6e']
                        })
                    }]}
                    onPress={() => {
                        handleRideRequest('FERES');
                        handleBackgroundColorAnimation('feres');
                    }}
                    accessible={true}
                    accessibilityRole="button"
                    accessibilityLabel="Request FERES"
                    accessibilityHint="Press to request a ride using the FERES service"
                >
                    <Image source={feresIcon} style={styles.icon} />
                    <Text style={styles.buttonText}>Request FERES</Text>
                </TouchableOpacity>

                {/* Request YANGO Button */}
                <TouchableOpacity
                    style={[styles.button, styles.yangoButton, {
                        backgroundColor: backgroundColors.yango.interpolate({
                            inputRange: [0, 100],
                            outputRange: ['#4056a1', '#597bc2']
                        })
                    }]}
                    onPress={() => {
                        handleRideRequest('YANGO');
                        handleBackgroundColorAnimation('yango');
                    }}
                    accessible={true}
                    accessibilityRole="button"
                    accessibilityLabel="Request YANGO"
                    accessibilityHint="Press to request a ride using the YANGO service"
                >
                    <Image source={yangoIcon} style={styles.icon} />
                    <Text style={styles.buttonText}>Request YANGO</Text>
                </TouchableOpacity>
            </View>

            {/* Example of a settings link */}
            <TouchableOpacity style={styles.settingsLink}>
                <Text style={styles.settingsText}>Settings</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    header: {
        backgroundColor: '#f0f0f0',
        width: '100%',
        paddingVertical: 16,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginBottom: 20,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 24,
        marginVertical: 10,
        width: '80%',
        elevation: 3, // Android elevation for shadow
        shadowColor: '#000', // iOS shadow properties
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
    },
    rideButton: {
        backgroundColor: '#ff5e00',
    },
    feresButton: {
        backgroundColor: '#1b9e77',
    },
    yangoButton: {
        backgroundColor: '#4056a1',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
        marginLeft: 16,
    },
    icon: {
        width: 24,
        height: 24,
    },
    settingsLink: {
        position: 'absolute',
        bottom: 20,
    },
    settingsText: {
        fontSize: 18,
        color: '#0069c0',
        textDecorationLine: 'underline',
    },
});

export default RideRequestScreen;
