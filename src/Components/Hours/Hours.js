import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Paper,
} from '@mui/material';
import './Hours.css';
import { useSelector } from 'react-redux';
import { selectLang } from '../../Store/User/selectors';
import { Hour } from '../Hour/Hour';

const style = {
    display: 'flex',
    width: 550,
    boxSizing: 'border-box',
    justifyContent: 'space-around',
}


export const Hours = ({ hours }) => {
    const language = useSelector(selectLang);
    const lang = language['current'];

    return(
         <div className='flex centralize-row by-hours-container'>
           <Paper sx={{style}}>
                 <Table sx={{ width: 550 }} className='hours-container'>
                    <TableHead>
                        <TableRow>
                            <TableCell>{lang['time']}</TableCell>
                            <TableCell>{lang['temperature']}</TableCell>
                            <TableCell>{lang['feelsLike']}</TableCell>
                            <TableCell>{lang['wind']}</TableCell>
                            <TableCell>{lang['gust']}</TableCell>
                            <TableCell>{lang['pressure']}</TableCell>
                        </TableRow>
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
