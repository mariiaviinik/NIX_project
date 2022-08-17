import { 
    GET_WEATHER_FORECAST_ACTION,
    GET_WEATHER_FORECAST_SUCCESS_ACTION,
    SET_CURRENT_CITY_ACTION,
} from './actions';

const initialState = {
    isLoadingForecastList: false,
    isLoadingCurrent: false,
    weatherForecastDt: [],
    currentWeather: [],
    weatherHistoryDt: [],
    currentCity: '',
}

export const forecastReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_WEATHER_FORECAST_ACTION:
            return{...state, 
                isLoadingForecastList: true,
                isLoadingCurrent: true,
            }
        case GET_WEATHER_FORECAST_SUCCESS_ACTION:
            return{...state,
                isLoadingForecastList: false,
                isLoadingCurrent: false,
                weatherForecastDt: action.data.forecast.forecastday,
                currentWeather: action.data.current,
                currentCity: action.data.location.name,
            }
        case SET_CURRENT_CITY_ACTION:
            return{...state,
                currentCity: action.city,
            }
        default: return state;
    }
}