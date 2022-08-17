import './Header.css' ;
import { useState, useEffect, useCallback } from 'react';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { translation } from '../../translation';
import logo from '../../img/logo.PNG';
import { selectLang, selectUserContacts, selectTheme } from '../../Store/User/selectors';
import { selectCurrentCity } from '../../Store/Forecast/selectors';
import { CityAutocomplete } from '../CityAutocomplete/CityAutocomplete';
import { Settings } from '../Settings/Settings';
import { CurrentWeather } from '../CurrentWeather/CurrentWeather';
import { ForecastList } from '../ForecastList/ForecastList';
import { SportEventsList } from '../SportEventsList/SportEventsList';
import { FavCities } from '../FavCities/FavCities';
import { History } from '../History/History';
import { RegistrForm } from '../RegistrForm/RegistrForm';


export const Header = () => {
    const currentCity = useSelector(selectCurrentCity);
    const currentTheme = useSelector(selectTheme);
    const user = useSelector(selectUserContacts);
    const language = useSelector(selectLang);
    const [lang, setLang]  = useState(translation[language]['header']);

    const navigate = useNavigate();

    useEffect(()=>{
        setLang(translation[language]['header'])
    }, [setLang, language]);

    const onCityClick = useCallback((e)=>{
        let inputVal = e.target.innerText.split(", ").shift();
        navigate('/user/' + user.id + '/' + inputVal + '/current');
    }, [navigate, user.id])

    return (
        <div>
            {
                user.login
                ?
                <div>
                    <div className={"header " + currentTheme}>
                        <div className='flex centralize-column'>
                            <img src={logo} className='image' alt='logo' />
                        </div>
                        <div className='flex'>
                            < CityAutocomplete text={lang['search']} />
                            < Settings />
                        </div>
                    </div>
                    <div className='main-container'>
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
                                : 
                                null
                            }
                        </div>
                        <Routes>
                            <Route path='/:cityName/current' element={< CurrentWeather />} />
                            <Route path='/:cityName/forecast' element={< ForecastList />} />
                            <Route path='/:cityName/history/*' element={< History />} />
                            <Route path='/:cityName/sportEvents' element={< SportEventsList />} />
                            <Route path='/savedEvents' element={< SportEventsList/>} />
                            <Route path='/' element={< FavCities onLiClick={onCityClick} />} />
                        </Routes>
                    </div>
                </div>
                : <RegistrForm />
            }
        </div>
    )
}