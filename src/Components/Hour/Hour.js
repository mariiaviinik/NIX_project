import './Hour.css'
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { translation } from '../../translation';
import { selectLang } from '../../Store/User/selectors';
import { measuringSystem } from '../../measure';
import { selectSystem } from '../../Store/User/selectors';

export const Hour = ({ dt }) => {
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
        <tr className='hour'>
            <td className='flex centralize-column' style={{paddingLeft: 10}}>
                <span><b>{date ? date[1] : ''}</b></span>
                <img src={dt?.condition?.icon} alt='weather icon' className='hour-weather-icon' />    
            </td>
            <td>{Math.round(dt['temp'+mesureType['degrees']])+measureLang[mesureType['degrees']]}</td>
            <td>{Math.round(dt['feelslike'+mesureType['degrees']])+measureLang[mesureType['degrees']]}</td>
            <td>{dt['wind'+mesureType['speed']]+measureLang[mesureType['speed']]}</td>
            <td>{dt['gust'+mesureType['speed']]+measureLang[mesureType['speed']]}</td>
            <td>{dt['pressure'+mesureType['length']]+measureLang[mesureType['length']]}</td>
        </tr>
    )
}