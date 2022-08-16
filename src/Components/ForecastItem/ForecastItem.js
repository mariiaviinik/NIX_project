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
import { Hour } from '../Hour/Hour';
import { measuringSystem } from '../../measure';
import { selectSystem } from '../../Store/User/selectors';
import { translation } from '../../translation';
import { selectLang } from '../../Store/User/selectors';


export const ForecastItem = ({ index, currentDate, weather, byHour}) => {
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
        <div>
            <Paper sx={{display: 'column', 
                        width: 500, 
                        padding: 2, 
                        justifyContent: 'space-between',
                        marginBottom: 2,
                        boxSizing: 'border-box'
            }}>
                <div className='flex forecast-item' onClick={showByHours}>
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
                {
                    isHide
                    ? null                
                    : 
                    <div>
                        {
                            byHour.map((hour, index)=>{
                                return(
                                    < Hour 
                                        key={index}
                                        dt={hour}
                                    />
                                )
                            })
                        }
                    </div>
                }
            </Paper>
        </div>
    );
}