import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";
import {
    Table,
    TableBody,
    TableRow,
    TableCell,
    Paper,
} from '@mui/material';
import './CurrentWeather.css';
import { selectCurrentWeather } from '../../Store/Forecast/selectors';
import { getWeatherForecast } from '../../Store/Forecast/thunks';
import { translation } from '../../translation';
import { selectLang } from '../../Store/User/selectors';


export const CurrentWeather = () =>{
    const currentWeather = useSelector(selectCurrentWeather);
    const language = useSelector(selectLang);
    const [lang, setLang]  = useState(translation[language]['current']);

    const date = currentWeather?.last_updated?.split(' ');
    const currentWeatherLength = Object.keys(currentWeather).length;
    const {cityName} = useParams();

    useEffect(()=>{
        setLang(translation[language]['current'])
    }, [setLang, language]);

    const dispatch = useDispatch();

    useEffect(() => {
        if(cityName && !currentWeatherLength){
            dispatch(getWeatherForecast(cityName));
        }
    }, [dispatch, cityName, currentWeather]);
    

    return(
        <div className='centralize-row'>
            <Paper sx={{display: 'flex', width: 500, padding: 3, justifyContent: 'space-around'}}>
                <div className='centralize-column column'>
                    <p><b>{date ? date[1] : ''}</b></p>
                    <img src={currentWeather?.condition?.icon} alt='weather icon' className='weather-icon' />
                    <span className='temperature'>{Math.round(currentWeather?.temp_c)}°</span>
                    <span><b>{currentWeather?.condition?.text}</b></span>
                </div>
                <Table sx={{ width: 300 }} >
                    <TableBody>
                        <TableRow>
                            <TableCell>{lang['feelsLike']}</TableCell>
                            <TableCell>{currentWeather.feelslike_c}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>{lang['wind']}</TableCell>
                            <TableCell>{currentWeather.wind_kph}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>{lang['gust']}</TableCell>
                            <TableCell>{currentWeather.gust_kph}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>{lang['pressure']}</TableCell>
                            <TableCell>{currentWeather.pressure_mb}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Paper>
        </div>
    );
}