import { React, useEffect, useState } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { View, Text, TextInput } from 'react-native';
import { getForecast, getLocations } from '../../services/apiWeather.service';
import LoadingSpinner from '../atoms/LoadingSpinner';
import Const from '../../const';
import TextField from '../atoms/TextField';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const colors = require('../../colors.json');

const changeFormatDay = (dateString) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const d = new Date(dateString);
    return days[d.getDay()];
};

export default function WidgetWeather({location_city}) {
    const [isLoadingForecast, setIsLoadingForecast] = useState(true);
    const [forecastData, setForecastData] = useState(null);
    const [forecast_days, setForecastDays] = useState(null);

    const [current_city, setCurrentCity] = useState(null);
    const [currentCountry, setCurrentCountry] = useState("");

    const [searchQuery, setSearchQuery] = useState('');
    const [citySuggestions, setCitySuggestions] = useState([]);

    

    const handleSearchChange = async (text) => {
        setSearchQuery(text);
        if (text.length >= 2) {
            try {
                const locations = await getLocations(text);
                setCitySuggestions(locations);
            } catch (error) {
                console.log('Error getting city suggestions:', error);
            }
        } else {
            setCitySuggestions([]);
        }
    };

    const handleCitySearch = async (cityName) => {
        try {
            const locations = await getLocations(cityName);
            if (locations && locations.length > 0) {
                setCurrentCity(cityName);
                const forecast = await getForecast(cityName);
                setForecastData(forecast);
                setCitySuggestions([]);
                setSearchQuery("");
            }
        } catch (error) {
            console.log('Error searching city:', error);
        }
    };

    const fetchForecast = async () => {
        try {
            const response = await getForecast();
            setForecastData(response);
            setIsLoadingForecast(false);
            setForecastDays(response.forecast.forecastday.length);
            setCurrentCity(response.location.name);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchForecast();
    }, []);

    const getWeatherDetails = (condition) => {
        const lowerCaseCondition = condition.toLowerCase();
        if (lowerCaseCondition.includes('sunny')) {
            return { icon: 'white-balance-sunny', color: 'yellow' };
        }
        if (lowerCaseCondition.includes('rainy') || lowerCaseCondition.includes('rain')) {
            return { icon: 'weather-pouring', color: 'white' };
        }
        if (lowerCaseCondition.includes('cloudy') || lowerCaseCondition.includes('overcast')) {
            return { icon: 'cloud', color: 'gray' };
        }
        return { icon: 'cloud-question', color: 'gray' };
    };

    const totalWidth = forecastData ? 350 : 0;
    const totalHeight = forecastData ? (100 * forecast_days) : 0;

    return (
        <View style={styles.container}>
            {isLoadingForecast ? (
                <LoadingSpinner />
            ) : (
                <>
                    <View style={{ flex: 1 }}>
                        <View style={{ alignItems: 'center', paddingBottom: 15, paddingTop: 5 }}>
                            <Text style={{
                                color: 'white',
                                fontSize: 28,
                                fontWeight: 'bold',
                                fontFamily: Const.FONT_FAMILY_BOLD,
                            }}>{location_city}</Text>
                            <Text style={{ color: 'white', fontWeight: 'bold' }}>(5 next days)</Text>
                        </View>

                        {forecastData.forecast.forecastday.map((day, index) => {
                            const weatherDetails = getWeatherDetails(day.day.condition.text);
                            return (
                                <View key={index} >
                                    <TouchableOpacity style={styles.forecast_item}>
                                        {index === 0 ? (
                                            <Text style={{
                                                fontWeight: 'bold',
                                                fontSize: 23,
                                                color: 'white',
                                            }}>Today</Text>
                                        ) : (
                                            <Text style={{
                                                fontSize: 23,
                                                color: 'white',
                                                fontWeight: 'bold',
                                                fontFamily: Const.FONT_FAMILY_BOLD,
                                            }}>{changeFormatDay(day.date)}</Text>
                                        )}
                                        <Text style={{
                                            fontSize: 24,
                                            fontWeight: 'bold',
                                            color: 'white',
                                        }}>{day.day.avgtemp_c}°C</Text>
                                        <Icon
                                            name={weatherDetails.icon}
                                            size={40}
                                            color={weatherDetails.color} />
                                    </TouchableOpacity>

                                    <View style={styles.horizontalLine}></View>
                                </View>
                            );
                        })}
                    </View>
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },

    headerContainer: {
        alignItems: 'center',
        width: '100%',
    },
    buttonIcon: {
        marginVertical: 10,
        marginHorizontal: 5,
    },
    headerText: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        fontFamily: Const.FONT_FAMILY_BOLD,
    },

    Text: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        fontFamily: Const.FONT_FAMILY_BOLD,
    },

    horizontalLine: {

        paddingLeft: 250,
        borderTopWidth: 1,
        borderColor: 'white',
        marginVertical: 3,
    },


    forecast_item: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: 300,
        height: 50,
        borderRadius: Const.BORDER_RADIUS,
        marginVertical: 10,
        paddingTop: 8,
        paddingRight: 8,
    },
});
