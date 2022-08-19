import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    CircularProgress
} from '@mui/material';
import './SportEventList.css';
import { selectSportEvents, selectIsLoadingSportList } from '../../Store/Sport/selectors';
import { getSportEvents } from '../../Store/Sport/thunks';
import { setCurrentCityAction } from '../../Store/Forecast/actions';
import { SportEvent } from '../SportEvent/SportEvent';
import { selectSavedSportEvents, selectLang, selectTheme } from '../../Store/User/selectors';


export const SportEventsList = () => {
    const isLoadingSportList =useSelector(selectIsLoadingSportList);
    const currentTheme = useSelector(selectTheme);
    const sportEvents = useSelector(selectSportEvents);
    const savedSportEvents = useSelector(selectSavedSportEvents);
    const [eventsToDispaly, setEventsToDispaly] = useState(sportEvents);
    const {cityName} = useParams();

    const language = useSelector(selectLang);
    const lang = language['sportEvents'];

    useEffect(()=>{
        if(cityName){
            setEventsToDispaly(sportEvents)
        } else{
            setEventsToDispaly(savedSportEvents)
        }
    }, [setEventsToDispaly, cityName, savedSportEvents, sportEvents]);

    const dispatch = useDispatch();
    
    useEffect(() => {
        if(cityName){
            dispatch(setCurrentCityAction(cityName));
            dispatch(getSportEvents(cityName));
        }
    }, [dispatch, cityName]);

    if(isLoadingSportList){
        return (
            <div className='circular-container'>
                <CircularProgress color="inherit" />
            </div>
        );
    }

    return(
        <div className={'column centralize-column'}>
            {
                eventsToDispaly.map((type, index)=>{
                    return(
                        type.length
                        ?
                        <div key={index} className={'column m-b-20 sport-list ' + currentTheme}>
                            <div className='caption'>
                                <h1>{lang['type'][index]}</h1>
                            </div>
                            <Table sx={{width:600, padding: '20px'}}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>{lang['match']}</TableCell>
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