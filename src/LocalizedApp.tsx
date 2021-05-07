import './App.css';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import CustomMuiThemeProvider from './customTheme';
import { DeviceContextProvider } from './contexts/DeviceContext';
import { MainLayout } from './components/templates/MainLayout';
import Routes from './routes/Routes';
import { BrowserRouter } from 'react-router-dom';
import React, { useEffect } from 'react';
import { LoadingInProgress } from "./components/molecules/common/LoadingInProgress";
import SecuredApp from './SecuredApp';

function LocalizedApp() {  
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean | undefined>(undefined);

  useEffect(()=>{
    //TODO: get based on customhook localstorage

    setIsLoggedIn(true);
  }, []);
  
  return (
      isLoggedIn === undefined ? (
        <div className="App">
          <LoadingInProgress/>
        </div>
      ):(
        isLoggedIn.valueOf() === true ?(
          <SecuredApp/>
        ):(
          <div className="App">
            <CustomMuiThemeProvider>
              <I18nextProvider i18n={i18n}>
                <DeviceContextProvider>
                  <BrowserRouter>
                  {/* TODO: login modal */}
                    <MainLayout>
                      <Routes/>
                    </MainLayout>
                  </BrowserRouter>
                </DeviceContextProvider>
              </I18nextProvider>
            </CustomMuiThemeProvider>
          </div>
        )
      )
  );
}

export default LocalizedApp;
