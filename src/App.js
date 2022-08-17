import { useMemo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route, useNavigate, Link} from 'react-router-dom';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import dayjs from "dayjs";
import './App.css';
import { selectUserContacts } from './Store/User/selectors';
import { selectTheme } from './Store/User/selectors';
import { RegistrForm } from './Components/RegistrForm/RegistrForm';
import { Header } from './Components/Header/Header';


export const App = () => {
  const user = useSelector(selectUserContacts);
  const currentTheme = useSelector(selectTheme);

  const mainTheme = useMemo(() => createTheme({
    palette:{
      mode: currentTheme,
    }
  }), [currentTheme]);

  return (
    <div>
      <ThemeProvider theme={mainTheme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div id={currentTheme}>
            <Routes>
              <Route path="/*" element={< RegistrForm />} />
              <Route path='/:form' element={< RegistrForm />} />
              <Route path='/user/:userId/*' element={< Header />} />
            </Routes>
          </div>
      </LocalizationProvider>
      </ThemeProvider>
    </div>
  );
}

