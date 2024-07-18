// MapScreen.js

import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";

const MapScreen = () => {
    const [userLocation, setUserLocation] = useState(null);
    const navigation = useNavigation();

    // Coordinates for Addis Ababa
    const addisAbabaCoordinates = {
        latitude: 9.0249700,
        longitude: 38.7468900,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
    };

    useEffect(() => {
        getLocationAsync();
    }, []);

    // Function to get user's current location
    const getLocationAsync = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            console.error('Permission to access location was denied');
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setUserLocation(location.coords);
    };

    // Function to handle "Request Ride" button press
    const handleRequestRide = () => {
        // Navigate to the RideRequest screen
        navigation.navigate('RideRequest');
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    provider={PROVIDER_GOOGLE}
                    initialRegion={addisAbabaCoordinates}
                >
                    {/* Marker for Adika Tour, Travel & Car Rental */}
                    <Marker
                        coordinate={addisAbabaCoordinates}
                        title={"Adika Tour, Travel & Car Rental"}
                        description={"Addis Ababa, Ethiopia"}
                    />

                    {/* Marker for user's current location */}
                    {userLocation && (
                        <Marker
                            coordinate={userLocation}
                            title={"Your Location"}
                            pinColor={"blue"}
                        />
                    )}

                    {/* Example polyline (route) */}
                    <Polyline
                        coordinates={[
                            addisAbabaCoordinates,
                            { latitude: 9.0358, longitude: 38.7538 }, // Example destination coordinates
                        ]}
                        strokeColor="#FF0000"
                        strokeWidth={2}
                    />
                </MapView>

                {/* Button to simulate requesting a ride */}
                <TouchableOpacity style={styles.button} onPress={handleRequestRide}>
                    <Text style={styles.buttonText}>Request Ride</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "white",
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    map: {
        width: "100%",
        height: "100%",
    },
    button: {
        position: 'absolute',
        bottom: 60,
        left: 20,
        right: 20,
        backgroundColor: 'gray', // Change background color to gray
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 14,
        borderRadius: 20, // Increase borderRadius for a more rounded shape
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
    },
});

export default MapScreen;
