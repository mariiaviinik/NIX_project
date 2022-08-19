import { options } from '../options';
import {
    getAutocompleteDtAction,
    getAutocompleteDtSuccessAction,
    getAutocompleteDtFailureAction,
} from './actions';


const url = 'https://weatherapi-com.p.rapidapi.com/search.json?q=';

export const getAutocompleteDt = (str) => {
    return async(dispatch, getState) => {
        dispatch(getAutocompleteDtAction());
        try{
            const response =  await fetch(url + str, options);

            if(response.ok){
                const data = await response.json();
                dispatch(getAutocompleteDtSuccessAction(data));
            }else{
                dispatch(getAutocompleteDtFailureAction('Error happened'))
            }
        } catch(error){
            dispatch(getAutocompleteDtFailureAction(error));
        }
    }
}