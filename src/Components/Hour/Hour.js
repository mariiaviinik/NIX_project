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


export const Hour = ({dt}) => {
    const language = useSelector(selectLang);
    const [lang, setLang]  = useState(translation[language]['current']);
    const date = dt?.time?.split(' ');

    useEffect(()=>{
        setLang(translation[language]['current'])
    }, [setLang, language]);

    return(
        <div className='centralize-row'>
            <Paper sx={{display: 'flex', width: 500, padding: 3, justifyContent: 'space-around'}}>
                <div className='centralize-column column'>
                    <p><b>{date ? date[1] : ''}</b></p>
                    <img src={dt?.condition?.icon} alt='weather icon' className='weather-icon' />
                    <span className='temperature'>{Math.round(dt?.temp_c)}°</span>
                    <span><b>{dt?.condition?.text}</b></span>
                </div>
                <Table sx={{ width: 300 }} >
                    <TableBody>
                        <TableRow>
                            <TableCell>{lang['feelsLike']}</TableCell>
                            <TableCell>{dt.feelslike_c}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>{lang['wind']}</TableCell>
                            <TableCell>{dt.wind_kph}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>{lang['gust']}</TableCell>
                            <TableCell>{dt.gust_kph}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>{lang['pressure']}</TableCell>
                            <TableCell>{dt.pressure_mb}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Paper>
        </div>
    );
}
