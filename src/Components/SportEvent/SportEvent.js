import {
    TableBody,
    TableRow,
    TableCell,
    Button,
} from '@mui/material';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { addSportEventAction } from '../../Store/User/actions';


export const SportEvent = ({ dt }) => {
    const dispatch = useDispatch();

    const onEventSave = useCallback((item)=>{
        dispatch(addSportEventAction(item));
    }, [dispatch])

    return(
        <TableBody>
            {   
                dt.map((sportEvent, index)=> {
                    return (
                        <TableRow key={index}>
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
                                <Button onClick={()=>{onEventSave(sportEvent)}}>Add</Button>
                            </TableCell>
                        </TableRow>
                    )
                })
            }
        </TableBody>
    )
}