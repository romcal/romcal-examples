import React, { type FC } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { Container, createTheme, ThemeProvider } from '@mui/material';
import { styled } from '@mui/material/styles';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { Navigate, Route, Routes } from 'react-router';

import { Calendar } from './components/Calendar';
import { Header } from './components/Header';
import { Headline } from './components/Headline';
import { RomcalVersion } from './components/RomcalVersion';
import { DEFAULT_CALENDAR, DEFAULT_LOCALE } from './constants/settings';
import './RomcalApp.css';

const theme = createTheme({
  palette: {
    primary: {
      light: '#ff5f3d',
      main: '#D02611',
      dark: '#970000',
      contrastText: '#000',
    },
    secondary: {
      light: '#4f5b62',
      main: '#263238',
      dark: '#000a12',
      contrastText: '#fff',
    },
  },
});

const AppContainer = styled(Container)`
  border-style: solid;
  border-color: #fff;
  border-width: 0;
  border-left-width: thin;
  border-right-width: thin;
  background-color: rgba(255, 255, 2555, 0.9);
  box-sizing: border-box;
  min-height: 100vh;
`;

export const RomcalApp: FC = () => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ThemeProvider theme={theme}>
        <AppContainer maxWidth="md" fixed>
          <Header />
          <Headline />
          <Routes>
            <Route
              path="/*"
              element={
                <Navigate
                  to={`/calendar/${DEFAULT_LOCALE}/${DEFAULT_CALENDAR}/${currentYear}/${currentMonth}`}
                  replace
                />
              }
            />
            <Route path="/calendar/:localeKey/:calendarKey/:year/:month" element={<Calendar />} />
          </Routes>
          <RomcalVersion />
        </AppContainer>
      </ThemeProvider>
    </LocalizationProvider>
  );
};
