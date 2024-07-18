import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Image, StyleSheet } from 'react-native';

import HomeScreen from './src/HomeScreen';
import InfoScreen from './src/InfoScreen';
import { LanguageProvider } from './src/LanguageContext';
import MapScreen from './src/MapScreen';
import RideRequestScreen from './src/RideRequestScreen';
import SavedScreen from './src/SavedScreen';
import SettingsScreen from './src/SettingsScreen';



const homeIcon_active = require('./src/assets/icons/home-active.png');
const homeIcon = require('./src/assets/icons/home.png');
const compass_active = require('./src/assets/icons/compass-active.png');
const compass = require('./src/assets/icons/compass.png');
const savedIcon_active = require('./src/assets/icons/saved-active.png');
const savedIcon = require('./src/assets/icons/saved.png');
const settingsIcon_active = require('./src/assets/icons/settings-active.png');
const settingsIcon = require('./src/assets/icons/settings.png');
const rideRequestIcon = require('./src/assets/icons/request-ride.png');

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Initial" component={HomeScreen} />
      <Stack.Screen name="Info" component={InfoScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ focused }) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = focused ? homeIcon_active : homeIcon;
              } else if (route.name === 'Map') {
                iconName = focused ? compass_active : compass;
              } else if (route.name === 'Saved') {
                iconName = focused ? savedIcon_active : savedIcon;
              } else if (route.name === 'Settings') {
                iconName = focused ? settingsIcon_active : settingsIcon;
              } else if (route.name === 'RideRequest') {
                iconName = rideRequestIcon;
              }

              return <Image source={iconName} resizeMode="contain" style={styles.footerIcon} />;
            },
            tabBarShowLabel: false,
            tabBarStyle: {
              position: 'absolute',
              bottom: 0, // Adjust as per your layout
              paddingVertical: 10,
              backgroundColor: 'black',
              borderTopStartRadius: 40,
              borderTopEndRadius: 40,
            },
          })}
        >
          <Tab.Screen name="Home" component={HomeStack} />
          <Tab.Screen name="Map" component={MapScreen} />
          <Tab.Screen name="Saved" component={SavedScreen} />
          <Tab.Screen name="RideRequest" component={RideRequestScreen} />
          <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </LanguageProvider>
  );
}

const styles = StyleSheet.create({
  footerIcon: {
    width: 30,
    height: 30, // Adjust height as per your icon dimensions
  },
});
