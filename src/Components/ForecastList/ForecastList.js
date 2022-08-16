import { useCallback, useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from "react-router-dom";
import { selectForecastDt } from '../../Store/Forecast/selectors';
import { getWeatherForecast } from '../../Store/Forecast/thunks';
import { ForecastItem } from '../ForecastItem/ForecastItem';

export const ForecastList = () => {
    const forecastDt = useSelector(selectForecastDt);
    const {cityName} = useParams();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if(cityName){
            dispatch(getWeatherForecast(cityName));
        }
    }, [dispatch, cityName]);


    return(
        <div className='centralize-column column'>
            {
                forecastDt.map((item, index) => { 
                    return (
                        < ForecastItem 
                            key={uuid()}
                            index={index}
                            currentDate={item.date}
                            weather={item.day}
                            byHour={item.hour}
                        />
                    );
                })
            }
        </div>
    )
}