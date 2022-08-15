import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useState } from 'react';
import { useNavigate } from "react-router-dom";
import debounce from 'lodash.debounce';
import {
  Checkbox,
  ListItemText,
  TextField
} from '@mui/material';
import './CityAutocomplete.css';
import { selectAutocompleteDt } from '../../Store/Autocomplete/selectors';
import { getAutocompleteDt } from '../../Store/Autocomplete/thunks';
import { addFavouriteCityAction } from '../../Store/User/actions';


export const CityAutocomplete = ({text}) => {

  const AutocompleteDt = useSelector(selectAutocompleteDt);
  const [isActive, setIsActive] = useState();
  const [inputVal, setInputVal] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addFavCity = useCallback((city)=>{
    dispatch(addFavouriteCityAction(city));
  }, [dispatch]);

  const onInputChange = useCallback((e)=>{
    setInputVal(e.target.value)
  }, [setInputVal])

  const dispatchParam = useCallback((e)=>{   
    const val = e.target.value;
    if(val){
      setIsActive(true);
      dispatch(getAutocompleteDt(val));
    } else{
      setIsActive(false);
    }
  }, [dispatch]);
  
  const debouncedOnChange =  debounce(dispatchParam, 300);

  const onLiClick = useCallback((e)=>{
    let inputVal = e.target.innerText.split(", ").shift();

    navigate(inputVal + '/current');
    setIsActive(false);
  }, [navigate, setIsActive])

  return (
    <div>    
      <TextField 
        type='text'
        value={inputVal}
        onChange={(e)=>{
          onInputChange(e);
          debouncedOnChange(e);
        }}  
        variant='outlined'
        placeholder={text}
        size='small'
        autoComplete='off'
      />
      <ul className={isActive ? 'show' : 'hide'}>
        {
          AutocompleteDt.map((option) => { 
            return (
              <li key={option.id} >
                <ListItemText onClick={onLiClick}  id={option.id} primary={[option.name, option.region, option.country].join(', ')} />
                <button onClick={() => {addFavCity(option.name)}}>add</button>
              </li>
            );
          })
        }
      </ul>
    </div>
  );
}