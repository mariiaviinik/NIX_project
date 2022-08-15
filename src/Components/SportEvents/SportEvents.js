import { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Button,
} from '@mui/material';
import { selectSportEvents } from '../../Store/Sport/selectors';
import { selectCurrentCity } from '../../Store/Forecast/selectors';
import { getSportEvents } from '../../Store/Sport/thunks';
import { selectSavedSportEvents } from '../../Store/User/selectors';
import { setCurrentCityAction } from '../../Store/Forecast/actions';
import { translation } from '../../translation';
import { selectLang } from '../../Store/User/selectors';

export const SportEvents = () => {
    const sportEvents = useSelector(selectSportEvents);
    const savedSportEvents = useSelector(selectSavedSportEvents);
    const [eventsToDispaly, setEventsToDispaly] = useState([]);
    const {cityName} = useParams();
    const currentCity = useSelector(selectCurrentCity);
    console.log(sportEvents)
    
    const language = useSelector(selectLang);
    const [lang, setLang]  = useState(translation[language]['sportEvents']);

    useEffect(()=>{
        setLang(translation[language]['sportEvents'])
    }, [setLang, language]);

    const dispatch = useDispatch();
    
    useEffect(() => {
        if(cityName){
            dispatch(setCurrentCityAction(cityName));
            dispatch(getSportEvents());
        }
    }, [dispatch, currentCity]);

    return(
        <div className='column centralize-column'>
            {
                sportEvents.map((type, index)=>{
                    return(
                        type.length
                        ?
                        <div key={index}>
                            <h3>{lang['type'][index]}</h3>
                            <Table sx={{width:600}}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>{lang['tournament']}</TableCell>
                                        <TableCell>{lang['place']}</TableCell>
                                        <TableCell>{lang['time']}</TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {   
                                        type.map((event, index)=> {
                                            return (
                                                <TableRow key={index}>
                                                    <TableCell>
                                                        <p>{event.tournament}</p>
                                                    </TableCell>
                                                    <TableCell>
                                                        <p>{event.country}</p>
                                                        <p>{event.stadium}</p>
                                                    </TableCell>
                                                    <TableCell>
                                                        <p>{event.start.split(' ')[1]}</p>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Button>Add</Button>
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })
                                    }
                                </TableBody>
                            </Table>
                        </div>
                        : null
                    )
                })
            }
        </div>
    )
}