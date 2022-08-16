import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
    Table,
    TableHead,
    TableRow,
    TableCell,
} from '@mui/material';
import { translation } from '../../translation';
import { selectSportEvents } from '../../Store/Sport/selectors';
import { getSportEvents } from '../../Store/Sport/thunks';
import { selectCurrentCity } from '../../Store/Forecast/selectors';
import { setCurrentCityAction } from '../../Store/Forecast/actions';
import { SportEvent } from '../SportEvent/SportEvent';
import { selectSavedSportEvents, selectLang } from '../../Store/User/selectors';


export const SportEventsList = () => {
    const sportEvents = useSelector(selectSportEvents);
    const savedSportEvents = useSelector(selectSavedSportEvents);
    const [eventsToDispaly, setEventsToDispaly] = useState(sportEvents);
    const {cityName} = useParams();
    const currentCity = useSelector(selectCurrentCity);

    const language = useSelector(selectLang);
    const [lang, setLang]  = useState(translation[language]['sportEvents']);

    useEffect(()=>{
        setLang(translation[language]['sportEvents'])
    }, [setLang, language]);

    useEffect(()=>{
        if(!cityName){
            setEventsToDispaly(savedSportEvents)
        }
    }, [setEventsToDispaly, cityName, savedSportEvents]);

    const dispatch = useDispatch();
    
    useEffect(() => {
        if(cityName){
            dispatch(setCurrentCityAction(cityName));
            dispatch(getSportEvents());
        }
    }, [dispatch, currentCity, cityName]);

    return(
        <div className='column centralize-column'>
            {
                eventsToDispaly.map((type, index)=>{
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
                                <SportEvent dt={type} typeIndex={index}/>
                            </Table>
                        </div>
                        : null
                    )
                })
            }
        </div>
    )
}