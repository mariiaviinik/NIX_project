import { options } from '../options';
import {
    getSportEventsAction,
    getSportEventsSuccessAction,
    getSportEventsFailureAction,
} from './actions';


const url = 'https://weatherapi-com.p.rapidapi.com/sports.json?q=';

export const getSportEvents = (city) => {
    return async(dispatch, getState) => {
        dispatch(getSportEventsAction());
        try{
            const response =  await fetch(url + city, options);

            if(response.ok){
                const data = await response.json();
                dispatch(getSportEventsSuccessAction(data));
            } else {
                dispatch(getSportEventsFailureAction('Error happened'));
            }
        } catch(error){
            dispatch(getSportEventsFailureAction(error));
        }
    }
}