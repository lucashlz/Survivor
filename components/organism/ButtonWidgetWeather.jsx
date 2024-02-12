import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, TouchableWithoutFeedback } from "react-native";
import { BlurView } from 'expo-blur'
import { getForecast, getLocations } from "../../services/apiWeather.service";
import Const from "../../const";
import LoadingSpinner from "../atoms/LoadingSpinner";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import WidgetWeather from "./WidgetWeather";
import * as Location from 'expo-location';

const colors = require("../../colors.json");

const changeFormatDay = (dateString) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const d = new Date(dateString);
    return days[d.getDay()];
};

export default function ButtonWidgetWeather() {
    const [isLoading, setIsLoading] = React.useState(true);
    const [forecastData, setForecastData] = React.useState(null);
    const [weatherConditions, setWeatherConditions] = React.useState(null);
    const [modalVisible, setModalVisible] = React.useState(false);



    const [location, setLocation] = React.useState(null);
    const [city, setCity] = React.useState(null);

    const [full_city, setFullCity] = React.useState("");

    const getCityName = async (location) => {
        try {
            let [place] = await Location.reverseGeocodeAsync(location.coords);
            let cityName = place.city;

            let newStr = cityName.replace(/ê/g, "e");
            setFullCity(newStr);
            if (cityName.length > 7) {
                cityName = cityName.substring(0, 7) + "...";
            }
            return cityName;
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.error('Permission to access location was denied');
                return;
            }

            let locationData = await Location.getCurrentPositionAsync({});
            setLocation(locationData);
        })();
    }, []);



    useEffect(() => {
        if (location) {
            getCityName(location).then(cityName => {
                setCity(cityName);
            });
        }
    }, [location]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const forecast = await getForecast(city);
                if (forecast && forecast.current) {
                    console.log(forecast)
                    setForecastData(forecast);

                    let condition = forecast.current.is_day === 0 ? "night" : "day";

                    if (condition === 'day') {
                        if (forecast.current.precip_mm == 0 && forecast.current.humidity < 70) {
                            if (forecast.current.cloud >= 50) {
                                condition = "cloudy";
                            } else {
                                condition = "sunny";
                            }
                        } else {
                            condition = "rainy";
                        }
                    }
                    setWeatherConditions(condition);
                } else {
                    console.error(forecast);
                }

                setIsLoading(false);
            } catch (error) {
                console.error(error);
            }
        };

        if (city) {
            fetchData();
        }

    }, [city]);


    return (
        <>
            <TouchableOpacity style={styles.container} onPress={() => setModalVisible(true)}>
                {isLoading ? (
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <LoadingSpinner color={'white'}/>
                    </View>
                ) : (
                    <View style={styles.data_widget}>
                        <Text style={styles.temperature}> {forecastData.current.temp_c}°C</Text>
                        <Text style={styles.location}> {city}</Text>
                        <Text style={styles.humidity}> {forecastData.current.humidity} %
                            <Icon name="water" size={20}/>
                        </Text>
                        <Text style={styles.condition}> {forecastData.current.condition.text}</Text>
                    </View>
                )}
                <View style={{ paddingLeft: 105, position: 'absolute', paddingTop: 10 }}>
                    {weatherConditions === 'night' && (
                        <Icon name="weather-night-partly-cloudy"
                            size={50}
                            color={colors.gray} />
                    )}
                    {weatherConditions === 'cloudy' && (
                        <Icon name="cloud"
                            size={50}
                            color="white" />
                    )}
                    {weatherConditions === 'sunny' && (
                        <Icon name="white-balance-sunny"
                            size={50}
                            color="yellow" />
                    )}
                    {weatherConditions === 'rainy' && (
                        <Icon name="weather-pouring"
                            size={50}
                            color={'white'} />
                    )}
                    {weatherConditions === 'clear' && (
                        <Icon name="cloud"
                            size={50}
                            color="white" />
                    )}
                </View>
            </TouchableOpacity>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                    <BlurView style={styles.centeredView} intensity={15}>
                        <View style={styles.modalView}>
                            <WidgetWeather location_city = {full_city}/>
                        </View>
                    </BlurView>
                </TouchableWithoutFeedback>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 6,
        backgroundColor: '#1E90FF',
        borderRadius: Const.BORDER_RADIUS,
        width: 170,
        height: 180,
        margin: 7,
    },
    image: {
        width: 70,
        height: 70,
    },

    data_widget: {
        marginTop: 15,
        marginLeft: 10,
        flexDirection: 'column',
    },
    temperature: {
        fontSize: 30,
        color: 'white',
        fontFamily: Const.FONT_FAMILY_BOLD,
    },
    location: {
        marginTop: 5,
        fontSize: 30,
        color: 'white',
        fontFamily: Const.FONT_FAMILY,
    },
    condition: {
        marginTop: 15,
        fontSize: 22,
        fontFamily: Const.FONT_FAMILY,
        color: colors.background,
    },
    humidity: {
        marginTop: 10,
        marginLeft: 5,
        fontSize: 17,
        color: 'white',
        fontFamily: Const.FONT_FAMILY,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalView: {
        width: "90%",
        height: "65%",
        backgroundColor: '#1E90FF',

        borderRadius: 40,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 40,
        marginRight: 120,
        fontWeight: "bold",
        fontFamily: Const.FONT_FAMILY_BOLD,
        color: colors.darkBackground,
    },
    infoContainer: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        width: '130%',
        marginLeft: 70,
        marginTop: 40,
    },
    infoText: {
        fontFamily: Const.FONT_FAMILY,
        fontSize: 20,
        padding: 20,
        color: colors.darkBackground,
    },
    boldLabel: {
        fontFamily: Const.FONT_FAMILY_BOLD,
        fontWeight: 'bold',
        color: colors.darkBackground,
    }
});
