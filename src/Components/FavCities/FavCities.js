import './FavCities.css';
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ListItemText, ListItem, Divider } from '@mui/material';
import { selectFavCities } from '../../Store/User/selectors';
import { deleteFavouriteCityAction } from '../../Store/User/actions';
import { selectLang, selectTheme } from '../../Store/User/selectors';


export const FavCities = ({ onLiClick }) => {
    const currentTheme = useSelector(selectTheme);
    const cities = useSelector(selectFavCities);
    const language = useSelector(selectLang);
    const lang = language['mainPage'];

    const dispatch = useDispatch();

    const onCityDelete = useCallback((id)=>{
        dispatch(deleteFavouriteCityAction(id));
    }, [dispatch])
    
    return(
      <div className='fav-cities column'>
        {
          cities.length
          ?
          <div className={currentTheme}>
            <div className='caption'>
                <h1>{lang['caption']}</h1>
            </div>
            <ul className="fav-cities-list">
              {
                cities.map((city, index) => { 
                  return (
                    <div className='flex'  key={index}>
                      <ListItem sx={{width: 310}}  >
                        <ListItemText onClick={onLiClick} primary={city.name} />
                        <button onClick={()=>{onCityDelete(city.id)}} className={'button'}>
                            <b>{language['button']['delete']}</b>
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