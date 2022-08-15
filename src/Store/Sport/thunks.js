import { options } from '../options';
import {
    getSportEventsAction,
    getSportEventsSuccessAction,
    getSportEventsFailureAction,
} from './actions';


const url = 'https://weatherapi-com.p.rapidapi.com/sports.json?q=Kiew';

export const getSportEvents = (city) => {
    return async(dispatch, getState) => {
        dispatch(getSportEventsAction());
        try{
            const response =  await fetch(url, options);

            if(response.ok){
                const data = await response.json();
                dispatch(getSportEventsSuccessAction(data));
            }
        } catch(error){
            dispatch(getSportEventsFailureAction(error));
        }
    }
}