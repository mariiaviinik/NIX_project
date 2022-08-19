import dayjs from 'dayjs';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, useParams, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { getWeatherHistory } from '../../Store/History/thunks';
import { selectLang } from '../../Store/User/selectors';
import { ForecastList } from '../ForecastList/ForecastList';
import { setCurrentCityAction } from '../../Store/Forecast/actions';


export const History = () => {
    const date = useParams()['*'];
    const [dateVal, setDateVal] = useState(date ? date : dayjs());
    const {cityName} = useParams();

    const language = useSelector(selectLang);
    const lang = language['history'];

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
        if(difference>7 || difference<1){
            alert(lang['notice']);
        } else{
            setDateVal(e);
            const date = e.format('YYYY-MM-DD');
            if(date){
                dispatch(getWeatherHistory(cityName, date, dayjs().format('YYYY-MM-DD')));
            }
            navigate(date);
        }
    }, [navigate, dispatch, cityName, lang]);

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