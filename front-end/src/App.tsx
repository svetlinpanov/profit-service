import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { QueryClientProvider } from 'react-query';
import { CssBaseline } from '@mui/material';

import { queryClient } from './config';
import { DashPage } from './components/DashPage';
import { theme } from './theme';
import { PageNotFound404 } from './components/PageNotFound404';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { ConfirmProvider } from 'material-ui-confirm';
import { HomePage } from './pages/HomePage';
import { CalculatorPage } from './pages/CalculatorPage';

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <CssBaseline />
        <ThemeProvider theme={theme}>
          <ConfirmProvider>
            <BrowserRouter>
              <Routes>
              <Route element={<MainPage />}>
                  <Route path="/dash" element={<DashPage />}>
                    <Route index element={<HomePage />} />
                    <Route path="profit/*" element={<CalculatorPage />} />
                  </Route>
                </Route>
                <Route index element={<Index />} />
                <Route path="*" element={<PageNotFound404 />} />
              </Routes>
            </BrowserRouter>
          </ConfirmProvider>
        </ThemeProvider>
      </LocalizationProvider>
    </QueryClientProvider>
  );
};

const MainPage: React.FC = () => {
  return <Outlet />;
};

const Index: React.FC = () => {
  return <Navigate to="/dash" replace />;
};

export default App;
