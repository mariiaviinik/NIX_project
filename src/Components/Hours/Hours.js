import {
    Table,
    TableHead,
    TableBody,
    TableCell,
    Paper,
} from '@mui/material';
import './Hours.css';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { translation } from '../../translation';
import { selectLang } from '../../Store/User/selectors';
import { measuringSystem } from '../../measure';
import { selectSystem } from '../../Store/User/selectors';
import { Hour } from '../Hour/Hour';

const style = {
    display: 'flex',
    width: 550,
    boxSizing: 'border-box',
    justifyContent: 'space-around',
}


export const Hours = ({ hours }) => {
    const language = useSelector(selectLang);
    const [lang, setLang]  = useState(translation[language]['current']);
    const [measureLang, setMeasureLang] = useState(translation[language]['measure']);
    const currentSystem = useSelector(selectSystem);
    const [mesureType, setMeasureType] = useState(measuringSystem[currentSystem]);

    useEffect(()=>{
        setMeasureType(measuringSystem[currentSystem])
    }, [setMeasureType, currentSystem])

    useEffect(()=>{
        setLang(translation[language]['current'])
        setMeasureLang(translation[language]['measure']);
    }, [setLang, setMeasureLang, language]);

    return(
         <div className='flex centralize-row by-hours-container'>
           <Paper sx={{style}}>
                 <Table sx={{ width: 550 }} className='hours-container'>
                    <TableHead>
                        <TableCell>{lang['time']}</TableCell>
                        <TableCell>{lang['temperature']}</TableCell>
                        <TableCell>{lang['feelsLike']}</TableCell>
                        <TableCell>{lang['wind']}</TableCell>
                        <TableCell>{lang['gust']}</TableCell>
                        <TableCell>{lang['pressure']}</TableCell>
                    </TableHead>
                     <TableBody>
                        {
                            hours.map((hour, index) => {
                                    if(index%3 === 0){
                                        return  <Hour key={index} dt={hour} />
                                    } 
                                    return null;
                                }
                            )
                        }
                    </TableBody>
                </Table>
            </Paper>
        </div>
    );
}
