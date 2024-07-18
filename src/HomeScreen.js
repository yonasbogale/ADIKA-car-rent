import React, { useContext, useState } from "react";
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { LanguageContext } from './LanguageContext'; // Import the LanguageContext
import data from "./dataset/vehicles.json";

const menu = require("./assets/icons/menu.png");
const face = require("./assets/face.png");
const magnifying_glass = require("./assets/icons/magnifying-glass.png");

const image_v_1 = require("./assets/vehicles/v-1.png");
const image_v_2 = require("./assets/vehicles/v-2.png");
const image_v_3 = require("./assets/vehicles/v-3.png");
const image_v_4 = require("./assets/vehicles/v-4.png");
const image_v_5 = require("./assets/vehicles/v-5.png"); // Add import for Vits image
const image_v_6 = require("./assets/vehicles/v-6.png"); // Add import for Range Rover image

const blurredLogo = require("./assets/icons/removebg.png"); // Import the blurred logo image

// Translations
const translations = {
    en: {
        title: "Car Rental",
        searchPlaceholder: "Search a Car",
        all: "All",
        suv: "SUV",
        sedan: "Sedan",
        mpv: "MPV",
        hatchback: "Hatchback",
        mostRented: "Most Rented",
        perDay: "/day",
        currency: "Birr",
    },
    am: {
        title: " የመኪና ኪራይ",
        searchPlaceholder: "መኪና ፈልግ",
        all: "ሁሉም",
        suv: "ኤስዩቪ",
        sedan: "ሴዳን",
        mpv: "ኤምፒቪ",
        hatchback: "ሃችባክ",
        mostRented: "በጣም የተከራዩ",
        perDay: "/ቀን",
        currency: "ብር",
    }
};

