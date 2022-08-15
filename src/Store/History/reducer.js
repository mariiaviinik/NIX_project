import { 
    GET_WEATHER_HISTORY_ACTION,
    GET_WEATHER_HISTORY_SUCCESS_ACTION,
    GET_WEATHER_HISTORY_FAILURE_ACTION,
} from './actions';

const initialState = {
    weatherHistoryDt: [],
}

export const historyReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_WEATHER_HISTORY_ACTION:
            return{...state}
        case GET_WEATHER_HISTORY_SUCCESS_ACTION:
            return{...state,
                weatherHistoryDt: action.data.forecast.forecastday,
            }
        default: return state;
    }
}