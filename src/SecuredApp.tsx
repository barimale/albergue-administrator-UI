import './App.css';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import CustomMuiThemeProvider from './customTheme';
import { DeviceContextProvider } from './contexts/DeviceContext';
import { MainLayout } from './components/templates/MainLayout';
import Routes from './routes/Routes';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';

function SecuredApp() {  
  
  return (
    <div className="App">
      <CustomMuiThemeProvider>
        <I18nextProvider i18n={i18n}>
          <DeviceContextProvider>
            <BrowserRouter>
              <MainLayout>
                <Routes/>
              </MainLayout>
            </BrowserRouter>
          </DeviceContextProvider>
        </I18nextProvider>
      </CustomMuiThemeProvider>
    </div>
  );
}

export default SecuredApp;
