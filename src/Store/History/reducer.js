import { 
    GET_WEATHER_HISTORY_ACTION,
    GET_WEATHER_HISTORY_SUCCESS_ACTION,
    GET_WEATHER_HISTORY_FAILURE_ACTION,
} from './actions';

const initialState = {
    isLoadingHistory: false,
    weatherHistoryDt: [],
    error: null,
}

export const historyReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_WEATHER_HISTORY_ACTION:
            return{...state,
                isLoadingHistory: true,
            }
        case GET_WEATHER_HISTORY_SUCCESS_ACTION:
            return{...state,
                isLoadingHistory: false,
                weatherHistoryDt: action.data.forecast.forecastday,
            }
        case GET_WEATHER_HISTORY_FAILURE_ACTION:
            return{...state,
                error: action.error,
            }
        default: return state;
    }
}