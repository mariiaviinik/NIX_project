import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectSportEvents } from '../../Store/Sport/selectors';
import { getSportEvents } from '../../Store/Sport/thunks';
import { selectCurrentCity } from '../../Store/Forecast/selectors';
import { setCurrentCityAction } from '../../Store/Forecast/actions';
import { SportEventType } from '../SportEventType/SportEventType';
import { selectSavedSportEvents } from '../../Store/User/selectors';


export const SportEventsList = () => {
    const sportEvents = useSelector(selectSportEvents);
    const savedSportEvents = useSelector(selectSavedSportEvents);
    const [eventsToDispaly, setEventsToDispaly] = useState([]);
    const {cityName} = useParams();
    const currentCity = useSelector(selectCurrentCity);

    console.log(savedSportEvents);

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
                        < SportEventType key={index} i={index} typeDt={type}/>
                        : null
                    )
                })
            }
        </div>
    )
}