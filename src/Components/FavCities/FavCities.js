import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ListItemText } from '@mui/material';
import { selectFavCities } from '../../Store/User/selectors';
import { deleteFavouriteCityAction } from '../../Store/User/actions';
import { useNavigate } from "react-router-dom";


export const FavCities = ({ onCityClick }) => {
    const cities = useSelector(selectFavCities);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onLiClick = useCallback((e)=>{
      let inputVal = e.target.innerText.split(", ").shift();
      navigate('/user/'+inputVal + '/current');
  }, [navigate])

    const onCityDelete = useCallback((index)=>{
        dispatch(deleteFavouriteCityAction(index));
    }, [dispatch])
    
    return(
        <ul>
        {
          cities.map((city, index) => { 
            return (
              <li key={index} >
                <ListItemText onClick={onLiClick} primary={city} />
                <button onClick={()=>{onCityDelete(index)}}>delete</button>
              </li>
            );
          })
        }
      </ul>
    );
}