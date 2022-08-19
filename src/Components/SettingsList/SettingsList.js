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
import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { changeLogStatusAction } from '../../Store/User/actions';
import { selectUserContacts, selectTheme, selectLang, selectLangName, selectSystem } from '../../Store/User/selectors';
import { changeThemeAction, changeLanguageAction, changeSystemAction } from '../../Store/User/actions';


export const SettingsList = ({ onBoxClick }) => {
    const user = useSelector(selectUserContacts);
    const [langName, setLangName] = useState(useSelector(selectLangName));
    const language = useSelector(selectLang);
    const lang = language['settings'];
    const currentTheme = useSelector(selectTheme);
    const currentSystem = useSelector(selectSystem);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onHomeClick = useCallback(()=>{
        onBoxClick(false);
        navigate('/user/'+user.id);
    }, [navigate, onBoxClick, user.id]);

    const onSportClick = useCallback(()=>{
        onBoxClick(false);
        navigate('/user/'+user.id+'/savedEvents');
    }, [navigate, onBoxClick, user.id]);

    const onLanguageChange = useCallback((e) => {
        setLangName(e.target.value);
        dispatch(changeLanguageAction(e.target.value));
    }, [dispatch, setLangName])

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
                <ListItemButton onClick={onHomeClick}>
                    <ListItemText primary={lang['home']} />
                </ListItemButton>
                <ListItemButton onClick={onSportClick}>
                    <ListItemText primary={lang['sport']} />
                </ListItemButton>
                <ListItem>
                    <Select
                        labelId="select"
                        id="select"
                        value={langName}
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