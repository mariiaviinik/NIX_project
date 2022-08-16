import {
    Table,
    TableHead,
    TableRow,
    TableCell,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { translation } from '../../translation';
import { selectLang } from '../../Store/User/selectors';
import { SportEvent } from '../SportEvent/SportEvent';

export const SportEventType = ({ typeDt, i }) => {
    const language = useSelector(selectLang);
    const [lang, setLang]  = useState(translation[language]['sportEvents']);

    useEffect(()=>{
        setLang(translation[language]['sportEvents'])
    }, [setLang, language]);

    return(
        <div>
            <h3>{lang['type'][i]}</h3>
            <Table sx={{width:600}}>
                <TableHead>
                    <TableRow>
                        <TableCell>{lang['tournament']}</TableCell>
                        <TableCell>{lang['place']}</TableCell>
                        <TableCell>{lang['time']}</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <SportEvent dt={typeDt}/>
            </Table>
        </div>
    )
}