import './ForecastItem.css';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
    Table,
    TableBody,
    TableRow,
    TableCell,
    Paper,
} from '@mui/material';
import { getMonthName } from '../getMonth';
import { Hours } from '../Hours/Hours';
import { measuringSystem } from '../../measure';
import { selectSystem } from '../../Store/User/selectors';
import { translation } from '../../translation';
import { selectLang } from '../../Store/User/selectors';


const style = {
    width: 550,
    padding: 2,
    boxSizing: 'border-box',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
}

export const ForecastItem = ({ index, currentDate, weather, byHours}) => {
    const date = new Date(currentDate);
    const [isHide, setIsHide] = useState(true);
    const currentSystem = useSelector(selectSystem);
    const [mesureType, setMeasureType] = useState(measuringSystem[currentSystem]);
    const language = useSelector(selectLang);
    const [lang, setLang]  = useState(translation[language]['measure']);

    useEffect(()=>{
        setLang(translation[language]['measure'])
    }, [setLang, language]);

    useEffect(()=>{
        setMeasureType(measuringSystem[currentSystem])
    }, [setMeasureType, currentSystem])

    const showByHours = useCallback(()=>{
            setIsHide(isHide ? false : true)
    }, [setIsHide, isHide])    

    return(
        <div className='centralize-column column' style={{marginBottom: 20}}>
            <Paper sx={style}>
                <div style={{justifyContent: 'space-around'}} className='flex forecast-item' onClick={showByHours}>
                        <div className='column centralize-column'>
                            <span><b>{date.getDate()}</b></span>
                            <span><b>{getMonthName(date)}</b></span>
                        </div>
                        <img src={weather.condition.icon} alt='weather icon' className='weather-icon' />
                        <p>{weather.condition.text}</p>
                        <div>
                            <div>{Math.round(weather['mintemp'+mesureType['degrees']])+lang[mesureType['degrees']]}</div>
                            <div>{Math.round(weather['maxtemp'+mesureType['degrees']])+lang[mesureType['degrees']]}</div>
                        </div>
                </div>
            </Paper>
            {
                isHide
                ? null                
                : 
                <div>
                    {
                        < Hours 
                            key={index}
                            hours={byHours}
                        />
                    }
                </div>
            }
        </div>
    );
}