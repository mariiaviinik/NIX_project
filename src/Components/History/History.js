import dayjs from 'dayjs';
import { v4 as uuid } from 'uuid';
import { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Routes, Route, useParams, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { selectHistory } from '../../Store/History/selectors';
import { getWeatherHistory } from '../../Store/History/thunks';
import { ForecastItem } from '../ForecastItem/ForecastItem';
import { setCurrentCityAction } from '../../Store/Forecast/actions';

export const History = () => {
    const historyDt = useSelector(selectHistory);
    const {cityName, date} = useParams();

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

    const getDate = useCallback((e, city) => {
        const date = dayjs(e.target.value).format('YYYY-MM-DD');
        navigate(date);
    }, [dispatch, navigate]);

    return(
        <div className='centralize-column column'>
            <div style={{width: 500, marginBottom: 10}}>
            <TextField
                id="date"
                label="Start date"
                type="date"
                defaultValue={dayjs().format('YYYY-MM-DD')}
                onChange={getDate}
                sx={{ width: 220 }}
                InputLabelProps={{
                shrink: true,
                }}
            />

                {/* <input onChange={getDate} type='date' />  */}
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
            <Routes>
                <Route path='/:date/*' element={< History />} />
            </Routes>
        </div>
    )
}