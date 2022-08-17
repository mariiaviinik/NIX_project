import dayjs from 'dayjs';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route, useParams, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { getWeatherHistory } from '../../Store/History/thunks';
import { ForecastList } from '../ForecastList/ForecastList';
import { setCurrentCityAction } from '../../Store/Forecast/actions';


export const DatePicker = ({ date }) => {
    const [dateVal, setDateVal] = useState(date ? date : dayjs());
    const {cityName} = useParams();
    console.log( {date} = useParams())

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if(cityName){
            dispatch(setCurrentCityAction(cityName));
        }
    }, [dispatch, cityName]);

    const getDate = useCallback((e) => {
        const today = dayjs();
        const difference = today.diff(e, 'day');
        // console.log(today.diff(e, 'day'));
        if(difference>7){
            alert('BAAAAAAAAAAAAAAAAD');
        } else{
            setDateVal(e);
            const date = e.format('YYYY-MM-DD');
            if(date){
                dispatch(getWeatherHistory(cityName, date, dayjs().format('YYYY-MM-DD')));
            }
            navigate(date);
        }
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
                <Routes>
                    <Route path=':date' element={< ForecastList />} />
                </Routes>
            </div>
        </div>
    )
}