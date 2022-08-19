export const GET_WEATHER_HISTORY_ACTION = 'GET_WEATHER_HISTORY_ACTION';
export const GET_WEATHER_HISTORY_SUCCESS_ACTION = 'GET_WEATHER_HISTORY_SUCCESS_ACTION';
export const GET_WEATHER_HISTORY_FAILURE_ACTION = 'GET_WEATHER_HISTORY_FAILURE_ACTION';

export const getWeatherHistoryAction = () => {
    return {
        type: GET_WEATHER_HISTORY_ACTION,
    };
}

export const getWeatherHistorySuccessAction = (data) => {
    return {
        type: GET_WEATHER_HISTORY_SUCCESS_ACTION,
        data,
    };
}

export const getWeatherHistoryFailureAction = (error) => {
    return {
        type: GET_WEATHER_HISTORY_FAILURE_ACTION,
        error
    };
}