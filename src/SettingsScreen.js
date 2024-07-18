import { MaterialIcons } from '@expo/vector-icons'; // Import icons from expo/vector-icons
import React, { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { LanguageContext } from './LanguageContext'; // Import the LanguageContext

const SettingsScreen = () => {
    const { language, changeLanguage } = useContext(LanguageContext); // Use the LanguageContext

    const toggleLanguage = () => {
        const newLanguage = language === 'en' ? 'am' : 'en';
        changeLanguage(newLanguage);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Settings</Text>

            <View style={styles.section}>
                <TouchableOpacity style={styles.button} onPress={() => handlePress('password')}>
                    <MaterialIcons name="lock" size={24} color="#3b5998" />
                    <Text style={styles.buttonText}>Password</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => handlePress('security')}>
                    <MaterialIcons name="security" size={24} color="#3b5998" />
                    <Text style={styles.buttonText}>Security</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => handlePress('personal details')}>
                    <MaterialIcons name="person" size={24} color="#3b5998" />
                    <Text style={styles.buttonText}>Personal Details</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => handlePress('ad preferences')}>
                    <MaterialIcons name="settings" size={24} color="#3b5998" />
                    <Text style={styles.buttonText}>Ad Preferences</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.section}>
                <TouchableOpacity style={styles.button} onPress={() => handlePress('account privacy')}>
                    <MaterialIcons name="lock" size={24} color="#3b5998" />
                    <Text style={styles.buttonText}>Account Privacy</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.languageButton} onPress={toggleLanguage}>
                <MaterialIcons name="language" size={24} color="#3b5998" />
                <Text style={styles.languageButtonText}>{language === 'en' ? 'Switch to Amharic' : 'አማርኛ ይቀላቀሉ'}</Text>
            </TouchableOpacity>
        </View>
    );
};

export default SettingsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        paddingHorizontal: 20,
        paddingTop: 30,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#000000",
    },
    section: {
        marginBottom: 30,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "#ffffff",
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginBottom: 10,
        elevation: 2,
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    buttonText: {
        fontSize: 18,
        color: "#3b5998",
        marginLeft: 15,
    },
    languageButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "#ffffff",
        borderWidth: 1,
        borderColor: "#3b5998",
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginBottom: 10,
    },
    languageButtonText: {
        fontSize: 18,
        color: "#3b5998",
        marginLeft: 15,
    },
});
