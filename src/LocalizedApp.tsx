import './App.css';
import { AuthContextProvider } from './contexts/AuthContext';
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
    <AuthContextProvider>
      {isLoggedIn === undefined ? (
        <div className="App">
          <LoadingInProgress/>
        </div>
      ):(
        isLoggedIn.valueOf() === true ?(
          <SecuredApp/>
        ):(
          <div className="App">
            <BrowserRouter>
                <Routes/>
            </BrowserRouter>
          </div>
        )
      )}
    </AuthContextProvider>
  );
}

export default LocalizedApp;
