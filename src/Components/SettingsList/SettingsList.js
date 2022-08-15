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
import { selectUserContacts, selectTheme, selectLang } from '../../Store/User/selectors';
import { changeThemeAction, changeLanguageAction, changeSystemAction } from '../../Store/User/actions';


export const SettingsList = ({ onBoxClick }) => {
    const user = useSelector(selectUserContacts);
    const language = useSelector(selectLang);
    const currentTheme = useSelector(selectTheme);

    const [lang, setLang]  = useState(translation[language]['settings']);
    const [selectVal, setselectVal] = useState('en');

    useEffect(()=>{
        setLang(translation[language]['settings'])
    }, [setLang, language]);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeThemeMode = useCallback((e) => {
        const theme = e.target.checked ? 'dark' : 'light';
        dispatch(changeThemeAction(theme))
        // onBoxClick(false);
    }, [dispatch]);

    const changeSystemMode = useCallback((e) => {
        const system = e.target.checked ? 'metric' : 'imperial';
        dispatch(changeSystemAction(system))
    }, [dispatch]);

    const onLanguageChange = useCallback((e) => {
        setselectVal(e.target.value);
        dispatch(changeLanguageAction(e.target.value));
    }, [dispatch, setselectVal])

    const onLogClick = useCallback((status) => {
        onBoxClick(false);
        if(status){
            navigate('/');
            dispatch(changeLogStatusAction(false))
        } else {
            dispatch(changeLogStatusAction(true))
        }
    }, [dispatch])
    
    return(
        <Box
            sx={{ paddingLeft: 2, width: 250 }}
            role="presentation"
        >
            <List>
                <ListItemButton onClick={()=>{}}>
                    <ListItemText primary='Sport events' />
                </ListItemButton>
                <ListItem>
                    <Select
                        labelId="select"
                        id="select"
                        value={selectVal}
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
                    control={<Switch />} 
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