import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useComponentVisible } from './useComponentVisible';
import debounce from 'lodash.debounce';
import { ListItemText, Button } from '@mui/material';
import './CityAutocomplete.css';
import { selectAutocompleteDt } from '../../Store/Autocomplete/selectors';
import { getAutocompleteDt } from '../../Store/Autocomplete/thunks';
import { addFavouriteCityAction } from '../../Store/User/actions';


export const CityAutocomplete = ({text}) => {

  const AutocompleteDt = useSelector(selectAutocompleteDt);
  const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);
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
      setIsComponentVisible(true);
      dispatch(getAutocompleteDt(val));
    } else{
      setIsComponentVisible(false);
    }
  }, [dispatch, setIsComponentVisible]);
  
  const debouncedOnChange =  debounce(dispatchParam, 300);

  const onLiClick = useCallback((e)=>{
    let inputVal = e.target.innerText.split(", ").shift();
    navigate(inputVal + '/current');
    setIsComponentVisible(false);
    setInputVal('');
  }, [navigate, setIsComponentVisible, setInputVal])

  return (
    <div ref={ref}>  
      {/* <TextField 
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
      /> */}
      <input
      className='search'
        type='text'
        value={inputVal}
        placeholder={text}
        onChange={(e)=>{
          onInputChange(e);
          debouncedOnChange(e);
        }}  
      />
      {
        isComponentVisible
        ?
        <ul className='search-list'>
          {
            AutocompleteDt.map((option) => { 
              return (
                <li key={option.id} >
                  <ListItemText 
                    onClick={onLiClick}  
                    id={option.id} 
                    primary={[option.name, option.region ? option.region : null, option.country].filter(Boolean).join(', ')} 
                  />
                  <Button onClick={()=>{addFavCity(option.name)}}>Add</Button>
                </li>
              );
            })
          }
        </ul>
        : null
      }
    </div>
  );
}