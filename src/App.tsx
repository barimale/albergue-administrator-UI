import './App.css';
import i18n from './i18n';
import React, { useEffect } from 'react';
import { LoadingInProgress } from "./components/molecules/common/LoadingInProgress";
import LocalizedApp from "./LocalizedApp";
import { I18nextProvider } from 'react-i18next';
import CustomMuiThemeProvider from './customTheme';
import { DeviceContextProvider } from './contexts/DeviceContext';
import { AuthContextProvider } from './contexts/AuthContext';

function App() {  
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  useEffect(()=>{
    if(i18n.isInitialized === false){
      i18n.init();
    }

    setIsLoading(false);
  }, []);
  
  return (
    <CustomMuiThemeProvider>
      {isLoading.valueOf() === true ?(
        <div className="App">
          <LoadingInProgress/>
        </div>
      ):(
        <I18nextProvider i18n={i18n}>
          <DeviceContextProvider>
            <AuthContextProvider>
              <LocalizedApp />
            </AuthContextProvider>
          </DeviceContextProvider>
        </I18nextProvider>
      )}
    </CustomMuiThemeProvider>
  );
}

export default App;
