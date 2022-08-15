import './Header.css' ;
import { useState, useCallback, useEffect } from 'react';
import { Link, Routes, Route, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { translation } from '../../translation';
import { selectLang } from '../../Store/User/selectors';
import { selectCurrentCity } from '../../Store/Forecast/selectors';
import { CityAutocomplete } from '../CityAutocomplete/CityAutocomplete';
import { Settings } from '../Settings/Settings';
import { CurrentWeather } from '../CurrentWeather/CurrentWeather';
import { ForecastList } from '../ForecastList/ForecastList';
import { SportEvents } from '../SportEvents/SportEvents';
import { FavCities } from '../FavCities/FavCities';
import { History } from '../History/History';



export const Header = () => {
    const currentCity = useSelector(selectCurrentCity);
    const language = useSelector(selectLang);

    const [lang, setLang]  = useState(translation[language]['header']);

    useEffect(()=>{
        setLang(translation[language]['header'])
    }, [setLang, language]);

    return (
        <div className='main-container'>
            <div className="header">
                < CityAutocomplete text={lang['search']} />
                < Settings />
            </div>
            <div>
                {
                    currentCity
                    ? 
                    <nav className='link-container'>
                        <Link className='link' to={currentCity + '/current'} >{lang['current']}</Link>
                        <Link className='link' to={currentCity + '/forecast'} >{lang['forecast']}</Link>
                        <Link className='link' to={currentCity + '/history'} >{lang['history']}</Link>
                        <Link className='link' to={currentCity + '/sportEvents'} >{lang['sport']}</Link>
                    </nav>
                    : < FavCities />
                }
            </div>
            <Routes>
                <Route path='/:cityName/current' element={< CurrentWeather />} />
                <Route path='/:cityName/forecast' element={< ForecastList />} />
                <Route path='/:cityName/history/*' element={< History />} />
                <Route path='/:cityName/sportEvents' element={< SportEvents />} />
            </Routes>
        </div>
    )
}