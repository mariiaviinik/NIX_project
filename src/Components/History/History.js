import dayjs from 'dayjs';
import { v4 as uuid } from 'uuid';
import { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Routes, Route, useParams, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { selectHistory } from '../../Store/History/selectors';
import { getWeatherHistory } from '../../Store/History/thunks';
import { ForecastItem } from '../ForecastItem/ForecastItem';
import { setCurrentCityAction } from '../../Store/Forecast/actions';

export const History = () => {
    const historyDt = useSelector(selectHistory);
    const {cityName, date} = useParams();
    const [dateVal, setDateVal] = useState(date ? date : dayjs())

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=>{
        if(cityName){
            dispatch(setCurrentCityAction(cityName));
            if(date){
                dispatch(getWeatherHistory(cityName, date, dayjs().format('YYYY-MM-DD')));
            }
        }
    }, [dispatch, cityName, date])

    const getDate = useCallback((e) => {
        setDateVal(e);
        console.log(e)
        const date = e.format('YYYY-MM-DD');
        navigate(date);
    }, [navigate]);

    return(
        <div className='centralize-column column'>
            <div style={{width: 500, marginBottom: 10}}>
                <StaticDatePicker 
                    orientation="landscape"
                    openTo="day"
                    value={dateVal}
                    onChange={getDate}
                    renderInput={(params) => <TextField {...params} />}
                />
            </div>

            {
                historyDt.map((item, index) => { 
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