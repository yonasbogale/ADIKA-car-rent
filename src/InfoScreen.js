import React, { useContext } from "react";
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { LanguageContext } from './LanguageContext'; // Import the LanguageContext
import data from "./dataset/vehicles.json";

const back = require("./assets/icons/left-arrow.png");
const dots = require("./assets/icons/dots.png");

const image_v_1 = require("./assets/vehicles/v-1.png");
const image_v_2 = require("./assets/vehicles/v-2.png");
const image_v_3 = require("./assets/vehicles/v-3.png");
const image_v_4 = require("./assets/vehicles/v-4.png");
const image_v_5 = require("./assets/vehicles/v-5.png"); // Add import for Vits image
const image_v_6 = require("./assets/vehicles/v-6.png");

const InfoScreen = ({ route, navigation }) => {
    const { language } = useContext(LanguageContext); // Use the LanguageContext to get current language

    const vehicle = data.vehicles.filter(
        (element) => element.id == route.params.id
    )[0];

    const getImage = (id) => {
        if (id === 1) return image_v_1;
        if (id === 2) return image_v_2;
        if (id === 3) return image_v_3;
        if (id === 4) return image_v_4;
        if (id === 5) return image_v_5;
        if (id === 6) return image_v_6;
    };

    const formatPrice = (price) => {
        // Assuming vehicle.price_per_day is in dollars
        const priceInBirr = price * 45.53; // Replace with actual conversion rate if needed
        return priceInBirr.toFixed(2) + " Birr"; // Adjust the conversion and formatting as necessary
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.headerSection}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        activeOpacity={0.9}
                    >
                        <Image
                            source={back}
                            resizeMode="contain"
                            style={styles.menuIconStyle}
                        />
                    </TouchableOpacity>
                    <Text style={styles.HeaderText}>{language === 'en' ? 'Detail' : 'ዝርዝር'}</Text>
                    <Image
                        source={dots}
                        resizeMode="contain"
                        style={styles.faceIconStyle}
                    />
                </View>

                <View style={styles.imageSection}>
                    <Image
                        source={getImage(vehicle.id)}
                        resizeMode="contain"
                        style={styles.vehicleImage}
                    />
                </View>

                <View style={styles.headSection}>
                    <View style={styles.topTextArea}>
                        <Text style={styles.makemodelText}>
                            {vehicle.make} {vehicle.model}
                        </Text>
                        <Text style={styles.price}>
                            <Text style={styles.amount}>{formatPrice(vehicle.price_per_day)}</Text> /{language === 'en' ? 'day' : 'ቀን'}
                        </Text>
                    </View>
                    <Text style={styles.typetranText}>
                        {vehicle.type}-{vehicle.transmission}
                    </Text>
                </View>

                <Text style={styles.descriptionText}>{vehicle.description}</Text>
                <Text style={styles.propertiesText}>{language === 'en' ? 'Properties' : 'ባህሪያት'}</Text>

                <View style={styles.propertiesArea}>
                    <View style={styles.level}>
                        <Text style={styles.propertyText}>
                            {language === 'en' ? 'Motor power:' : 'የሞተር ሀይል:'}
                            <Text style={styles.valueText}>
                                {" "}
                                {vehicle.properties.motor_power_hp} hp
                            </Text>
                        </Text>
                        <Text style={styles.propertyText}>
                            {language === 'en' ? 'Engine capacity:' : 'የሞተር አቅም:'}
                            <Text style={styles.valueText}>
                                {" "}
                                {vehicle.properties.engine_capacity_cc} cc
                            </Text>
                        </Text>
                    </View>
                    <View style={styles.level}>
                        <Text style={styles.propertyText}>
                            {language === 'en' ? 'Fuel:' : 'ነዳጅ:'}
                            <Text style={styles.valueText}>
                                {" "}
                                {vehicle.properties.fuel_type}
                            </Text>
                        </Text>

                        <Text style={styles.propertyText}>
                            {language === 'en' ? 'Traction:' : 'መጎተት:'}
                            <Text style={styles.valueText}>
                                {" "}
                                {vehicle.properties.traction}
                            </Text>
                        </Text>
                    </View>
                </View>

                <TouchableOpacity style={styles.rentButton}>
                    <Text style={styles.rentButtonText}>{language === 'en' ? 'Rent a Car' : 'መኪና ይከራዩ'}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default InfoScreen;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "white",
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
        width: 25,
    },
    HeaderText: {
        fontSize: 20,
        marginLeft: 5,
        fontWeight: "500",
    },
    faceIconStyle: {
        width: 30,
    },

    imageSection: {
        width: "100%",
        height: 250,
        justifyContent: "center",
        alignItems: "center",
    },
    vehicleImage: {
        width: 300,
        height: 300,
    },

    headSection: {},
    topTextArea: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    makemodelText: {
        fontSize: 20,
        fontWeight: "500",
    },
    price: {
        fontWeight: "400",
    },
    amount: {
        fontWeight: "bold",
    },
    typetranText: {
        marginTop: 1,
        color: "#696969",
        fontWeight: "600",
        fontSize: 12,
    },
    descriptionText: {
        marginTop: 30,
        fontSize: 14,
        letterSpacing: 0.1,
        lineHeight: 18,
        color: "#696969",
        fontWeight: "500",
    },
    propertiesText: {
        marginTop: 20,
        fontSize: 19,
        fontWeight: "500",
    },
    propertiesArea: {
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "flex-start",
    },
    level: {
        marginRight: 30,
    },
    propertyText: {
        fontSize: 12,
        color: "#696969",
    },
    valueText: {
        fontSize: 12,
        color: "black",
    },
    rentButton: {
        marginTop: 50,
        height: 40,
        // padding: 10,
        alignSelf: "center",
        width: 250,
        backgroundColor: "black",
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
    },
    rentButtonText: {
        color: "white",
        fontWeight: "500",
    },
});
