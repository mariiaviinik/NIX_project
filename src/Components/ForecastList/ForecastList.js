import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";
import { CircularProgress } from '@mui/material';
import { selectForecastDt, selectIsLoadingForecastList } from '../../Store/Forecast/selectors';
import { selectHistory, selectIsLoadingHistory } from '../../Store/History/selectors';
import { getWeatherForecast } from '../../Store/Forecast/thunks';
import { ForecastItem } from '../ForecastItem/ForecastItem';
import { getWeatherHistory } from '../../Store/History/thunks';


export const ForecastList = () => {
    const isLoadingHistoryList = useSelector(selectIsLoadingHistory);
    const isLoadingForecastList = useSelector(selectIsLoadingForecastList);
    const forecastDt = useSelector(selectForecastDt);
    const historyDt = useSelector(selectHistory);
    const [toDisplay, setToDisplay] = useState([]);
    const {cityName, date} = useParams();

    const dispatch = useDispatch();

    useEffect(() => {
        date
        ? setToDisplay(historyDt)
        : setToDisplay(forecastDt)
    }, [setToDisplay, date, historyDt, forecastDt]);

    useEffect(() => {
        if(cityName){
            dispatch(getWeatherForecast(cityName));
        }
    }, [dispatch, cityName]);

    useEffect(()=>{
        if(cityName && date){
            dispatch(getWeatherHistory(cityName, date, dayjs().format('YYYY-MM-DD')));
        }
    }, [dispatch, cityName, date])

    if(isLoadingForecastList || isLoadingHistoryList){
        return (
            <div className='circular-container'>
                <CircularProgress />
            </div>
        );
    }

    return(
        <div className='centralize-column column'>
            {
                toDisplay.map((item, index) => { 
                    return (
                        < ForecastItem 
                            key={index}
                            index={index}
                            currentDate={item.date}
                            weather={item.day}
                            byHours={item.hour}
                        />
                    );
                })
            }
        </div>
    )
}