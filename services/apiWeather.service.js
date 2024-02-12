import ax from 'axios';

const apiKey = 'b358f5c914c6449fa42144912230709';

let axios = ax.create({
    baseURL: 'https://api.weatherapi.com/v1'
});

const truncateCityName = (cityName) => {
    return cityName.length > 7 ? cityName.substring(0, 7) + "..." : cityName;
}

const callApi = async (endpoint) => {
    try {
        const response = await axios.get(endpoint);
        return response.data;
    } catch (error) {
        console.error('API call error: ', error);
        return {};
    }
}

export const getForecast = (cityName = "Paris", days = 5) => {
    cityName = truncateCityName(cityName);
    return callApi("/forecast.json?key=" + apiKey + '&q=' + cityName + '&days=' + days);
}

export const getLocations = (cityName = "Paris") => {
    cityName = truncateCityName(cityName);
    return callApi("/search.json?key=" + apiKey + '&q=' + cityName);
}
