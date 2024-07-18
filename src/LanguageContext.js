import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useEffect, useState } from 'react';

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('en'); // Default language is English

    useEffect(() => {
        const getStoredLanguage = async () => {
            try {
                const storedLanguage = await AsyncStorage.getItem('lang');
                if (storedLanguage) {
                    setLanguage(storedLanguage);
                }
            } catch (error) {
                console.error('Failed to load language', error);
            }
        };
        getStoredLanguage();
    }, []);

    const changeLanguage = async (newLanguage) => {
        setLanguage(newLanguage);
        try {
            await AsyncStorage.setItem('lang', newLanguage);
        } catch (error) {
            console.error('Failed to save language', error);
        }
    };

    return (
        <LanguageContext.Provider value={{ language, changeLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};
