import { options } from '../options';
import {
    getWeatherHistoryAction,
    getWeatherHistorySuccessAction,
    getWeatherHistoryFailureAction,
} from './actions';


const url = 'https://weatherapi-com.p.rapidapi.com/history.json?q=';

export const getWeatherHistory = (city, startDate, endDate) => {
    return async(dispatch, getState) => {
        dispatch(getWeatherHistoryAction());
        try{
            const response =  await fetch(url+city+'&dt='+startDate+'&end_dt='+endDate, options);

            if(response.ok){
                const data = await response.json();
                dispatch(getWeatherHistorySuccessAction(data));
            } else{
                dispatch(getWeatherHistoryFailureAction('Error happened'));
            }
        } catch(error){
            dispatch(getWeatherHistoryFailureAction(error.message));
        }
    }
}