const HomeScreen = ({ navigation }) => {
    const [vehicles, setVehicles] = useState(data.vehicles);
    const [filteredVehicles, setFilteredVehicles] = useState(data.vehicles);
    const { language } = useContext(LanguageContext); // Use the LanguageContext

    const getImage = (id) => {
        switch (id) {
            case 1:
                return image_v_1;
            case 2:
                return image_v_2;
            case 3:
                return image_v_3;
            case 4:
                return image_v_4;
            case 5:
                return image_v_5; // Vits image
            case 6:
                return image_v_6; // Range Rover image
            default:
                return null;
        }
    };

    const searchVehicles = (keyword) => {
        const lowercasedKeyword = keyword.toLowerCase();
        const results = vehicles.filter(vehicle => vehicle.make.toLowerCase().includes(lowercasedKeyword));
        setFilteredVehicles(results);
    };

    const t = translations[language]; // Get the translations for the selected language

    const formatPrice = (price) => {
        // Assuming price is in dollars, convert to Birr
        const priceInBirr = price * 45.53; // Replace with actual conversion rate if needed
        return priceInBirr.toFixed(2) + " " + t.currency; // Adjust the conversion and formatting as necessary
    };

    const filterByType = (type) => {
        if (type === 'all') {
            setFilteredVehicles(vehicles); // Show all vehicles
        } else {
            const results = vehicles.filter(vehicle => vehicle.type.toLowerCase() === type);
            setFilteredVehicles(results);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.headerSection}>
                    <Image source={menu} resizeMode="contain" style={styles.menuIconStyle} />
                    <Image source={face} resizeMode="contain" style={styles.faceIconStyle} />
                </View>

                <View style={styles.titleSection}>
                    <Image source={blurredLogo} resizeMode="contain" style={styles.blurredLogo} />
                    <Text style={styles.title}>{t.title}</Text>
                </View>

                <View style={styles.searchSection}>
                    <View style={styles.searchPallet}>
                        <TextInput
                            style={styles.searchInput}
                            placeholder={t.searchPlaceholder}
                            onChangeText={(text) => searchVehicles(text)}
                        />
                        <View style={styles.searchIconArea}>
                            <Image source={magnifying_glass} resizeMode="contain" style={styles.magnifyingIconStyle} />
                        </View>
                    </View>
                </View>

                <View style={styles.typesSection}>
                    <TouchableOpacity onPress={() => filterByType('all')}>
                        <Text style={styles.typesTextActive}>{t.all}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => filterByType('suv')}>
                        <Text style={styles.typesText}>{t.suv}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => filterByType('sedan')}>
                        <Text style={styles.typesText}>{t.sedan}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => filterByType('mpv')}>
                        <Text style={styles.typesText}>{t.mpv}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => filterByType('hatchback')}>
                        <Text style={styles.typesText}>{t.hatchback}</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.listSection}>
                    <Text style={styles.headText}>{t.mostRented}</Text>

                    <ScrollView style={styles.elementPallet}>
                        {filteredVehicles.map((vehicle) => {
                            return (
                                <TouchableOpacity
                                    style={styles.element}
                                    key={vehicle.id}
                                    activeOpacity={0.8}
                                    onPress={() => navigation.navigate('Info', { id: vehicle.id })}
                                >
                                    <View style={styles.infoArea}>
                                        <Text style={styles.infoTitle}>{vehicle.make} {vehicle.model}</Text>
                                        <Text style={styles.infoSub}>{vehicle.type}-{vehicle.transmission}</Text>
                                        <Text style={styles.infoPrice}>
                                            <Text style={styles.infoAmount}>{formatPrice(vehicle.price_per_day)}</Text>{t.perDay}
                                        </Text>
                                    </View>
                                    <View style={styles.imageArea}>
                                        <Image source={getImage(vehicle.id)} resizeMode="contain" style={styles.vehicleImage} />
                                    </View>
                                </TouchableOpacity>
                            );
                        })}
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#e7e7e7",
    },
    container: {
        flex: 1,
        paddingRight: 35,
        paddingLeft: 35,
    },
    headerSection: {
        height: 70,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    menuIconStyle: {
        width: 30,
        marginTop: 35,
    },
    faceIconStyle: {
        width: 40,
        marginTop: 25,
    },
    titleSection: {
        marginTop: -45,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    blurredLogo: {
        width: 130,
        height: 130,
        marginBottom: -40, // Space between logo and title
        borderRadius: 10, // Make the logo rounded
    },
    title: {
        fontSize: 26, // Adjust the title font size
        fontWeight: "900",
    },
    searchSection: {
        marginTop: 15,
        paddingLeft: 15,
        paddingRight: 15,
        justifyContent: "center",
    },
    searchPallet: {
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: "row",
        borderRadius: 8,
        width: "100%",
        height: 30,
        backgroundColor: "white",
    },
    searchInput: {
        flex: 1,
        height: 30,
        backgroundColor: "white",
    },
    searchIconArea: {
        width: 30,
        height: 30,
        justifyContent: "center",
        alignItems: "center",
    },
    magnifyingIconStyle: {
        width: 24,
        height: 24,
        marginRight: -10,
    },
    typesSection: {
        marginTop: 15,
        flexDirection: "row",
        flexWrap: "wrap",
    },
    typesTextActive: {
        fontSize: 15,
        marginRight: 20,
        fontWeight: "bold",
        color: "black",
    },
    typesText: {
        fontSize: 15,
        marginRight: 20,
        fontWeight: "500",
        color: "#696969",
    },
    listSection: {
        marginTop: 25,
    },
    headText: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    elementPallet: {
        marginLeft: -15,
        paddingLeft: 15,
        paddingRight: 15,
        width: "110%",
        height: 450,
    },
    element: {
        height: 100,
        padding: 15,
        borderRadius: 10,
        backgroundColor: "white",
        flexDirection: "row",
        marginBottom: 13,
    },
    infoArea: {
        flex: 1,
    },
    infoTitle: {
        fontSize: 15,
        fontWeight: "bold",
    },
    infoSub: {
        fontSize: 11,
        fontWeight: "600",
        color: "#696969",
    },
    infoPrice: {
        position: "absolute",
        bottom: 0,
        fontSize: 10,
        color: "#696969",
        fontWeight: "bold",
    },
    infoAmount: {
        fontSize: 12,
        color: "black",
        fontWeight: "600",
    },
    imageArea: {
        flex: 1,
    },
    vehicleImage: {
        position: "absolute",
        top: -15,
        left: -15,
        width: "140%",
        height: "140%",
    },
});
