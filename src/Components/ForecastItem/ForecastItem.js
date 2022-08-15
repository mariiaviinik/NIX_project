import './ForecastItem.css';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
    Table,
    TableBody,
    TableRow,
    TableCell,
    Paper,
} from '@mui/material';
import { getMonthName } from '../getMonth';
import { Hour } from '../Hour/Hour'

export const ForecastItem = ({ index, currentDate, weather, byHour}) => {
    const date = new Date(currentDate);
    const [isHide, setIsHide] = useState(true);

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
                            <div>{Math.round(weather.mintemp_c)}°</div>
                            <div>{Math.round(weather.maxtemp_c)}°</div>
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
                                    // <div key={index}>
                                    //     <p>{index}</p>
                                    //     <p>{hour.temp_c}</p>
                                    // </div>
                                )
                            })
                        }
                    </div>
                }
            </Paper>
        </div>
    );
}