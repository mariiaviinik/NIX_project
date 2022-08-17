import './FavCities.css';
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { translation } from '../../translation';
import { ListItemText, ListItem, Divider } from '@mui/material';
import { selectFavCities } from '../../Store/User/selectors';
import { deleteFavouriteCityAction } from '../../Store/User/actions';
import { selectLang } from '../../Store/User/selectors';
import { useNavigate } from "react-router-dom";


export const FavCities = ({ onLiClick }) => {
    const cities = useSelector(selectFavCities);
    const language = useSelector(selectLang);
    const [lang, setLang]  = useState(translation[language]['mainPage']);

    useEffect(()=>{
        setLang(translation[language]['mainPage'])
    }, [setLang, language]);

    const dispatch = useDispatch();

    const onCityDelete = useCallback((index)=>{
        dispatch(deleteFavouriteCityAction(index));
    }, [dispatch])
    
    return(
      <div className='fav-cities column'>
        {
          cities.length
          ?
          <div>
            <div className='caption'>
                <h1>{lang['caption']}</h1>
            </div>
            <ul className="fav-cities-list">
              {
                cities.map((city, index) => { 
                  return (
                    <div class='flex'  key={index}>
                      <ListItem sx={{width: 310}}  >
                        <ListItemText onClick={onLiClick} primary={city} />
                        <button onClick={()=>{onCityDelete(index)}} className={'button'}>
                            <b>DELETE</b>
                        </button>
                      </ListItem >
                      <Divider />
                    </div>
                  );
                })
              }
            </ul>
          </div>
          :
          <div className='welcome-text-container'>
            <div className='caption'>
              <h1>{lang['welcome']}</h1>
            </div>
            <p className='welcome-text'>
              {lang['text'][0]}
              <br/>
              {lang['text'][1]}
            </p>
          </div>
        }
      </div>
    );
}