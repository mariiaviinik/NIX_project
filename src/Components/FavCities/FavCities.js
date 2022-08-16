import './FavCities.css';
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ListItemText, ListItem, Button } from '@mui/material';
import { selectFavCities } from '../../Store/User/selectors';
import { deleteFavouriteCityAction } from '../../Store/User/actions';
import { useNavigate } from "react-router-dom";


export const FavCities = ({ onLiClick }) => {
    const cities = useSelector(selectFavCities);
    const dispatch = useDispatch();

    const onCityDelete = useCallback((index)=>{
        dispatch(deleteFavouriteCityAction(index));
    }, [dispatch])
    
    return(
      <div>
        <h3>Your favourite cities</h3>
        <ul className="fav-cities-list">
          {
            cities.map((city, index) => { 
              return (
                <ListItem  key={index} sx={{width: 200}} >
                  <ListItemText onClick={onLiClick} primary={city} />
                  <Button onClick={()=>{onCityDelete(index)}}>Delete</Button>
                  {/* <button onClick={()=>{onCityDelete(index)}}>delete</button> */}
                </ListItem >
              );
            })
          }
        </ul>
      </div>
    );
}