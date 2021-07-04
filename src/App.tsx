import './App.css';
import maini18n from './i18n';
import modali18n from './modali18n';
import internali18n from './internali18n';
import React, { useEffect } from 'react';
import { LoadingInProgress } from "./components/molecules/common/LoadingInProgress";
import LocalizedApp from "./LocalizedApp";
import { I18nextProvider } from 'react-i18next';
import CustomMuiThemeProvider from './customTheme';
import { DeviceContextProvider } from './contexts/DeviceContext';
import { AuthContextProvider } from './contexts/AuthContext';

export const administratorBackendUrl = process.env.REACT_APP_ADMINISTRATOR_BACKEND_APP;

function App() {  
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  useEffect(()=>{
    if(maini18n.isInitialized === false){
      maini18n.init();
    }

    if(modali18n.isInitialized === false){
      modali18n.init();
    }

    setIsLoading(false);
  }, []);
  
  return (
    <CustomMuiThemeProvider>
      <>
        {isLoading.valueOf() === true ?(
          <div className="App">
            <LoadingInProgress/>
          </div>
        ):(
          <I18nextProvider i18n={maini18n}>
            <DeviceContextProvider>
              <AuthContextProvider>
                <LocalizedApp />
              </AuthContextProvider>
            </DeviceContextProvider>
          </I18nextProvider>
        )}
      </>
    </CustomMuiThemeProvider>
  );
}

export default App;
