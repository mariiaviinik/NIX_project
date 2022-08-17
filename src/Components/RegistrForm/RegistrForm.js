import './RegistrForm.css';
import { v4 as uuidv4 } from "uuid";
import { useCallback, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button } from '@mui/material';
import { translation } from '../../translation';
import { setUserDtAction, changeLogStatusAction} from '../../Store/User/actions';
import { selectUserContacts } from '../../Store/User/selectors';

const inputStyle = {
    marginTop: '10px',
    width: '250px',
}

export const RegistrForm = () => {
    const registrationCode = '1111';
    const user = useSelector(selectUserContacts);
    const {form} = useParams();
    const [lang, setLang] = useState(translation['en']['registration']);

    const [userCode, setUserCode] = useState('');
    const [email, setEmail] = useState(); 
    const [phone, setPhone] = useState();
    const [name, setName] = useState();
    const [surname, setSurname] = useState();
    const [password, setPassword] = useState();
    const [userObject, setUserObject] = useState();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onCodeChange = useCallback((e, obj) => {
        const inputCode = e.target.value;
        setUserCode(inputCode);
        if(inputCode.length === 4){
            if(registrationCode === inputCode){
                dispatch(setUserDtAction(obj
                    // {contacts: obj,
                    // settings: {
                    //     cities: [],
                    //     savedSportEvents: [[], [], []],
                    //     theme: 'light',
                    //     lang: 'en',
                    //     system: 'metric',
                    // }}
                ))
                navigate('/user');
            } else {
                alert('Wrong code number');
                setUserCode('');
            }
        }
    }, [setUserCode, dispatch, navigate])

    const onEmailChange = useCallback((e) => {
        setEmail(e.target.value);
    }, [setEmail])

    const onPhoneChange = useCallback((e) => {
        setPhone(e.target.value);
    }, [setPhone])

    const onNameChange = useCallback((e) => {
        setName(e.target.value);
    }, [setName])

    const onSurnameChange = useCallback((e) => {
        setSurname(e.target.value);
    }, [setSurname])

    const onPasswordChange = useCallback((e) => {
        setPassword(e.target.value);
    }, [setPassword])

    return(
        <div className='registr-container column'>
            {
                form !== 'code'
                ?
                <div className='column' >
                    <nav className='flex reigstr-link-holder'>
                        <Link style={{padding: 0}} className='link' to={'/'} >{lang['links']['login']}</Link>
                        <Link style={{padding: 0}} className='link' to={'/registration'} >{lang['links']['registr']}</Link>
                    </nav>
                    <form 
                        className='column' 
                        onSubmit={(e) => {
                            e.preventDefault();
                            if(form === 'registration'){
                                setUserObject({id: uuidv4(), email, phone, name, surname, password, login: true})
                                navigate('/code')
                            } else if(email === user?.email && password === user?.password){
                                navigate('/user/' + user.id);
                                dispatch(changeLogStatusAction(true))
                            }
                        }}
                    >
                        {
                            form === 'registration'
                            ?
                            <div className='column' >
                                <TextField
                                    variant="standard"
                                    required
                                    label={lang['email']}
                                    type='email'
                                    autoComplete='username'
                                    onChange={onEmailChange}
                                    style={inputStyle}
                                />
                                <TextField
                                    variant="standard"
                                    required
                                    label={lang['phone']}
                                    type='phone'
                                    onChange={onPhoneChange}
                                    style={inputStyle}
                                />
                                <TextField
                                    variant="standard"
                                    required
                                    label={lang['name']}
                                    type='text'
                                    onChange={onNameChange}
                                    style={inputStyle}
                                />
                                <TextField
                                    variant="standard"
                                    required
                                    label={lang['surname']}
                                    type='text'
                                    onChange={onSurnameChange}
                                    style={inputStyle}
                                />
                                 <TextField
                                    variant="standard"
                                    label={lang['password']}
                                    type="password"
                                    autoComplete="current-password"
                                    onChange={onPasswordChange}
                                    required
                                    style={inputStyle}
                                />
                            </div>
                            : 
                            <div className='column'>
                                <TextField
                                    variant="standard"
                                    required
                                    label={lang['email']}
                                    type='email'
                                    autoComplete='username'
                                    onChange={onEmailChange}
                                    style={inputStyle}
                                />
                                <TextField
                                    variant="standard"
                                    label={lang['password']}
                                    type="password"
                                    autoComplete="current-password"
                                    onChange={onPasswordChange}
                                    required
                                    style={inputStyle}
                                />
                            </div>
                        }
                        <Button id='login-btn' type='submit' variant="contained">Sign in</Button>
                    </form>
                </div>
                :
                <TextField
                    required
                    variant="standard"
                    value={userCode}
                    onChange={(e)=>{onCodeChange(e, userObject)}}
                    label={'Code'}
                    type='text'
                    maxLength="4"
                />
            }
        </div>
    )
}