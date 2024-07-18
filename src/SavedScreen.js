import { Ionicons } from '@expo/vector-icons'; // Assuming you're using Ionicons for icons
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const SavedScreen = () => {
    const handleOrdersPress = () => {
        // Logic for handling Orders button press
        console.log('Orders button pressed');
        // Add your navigation logic or any other action here
    };

    const handlePaymentsPress = () => {
        // Logic for handling Payments button press
        console.log('Payments button pressed');
        // Add your navigation logic or any other action here
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Saved Screen</Text>

            {/* Orders Button */}
            <TouchableOpacity
                style={styles.button}
                onPress={handleOrdersPress}
            >
                <Ionicons name="cart-outline" size={24} color="black" style={styles.icon} />
                <Text style={styles.buttonText}>Orders</Text>
            </TouchableOpacity>

            {/* Payments Button */}
            <TouchableOpacity
                style={styles.button}
                onPress={handlePaymentsPress}
            >
                <Ionicons name="wallet-outline" size={24} color="black" style={styles.icon} />
                <Text style={styles.buttonText}>Payments</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#e7e7e7",
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#287964',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 24,
        marginVertical: 10,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
    },
    buttonText: {
        fontSize: 18,
        marginLeft: 10,
    },
    icon: {
        marginRight: 10,
    },
});

export default SavedScreen;
