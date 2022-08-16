import { 
    List,
    Divider,
    ListItem,
    ListItemButton,
    ListItemText,
    Box,
    FormControlLabel,
    Switch,
    Select,
    MenuItem
} from '@mui/material';
import { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { translation } from '../../translation';
import { changeLogStatusAction } from '../../Store/User/actions';
import { selectUserContacts, selectTheme, selectLang, selectSystem } from '../../Store/User/selectors';
import { changeThemeAction, changeLanguageAction, changeSystemAction } from '../../Store/User/actions';


export const SettingsList = ({ onBoxClick }) => {
    const user = useSelector(selectUserContacts);
    const language = useSelector(selectLang);
    const currentTheme = useSelector(selectTheme);
    const currentSystem = useSelector(selectSystem);

    const [lang, setLang]  = useState(translation[language]['settings']);
    const [selectThemeVal, setSelectThemeVal] = useState(language);

    useEffect(()=>{
        setLang(translation[language]['settings'])
    }, [setLang, language]);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onSportClick = useCallback(()=>{
        onBoxClick(false);
        navigate('/user/savedEvents');
    }, [navigate, onBoxClick]);

    const onLanguageChange = useCallback((e) => {
        setSelectThemeVal(e.target.value);
        dispatch(changeLanguageAction(e.target.value));
    }, [dispatch, setSelectThemeVal])

    const changeThemeMode = useCallback((e) => {
        const theme = e.target.checked ? 'dark' : 'light';
        dispatch(changeThemeAction(theme))
    }, [dispatch]);

    const changeSystemMode = useCallback((e) => {
        const system = e.target.checked ? 'imperial' : 'metric';
        dispatch(changeSystemAction(system))
    }, [dispatch]);

    const onLogClick = useCallback((status) => {
        onBoxClick(false);
        if(status){
            navigate('/');
            dispatch(changeLogStatusAction(false))
        } else {
            dispatch(changeLogStatusAction(true))
        }
    }, [dispatch, navigate, onBoxClick])
    
    return(
        <Box
            sx={{ paddingLeft: 2, width: 250 }}
        >
            <List>
                <ListItemButton onClick={onSportClick}>
                    <ListItemText primary={lang['sport']} />
                </ListItemButton>
                <ListItem>
                    <Select
                        labelId="select"
                        id="select"
                        value={selectThemeVal}
                        onChange={onLanguageChange}
                    >
                        <MenuItem value={'en'} >English</MenuItem>
                        <MenuItem value={'ua'} >Українська</MenuItem>
                    </Select>
                </ListItem>
                <ListItem>
                    < FormControlLabel 
                        control={<Switch checked={currentTheme === 'dark' ? true : false} />} 
                        label={lang['theme']}
                        onChange={changeThemeMode} 
                    />
                </ListItem>
                <ListItem>
                    <FormControlLabel 
                        control={<Switch checked={currentSystem === 'imperial' ? true : false} />} 
                        label={lang['system']}
                        onChange={changeSystemMode} 
                    />
                </ListItem>
                <Divider /> 
                <ListItemButton onClick={()=>{onLogClick(user.login)}}>
                    <ListItemText primary={user.login ? lang['logout'] : lang['login']} />
                </ListItemButton>
            </List>
        </Box>
    )
}