import {
    TableBody,
    TableRow,
    TableCell,
    Button,
} from '@mui/material';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addSportEventAction, deleteSportEventAction } from '../../Store/User/actions';


export const SportEvent = ({ dt, typeIndex }) => {
    const {cityName} = useParams();

    const dispatch = useDispatch();

    const onEventSave = useCallback((sportItem, index)=>{
        dispatch(addSportEventAction(sportItem, index));
    }, [dispatch])

    const onEventDelete = useCallback((typeIndex, eventIndex)=>{
        dispatch(deleteSportEventAction(typeIndex, eventIndex));
    }, [dispatch])

    return(
        <TableBody>
            {   
                dt.map((sportEvent, index)=> {
                    return (
                        <TableRow key={index}>
                            <TableCell>
                                <p>{sportEvent.match}</p>
                            </TableCell>
                            <TableCell>
                                <p>{sportEvent.tournament}</p>
                            </TableCell>
                            <TableCell>
                                <p>{sportEvent.country}</p>
                                <p>{sportEvent.stadium}</p>
                            </TableCell>
                            <TableCell>
                                <p>{sportEvent.start.split(' ')[1]}</p>
                            </TableCell>
                            <TableCell>
                                {
                                    cityName
                                    ?
                                    <Button onClick={()=>{onEventSave(sportEvent, typeIndex)}}>Add</Button>
                                    :
                                    <Button onClick={()=>{onEventDelete(typeIndex, index)}}>Delete</Button>
                                }
                            </TableCell>
                        </TableRow>
                    )
                })
            }
        </TableBody>
    )
}