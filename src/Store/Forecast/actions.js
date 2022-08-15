export const GET_WEATHER_FORECAST_ACTION = 'GET_WEATHER_FORECAST_ACTION';
export const GET_WEATHER_FORECAST_SUCCESS_ACTION = 'GET_WEATHER_FORECAST_SUCCESS_ACTION';
export const GET_WEATHER_FORECAST_FAILURE_ACTION = 'GET_WEATHER_FORECAST_FAILURE_ACTION';

export const SET_CURRENT_CITY_ACTION = 'SET_CURRENT_CITY_ACTION';


export const getWeatherForecastAction = () => {
    return {
        type: GET_WEATHER_FORECAST_ACTION,
    };
}

export const getWeatherForecastSuccessAction = (data) => {
    return {
        type: GET_WEATHER_FORECAST_SUCCESS_ACTION,
        data,
    };
}

export const getWeatherForecastFailureAction = () => {
    return {
        type: GET_WEATHER_FORECAST_FAILURE_ACTION,
    };
}

export const setCurrentCityAction = (city) => {
    return {
        type: SET_CURRENT_CITY_ACTION,
        city
    };
}