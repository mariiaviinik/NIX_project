import { options } from '../options';
import {
    getWeatherForecastAction,
    getWeatherForecastSuccessAction,
    getWeatherForecastFailureAction,
} from './actions';


const url = 'https://weatherapi-com.p.rapidapi.com/forecast.json?q=';

export const getWeatherForecast = (city) => {
    return async(dispatch, getState) => {
        dispatch(getWeatherForecastAction());
        try{
            if(city){
                const response =  await fetch(url + city + '&days=3', options);

                if(response.ok){
                    const data = await response.json();
                    // console.log(data);
                    dispatch(getWeatherForecastSuccessAction(data));
                }
            }
        } catch(error){
            dispatch(getWeatherForecastFailureAction(error));
        }
    }
}