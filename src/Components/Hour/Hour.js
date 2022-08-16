import {
    Table,
    TableBody,
    TableRow,
    TableCell,
    Paper,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { translation } from '../../translation';
import { selectLang } from '../../Store/User/selectors';
import { measuringSystem } from '../../measure';
import { selectSystem } from '../../Store/User/selectors';


export const Hour = ({dt}) => {
    const date = dt?.time?.split(' ');
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
        <div className='centralize-row'>
            <Paper sx={{display: 'flex', width: 500, padding: 3, justifyContent: 'space-around'}}>
                <div className='centralize-column column'>
                    <p><b>{date ? date[1] : ''}</b></p>
                    <img src={dt?.condition?.icon} alt='weather icon' className='weather-icon' />
                    <span className='temperature'>{Math.round(dt['temp'+mesureType['degrees']])+measureLang[mesureType['degrees']]}</span>
                    <span><b>{dt?.condition?.text}</b></span>
                </div>
                <Table sx={{ width: 300 }} >
                    <TableBody>
                        <TableRow>
                            <TableCell>{lang['feelsLike']}</TableCell>
                            <TableCell>{dt['feelslike'+mesureType['degrees']]+measureLang[mesureType['degrees']]}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>{lang['wind']}</TableCell>
                            <TableCell>{dt['wind'+mesureType['speed']]+measureLang[mesureType['speed']]}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>{lang['gust']}</TableCell>
                            <TableCell>{dt['gust'+mesureType['speed']]+measureLang[mesureType['speed']]}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>{lang['pressure']}</TableCell>
                            <TableCell>{dt['pressure'+mesureType['length']]+measureLang[mesureType['length']]}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Paper>
        </div>
    );
}
